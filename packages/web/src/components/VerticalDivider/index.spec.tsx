import { render } from "@testing-library/react";
import VerticalDivider from "./index";

describe("VerticalDivider", () => {
	it("should render without errors", () => {
		render(<VerticalDivider />);
	});

	it("should have default acuvue-vertical-divider class", () => {
		const { container } = render(<VerticalDivider />);
		expect(container.firstChild).toHaveClass("acuvue-vertical-divider");
	});

	it("should allow custom className default acuvue-vertical-divider class", () => {
		const { container } = render(
			<VerticalDivider className="custom-divider" />
		);
		expect(container.firstChild).toHaveClass(
			"acuvue-vertical-divider",
			"custom-divider"
		);
	});
});
