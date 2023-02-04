import { render } from "@testing-library/react";
import ChevronRightWithCircleIcon from ".";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("ChevronRightWithCircleIcon", () => {
	it("should render without errors", () => {
		render(<ChevronRightWithCircleIcon />);
	});
});
