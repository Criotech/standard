import { render } from "@testing-library/react";
import NonEmptyView from ".";
import { ComponentProps } from "react";
import WalletCarousel from "../WalletCarousel";

jest.mock("../WalletCarousel", () => ({
	__esModule: true,
	default: ({ slides }: ComponentProps<typeof WalletCarousel>) => (
		<span data-testid="wallet-carousel">{slides.length}</span>
	),
}));

jest.mock("../WalletCard", () => ({
	__esModule: true,
	default: () => <span data-testid="wallet-card" />,
}));

describe("NonEmptyView", () => {
	it("should render without errors", () => {
		render(<NonEmptyView cards={[]} />);
	});

	it("should render wallet carousel when is loading is false", () => {
		const { getByTestId } = render(<NonEmptyView cards={[]} />);

		const walletCarousel = getByTestId("wallet-carousel");

		expect(walletCarousel).toBeInTheDocument();
	});

	it("should receive correct number of cards props", () => {
		const { getByTestId } = render(
			<NonEmptyView
				cards={[
					{ imageUrl: "", title: "" },
					{ imageUrl: "", title: "" },
				]}
			/>
		);

		const carousel = getByTestId("wallet-carousel");

		expect(carousel).toHaveTextContent("2");
	});
});
