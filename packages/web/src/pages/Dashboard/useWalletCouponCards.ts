import { useMemo } from "react";
import { WalletCoupon } from "@myacuvue_thailand_web/services";

type WalletCouponCard = { imageUrl: string; title: string };

export const useWalletCouponCards = (
	userCoupons: WalletCoupon[] | undefined
): WalletCouponCard[] => {
	const walletCouponCards = useMemo<
		{ imageUrl: string; title: string }[]
	>(() => {
		const activeCoupons = userCoupons?.filter(
			(coupon) => coupon.status === "active"
		);

		if (activeCoupons) {
			return activeCoupons.map((coupon) => ({
				imageUrl: coupon.imageUrl,
				title: coupon.title,
			}));
		} else return [];
	}, [userCoupons]);

	return walletCouponCards;
};
