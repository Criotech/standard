import { render, screen } from "@testing-library/react";
import Checkbox, { Props } from "./index";

jest.mock("antd", () => ({
	Checkbox: ({ defaultChecked, className }: Props) => (
		<>
			<input
				type="checkbox"
				defaultChecked={defaultChecked}
				className={className}
				data-testid="fakeAntCheckbox"
			/>
		</>
	),
}));

describe("Checkbox", () => {
	it("should render without errors", () => {
		render(<Checkbox />);
	});

	it("should send the attributes to the inner checkbox", () => {
		render(<Checkbox defaultChecked />);
		const checkbox = screen.getByTestId("fakeAntCheckbox");
		expect(checkbox).toBeInTheDocument();
		expect(checkbox).toBeChecked();
	});

	it("should include style", () => {
		render(<Checkbox />);
		const checkbox = screen.getByTestId("fakeAntCheckbox");
		expect(checkbox).toHaveClass("acuvue-checkbox");
	});

	it("should keep original className", () => {
		render(<Checkbox className="test1 test3" />);
		const checkbox = screen.getByTestId("fakeAntCheckbox");
		expect(checkbox).toHaveClass("acuvue-checkbox", "test1", "test3");
	});
});
