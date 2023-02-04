import { render, screen } from "@testing-library/react";
import GreenButton, { ButtonType } from "./index";

describe("GreenButton", () => {
	it("should render without errors", () => {
		render(<GreenButton />);
	});

	describe("GreenButton classes", () => {
		it("should have default acuvue-btn-primary class", () => {
			render(<GreenButton data-testid="aButton" />);
			const greenButton = screen.getByTestId("aButton");
			expect(greenButton).toHaveClass("acuvue-btn-primary");
		});

		it("should have acuvue-green-btn class if no type is defined", () => {
			render(<GreenButton data-testid="aButton" />);
			const greenButton = screen.getByTestId("aButton");
			expect(greenButton).toHaveClass("acuvue-green-btn");
		});

		it("should have acuvue-green-btn class for primary type", () => {
			render(
				<GreenButton data-testid="aButton" type={ButtonType.PRIMARY} />
			);
			const greenButton = screen.getByTestId("aButton");
			expect(greenButton).toHaveClass("acuvue-green-btn");
		});

		it("should have acuvue-btn-outline class for outline type", () => {
			render(
				<GreenButton data-testid="aButton" type={ButtonType.OUTLINE} />
			);
			const greenButton = screen.getByTestId("aButton");
			expect(greenButton).toHaveClass("acuvue-btn-outline");
		});
	});

	it("should fire the click event when clicked", () => {
		const clickEvent = jest.fn();
		render(<GreenButton data-testid="aButton" onClick={clickEvent} />);
		const greenButton = screen.getByTestId("aButton");
		greenButton.click();
		expect(clickEvent).toHaveBeenCalled();
	});
});
