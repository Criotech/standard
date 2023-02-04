import {
	createContext,
	FC,
	PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useStorage } from "../hooks/useStorage";

interface ILifestyleCart {
	[couponId: string]: number;
}

export interface ILifestyleCartContext {
	incrementOnCart: (couponId: string) => void;
	decrementOnCart: (couponId: string) => void;
	removeFromCart: (couponId: string) => void;
	clearCart: () => void;
	quantityInCart: number;
	cart: ILifestyleCart;
}

export const LifestyleCartContext = createContext<ILifestyleCartContext>({
	incrementOnCart: () => null,
	decrementOnCart: () => null,
	removeFromCart: () => null,
	clearCart: () => null,
	quantityInCart: 0,
	cart: {},
});

export const LifestyleCartProvider: FC<PropsWithChildren<{}>> = ({
	children,
}) => {
	const [cartStorage, setCartStorage] = useStorage<ILifestyleCart>(
		"lifestyle-cart",
		{}
	);
	const [cart, setCart] = useState<ILifestyleCart>(cartStorage);

	useEffect(() => {
		setCartStorage(cart);
	}, [cart, setCartStorage]);

	const incrementOnCart = useCallback(
		(couponId: string) => {
			setCart((oldCart: ILifestyleCart) => {
				oldCart[couponId] = oldCart[couponId] || 0;
				oldCart[couponId] += 1;
				return { ...oldCart };
			});
		},
		[setCart]
	);

	const decrementOnCart = useCallback(
		(couponId: string) => {
			setCart((oldCart) => {
				if (oldCart[couponId]) {
					oldCart[couponId] -= 1;
					if (oldCart[couponId] <= 0) {
						delete oldCart[couponId];
					}
				}
				return { ...oldCart };
			});
		},
		[setCart]
	);

	const removeFromCart = useCallback(
		(couponId: string) => {
			setCart((oldCart) => {
				delete oldCart[couponId];
				return { ...oldCart };
			});
		},
		[setCart]
	);

	const quantityInCart = useMemo(() => {
		const cartKeys = Object.keys(cart);
		return cartKeys.reduce((accumulator, key) => {
			return accumulator + cart[key];
		}, 0);
	}, [cart]);

	const clearCart = useCallback(() => {
		setCart(() => ({}));
	}, [setCart]);

	return (
		<LifestyleCartContext.Provider
			value={{
				incrementOnCart,
				decrementOnCart,
				removeFromCart,
				clearCart,
				quantityInCart,
				cart,
			}}
		>
			{children}
		</LifestyleCartContext.Provider>
	);
};
