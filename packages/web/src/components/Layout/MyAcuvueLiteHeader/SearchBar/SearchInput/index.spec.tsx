import { render, screen } from "@testing-library/react";
import SearchInput from ".";
import { ComponentProps } from "react";
import { Form, Input } from "antd";

jest.mock("../../../../../hooks/useText", () => ({
	useText: (key: string) => key,
}));

jest.mock("antd", () => ({
	Form: {
		Item: ({ children }: ComponentProps<typeof Form.Item>) => (
			<div data-testid="form">{children}</div>
		),
	},
	Input: ({ name, placeholder }: ComponentProps<typeof Input>) => (
		<div data-testid="input">
			<div data-testid="input-name">{name}</div>
			<div data-testid="input-placeholder">{placeholder}</div>
		</div>
	),
}));

describe("SearchInput", () => {
	it("should render without errors", () => {
		const fakeOnChange = jest.fn();
		render(
			<SearchInput
				name="search"
				value="fake value"
				onChange={fakeOnChange}
				placeholder="myacuvueLiteHeader.search.placeholder"
			/>
		);
	});

	it("should render input", () => {
		const fakeOnChange = jest.fn();
		render(
			<SearchInput
				name="search"
				value="fake value"
				onChange={fakeOnChange}
				placeholder="myacuvueLiteHeader.search.placeholder"
			/>
		);

		const input = screen.getByTestId("input");
		expect(input).toBeInTheDocument();
	});

	it("should render appropriate input name and placeholder props", () => {
		const fakeOnChange = jest.fn();
		render(
			<SearchInput
				name="search"
				value="fake value"
				onChange={fakeOnChange}
				placeholder="myacuvueLiteHeader.search.placeholder"
			/>
		);

		const inputName = screen.getByTestId("input-name");
		expect(inputName).toBeInTheDocument();

		const inputPlaceholder = screen.getByTestId("input-placeholder");
		expect(inputPlaceholder).toBeInTheDocument();
		expect(inputPlaceholder).toHaveTextContent(
			"myacuvueLiteHeader.search.placeholder"
		);
	});
});
