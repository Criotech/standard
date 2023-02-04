import { render, screen } from "@testing-library/react";
import PlusButtonWithCircle from "./index";
import { ComponentProps } from "react";
import CircleButton from "../CircleButton";

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

describe("PlusButtonWithCircle", () => {
	it("should render without errors", () => {
		render(<PlusButtonWithCircle />);
	});

	it("should have default plus-button-with-circle class", () => {
		render(<PlusButtonWithCircle />);
		const button = screen.getByTestId("circle-button");
		expect(button).toHaveClass("plus-button-with-circle");
	});

	it("should fire the click event when clicked if not disabled", () => {
		const clickEvent = jest.fn();
		render(<PlusButtonWithCircle onClick={clickEvent} />);
		const button = screen.getByTestId("circle-button");
		button.click();
		expect(clickEvent).toHaveBeenCalled();
	});
});
