import { render, screen } from "@testing-library/react";
import { useConfiguration } from "../../../hooks/useConfiguration";
import MobileNumberRegistration from "./index";
import { useMobileNumberRegistration } from "./useMobileNumberRegistration";
import { ComponentProps } from "react";
import Text from "../../../components/Text";
import { Link } from "react-router-dom";
import Title from "../../../components/Title";

jest.mock("react-router-dom", () => ({
	Link: ({ to, children }: ComponentProps<typeof Link>) => (
		<a href={to as string}>{children}</a>
	),
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
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

jest.mock("../JoinNowStepBar", () => ({
	__esModule: true,
	default: () => <div data-testid="join-now-stepbar" />,
}));

jest.mock("../../Dashboard/BlockTitle", () => ({
	__esModule: true,
	default: () => <div data-testid="block-title" />,
}));

jest.mock("./MobileNumberRegistrationForm", () => ({
	__esModule: true,
	default: ({ mobileNumberPrefix }: any) => (
		<div data-testid="registration-form">
			<span data-testid="mobile-number-prefix">{mobileNumberPrefix}</span>
		</div>
	),
}));

jest.mock("./useMobileNumberRegistration", () => ({
	useMobileNumberRegistration: jest.fn(),
}));

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../../components/SignInButton", () => ({
	__esModule: true,
	default: () => <div data-testid="sign-in-button" />,
}));

beforeEach(() => {
	(useMobileNumberRegistration as jest.Mock).mockReturnValue({
		formData: { mobile: "" },
		setFormData: jest.fn(),
		serverErrorKeys: {},
		onSubmit: jest.fn(),
		errorKeys: { mobile: undefined },
		isSubmitDisabled: true,
		currentIndex: 0,
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		countryPhoneCode: "61",
		phoneNumberLength: 10,
		hasSignIn: true,
	});
});

describe("MobileNumberRegistration", () => {
	it("should render without errors", () => {
		render(<MobileNumberRegistration />);
	});

	it("should render Footer", () => {
		render(<MobileNumberRegistration />);

		const footer = screen.getByTestId("footer");
		expect(footer).toBeInTheDocument();
	});

	it("should render MyAcuvueLiteHeader", () => {
		render(<MobileNumberRegistration />);

		const header = screen.getByTestId("lite-header");
		expect(header).toBeInTheDocument();
	});

	it("should render correct country phone code", () => {
		render(<MobileNumberRegistration />);

		const mobileNumberPrefix = screen.getByTestId("mobile-number-prefix");

		expect(mobileNumberPrefix).toHaveTextContent("+61");
	});
	it("should show sign in link if hasSignIn is true", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			hasSignIn: true,
		});
		render(<MobileNumberRegistration />);
		const signInLink = screen.getByTestId("sign-in-button");
		expect(signInLink).toBeInTheDocument();
	});
});
