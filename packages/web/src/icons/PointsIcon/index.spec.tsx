import { render } from "@testing-library/react";
import PointsIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("PointsIcon", () => {
	it("should render without errors", () => {
		render(<PointsIcon />);
	});
});
