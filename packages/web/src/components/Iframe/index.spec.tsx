import { render, screen } from "@testing-library/react";
import Iframe from "./index";

describe("Iframe", () => {
	it("should render without errors", () => {
		const url = "https://example.org";
		render(<Iframe url={url} />);
	});

	it("should render src attribute with url", () => {
		const url = "https://example.org";
		render(<Iframe url={url} />);
		const iFrame = screen.getByTitle("MyAcuvue");
		expect(iFrame).toHaveAttribute("src", "https://example.org");
	});
});
