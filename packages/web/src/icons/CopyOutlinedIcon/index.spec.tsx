import { render } from "@testing-library/react";
import CopyOutlinedIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("CopyOutlinedIcon", () => {
	it("should render without errors", () => {
		render(<CopyOutlinedIcon />);
	});
});
