import { render } from "@testing-library/react";
import BackToTopIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("BackToTopIcon", () => {
	it("should render without errors", () => {
		render(<BackToTopIcon />);
	});
});
