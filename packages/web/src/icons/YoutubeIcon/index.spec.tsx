import { render } from "@testing-library/react";
import YouTubeIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("YouTubeIcon", () => {
	it("should render without errors", () => {
		render(<YouTubeIcon />);
	});
});
