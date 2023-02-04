import { render, screen } from "@testing-library/react";
import TextInput, { Props } from "./index";
import { FormItemProps } from "antd";

jest.mock("antd", () => ({
	Input: ({ defaultValue, id }: Props) => (
		<input
			type="text"
			id={id}
			defaultValue={defaultValue}
			data-testid="fakeAntInput"
		/>
	),
	Form: {
		Item: ({
			id,
			label,
			children,
			className,
			name,
			help,
		}: FormItemProps) => (
			<>
				<label
					htmlFor={id}
					data-testid="fakeLabel"
					className={className}
				>
					{label}
				</label>
				<div data-testid="fakeName">{name}</div>
				<div data-testid="fakeErrorMsg">{help}</div>
				{children}
			</>
		),
	},
}));

describe("TextInput", () => {
	it("should render without errors", () => {
		render(<TextInput />);
	});

	it("should send the attributes to the inner Input", () => {
		const inputValue = "input value";
		render(<TextInput defaultValue={inputValue} />);
		const input = screen.getByTestId("fakeAntInput");
		expect(input).toBeInTheDocument();
		expect(input).toHaveValue(inputValue);
	});

	it("should include style in the label", () => {
		render(<TextInput />);
		const label = screen.getByTestId("fakeLabel");
		expect(label).toHaveClass("acuvue-text-input");
	});

	it("should keep original className in the label", () => {
		render(<TextInput className="test1 test3" />);
		const label = screen.getByTestId("fakeLabel");
		expect(label).toHaveClass("acuvue-text-input", "test1", "test3");
	});

	it("should have label content", () => {
		const labelContent = "some label";
		render(<TextInput label={labelContent} />);
		const label = screen.getByTestId("fakeLabel");
		expect(label).toHaveTextContent(labelContent);
	});

	it("should have id in the label", () => {
		const id = "some id";
		render(<TextInput label="some label" id={id} />);
		const label = screen.getByTestId("fakeLabel");
		expect(label).toHaveAttribute("for", id);
	});

	it("should have name", () => {
		const name = "some name";
		render(<TextInput name={name} />);
		const nameElement = screen.getByTestId("fakeName");
		expect(nameElement).toHaveTextContent(name);
	});

	it("should display the error message", () => {
		const errorMessage = "some error";
		render(<TextInput errorMessage={errorMessage} />);
		const errorMessageElement = screen.getByTestId("fakeErrorMsg");
		expect(errorMessageElement).toHaveTextContent(errorMessage);
	});
});
