import { render, screen } from "@testing-library/react";
import { PlatinumBadge } from "./PlatinumBadge";

jest.mock("../../hooks/useText", () => ({ useText: jest.fn() }));

describe("PlatinumBadge", () => {
	it("should render without errors", () => {
		render(<PlatinumBadge />);
	});

	it("should have img with src attribute", () => {
		render(<PlatinumBadge />);
		const platinumImage = screen.getByRole("img");
		expect(platinumImage).toBeInTheDocument();
		expect(platinumImage).toHaveAttribute("src", "platinum-badge.png");
	});

	it("should have default platinum-badge class", () => {
		render(<PlatinumBadge />);
		const platinumImage = screen.getByRole("img");
		expect(platinumImage).toHaveClass("platinum-badge");
	});
});
