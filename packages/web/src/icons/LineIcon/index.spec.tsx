import {
	screen,
	getByTestId,
	queryByTestId,
	render,
} from "@testing-library/react";
import LineIcon, { IconSize } from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("LineIcon", () => {
	it("should render without errors", () => {
		render(<LineIcon />);
	});

	it("should render with props", () => {
		render(<LineIcon />);
		const lineSvg = screen.queryByTestId("fakeAntIcon");
		expect(lineSvg).toBeInTheDocument();
	});
});
