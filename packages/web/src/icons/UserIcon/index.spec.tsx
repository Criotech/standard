import { render } from "@testing-library/react";
import UserIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("UserIcon", () => {
	it("should render without errors", () => {
		render(<UserIcon />);
	});
});
