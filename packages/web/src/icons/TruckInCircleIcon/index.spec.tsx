import { render } from "@testing-library/react";
import TruckInCircleIcon from ".";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("TruckInCircleIcon", () => {
	it("should render without errors", () => {
		render(<TruckInCircleIcon />);
	});
});
