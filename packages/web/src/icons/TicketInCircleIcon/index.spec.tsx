import { render } from "@testing-library/react";
import TicketInCircleIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("TicketInCircleIcon", () => {
	it("should render without errors", () => {
		render(<TicketInCircleIcon />);
	});
});
