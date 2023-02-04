import { render, screen } from "@testing-library/react";
import LinkButton from "./index";

describe("LinkButton", () => {
	it("should render without errors", async () => {
		render(<LinkButton>click me</LinkButton>);
	});

	it("should receive onClick events", async () => {
		const handleClick = jest.fn();
		render(<LinkButton onClick={handleClick}>click me</LinkButton>);

		const button = screen.getByText("click me");
		button.click();
		expect(handleClick).toHaveBeenCalled();
	});

	it("should accept additional custom classes", async () => {
		const { container } = render(
			<LinkButton className="custom-1 custom-2">click me</LinkButton>
		);

		expect(container.firstChild).toHaveClass("acuvue-link-button");
		expect(container.firstChild).toHaveClass("custom-1");
		expect(container.firstChild).toHaveClass("custom-2");
	});
});
