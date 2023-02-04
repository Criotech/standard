import Membership from ".";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import Text from "../../components/Text";

jest.mock("react-router-dom-v5-compat", () => ({
	Route: () => <></>,
	Routes: () => <></>,
	Navigate: () => <></>,
}));

jest.mock("../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../components/GlobalNavigationPanel", () => ({
	__esModule: true,
	default: () => <div data-testid="global-navigation-panel" />,
}));

jest.mock("../../components/Layout/Header", () => ({
	__esModule: true,
	default: () => <div data-testid="header" />,
}));

jest.mock("../../components/NavigationTabs", () => ({
	__esModule: true,
	default: () => <div data-testid="navigation-tabs" />,
}));

describe("Membership", () => {
	it("should render without error", () => {
		render(<Membership />);
	});

	it("should render header", async () => {
		render(<Membership />);

		const header = await screen.findByTestId("header");
		expect(header).toBeInTheDocument();
	});

	it("should render GlobalNavigationPanel", async () => {
		render(<Membership />);

		const navigationPanel = await screen.findByTestId(
			"global-navigation-panel"
		);
		expect(navigationPanel).toBeInTheDocument();
	});

	it("should render NavigationTabs", async () => {
		render(<Membership />);

		const navigationTab = await screen.findByTestId("navigation-tabs");
		expect(navigationTab).toBeInTheDocument();
	});
});
