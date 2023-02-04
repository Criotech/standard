import { render } from "@testing-library/react";
import NonCrossedEyeIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("NonCrossedEyeIcon", () => {
	it("should render without errors", () => {
		render(<NonCrossedEyeIcon />);
	});
});
