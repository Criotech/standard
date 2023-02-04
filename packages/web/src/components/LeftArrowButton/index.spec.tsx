import { render, screen } from "@testing-library/react";
import LeftArrowButton from ".";

describe("LeftArrowButton", () => {
	it("should render without errors", () => {
		render(<LeftArrowButton onClick={jest.fn} />);
	});

	it("should call onClick function when user click on button", () => {
		const fakeOnClick = jest.fn();
		render(<LeftArrowButton onClick={fakeOnClick} />);

		const leftArrowButton = screen.getByRole("button");

		leftArrowButton.click();

		expect(fakeOnClick).toHaveBeenCalled();
		expect(fakeOnClick).toHaveBeenCalledTimes(1);
	});

	it("should receive valid class name", () => {
		render(
			<LeftArrowButton onClick={jest.fn} className="fake-css-class" />
		);

		const leftArrowButton = screen.getByRole("button");

		expect(leftArrowButton).toHaveClass("fake-css-class");
	});
});
