import { render, screen } from "@testing-library/react";
import Carousel from "./index";
import { Carousel as AntCarousel } from "antd";
import { ComponentProps } from "react";

jest.mock("antd", () => ({
	Carousel: ({ className, children }: ComponentProps<typeof AntCarousel>) => (
		<div className={className} data-testid="carousel-test-id">
			{children}
		</div>
	),
}));

describe("Carousel", () => {
	it("should render without errors", () => {
		render(<Carousel />);
	});

	it("should render antd carousel", () => {
		render(<Carousel />);
		const carousel = screen.getByTestId("carousel-test-id");
		expect(carousel).toBeInTheDocument();
	});

	it("should render carousel with its children", () => {
		render(
			<Carousel>
				<div data-testid="carousel-children" />
			</Carousel>
		);
		const children = screen.getByTestId("carousel-children");
		expect(children).toBeInTheDocument();
	});

	it("should keep original className", () => {
		render(<Carousel />);
		const carousel = screen.getByTestId("carousel-test-id");
		expect(carousel).toHaveClass("acuvue-carousel");
	});
});
