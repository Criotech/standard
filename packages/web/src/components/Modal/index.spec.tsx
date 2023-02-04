import { render, screen } from "@testing-library/react";
import Modal, { Props } from "./index";

jest.mock("antd", () => ({
	Modal: ({ visible, className }: Props) => (
		<div data-testid="fakeAntModal" className={className}>
			<div data-testid="fakeVisibleProp">
				{visible ? "true" : "false"}
			</div>
		</div>
	),
}));

describe("Modal", () => {
	it("should render without errors", () => {
		render(<Modal />);
	});

	it("should receive the visible props in the internal component", () => {
		render(<Modal visible />);
		const modal = screen.getByTestId("fakeAntModal");
		expect(modal).toBeInTheDocument();
		expect(modal).toHaveTextContent("true");
	});

	it("should include style", () => {
		render(<Modal />);
		const modal = screen.getByTestId("fakeAntModal");
		expect(modal).toHaveClass("acuvue-modal");
	});

	it("should keep original className", () => {
		render(<Modal className="test1 test3" />);
		const modal = screen.getByTestId("fakeAntModal");
		expect(modal).toHaveClass("acuvue-modal", "test1", "test3");
	});
});
