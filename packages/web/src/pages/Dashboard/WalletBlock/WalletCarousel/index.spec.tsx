import { render, screen } from "@testing-library/react";
import WalletCarousel from ".";
import { useWideScreen } from "../../../../hooks/useWideScreen";
import { ComponentProps } from "react";
import LeftArrowButton from "../../../../components/LeftArrowButton";
import RightArrowButton from "../../../../components/RightArrowButton";
import Carousel from "../../../../components/Carousel";

jest.mock("../../../../components/Carousel", () => ({
	__esModule: true,
	default: ({ children, carouselProps }: ComponentProps<typeof Carousel>) => (
		<div data-testid="carousel">
			<div data-testid="carousel-slides">{children}</div>
			<div data-testid="next-arrow-button">
				{carouselProps?.nextArrow}
			</div>
			<div data-testid="previous-arrow-button">
				{carouselProps?.prevArrow}
			</div>
		</div>
	),
}));

jest.mock("../../../../components/RightArrowButton", () => ({
	__esModule: true,
	default: ({ onClick }: ComponentProps<typeof RightArrowButton>) => (
		<button data-testid="right-arrow-button" onClick={onClick} />
	),
}));

jest.mock("../../../../components/LeftArrowButton", () => ({
	__esModule: true,
	default: ({ onClick }: ComponentProps<typeof LeftArrowButton>) => (
		<button data-testid="left-arrow-button" onClick={onClick} />
	),
}));

jest.mock("../../../../hooks/useWideScreen", () => ({
	useWideScreen: jest.fn(),
}));

beforeEach(() => {
	(useWideScreen as jest.Mock).mockReturnValue({
		isWideScreen: false,
	});
});

describe("WalletCarousel", () => {
	it("should render without errors", () => {
		render(<WalletCarousel slides={[]} />);
	});

	it("should receive and render correct number of slides", () => {
		render(<WalletCarousel slides={[<div />, <div />]} />);

		const slides = screen.getByTestId("carousel-slides");

		expect(slides.children.length).toStrictEqual(2);
	});

	it("should render next arrow button when there are more than 1 slide in small screen", () => {
		render(<WalletCarousel slides={[<div />, <div />, <div />]} />);

		const nextArrowButton = screen.getByTestId("next-arrow-button");

		expect(nextArrowButton).toBeInTheDocument();
	});

	it("should render previous arrow button when there are more than 1 slide in small screen", () => {
		render(<WalletCarousel slides={[<div />, <div />, <div />]} />);

		const previousArrowButton = screen.getByTestId("previous-arrow-button");

		expect(previousArrowButton).toBeInTheDocument();
	});
});
