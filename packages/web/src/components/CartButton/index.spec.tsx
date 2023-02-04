import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { LinkProps } from "react-router-dom";
import { Badge } from "antd";
import CartButton from "./index";
import { LifestyleCartContext } from "../../contexts/LifestyleCartContext";

jest.mock("react-router-dom", () => ({
	Link: ({ to, children }: LinkProps) => (
		<a href={to as string}>{children}</a>
	),
}));

jest.mock("@ant-design/icons", () => ({
	__esModule: true,
	default: () => <div data-testid="fakeAntCartIcon">Fake antd cart icon</div>,
}));

jest.mock("antd", () => ({
	Badge: ({ count, children }: ComponentProps<typeof Badge>) => (
		<div data-testid="fakeAntBadge">
			{children}
			<sup data-testid="fakeQuantityInCart">{count}</sup>
		</div>
	),
}));

describe("CartButton", () => {
	it("should render without errors", () => {
		render(<CartButton />);
	});

	it("should render the link with correct path", () => {
		render(<CartButton />);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/rewards-cart");
	});

	it("should render cart icon", () => {
		render(<CartButton />);
		const cartIcon = screen.getByTestId("fakeAntCartIcon");
		expect(cartIcon).toBeInTheDocument();
	});

	it("should render badge with quantity in cart", () => {
		const mockedQuantityInCart = 1;
		render(
			<LifestyleCartContext.Provider
				value={{
					incrementOnCart: jest.fn(),
					decrementOnCart: jest.fn(),
					removeFromCart: jest.fn(),
					clearCart: jest.fn(),
					quantityInCart: mockedQuantityInCart,
					cart: {},
				}}
			>
				<CartButton />
			</LifestyleCartContext.Provider>
		);

		const badge = screen.getByTestId("fakeAntBadge");
		expect(badge).toBeInTheDocument();

		const quantityInCart = screen.getByTestId("fakeQuantityInCart");
		expect(quantityInCart).toHaveTextContent(
			mockedQuantityInCart.toString()
		);
	});
});
