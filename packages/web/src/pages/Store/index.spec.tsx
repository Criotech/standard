import { render, screen } from "@testing-library/react";
import Store from "./index";
import { ComponentProps } from "react";
import NavigationTabs from "../../components/NavigationTabs";

jest.mock("react-router-dom-v5-compat", () => ({
	Route: () => <></>,
	Routes: () => <></>,
	Navigate: () => <></>,
}));

jest.mock("./YourOpticalStore", () => ({
	__esModule: true,
	default: () => <div data-testid="your-optical-store" />,
}));

jest.mock("../../components/NavigationTabs", () => ({
	__esModule: true,
	default: ({ navItems }: ComponentProps<typeof NavigationTabs>) => (
		<div data-testid="navigation-tabs">
			{navItems.map((item: any) => (
				<div data-testid="nav-item" key={item.path}>
					<div data-testid="nav-item-path" key={item.path}>
						{item.path}
					</div>
					<div data-testid="nav-item-label-key">{item.labelKey}</div>
				</div>
			))}
		</div>
	),
}));

jest.mock("../../components/Layout/Header", () => ({
	__esModule: true,
	default: () => <div data-testid="header" />,
}));

jest.mock("../../components/GlobalNavigationPanel", () => ({
	__esModule: true,
	default: () => <div data-testid="global-navigation-panel" />,
}));

describe("Store", () => {
	it("should render without errors", () => {
		render(<Store />);
	});

	it("should render navigation tabs", async () => {
		render(<Store />);

		const navTabs = await screen.findByTestId("navigation-tabs");
		expect(navTabs).toBeInTheDocument();

		const navItems = await screen.findAllByTestId("nav-item");
		expect(navItems).toHaveLength(2);

		const navItemPaths = await screen.findAllByTestId("nav-item-path");
		expect(navItemPaths).toHaveLength(2);
		expect(navItemPaths[0]).toHaveTextContent("/store/home-delivery");
		expect(navItemPaths[1]).toHaveTextContent("/store/your-optical-store");

		const navItemLabelKeys = await screen.findAllByTestId(
			"nav-item-label-key"
		);
		expect(navItemLabelKeys).toHaveLength(2);
		expect(navItemLabelKeys[0]).toHaveTextContent("storePage.acuvueToHome");
		expect(navItemLabelKeys[1]).toHaveTextContent(
			"storePage.yourOpticalStore"
		);
	});

	it("should render header", async () => {
		render(<Store />);

		const header = screen.getByTestId("header");
		expect(header).toBeInTheDocument();
	});

	it("should render GlobalNavigationPanel", async () => {
		render(<Store />);

		const navigationPanel = screen.getByTestId("global-navigation-panel");
		expect(navigationPanel).toBeInTheDocument();
	});
});
