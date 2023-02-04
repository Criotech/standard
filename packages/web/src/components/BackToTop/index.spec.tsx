import { render, screen } from "@testing-library/react";
import BackToTop from "./index";

describe("BackToTop", () => {
	it("should render without errors", () => {
		render(<BackToTop />);
	});

	it("should have back-to-top class", () => {
		render(<BackToTop data-testid="backToTop" />);
		const backToTop = screen.getByTestId("backToTop");
		expect(backToTop).toHaveClass("back-to-top");
	});
});
