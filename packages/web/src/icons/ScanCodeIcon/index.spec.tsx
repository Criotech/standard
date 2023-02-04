import { render } from "@testing-library/react";
import ScanCodeIcon from ".";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("ScanCodeIcon", () => {
	it("should render without errors", () => {
		render(<ScanCodeIcon />);
	});
});
