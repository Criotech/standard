import { render, screen } from "@testing-library/react";
import DisclaimerSection from ".";
import DisplayHTML from "../../DisplayHTML";
import { ComponentProps } from "react";

jest.mock("../../DisplayHTML", () => ({
	__esModule: true,
	default: ({ unsafeHTML }: ComponentProps<typeof DisplayHTML>) => (
		<div data-testid="display-html">{unsafeHTML}</div>
	),
}));

describe("DisclaimerSection", () => {
	const fakeHtmlContent = "fake HTML content";

	it("should render without errors", () => {
		render(<DisclaimerSection htmlContent={fakeHtmlContent} />);
	});

	it("should render html content", () => {
		render(<DisclaimerSection htmlContent={fakeHtmlContent} />);

		const displayHtml = screen.getByTestId("display-html");
		expect(displayHtml).toBeInTheDocument();
		expect(displayHtml).toHaveTextContent(fakeHtmlContent);
	});
});
