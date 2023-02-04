import { render } from "@testing-library/react";
import LensesCaseInCircle from ".";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("LensesCaseInCircle", () => {
	it("should render without errors", () => {
		render(<LensesCaseInCircle />);
	});
});
