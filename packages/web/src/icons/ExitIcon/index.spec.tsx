import { render } from "@testing-library/react";
import ExitIcon from ".";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("ExitIcon", () => {
	it("should render without errors", () => {
		render(<ExitIcon />);
	});
});
