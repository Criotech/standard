import { render } from "@testing-library/react";
import LocationPinIcon from ".";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("LocationPinIcon", () => {
	it("should render without errors", () => {
		render(<LocationPinIcon />);
	});
});
