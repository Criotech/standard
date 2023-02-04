import { render } from "@testing-library/react";
import PromotionIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("PromotionIcon", () => {
	it("should render without errors", () => {
		render(<PromotionIcon />);
	});
});
