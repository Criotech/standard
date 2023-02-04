import { render } from "@testing-library/react";
import HomeIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("HomeIcon", () => {
	it("should render without errors", () => {
		render(<HomeIcon />);
	});
});
