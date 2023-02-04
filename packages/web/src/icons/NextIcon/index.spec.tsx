import { render } from "@testing-library/react";
import CalendarIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("CalendarIcon", () => {
	it("should render without errors", () => {
		render(<CalendarIcon />);
	});
});
