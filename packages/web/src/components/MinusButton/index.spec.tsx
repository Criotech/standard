import { render, screen } from "@testing-library/react";
import MinusButton from "./index";
import CircleButton from "../CircleButton";
import { ComponentProps } from "react";

jest.mock("../CircleButton", () => ({
	__esModule: true,
	default: ({
		children,
		onClick,
		className,
		disabled,
	}: ComponentProps<typeof CircleButton>) => (
		<button
			data-testid="circle-button"
			onClick={onClick}
			disabled={disabled}
			className={className}
		>
			{children}
		</button>
	),
}));

describe("MinusButton", () => {
	it("should render without errors", () => {
		render(<MinusButton />);
	});

	it("should have default minus-button class", () => {
		render(<MinusButton />);
		const button = screen.getByTestId("circle-button");
		expect(button).toHaveClass("minus-button");
	});

	it("should fire the click event when clicked if not disabled", () => {
		const clickEvent = jest.fn();
		render(<MinusButton onClick={clickEvent} />);
		const button = screen.getByTestId("circle-button");
		button.click();
		expect(clickEvent).toHaveBeenCalled();
	});
});
