import { render } from "@testing-library/react";
import FacebookIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("FacebookIcon", () => {
	it("should render without errors", () => {
		render(<FacebookIcon />);
	});
});
