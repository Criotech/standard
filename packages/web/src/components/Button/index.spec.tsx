import { render, screen } from "@testing-library/react";
import Button, { ButtonSize, ButtonType } from "./index";

describe("Button", () => {
	it("should render without errors", () => {
		render(<Button />);
	});

	describe("Button classes", () => {
		it("should have default acuvue-btn class", () => {
			render(<Button data-testid="aButton" />);
			const button = screen.getByTestId("aButton");
			expect(button).toHaveClass("acuvue-btn");
		});

		it("should have acuvue-btn-medium class if no size is defined", () => {
			render(<Button data-testid="aButton" />);
			const button = screen.getByTestId("aButton");
			expect(button).toHaveClass("acuvue-btn-medium");
		});

		it("should have acuvue-btn-primary class if no type is defined", () => {
			render(<Button data-testid="aButton" />);
			const button = screen.getByTestId("aButton");
			expect(button).toHaveClass("acuvue-btn-primary");
		});

		it("should have acuvue-btn-primary class for primary type", () => {
			render(<Button data-testid="aButton" type={ButtonType.PRIMARY} />);
			const button = screen.getByTestId("aButton");
			expect(button).toHaveClass("acuvue-btn-primary");
		});

		it("should have acuvue-btn-outline class for outline type", () => {
			render(<Button data-testid="aButton" type={ButtonType.OUTLINE} />);
			const button = screen.getByTestId("aButton");
			expect(button).toHaveClass("acuvue-btn-outline");
		});

		it("should have acuvue-btn-medium class for medium size", () => {
			render(<Button data-testid="aButton" size={ButtonSize.MEDIUM} />);
			const button = screen.getByTestId("aButton");
			expect(button).toHaveClass("acuvue-btn-medium");
		});

		it("should have acuvue-btn-small class for small size", () => {
			render(<Button data-testid="aButton" size={ButtonSize.SMALL} />);
			const button = screen.getByTestId("aButton");
			expect(button).toHaveClass("acuvue-btn-small");
		});

		it("should have multiple classes including the default and a custom", () => {
			render(
				<Button
					data-testid="aButton"
					size={ButtonSize.SMALL}
					type={ButtonType.OUTLINE}
					className="test-class"
				/>
			);
			const button = screen.getByTestId("aButton");
			expect(button).toHaveClass(
				"acuvue-btn",
				"acuvue-btn-small",
				"acuvue-btn-outline",
				"test-class"
			);
		});
	});

	it("should fire the click event when clicked", () => {
		const clickEvent = jest.fn();
		render(<Button data-testid="aButton" onClick={clickEvent} />);
		const button = screen.getByTestId("aButton");
		button.click();
		expect(clickEvent).toHaveBeenCalled();
	});
});
