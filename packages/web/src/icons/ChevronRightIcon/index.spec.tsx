import { render } from "@testing-library/react";
import ChevronRightIcon from ".";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("ChevronRightIcon", () => {
	it("should render without errors", () => {
		render(<ChevronRightIcon />);
	});
});
