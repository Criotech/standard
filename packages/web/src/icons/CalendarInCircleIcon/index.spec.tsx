import { render } from "@testing-library/react";
import CalendarInCircleIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("CalendarInCircleIcon", () => {
	it("should render without errors", () => {
		render(<CalendarInCircleIcon />);
	});
});
