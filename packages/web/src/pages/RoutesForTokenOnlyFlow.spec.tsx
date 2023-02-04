import { ProfileCompleteness } from "@myacuvue_thailand_web/services";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthStatus, IAuthContext } from "../contexts/AuthContext";
import {
	IUserProfileContext,
	useUserProfile,
} from "../contexts/UserProfileContext";
import { useAuthentication } from "../hooks/useAuthentication";
import RoutesForTokenOnlyFlow, {
	AuthenticatedRoutes,
} from "./RoutesForTokenOnlyFlow";
import { mocked } from "ts-jest/utils";

jest.mock("react-router-dom", () => ({
	Switch: ({ children }: ComponentProps<typeof Switch>) => <>{children}</>,
}));

jest.mock("react-router", () => ({
	Route: ({ children }: ComponentProps<typeof Route>) => <>{children}</>,
	Redirect: () => <div />,
}));

jest.mock("../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("./DashboardWithOnlyOpticalStore", () => ({
	__esModule: true,
	default: () => (
		<div data-testid="dashboard-opticalstore">
			./Dashboard With Only Optical Store
		</div>
	),
}));

jest.mock("../hooks/useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("./CompleteYourProfile", () => ({
	__esModule: true,
	default: () => (
		<div data-testid="complete-profile">complete your profile</div>
	),
}));

jest.mock("./JoinNow/MobileNumberRegistration", () => ({
	__esModule: true,
	default: () => (
		<div data-testid="mobile-registration">Mobile registration</div>
	),
}));

jest.mock("./JoinNow/TermsAndConditions", () => ({
	__esModule: true,
	default: () => (
		<div data-testid="terms-and-conditions">terms and conditions</div>
	),
}));

jest.mock("./JoinNow/OtpVerification", () => ({
	__esModule: true,
	default: () => <div data-testid="verify-otp">Otp verification</div>,
}));

jest.mock("./UrlReaderProxy", () => ({
	__esModule: true,
	default: () => <>UrlReaderProxy</>,
}));

const defaultUseAuthentication: IAuthContext = {
	status: AuthStatus.LOADING,
	deviceToken: undefined,
	setDeviceToken: jest.fn(),
	getUser: jest.fn(),
	processSessionToken: jest.fn(),
	resetAuth: jest.fn(),
	sessionToken: undefined,
	user: undefined,
};

const defaultUseUserProfile: IUserProfileContext = {
	profileCompleteness: ProfileCompleteness.INCOMPLETE,
	userProfile: {
		firstName: "fakeFirstName",
		lastName: "fakeLastName",
		myAcuvueId: "my acuvue id",
		phone: "",
		lensesUsage: "ACUVUE_USER",
		hasParentalConsent: null,
		gender: null,
		isSpectaclesWearer: null,
		birthMonth: null,
		birthYear: null,
		email: null,
	},
	isLoading: false,
	refreshUserProfile: jest.fn(),
	setEmptyBefore: jest.fn(),
	wasEmptyBefore: false,
};

beforeEach(() => {
	mocked(useAuthentication).mockReturnValue({
		...defaultUseAuthentication,
	});
});

describe("RoutesForTokenOnlyFlow", () => {
	it("should render without errors", () => {
		render(<RoutesForTokenOnlyFlow />);
	});

	it("should render authenticated routes when PENDING_TC", () => {
		mocked(useAuthentication).mockReturnValue({
			...defaultUseAuthentication,
			status: AuthStatus.PENDING_TC,
		});

		render(<RoutesForTokenOnlyFlow />);

		const termsAndConditions = screen.getByTestId("terms-and-conditions");
		expect(termsAndConditions).toBeInTheDocument();
	});

	it("should render authenticated routes when PENDING_OTP", () => {
		mocked(useAuthentication).mockReturnValue({
			...defaultUseAuthentication,
			status: AuthStatus.PENDING_OTP,
		});

		render(<RoutesForTokenOnlyFlow />);

		const mobileRegistration = screen.getByTestId("mobile-registration");
		const verifyOtp = screen.getByTestId("verify-otp");

		expect(mobileRegistration).toBeInTheDocument();
		expect(verifyOtp).toBeInTheDocument();
	});
});

describe("AuthenticatedRoutes", () => {
	it("should render complete your profile if user is not registered", () => {
		mocked(useUserProfile).mockReturnValue({
			...defaultUseUserProfile,
			profileCompleteness: ProfileCompleteness.INCOMPLETE,
		});

		render(<AuthenticatedRoutes />);

		const completeYourProfile = screen.getByTestId("complete-profile");
		expect(completeYourProfile).toBeInTheDocument();
	});

	it("should render dashboard and profile if user already registered", () => {
		mocked(useUserProfile).mockReturnValue({
			...defaultUseUserProfile,
			profileCompleteness: ProfileCompleteness.COMPLETE,
		});

		render(<AuthenticatedRoutes />);

		const completeYourProfile = screen.getByTestId("complete-profile");
		const dashboard = screen.getByTestId("dashboard-opticalstore");

		expect(completeYourProfile).toBeInTheDocument();
		expect(dashboard).toBeInTheDocument();
	});
});
