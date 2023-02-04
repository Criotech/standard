import { render, screen } from "@testing-library/react";
import QuantityInput, { IProps } from ".";
import { MinusButtonProps } from "../MinusButton";
import { PlusButtonWithCircleProps } from "../PlusButtonWithCircle";

jest.mock("../MinusButton", () => ({
	__esModule: true,
	default: ({ onClick, disabled }: MinusButtonProps) => (
		<button
			data-testid="minus-button"
			disabled={disabled}
			onClick={onClick}
		/>
	),
}));

jest.mock("../PlusButtonWithCircle", () => ({
	__esModule: true,
	default: ({ onClick, disabled }: PlusButtonWithCircleProps) => (
		<button
			data-testid="plus-button"
			disabled={disabled}
			onClick={onClick}
		/>
	),
}));

describe("QuantityInput", () => {
	const fixedProps: IProps = {
		value: 0,
		decrement: jest.fn(),
		increment: jest.fn(),
	};

	it("should render without error", async () => {
		render(<QuantityInput {...fixedProps} />);
	});

	it("should render minus button with disabled attribute when value is equal to min value", () => {
		render(<QuantityInput minValue={0} {...fixedProps} />);
		const minusButton = screen.getByTestId("minus-button");
		expect(minusButton).toHaveAttribute("disabled");
	});

	it("should render plus button with disabled attribute when value is equal to max value", () => {
		render(<QuantityInput maxValue={0} {...fixedProps} />);
		const plusButton = screen.getByTestId("plus-button");
		expect(plusButton).toHaveAttribute("disabled");
	});

	it("should call increment when plus button is clicked", () => {
		render(<QuantityInput {...fixedProps} />);
		const plusButton = screen.getByTestId("plus-button");
		plusButton.click();
		expect(fixedProps.increment).toHaveBeenCalled();
	});

	it("should call decrement if minus button is clicked", () => {
		render(<QuantityInput {...fixedProps} />);
		const minusButton = screen.getByTestId("minus-button");
		minusButton.click();
		expect(fixedProps.decrement).toHaveBeenCalled();
	});

	it("should not call decrement when minus button is clicked while value is equal to min value", () => {
		render(<QuantityInput minValue={0} {...fixedProps} />);
		const minusButton = screen.getByTestId("minus-button");
		minusButton.click();
		expect(fixedProps.decrement).not.toHaveBeenCalled();
	});
});
