import { render } from "@testing-library/react";
import LocationIcon from "./index";

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntIcon">fake icon</div>,
}));

describe("LocationIcon", () => {
	it("should render without errors", () => {
		const onClick = jest.fn();
		render(<LocationIcon onClick={onClick} />);
	});
});
