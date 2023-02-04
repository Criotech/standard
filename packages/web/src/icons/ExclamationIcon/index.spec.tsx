import { render } from "@testing-library/react";
import ExclamationIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("ExclamationIcon", () => {
	it("should render without errors", () => {
		render(<ExclamationIcon />);
	});
});
