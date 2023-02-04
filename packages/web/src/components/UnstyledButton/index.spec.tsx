import { render } from "@testing-library/react";
import UnstyledButton from "./index";

describe("UnstyledButton", () => {
	it("should render without errors", () => {
		render(<UnstyledButton onClick={jest.fn} />);
	});
});
