import { render } from "@testing-library/react";
import HamburgerToggle from "./index";

describe("HamburgerToggle", () => {
	it("should render without errors", () => {
		render(<HamburgerToggle onClick={jest.fn} />);
	});
});
