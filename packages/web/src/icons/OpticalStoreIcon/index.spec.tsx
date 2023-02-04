import { render } from "@testing-library/react";
import OpticalStoreIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("OpticalStoreIcon", () => {
	it("should render without errors", () => {
		render(<OpticalStoreIcon />);
	});
});
