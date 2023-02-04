import { render, screen } from "@testing-library/react";
import CustomModal, { Props } from "./index";

jest.mock("antd", () => ({
	Modal: ({ visible, className }: Props) => (
		<div data-testid="modal-test-id" className={className}>
			<div data-testid="visible-prop">
				{visible ? "isVisible" : "isNotVisible"}
			</div>
		</div>
	),
}));

describe("CustomModal", () => {
	it("should render without errors", () => {
		render(<CustomModal visible />);
	});

	it("should receive the visible props in the internal component", () => {
		render(<CustomModal visible />);
		const modal = screen.getByTestId("modal-test-id");
		expect(modal).toBeInTheDocument();
		expect(modal).toHaveTextContent("isVisible");
	});

	it("should have default custom-modal class", () => {
		render(<CustomModal visible data-testid="modal-test-id" />);
		const modal = screen.getByTestId("modal-test-id");
		expect(modal).toHaveClass("custom-modal");
	});
});
