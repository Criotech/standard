import { render } from "@testing-library/react";
import RewardsIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("RewardsIcon", () => {
	it("should render without errors", () => {
		render(<RewardsIcon />);
	});
});
