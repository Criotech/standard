import { render, screen } from "@testing-library/react";
import Select, { Props } from "./index";

jest.mock("antd", () => ({
	Select: ({ className, defaultValue }: Props) => (
		<>
			<select className={className} data-testid="fakeAntSelect" />
			<div data-testid="defaultValue">{defaultValue}</div>
		</>
	),
}));

jest.mock("../../icons/DropdownIcon", () => ({
	__esModule: true,
	default: () => <span data-testid="dropdown-icon" />,
}));

jest.mock("../../icons/MagnifyingGlassIcon", () => ({
	__esModule: true,
	default: () => <span data-testid="maginifying-glass-icon" />,
}));

describe("Select", () => {
	it("should render without errors", () => {
		render(<Select />);
	});

	it("should send the attributes to the select component", () => {
		const defaultValue = "testValue";
		render(<Select defaultValue={defaultValue} />);
		const defaultValueDiv = screen.getByTestId("defaultValue");
		expect(defaultValueDiv).toBeInTheDocument();
		expect(defaultValueDiv).toHaveTextContent(defaultValue);
	});

	it("should include style", () => {
		render(<Select />);
		const select = screen.getByTestId("fakeAntSelect");
		expect(select).toHaveClass("acuvue-select");
	});

	it("should keep original className", () => {
		render(<Select className="class2 class3" />);
		const select = screen.getByTestId("fakeAntSelect");
		expect(select).toHaveClass("acuvue-select", "class2", "class3");
	});
});
