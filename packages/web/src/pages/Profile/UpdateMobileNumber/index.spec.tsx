import { act, render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { useUser } from "../../../hooks/useUser";
import UpdateMobileNumber from "./index";
import { useMobileNumberRegistration } from "../../JoinNow/MobileNumberRegistration/useMobileNumberRegistration";
import Text from "../../../components/Text";
import Title from "../../../components/Title";
import { IGetProfileResponse } from "@myacuvue_thailand_web/services";

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-block" />,
}));

jest.mock("../../../components/Title", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Title>) => (
		<span data-testid="title">{textKey}</span>
	),
}));

jest.mock("../../../components/Layout/MyAcuvueLiteHeader", () => ({
	__esModule: true,
	default: () => <div data-testid="lite-header" />,
}));

jest.mock("../../../components/Footer", () => ({
	__esModule: true,
	default: () => <div data-testid="footer" />,
}));

jest.mock("../../Dashboard/BlockTitle", () => ({
	__esModule: true,
	default: () => <div data-testid="block-title" />,
}));

jest.mock("./UpdateMobileNumberForm", () => ({
	__esModule: true,
	default: ({ phoneNumberPrefix }: any) => (
		<div data-testid="update-mobileNumberForm-form">
			<span data-testid="mobile-number-prefix">{phoneNumberPrefix}</span>
		</div>
	),
}));

jest.mock(
	"../../JoinNow/MobileNumberRegistration/useMobileNumberRegistration",
	() => ({
		useMobileNumberRegistration: jest.fn(),
	})
);

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

const userProfile: IGetProfileResponse = {
	phone: "413989012",
	firstName: "FirstName",
	lastName: "Lastname",
	lensesUsage: "ACUVUE_USER",
	birthMonth: "July",
	birthYear: "1995",
	isSpectaclesWearer: true,
	email: "test@test.com",
	gender: null,
	myAcuvueId: "abc123",
	hasParentalConsent: false,
};

jest.mock("../../../hooks/useUser", () => ({
	useUser: jest.fn(),
}));

beforeEach(() => {
	(useMobileNumberRegistration as jest.Mock).mockReturnValue({
		formData: { mobile: "" },
		setFormData: jest.fn(),
		serverErrorKeys: {},
		onSubmit: jest.fn(),
		onUpdatePhone: jest.fn(),
		errorKeys: { mobile: undefined },
		isSubmitDisabled: true,
		currentIndex: 0,
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		countryPhoneCode: "61",
		phoneNumberLength: 10,
	});

	(useUser as jest.Mock).mockReturnValue({
		getProfile: jest.fn().mockResolvedValue(userProfile),
	});
});

describe("MobileNumberRegistration", () => {
	it("should render without errors", async () => {
		await act(async () => {
			render(<UpdateMobileNumber />);
		});
	});

	it("should render Footer", async () => {
		await act(async () => {
			render(<UpdateMobileNumber />);
		});

		const footer = screen.getByTestId("footer");
		expect(footer).toBeInTheDocument();
	});

	it("should render MyAcuvueLiteHeader", async () => {
		await act(async () => {
			render(<UpdateMobileNumber />);
		});

		const header = screen.getByTestId("lite-header");
		expect(header).toBeInTheDocument();
	});

	it("should render correct country phone code", async () => {
		await act(async () => {
			render(<UpdateMobileNumber />);
		});

		const phoneNumberPrefix = screen.getByTestId("mobile-number-prefix");

		expect(phoneNumberPrefix).toHaveTextContent("+61");
	});

	it("should render formatted phone number", async () => {
		const userProfile: IGetProfileResponse = {
			phone: "61413989012",
			firstName: "FirstName",
			lastName: "Lastname",
			lensesUsage: "ACUVUE_USER",
			birthMonth: "July",
			birthYear: "1995",
			isSpectaclesWearer: true,
			email: "test@test.com",
			gender: null,
			myAcuvueId: "abc123",
			hasParentalConsent: false,
		};

		(useUser as jest.Mock).mockReturnValue({
			getProfile: jest.fn().mockResolvedValue(userProfile),
		});

		await act(async () => {
			render(<UpdateMobileNumber />);
		});
		const formattedPhone = screen.queryByText("+61 413989012");
		expect(formattedPhone).toBeInTheDocument();
	});
});
