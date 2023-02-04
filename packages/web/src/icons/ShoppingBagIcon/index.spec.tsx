import { render } from "@testing-library/react";
import ShoppingBagIcon from ".";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("ShoppingBagIcon", () => {
	it("should render without errors", () => {
		render(<ShoppingBagIcon />);
	});
});
