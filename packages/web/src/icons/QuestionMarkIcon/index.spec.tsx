import { render } from "@testing-library/react";
import QuestionMarkIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("QuestionMarkIcon", () => {
	it("should render without errors", () => {
		render(<QuestionMarkIcon />);
	});
});
