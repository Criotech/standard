import { render } from "@testing-library/react";
import StoreIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("StoreIcon", () => {
	it("should render without errors", () => {
		render(<StoreIcon />);
	});
});
