import { render, screen } from "@testing-library/react";
import PromotionsBlock from "./index";

const testImage = {
	imageUrl: "testImageUrl",
	id: "BYX003AH21SD",
	redirectLink: "https://redirectlink.com",
	alt: "alternate text",
};

describe("PromotionsBlock", () => {
	it("should render without errors", () => {
		render(<PromotionsBlock banner={testImage} />);
	});

	it("should be in the DOM", () => {
		render(<PromotionsBlock banner={testImage} />);
		const promotions = screen.getByRole("img");
		expect(promotions).toBeInTheDocument();
		expect(promotions).toHaveAttribute("src", "testImageUrl");
	});

	it("should have the correct image path/url", () => {
		render(<PromotionsBlock banner={testImage} />);
		const promotions = screen.getByRole("img");
		expect(promotions).toHaveAttribute("src", "testImageUrl");
	});

	it("should have the correct image alt text", () => {
		render(<PromotionsBlock banner={testImage} />);
		const promotions = screen.getByRole("img");
		expect(promotions).toHaveAttribute("alt", "alternate text");
	});
});
