import { render, screen } from "@testing-library/react";
import { AffixProps } from "antd";
import Header from "./index";

jest.mock("antd", () => ({
	Affix: ({ children, className }: AffixProps) => (
		<div data-testid="header-test-id" className={className}>
			{children}
		</div>
	),
}));

jest.mock("../Drawer", () => ({
	__esModule: true,
	default: () => <div data-testid="custom-drawer-test-id" />,
}));

describe("Header", () => {
	it("should render without errors", () => {
		render(<Header />);
	});

	it("should be in the DOM", () => {
		render(<Header />);
		const header = screen.getByTestId("header-test-id");
		expect(header).toBeInTheDocument();
	});

	it("should have default header-wrapper class", () => {
		render(<Header />);
		const header = screen.getByTestId("header-test-id");
		expect(header).toHaveClass("header-wrapper");
	});

	it("should render Drawer in the DOM", () => {
		render(<Header />);
		const header = screen.getByTestId("custom-drawer-test-id");
		expect(header).toBeInTheDocument();
	});
});
