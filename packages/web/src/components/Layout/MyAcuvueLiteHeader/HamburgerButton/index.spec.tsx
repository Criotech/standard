import { render } from "@testing-library/react";
import HamburgerButton from "./index";

describe("HamburgerButton", () => {
	it("should render without errors", () => {
		render(<HamburgerButton isOpen onClick={jest.fn} />);
	});
});
