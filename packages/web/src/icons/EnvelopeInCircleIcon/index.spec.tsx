import { render } from "@testing-library/react";
import EnvelopeInCircleIcon from ".";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("EnvelopeInCircleIcon", () => {
	it("should render without errors", () => {
		render(<EnvelopeInCircleIcon />);
	});
});
