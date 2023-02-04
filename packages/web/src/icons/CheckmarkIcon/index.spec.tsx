import { render } from "@testing-library/react";
import CheckmarkIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("CheckmarkIcon", () => {
	it("should render without errors", () => {
		render(<CheckmarkIcon />);
	});
});
