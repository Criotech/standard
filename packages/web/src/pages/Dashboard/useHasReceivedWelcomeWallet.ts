import { useMemo } from "react";
import { WalletCoupon } from "@myacuvue_thailand_web/services";

export const useHasReceivedWelcomeWallet = (
	userCoupons: WalletCoupon[] | undefined
): boolean => {
	const hasReceivedWelcomeWallet = useMemo(() => {
		if (!userCoupons) return false;

		const welcomeCoupons = userCoupons.filter(
			(coupon) => coupon.subType === "welcome"
		);
		return welcomeCoupons.length > 0;
	}, [userCoupons]);

	return hasReceivedWelcomeWallet;
};
