import { render, screen } from "@testing-library/react";
import RightArrowButton from ".";

describe("RightArrowButton", () => {
	it("should render without errors", () => {
		render(<RightArrowButton onClick={jest.fn} />);
	});

	it("should call onClick function when user click on button", () => {
		const fakeOnClick = jest.fn();
		render(<RightArrowButton onClick={fakeOnClick} />);

		const rightArrowButton = screen.getByRole("button");

		rightArrowButton.click();

		expect(fakeOnClick).toHaveBeenCalled();
		expect(fakeOnClick).toHaveBeenCalledTimes(1);
	});

	it("should receive valid class name", () => {
		render(
			<RightArrowButton onClick={jest.fn} className="fake-css-class" />
		);

		const rightArrowButton = screen.getByRole("button");

		expect(rightArrowButton).toHaveClass("fake-css-class");
	});
});
