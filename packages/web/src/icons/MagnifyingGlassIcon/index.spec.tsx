import { render } from "@testing-library/react";
import MagnifyingGlassIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("MagnifyingGlassIcon", () => {
	it("should render without errors", () => {
		render(<MagnifyingGlassIcon />);
	});
});
