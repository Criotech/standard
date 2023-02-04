import { render, screen } from "@testing-library/react";
import MarketingPreference from "./index";
import { useMarketingPreferences } from "./useMarketingPreferences";
import { ComponentProps } from "react";
import Title from "../../components/Title";

jest.mock("../../components/Title", () => ({
	__esModule: true,
	default: ({ textKey, subKey }: ComponentProps<typeof Title>) => (
		<>
			<span data-testid="title">{textKey}</span>
			<span data-testid="sub-title">{subKey}</span>
		</>
	),
}));

jest.mock("../../components/Footer", () => ({
	__esModule: true,
	default: () => <div data-testid="footer" />,
}));

jest.mock("../../components/Layout/MyAcuvueLiteHeader", () => ({
	__esModule: true,
	default: () => <div data-testid="lite-header" />,
}));

jest.mock("./MarketingPreferencesForm", () => ({
	__esModule: true,
	default: () => <div data-testid="marketing-form" />,
}));

jest.mock("./useMarketingPreferences", () => ({
	useMarketingPreferences: jest.fn(),
}));

beforeEach(() => {
	(useMarketingPreferences as jest.Mock).mockReturnValue({
		formData: {},
		setFormData: jest.fn(),
		serverErrorKeys: {},
		onSubmit: jest.fn(),
		onCancel: jest.fn(),
		errorKeys: { mobile: undefined },
		isSubmitDisabled: true,
		hasLineNotification: false,
	});
});

describe("MarketingPreference", () => {
	it("should render without errors", () => {
		render(<MarketingPreference />);
	});

	it("should render Footer", () => {
		render(<MarketingPreference />);

		const footer = screen.getByTestId("footer");
		expect(footer).toBeInTheDocument();
	});

	it("should have marketing-preferences-page default className", () => {
		const { container } = render(<MarketingPreference />);

		expect(container.firstChild).toHaveClass("marketing-preferences-page");
	});

	it("should render MyAcuvueLiteHeader", () => {
		render(<MarketingPreference />);

		const header = screen.getByTestId("lite-header");
		expect(header).toBeInTheDocument();
	});

	it("should render Title with correct joinNowTitle", () => {
		(useMarketingPreferences as jest.Mock).mockReturnValue({
			formData: {},
			setFormData: jest.fn(),
			serverErrorKeys: {},
			onSubmit: jest.fn(),
			onCancel: jest.fn(),
			errorKeys: { mobile: undefined },
			isSubmitDisabled: true,
		});

		render(<MarketingPreference />);

		const subTitle = screen.getByTestId("sub-title");
		expect(subTitle).toBeInTheDocument();
	});
});
