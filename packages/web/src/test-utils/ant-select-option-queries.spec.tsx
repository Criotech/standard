import { render, screen } from "./index";
import Select from "../components/Select";
import { Select as AntSelect } from "antd";
import { act, fireEvent, waitFor } from "@testing-library/react";

const { Option } = AntSelect;

it("should throw when calling getAntSelectOption and there is no ant select option present", async () => {
	render(<div />);
	expect(() => screen.getAntSelectOption()).toThrowError(
		"Could not find any element with the class .ant-select-item-option-content and name: undefined"
	);
});

it("should throw when calling getAntSelectOption(name) and there is no ant select option present", async () => {
	render(<div />);
	expect(() => screen.getAntSelectOption("my-name")).toThrowError(
		"Could not find any element with the class .ant-select-item-option-content and name: my-name"
	);
});

it("should throw when calling getAntSelectOption and there are multiple ant select options present", async () => {
	render(
		<Select>
			<Option value={1}>one</Option>
			<Option value={2}>two</Option>
		</Select>
	);

	act(() => {
		const select = screen.getAntSelect();
		fireEvent.mouseDown(select);
	});

	await waitFor(async () => {
		await expect(screen.queryByText("one")).toBeInTheDocument();
	});

	expect(() => screen.getAntSelectOption()).toThrowError(
		"Found multiple elements with the class .ant-select-item-option-content"
	);
});

it("should get the select option by name when calling getAntSelectOption(name)", async () => {
	render(
		<Select>
			<Option value={1}>one</Option>
			<Option value={2}>two</Option>
		</Select>
	);

	act(() => {
		const select = screen.getAntSelect();
		fireEvent.mouseDown(select);
	});

	await waitFor(async () => {
		await expect(screen.queryByText("one")).toBeInTheDocument();
	});

	const optionOne = screen.getAntSelectOption("one");
	expect(optionOne).toHaveClass("ant-select-item-option-content");
});
