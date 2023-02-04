import { render } from "@testing-library/react";
import CircleDecorationIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("CircleDecorationIcon", () => {
	it("should render without errors", () => {
		render(<CircleDecorationIcon />);
	});
});
