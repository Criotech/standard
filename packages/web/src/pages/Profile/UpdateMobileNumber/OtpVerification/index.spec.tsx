import { render, screen } from "@testing-library/react";
import OtpVerification from "./index";
import { useOtpVerification } from "./useOtpVerification";
import { ComponentProps } from "react";
import Text from "../../../../components/Text";
import { Link } from "react-router-dom";
import Title from "../../../../components/Title";

jest.mock("react-router-dom", () => ({
	Link: ({ to, children }: ComponentProps<typeof Link>) => (
		<a href={to as string}>{children}</a>
	),
	useHistory: jest.fn(),
}));

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../../components/Title", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Title>) => (
		<span data-testid="title">{textKey}</span>
	),
}));

jest.mock("../../../../components/Layout/MyAcuvueLiteHeader", () => ({
	__esModule: true,
	default: () => <div data-testid="lite-header" />,
}));

jest.mock("../../../../components/Footer", () => ({
	__esModule: true,
	default: () => <div data-testid="footer" />,
}));

jest.mock("./OtpVerificationForm", () => ({
	__esModule: true,
	default: () => <div data-testid="otp-verification-form" />,
}));

jest.mock("./useOtpVerification", () => ({
	useOtpVerification: jest.fn(),
}));

beforeEach(() => {
	(useOtpVerification as jest.Mock).mockReturnValue({
		formData: {
			otp: "",
		},
		setFormData: jest.fn(),
		onSubmit: jest.fn(),
		onGoBack: jest.fn(),
		isSubmitDisabled: true,
		currentIndex: 0,
		phone: "123456789",
	});
});

describe("OtpVerification", () => {
	it("should render without errors", () => {
		render(<OtpVerification />);
	});

	it("should render Footer", () => {
		render(<OtpVerification />);

		const footer = screen.getByTestId("footer");
		expect(footer).toBeInTheDocument();
	});

	it("should render MyAcuvueLiteHeader", () => {
		render(<OtpVerification />);

		const header = screen.getByTestId("lite-header");
		expect(header).toBeInTheDocument();
	});

	it("should render otpVerificationForm when phone is available", () => {
		render(<OtpVerification />);

		const otpVerificationForm = screen.getByTestId("otp-verification-form");

		expect(otpVerificationForm).toBeInTheDocument();
	});
});
