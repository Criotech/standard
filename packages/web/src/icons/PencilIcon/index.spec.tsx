import { render } from "@testing-library/react";
import PencilIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("PencilIcon", () => {
	it("should render without errors", () => {
		render(<PencilIcon />);
	});
});
