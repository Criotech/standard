import { render } from "@testing-library/react";
import DropdownIcon from ".";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("DropdownIcon", () => {
	it("should render without errors", () => {
		render(<DropdownIcon />);
	});
});
