import { useCallback } from "react";
import { useAuthentication } from "./useAuthentication";
import { useLoading } from "./useLoading";
import {
	WalletCoupon,
	IAcuvueCoupon,
	ILifestyleCoupon,
	ILifestyleCouponCheckout,
	IAcuvueCouponCheckout,
} from "@myacuvue_thailand_web/services";
import { useService } from "./useService";

interface IUseCoupon {
	getUserCoupons: () => Promise<WalletCoupon[]>;
	getAcuvueCoupons: () => Promise<IAcuvueCoupon[]>;
	getLifestyleCoupons: () => Promise<ILifestyleCoupon[]>;
	checkoutAcuvueCoupons: (payload: IAcuvueCouponCheckout) => Promise<void>;
	checkoutLifestyleCoupons: (
		payload: ILifestyleCouponCheckout
	) => Promise<void>;
	redeemCoupon: (couponCode: string) => Promise<void>;
}

export const useCoupon = (): IUseCoupon => {
	const { CouponService } = useService();
	const { showLoading, hideLoading } = useLoading();
	const { sessionToken } = useAuthentication();

	const getUserCoupons = useCallback(async () => {
		showLoading();
		try {
			return CouponService.getUserCoupons(sessionToken?.rawValue!);
		} finally {
			hideLoading();
		}
	}, [sessionToken?.rawValue, showLoading, hideLoading, CouponService]);

	const getAcuvueCoupons = useCallback(async () => {
		showLoading();
		try {
			return CouponService.getAcuvueCoupons(sessionToken?.rawValue!);
		} finally {
			hideLoading();
		}
	}, [sessionToken?.rawValue, showLoading, hideLoading, CouponService]);

	const getLifestyleCoupons = useCallback(async () => {
		showLoading();
		try {
			return CouponService.getLifestyleCoupons(sessionToken?.rawValue!);
		} finally {
			hideLoading();
		}
	}, [sessionToken?.rawValue, showLoading, hideLoading, CouponService]);

	const checkoutAcuvueCoupons = useCallback(
		async (payload: IAcuvueCouponCheckout) => {
			showLoading();
			try {
				await CouponService.checkoutAcuvueCoupons(
					payload,
					sessionToken?.rawValue!
				);
			} finally {
				hideLoading();
			}
		},
		[sessionToken?.rawValue, showLoading, hideLoading, CouponService]
	);

	const checkoutLifestyleCoupons = useCallback(
		async (payload: ILifestyleCouponCheckout) => {
			showLoading();
			try {
				await CouponService.checkoutLifestyleCoupons(
					payload,
					sessionToken?.rawValue!
				);
			} finally {
				hideLoading();
			}
		},
		[sessionToken?.rawValue, showLoading, hideLoading, CouponService]
	);

	const redeemCoupon = useCallback(
		async (couponCode: string) => {
			showLoading();
			try {
				return await CouponService.redeemCoupon(
					couponCode,
					sessionToken?.rawValue
				);
			} finally {
				hideLoading();
			}
		},
		[sessionToken?.rawValue, showLoading, hideLoading, CouponService]
	);

	return {
		getUserCoupons,
		getAcuvueCoupons,
		getLifestyleCoupons,
		checkoutAcuvueCoupons,
		checkoutLifestyleCoupons,
		redeemCoupon,
	};
};
