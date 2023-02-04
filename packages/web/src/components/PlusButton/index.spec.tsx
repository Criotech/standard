import { render, screen } from "@testing-library/react";
import PlusButton from "./index";
import Button from "../Button";
import { ComponentProps } from "react";

jest.mock("../Button", () => ({
	ButtonSize: {
		MEDIUM: "acuvue-btn-medium",
		SMALL: "acuvue-btn-small",
	},
	ButtonType: {
		PRIMARY: "acuvue-btn-primary",
		OUTLINE: "acuvue-btn-outline",
		NO_OUTLINE: "acuvue-btn-no-outline",
	},
	__esModule: true,
	default: ({
		children,
		onClick,
		className,
		disabled,
	}: ComponentProps<typeof Button>) => (
		<button
			data-testid="plus-button"
			onClick={onClick}
			disabled={disabled}
			className={className}
		>
			{children}
		</button>
	),
}));

describe("PlusButton", () => {
	it("should render without errors", () => {
		render(<PlusButton />);
	});

	it("should have default plus-button class", () => {
		render(<PlusButton />);
		const button = screen.getByTestId("plus-button");
		expect(button).toHaveClass("plus-button");
	});

	it("should fire the click event when clicked if not disabled", () => {
		const clickEvent = jest.fn();
		render(<PlusButton onClick={clickEvent} />);
		const button = screen.getByTestId("plus-button");
		button.click();
		expect(clickEvent).toHaveBeenCalled();
	});
});
