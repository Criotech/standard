import { render } from "@testing-library/react";
import CartIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("CartIcon", () => {
	it("should render without errors", () => {
		render(<CartIcon />);
	});
});
