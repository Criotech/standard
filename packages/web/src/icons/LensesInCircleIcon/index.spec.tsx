import { render } from "@testing-library/react";
import LensesInCircleIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("LensesInCircleIcon", () => {
	it("should render without errors", () => {
		render(<LensesInCircleIcon />);
	});
});
