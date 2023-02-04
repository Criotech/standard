import { render } from "@testing-library/react";
import CrossedEyeIcon from ".";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("CrossedEyeIcon", () => {
	it("should render without errors", () => {
		render(<CrossedEyeIcon />);
	});
});
