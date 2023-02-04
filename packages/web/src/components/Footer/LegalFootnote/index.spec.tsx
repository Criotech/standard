import { render, screen } from "@testing-library/react";
import LegalFootnote from ".";
import DisplayHTML from "../../DisplayHTML";
import { ComponentProps } from "react";

jest.mock("../../DisplayHTML", () => ({
	__esModule: true,
	default: ({ unsafeHTML }: ComponentProps<typeof DisplayHTML>) => (
		<div data-testid="display-html">{unsafeHTML}</div>
	),
}));

describe("LegalFootnote", () => {
	const fakeHtmlContent = "fake HTML content";

	it("should render without errors", () => {
		render(<LegalFootnote htmlContent={fakeHtmlContent} />);
	});

	it("should render html content", () => {
		render(<LegalFootnote htmlContent={fakeHtmlContent} />);

		const displayHtml = screen.getByTestId("display-html");
		expect(displayHtml).toBeInTheDocument();
		expect(displayHtml).toHaveTextContent(fakeHtmlContent);
	});
});
