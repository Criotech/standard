import { render, screen } from "@testing-library/react";
import HeaderImage from "./index";

describe("HeaderImage", () => {
	it("should render without errors", () => {
		render(<HeaderImage />);
	});

	it("should have src attribute", () => {
		render(<HeaderImage />);
		const image = screen.getByRole("img");

		expect(image).toHaveAttribute("src");
	});
});
