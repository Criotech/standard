import { render } from "@testing-library/react";
import ChevronLeftIcon from ".";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("ChevronLeftIcon", () => {
	it("should render without errors", () => {
		render(<ChevronLeftIcon />);
	});
});
