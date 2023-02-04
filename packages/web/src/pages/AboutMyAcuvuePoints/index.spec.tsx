import { render, screen } from "@testing-library/react";
import AboutMyAcuvuePoints from ".";
import { ComponentProps } from "react";
import Header from "../../components/Layout/Header";

jest.mock("./PointsDescription", () => ({
	__esModule: true,
	default: () => <div data-testid="points-description" />,
}));

jest.mock("./SampleProductCatalog", () => ({
	__esModule: true,
	default: () => <div data-testid="sample-product-catalog" />,
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

describe("SampleProductCatalog", () => {
	it("should render without errors", () => {
		render(<AboutMyAcuvuePoints />);
	});

	it("should render PointsDescription", () => {
		render(<AboutMyAcuvuePoints />);

		const pointsDescription = screen.getByTestId("points-description");
		expect(pointsDescription).toBeInTheDocument();
	});

	it("should render SampleProductCatalog", () => {
		render(<AboutMyAcuvuePoints />);

		const sampleProductCatalog = screen.getByTestId(
			"sample-product-catalog"
		);
		expect(sampleProductCatalog).toBeInTheDocument();
	});

	it("should render masthead", async () => {
		render(<AboutMyAcuvuePoints />);
		const header = screen.getByTestId("header");
		expect(header).toBeInTheDocument();
		expect(header).toHaveTextContent(
			"aboutPointsPage.aboutMyAcuvuePoints.title.masthead"
		);
	});

	it("should render global navigation panel", async () => {
		render(<AboutMyAcuvuePoints />);
		const globalNavigationPanel = screen.getByTestId(
			"global-navigation-panel"
		);
		expect(globalNavigationPanel).toBeInTheDocument();
	});
});
