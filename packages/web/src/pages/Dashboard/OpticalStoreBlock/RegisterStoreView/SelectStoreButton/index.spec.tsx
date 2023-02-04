import { render, screen } from "@testing-library/react";
import SelectStoreButton from "./index";
import CircleButton from "../../../../../components/CircleButton";
import { ComponentProps } from "react";
import Text from "../../../../../components/Text";

jest.mock("../../../../../components/CircleButton", () => ({
	__esModule: true,
	default: ({
		children,
		onClick,
		disabled,
		className,
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

jest.mock("../../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => (
		<span data-testid="text">{textKey}</span>
	),
}));

describe("SelectStoreButton", () => {
	it("should render without errors", () => {
		render(<SelectStoreButton onClick={jest.fn()} />);
	});

	it("should fire the click event when clicked if not disabled", () => {
		const clickEvent = jest.fn();
		render(<SelectStoreButton onClick={clickEvent} />);
		const button = screen.getByTestId("circle-button");
		button.click();
		expect(clickEvent).toHaveBeenCalled();
	});

	it("should render provided text prop", () => {
		render(<SelectStoreButton onClick={jest.fn()} />);
		const text = screen.getByTestId("text");
		expect(text).toHaveTextContent(
			"dashboardPage.opticalStore.selectStoreButton"
		);
	});
});
