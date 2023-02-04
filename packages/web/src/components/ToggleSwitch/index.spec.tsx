import { render, screen } from "@testing-library/react";
import ToggleSwitch from ".";
import { Switch as AntSwitch } from "antd";
import { ComponentProps } from "react";

jest.mock("antd", () => ({
	Switch: ({
		disabled,
		checked,
		onChange,
	}: ComponentProps<typeof AntSwitch>) => (
		<input
			data-testid="switch"
			onChange={onChange as any}
			checked={checked}
			disabled={disabled}
		/>
	),
}));

describe("ToggleSwitch", () => {
	it("should render without errors", () => {
		render(<ToggleSwitch onChange={jest.fn()} />);
	});

	it("should render disabled attribute when disabled prop is passed as true", () => {
		render(<ToggleSwitch onChange={jest.fn()} disabled />);
		const switchElement = screen.getByTestId("switch");
		expect(switchElement).toHaveAttribute("disabled");
	});

	it("should have checked attribute when checked prop is passed as true", () => {
		render(<ToggleSwitch onChange={jest.fn()} checked />);
		const switchElement = screen.getByTestId("switch");
		expect(switchElement).toHaveAttribute("checked");
	});
});
