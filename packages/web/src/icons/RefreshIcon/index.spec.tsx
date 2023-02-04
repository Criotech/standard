import { render } from "@testing-library/react";
import RefreshIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("RefreshIcon", () => {
	it("should render without errors", () => {
		render(<RefreshIcon />);
	});
});
