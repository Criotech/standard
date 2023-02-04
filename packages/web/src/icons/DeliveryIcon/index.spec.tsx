import { render } from "@testing-library/react";
import DeliveryIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("DeliveryIcon", () => {
	it("should render without errors", () => {
		render(<DeliveryIcon />);
	});
});
