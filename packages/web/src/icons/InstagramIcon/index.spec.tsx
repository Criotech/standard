import { render } from "@testing-library/react";
import InstagramIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("InstagramIcon", () => {
	it("should render without errors", () => {
		render(<InstagramIcon />);
	});
});
