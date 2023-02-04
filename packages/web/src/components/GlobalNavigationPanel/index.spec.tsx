import { render, screen } from "@testing-library/react";
import GlobalNavigationPanel from "./index";
import { NavLink } from "react-router-dom-v5-compat";
import { AffixProps } from "antd";
import { ComponentProps } from "react";

jest.mock("../../hooks/useTranslation", () => ({ useText: jest.fn() }));

jest.mock("antd", () => ({
	Affix: ({ children }: AffixProps) => (
		<div data-testid="affix-test-id">{children}</div>
	),
}));

jest.mock("react-router-dom-v5-compat", () => ({
	NavLink: ({ to, className }: ComponentProps<typeof NavLink>) => {
		let internalClassName = "";
		if (className && typeof className === "function") {
			internalClassName =
				className({ isActive: true, isPending: false }) ?? "";
		}
		return <div className={internalClassName}>{to}</div>;
	},
}));

describe("GlobalNavigationPanel", () => {
	it("should render without errors", () => {
		render(<GlobalNavigationPanel />);
	});

	it("should render affix component", () => {
		render(<GlobalNavigationPanel />);
		const affix = screen.getByTestId("affix-test-id");
		expect(affix).toBeInTheDocument();
	});

	it("should render 4 list items", () => {
		render(<GlobalNavigationPanel />);

		expect(screen.getAllByRole("listitem")).toHaveLength(4);
	});

	it("should have all 4 paths present in link array", () => {
		render(<GlobalNavigationPanel />);
		expect(screen.queryByText("/")).toBeInTheDocument();
		expect(screen.queryByText("/points")).toBeInTheDocument();
		expect(screen.queryByText("/rewards")).toBeInTheDocument();
		expect(screen.queryByText("/store")).toBeInTheDocument();
	});
});
