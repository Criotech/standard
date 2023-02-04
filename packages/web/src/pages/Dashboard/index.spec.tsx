import Dashboard from "./index";
import { render, screen, cleanup } from "@testing-library/react";
import { useConfiguration } from "../../hooks/useConfiguration";
import { useStore } from "../../hooks/useStore";
import { ComponentProps } from "react";
import GreetingsBlock from "../GreetingsBlock";
import { useCompleteYourProfile } from "../CompleteYourProfile/useCompleteYourProfile";
import { useDashboardData } from "./useDashboardData";
import { mocked } from "ts-jest/utils";
import { useCatalogCoupons } from "./useCatalogCoupons";
import { useHasReceivedWelcomeWallet } from "./useHasReceivedWelcomeWallet";
import { useWalletCouponCards } from "./useWalletCouponCards";

jest.mock("../../components/Layout/MyAcuvueLiteHeader", () => ({
	__esModule: true,
	default: () => <div data-testid="my-acuvue-lite-header" />,
}));

jest.mock("../GreetingsBlock", () => ({
	__esModule: true,
	default: ({
		userPoints,
		walletProps,
		firstName,
	}: ComponentProps<typeof GreetingsBlock>) => (
		<div data-testid="greetings-block">
			<span data-testid="first-name">{firstName}</span>
			<span data-testid="user-points">{JSON.stringify(userPoints)}</span>
			<span data-testid="wallet-coupon-cards">
				{walletProps && JSON.stringify(walletProps.cards)}
			</span>
		</div>
	),
}));

jest.mock("../../components/Footer", () => ({
	__esModule: true,
	default: () => <div data-testid="footer" />,
}));

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("./SupportContactBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="support-contact-block" />,
}));

jest.mock("../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-block" />,
}));

jest.mock("./InvitationBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="invitation-block" />,
}));

jest.mock("./PrivilegesBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="privileges-block" />,
}));

jest.mock("./OpticalStoreBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="optical-store-block" />,
}));

jest.mock("../CompleteYourProfile/RegistrationSuccessDialog", () => ({
	__esModule: true,
	default: () => <div data-testid="registration-success-dialog" />,
}));

jest.mock("../../hooks/useStore", () => ({
	useStore: jest.fn(),
}));

jest.mock("../CompleteYourProfile/useCompleteYourProfile", () => ({
	useCompleteYourProfile: jest.fn(),
}));

jest.mock("./useDashboardData", () => ({
	useDashboardData: jest.fn(),
}));

jest.mock("./useCatalogCoupons", () => ({
	useCatalogCoupons: jest.fn(),
}));

jest.mock("./useHasReceivedWelcomeWallet", () => ({
	useHasReceivedWelcomeWallet: jest.fn(),
}));

jest.mock("./useWalletCouponCards", () => ({
	useWalletCouponCards: jest.fn(),
}));

jest.mock("../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

const defaultDashboardData = {
	userPoints: undefined,
	userCoupons: undefined,
	userProfile: undefined,
	acuvueCoupons: undefined,
	lifeStyleCoupons: undefined,
	isPointsLoading: true,
	isUserCouponsLoading: true,
	isUserProfileLoading: true,
};

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		supportTelephone: "1234 567 890",
		supportEmailAddress: "some-email@acuvue.com",
	});

	mocked(useStore).mockReturnValue({
		getUserStore: jest.fn().mockResolvedValue({}),
		getStores: jest.fn(),
		isEligibleToChangeStore: jest.fn(),
		registerStore: jest.fn(),
	});

	(useCompleteYourProfile as jest.Mock).mockReturnValue({
		isRegistrationPopupOpen: false,
		setIsRegistrationPopupOpen: jest.fn(),
		userProfile: null,
		userProfileIsLoading: true,
	});

	mocked(useDashboardData).mockReturnValue({ ...defaultDashboardData });

	mocked(useCatalogCoupons).mockReturnValue({
		catalogCoupons: [],
		leastExpensiveRewardValue: 0,
	});

	mocked(useHasReceivedWelcomeWallet).mockReturnValue(false);

	mocked(useWalletCouponCards).mockReturnValue([]);
});

describe("Dashboard", () => {
	it("should render without error", async () => {
		render(<Dashboard />);
		cleanup();
	});

	it("should render MyAcuvueLiteHeader component", () => {
		render(<Dashboard />);

		const myAcuvueLiteHeader = screen.getByTestId("my-acuvue-lite-header");
		expect(myAcuvueLiteHeader).toBeInTheDocument();
		cleanup();
	});

	it("should have acuvue-dashboard class name", () => {
		const { container } = render(<Dashboard />);

		expect(
			container.querySelector(".acuvue-dashboard")
		).toBeInTheDocument();
		cleanup();
	});

	it("should render greetings block if isUserProfileLoading is false and userProfile is defined", () => {
		mocked(useDashboardData).mockReturnValue({
			...defaultDashboardData,
			isUserProfileLoading: false,
			userProfile: {
				firstName: "",
				lastName: "",
				email: "",
				birthYear: "",
				birthMonth: "",
				gender: null,
				hasParentalConsent: false,
				isSpectaclesWearer: false,
				phone: "",
				lensesUsage: null,
				myAcuvueId: "",
			},
		});

		render(<Dashboard />);

		const greetingsBlock = screen.getByTestId("greetings-block");

		expect(greetingsBlock).toBeInTheDocument();
		cleanup();
	});

	it("should pass correct userPoints to greetings block", () => {
		mocked(useDashboardData).mockReturnValue({
			...defaultDashboardData,
			isUserProfileLoading: false,
			userProfile: {
				firstName: "",
				lastName: "",
				email: "",
				birthYear: "",
				birthMonth: "",
				gender: null,
				hasParentalConsent: false,
				isSpectaclesWearer: false,
				phone: "",
				lensesUsage: null,
				myAcuvueId: "",
			},
			userPoints: {
				ladder: "platinum",
				earnedPoints: 5000,
				remainingPointsToPlatinum: 1000,
				dateLimitToPlatinum: "2018-01-01",
				availablePoints: 1220,
				expiringPoints: 100,
				expiringAt: "2018-12-01",
			},
		});

		render(<Dashboard />);

		const userPoints = screen.getByTestId("user-points");

		expect(userPoints).toHaveTextContent(
			JSON.stringify({
				ladder: "platinum",
				earnedPoints: 5000,
				remainingPointsToPlatinum: 1000,
				dateLimitToPlatinum: "2018-01-01",
				availablePoints: 1220,
				expiringPoints: 100,
				expiringAt: "2018-12-01",
			})
		);
		cleanup();
	});

	it("should pass correct user cards to greetings block", () => {
		mocked(useDashboardData).mockReturnValue({
			...defaultDashboardData,
			isUserProfileLoading: false,
			userProfile: {
				firstName: "",
				lastName: "",
				email: "",
				birthYear: "",
				birthMonth: "",
				gender: null,
				hasParentalConsent: false,
				isSpectaclesWearer: false,
				phone: "",
				lensesUsage: null,
				myAcuvueId: "",
			},
		});

		mocked(useWalletCouponCards).mockReturnValue([
			{
				imageUrl: "fakeImageUrl",
				title: "fakeTitle",
			},
		]);

		render(<Dashboard />);

		const walletCouponCards = screen.getByTestId("wallet-coupon-cards");
		expect(walletCouponCards).toHaveTextContent(
			JSON.stringify([
				{
					imageUrl: "fakeImageUrl",
					title: "fakeTitle",
				},
			])
		);
		cleanup();
	});

	it("should load loader when user profile is not loaded", () => {
		mocked(useDashboardData).mockReturnValue({
			...defaultDashboardData,
			isUserProfileLoading: true,
		});

		render(<Dashboard />);

		const loadingBlock = screen.getByTestId("loading-block");
		expect(loadingBlock).toBeInTheDocument();
		cleanup();
	});

	it("should pass correct first name to greetings block", () => {
		mocked(useDashboardData).mockReturnValue({
			...defaultDashboardData,
			isUserProfileLoading: false,
			userProfile: {
				firstName: "fakeFirstName",
				lastName: "",
				email: "",
				birthYear: "",
				birthMonth: "",
				gender: null,
				hasParentalConsent: false,
				isSpectaclesWearer: false,
				phone: "",
				lensesUsage: null,
				myAcuvueId: "",
			},
		});

		render(<Dashboard />);

		const firstName = screen.getByTestId("first-name");
		expect(firstName).toHaveTextContent("fakeFirstName");
		cleanup();
	});

	it("should render optical store block", () => {
		render(<Dashboard />);

		const opticalStoreBlock = screen.getByTestId("optical-store-block");
		expect(opticalStoreBlock).toBeInTheDocument();
		cleanup();
	});

	it("should render footer", () => {
		render(<Dashboard />);

		const footer = screen.getByTestId("footer");
		expect(footer).toBeInTheDocument();
		cleanup();
	});

	it("should render support contact block", () => {
		render(<Dashboard />);

		const supportContactBlock = screen.getByTestId("support-contact-block");
		expect(supportContactBlock).toBeInTheDocument();
		cleanup();
	});

	it("should render RegistrationSuccessDialog", () => {
		render(<Dashboard />);

		const RegistrationSuccessDialog = screen.getByTestId(
			"registration-success-dialog"
		);
		expect(RegistrationSuccessDialog).toBeInTheDocument();
		cleanup();
	});
});
