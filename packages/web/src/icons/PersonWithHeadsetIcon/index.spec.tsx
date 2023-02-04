import { render } from "@testing-library/react";
import PersonWithHeadsetIcon from ".";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("PersonWithHeadsetIcon", () => {
	it("should render without errors", () => {
		render(<PersonWithHeadsetIcon />);
	});
});
