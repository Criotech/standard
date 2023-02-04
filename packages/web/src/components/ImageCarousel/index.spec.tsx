import { render, screen } from "@testing-library/react";
import ImageCarousel, { CarouselProps } from "./index";

export const testImages = [
	{
		imageUrl:
			"https://cdn.britannica.com/22/206222-050-3F741817/Domestic-feline-tabby-cat.jpg",
		id: "BYX003AH21SD",
		redirectLink: "https://redirectlink.com",
		alt: "alternate text",
	},
];

jest.mock("antd", () => ({
	Carousel: ({ className, banners }: CarouselProps) => (
		<div className={className} data-testid="carousel-test-id" />
	),
}));

describe("ImageCarousel", () => {
	it("should render without errors", () => {
		render(<ImageCarousel banners={testImages} />);
	});

	it("should be in the DOM", () => {
		render(<ImageCarousel banners={testImages} />);
		const carousel = screen.getByTestId("carousel-test-id");
		expect(carousel).toBeInTheDocument();
	});

	it("should keep original className", () => {
		render(<ImageCarousel banners={testImages} />);
		const carousel = screen.getByTestId("carousel-test-id");
		expect(carousel).toHaveClass("image-carousel");
	});
});
