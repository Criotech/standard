import { render } from "@testing-library/react";
import TrophyInCircleIcon from ".";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("TrophyInCircleIcon", () => {
	it("should render without errors", () => {
		render(<TrophyInCircleIcon />);
	});
});
