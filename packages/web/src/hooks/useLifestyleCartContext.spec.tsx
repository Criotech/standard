import { renderHook, act, cleanup } from "@testing-library/react-hooks";
import { useLifestyleCartContext } from "./useLifestyleCartContext";
import { LifestyleCartProvider } from "../contexts/LifestyleCartContext";
import { ComponentProps } from "react";

describe("useLifestyleCartContext", () => {
	it("should have correct default values when there is no provider", async () => {
		const { result } = renderHook(() => useLifestyleCartContext());

		act(() => {
			result.current.incrementOnCart("id1");
			result.current.decrementOnCart("id1");
			result.current.removeFromCart("id1");
			result.current.clearCart();
		});

		expect(result.current.cart).toStrictEqual({});
		expect(result.current.quantityInCart).toStrictEqual(0);
		await cleanup();
	});

	it("should start with empty cart", async () => {
		const { result } = renderHook(() => useLifestyleCartContext(), {
			wrapper: ({
				children,
			}: ComponentProps<typeof LifestyleCartProvider>) => (
				<LifestyleCartProvider>{children}</LifestyleCartProvider>
			),
		});

		expect(result.current.cart).toStrictEqual({});
		await cleanup();
	});

	it("should clear the cart", async () => {
		const { result } = renderHook(() => useLifestyleCartContext(), {
			wrapper: ({
				children,
			}: ComponentProps<typeof LifestyleCartProvider>) => (
				<LifestyleCartProvider>{children}</LifestyleCartProvider>
			),
		});

		act(() => {
			result.current.incrementOnCart("id1");
			result.current.incrementOnCart("id2");
		});
		expect(result.current.cart).toStrictEqual({ id1: 1, id2: 1 });

		act(() => {
			result.current.clearCart();
		});
		expect(result.current.cart).toStrictEqual({});
	});

	it("should have 3 items in the cart after incrementing them", async () => {
		const { result } = renderHook(() => useLifestyleCartContext(), {
			wrapper: ({
				children,
			}: ComponentProps<typeof LifestyleCartProvider>) => (
				<LifestyleCartProvider>{children}</LifestyleCartProvider>
			),
		});

		act(() => {
			result.current.clearCart();
			result.current.incrementOnCart("id1");
			result.current.incrementOnCart("id2");
			result.current.incrementOnCart("id3");
			result.current.incrementOnCart("id3");
		});
		expect(result.current.cart).toStrictEqual({ id1: 1, id2: 1, id3: 2 });
	});

	it("should have only 1 item in the cart after incrementing them and decrementing one of them", async () => {
		const { result } = renderHook(() => useLifestyleCartContext(), {
			wrapper: ({
				children,
			}: ComponentProps<typeof LifestyleCartProvider>) => (
				<LifestyleCartProvider>{children}</LifestyleCartProvider>
			),
		});

		act(() => {
			result.current.clearCart();
			result.current.incrementOnCart("id1");
			result.current.incrementOnCart("id2");
			result.current.decrementOnCart("id2");
		});
		expect(result.current.cart).toStrictEqual({ id1: 1 });
	});

	it("should remove completely one specific id from cart", async () => {
		const { result } = renderHook(() => useLifestyleCartContext(), {
			wrapper: ({
				children,
			}: ComponentProps<typeof LifestyleCartProvider>) => (
				<LifestyleCartProvider>{children}</LifestyleCartProvider>
			),
		});

		act(() => {
			result.current.clearCart();
			result.current.incrementOnCart("id1");
			result.current.incrementOnCart("id2");
			result.current.incrementOnCart("id2");
			result.current.removeFromCart("id2");
		});
		expect(result.current.cart).toStrictEqual({ id1: 1 });
	});
});
