import EnglishFontFamilies from "./EnglishFontFamilies";
import { render } from "@testing-library/react";

describe("EnglishFontFamilies", () => {
	it("should render without errors", () => {
		render(<EnglishFontFamilies />);
	});
});
