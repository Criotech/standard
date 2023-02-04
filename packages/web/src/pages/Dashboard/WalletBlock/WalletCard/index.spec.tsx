import WalletCard from "./index";
import { render } from "@testing-library/react";

describe("WalletCard", () => {
	it("should render without errors", () => {
		render(<WalletCard title="fake-title" imageUrl="fake-image-url" />);
	});

	it("should have wallet-card class name by default", () => {
		const { container } = render(
			<WalletCard title="fake-title" imageUrl="fake-image-url" />
		);

		expect(container.firstChild).toHaveClass("wallet-card");
	});

	it("should render wallet card image", () => {
		const { getByRole } = render(
			<WalletCard title="fake-title" imageUrl="fake-image-url" />
		);

		const image = getByRole("img");
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute("src", "fake-image-url");
	});
});
