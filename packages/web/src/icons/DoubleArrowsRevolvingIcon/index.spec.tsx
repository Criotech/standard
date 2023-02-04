import { render } from "@testing-library/react";
import DoubleArrowsRevolvingIcon from ".";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("DoubleArrowsRevolvingIcon", () => {
	it("should render without errors", () => {
		render(<DoubleArrowsRevolvingIcon />);
	});
});
