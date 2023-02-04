import About from "./index";
import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom-v5-compat";
import Text from "../../components/Text";
import { ComponentProps } from "react";
import Header from "../../components/Layout/Header";
import { mocked } from "ts-jest/utils";

jest.mock("../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("./AboutMenu", () => ({
	__esModule: true,
	default: () => <div data-testid="about-menu" />,
}));

jest.mock("../../components/Layout/Header", () => ({
	__esModule: true,
	default: ({ titleKey }: ComponentProps<typeof Header>) => (
		<div data-testid="header">{titleKey}</div>
	),
}));

jest.mock("../../components/GlobalNavigationPanel", () => ({
	__esModule: true,
	default: () => <div data-testid="global-navigation-panel" />,
}));

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
}));

beforeEach(() => {
	mocked(useNavigate).mockReturnValue(jest.fn());
});

describe("About", () => {
	it("should render without errors", () => {
		render(<About />);
	});

	it("should render 2 buttons", () => {
		render(<About />);
		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(2);
	});

	it("should have the 'copyright' text in the screen", () => {
		render(<About />);
		const copyright = screen.getByText("aboutAcuvuePage.copyright");
		expect(copyright).toBeInTheDocument();
	});

	it("should have the 'about description details' text in the screen", () => {
		render(<About />);
		const description = screen.getByText("aboutAcuvuePage.description");
		expect(description).toBeInTheDocument();
	});

	it("should render the about menu", () => {
		render(<About />);
		const aboutMenu = screen.getByTestId("about-menu");
		expect(aboutMenu).toBeInTheDocument();
	});

	it("should render masthead", async () => {
		render(<About />);

		const header = screen.getByTestId("header");
		expect(header).toBeInTheDocument();
		expect(header).toHaveTextContent("drawer.about");
	});

	it("should render GlobalNavigationPanel", async () => {
		render(<About />);

		const navigationPanel = await screen.findByTestId(
			"global-navigation-panel"
		);
		expect(navigationPanel).toBeInTheDocument();
	});

	it("should trigger onclick callback when how-to-earn-points button is clicked", async () => {
		render(<About />);

		const howToEarnPointsButton = await screen.findByText(
			"aboutAcuvuePage.howToEarnPoints"
		);
		howToEarnPointsButton.click();
		expect(useNavigate()).toHaveBeenCalledWith("/points/about");
	});

	it("should trigger onclick callback when member-benefits-button is clicked", async () => {
		render(<About />);

		const memberBenefitsButton = await screen.findByText(
			"aboutAcuvuePage.memberBenefits"
		);
		memberBenefitsButton.click();
		expect(useNavigate()).toHaveBeenCalledWith("/membership");
	});
});
