import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FindInput from ".";
import GenericInput from "../../../../../components/GenericInput";
import { ComponentProps } from "react";

jest.mock("../../../../../icons/MagnifyingGlassIcon", () => ({
	__esModule: true,
	default: () => <span data-testid="magnifying-glass-icon" />,
	IconSize: {
		SMALL: "16px",
	},
}));

jest.mock("../../../../../components/GenericInput", () => ({
	__esModule: true,
	default: ({
		placeholder,
		prefix,
		onChange,
	}: ComponentProps<typeof GenericInput>) => (
		<>
			<input
				data-testid="generic-input"
				placeholder={placeholder}
				onChange={(event) => {
					onChange(event.target.value);
				}}
			/>
			{prefix}
		</>
	),
}));

describe("FindInput", () => {
	it("should render without errors", () => {
		render(
			<FindInput
				name="findInput"
				placeholder="notProvided"
				label="notProvided"
				value=""
				onChange={jest.fn()}
			/>
		);
	});

	it("should render magnifying-glass icon", () => {
		render(
			<FindInput
				name="findInput"
				placeholder="notProvided"
				label="notProvided"
				value=""
				onChange={jest.fn()}
			/>
		);

		const magnifyingGlassIcon = screen.getByTestId("magnifying-glass-icon");
		expect(magnifyingGlassIcon).toBeInTheDocument();
	});

	it("should render input element", () => {
		render(
			<FindInput
				name="findInput"
				placeholder="notProvided"
				label="notProvided"
				value=""
				onChange={jest.fn()}
			/>
		);

		const input = screen.getByTestId("generic-input");
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("placeholder", "notProvided");
	});

	it("should call onChange with 'something' when user types 'something'", async () => {
		const mockOnChange = jest.fn();
		render(
			<FindInput
				name="findInput"
				placeholder="notProvided"
				label="notProvided"
				value=""
				onChange={mockOnChange}
			/>
		);

		const input = screen.getByTestId("generic-input");
		userEvent.type(input, "something");

		expect(mockOnChange).toHaveBeenCalledWith("something");
	});
});
