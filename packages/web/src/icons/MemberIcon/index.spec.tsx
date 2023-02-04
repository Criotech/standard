import { render } from "@testing-library/react";
import MemberIcon from ".";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("MemberIcon", () => {
	it("should render without errors", () => {
		render(<MemberIcon />);
	});
});
