import HighlightedValue from ".";
import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import Text from "../Text";

jest.mock("../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

const fakeValue = 10;
const fakeTextKey = "cart.availablePoint";

describe("HighlightedValue", () => {
	it("should render without errors", () => {
		render(<HighlightedValue value={fakeValue} textKey={fakeTextKey} />);
	});

	it("should render fake value and text label for the value", () => {
		render(<HighlightedValue value={fakeValue} textKey={fakeTextKey} />);

		const value = screen.getByText(fakeValue);
		expect(value).toBeInTheDocument();

		const labelText = screen.getByText(fakeTextKey);
		expect(labelText).toBeInTheDocument();
	});
});
