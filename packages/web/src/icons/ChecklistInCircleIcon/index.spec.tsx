import { render } from "@testing-library/react";
import ChecklistInCircleIcon from ".";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("ChecklistInCircleIcon", () => {
	it("should render without errors", () => {
		render(<ChecklistInCircleIcon />);
	});
});
