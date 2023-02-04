import { render, screen } from "@testing-library/react";
import MobileNumberRegistration from "./index";
import { useTermsAndConditions } from "./useTermsAndConditions";
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
		<div data-testid="title">{textKey}</div>
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
	default: () => <div />,
}));

jest.mock("../../Dashboard/BlockTitle", () => ({
	__esModule: true,
	default: () => <div />,
}));

jest.mock("./TermsAndConditionsForm", () => ({
	__esModule: true,
	default: () => <div />,
}));

jest.mock("./useTermsAndConditions", () => ({
	useTermsAndConditions: jest.fn(),
}));

beforeEach(() => {
	(useTermsAndConditions as jest.Mock).mockReturnValue({
		formData: {
			"WEB:LITE:PRIVACY_POLICY": false,
			"WEB:LITE:TERMS_AND_CONDITIONS": false,
		},
		setFormData: jest.fn(),
		onSubmit: jest.fn(),
		onGoBack: jest.fn(),
		isSubmitDisabled: true,
		currentIndex: 1,
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
});
