import { render, screen } from "@testing-library/react";
import CircleButton from "./index";
import { ComponentProps } from "react";
import Button from "../Button";

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
		size,
		className,
		type,
	}: ComponentProps<typeof Button>) => (
		<span data-testid="button" onClick={onClick} className={className}>
			{children}
		</span>
	),
}));

describe("CircleButton", () => {
	it("should render without errors", () => {
		render(<CircleButton />);
	});

	it("should have default acuvue-circle-button class", () => {
		render(<CircleButton />);
		const button = screen.getByTestId("button");
		expect(button).toHaveClass("acuvue-circle-button");
	});

	it("should fire the click event when clicked if not disabled", () => {
		const clickEvent = jest.fn();
		render(<CircleButton onClick={clickEvent} />);
		const button = screen.getByTestId("button");
		button.click();
		expect(clickEvent).toHaveBeenCalled();
	});
});
