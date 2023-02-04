import { render, screen } from "@testing-library/react";
import { NormalBadge } from "./NormalBadge";

describe("NormalBadge", () => {
	it("should render without errors", () => {
		render(<NormalBadge />);
	});

	it("should have src attribute", () => {
		render(<NormalBadge />);
		const normalImage = screen.getByRole("img");
		expect(normalImage).toBeInTheDocument();
		expect(normalImage).toHaveAttribute("src", "point-badge.svg");
	});

	it("should have default normal-badge class", () => {
		render(<NormalBadge />);
		const normalImage = screen.getByRole("img");
		expect(normalImage).toHaveClass("normal-badge");
	});
});
