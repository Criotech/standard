import { render } from "@testing-library/react";
import TrashIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("TrashIcon", () => {
	it("should render without errors", () => {
		render(<TrashIcon />);
	});
});
