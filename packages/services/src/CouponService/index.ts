import { IAcuvueCouponCheckout } from "./IAcuvueCouponCheckout";
import { IAcuvueCoupon } from "./IAcuvueCoupon";
import { ILifestyleCoupon } from "./ILifestyleCoupon";
import { RedeemCouponPayload } from "./RedeemCouponPayload";
import { WalletCoupon } from "./WalletCoupon";
import { ILifestyleCouponCheckout } from "./ILifestyleCouponCheckout";
import { HttpStatus } from "../HTTPService/HttpStatus";
import { getConfig } from "../ConfigService";
import { GlobalError } from "../errors/GlobalError";
import { HTTPService } from "..";
import axios from "axios";

const { isAxiosError } = axios;

export const redeemCoupon = async (
	couponCode: string,
	sessionToken?: string
): Promise<void> => {
	const config = getConfig();
	const payload: RedeemCouponPayload = {
		couponCode: couponCode,
		region: `${config?.region}`,
	};

	try {
		await HTTPService.post("redeem-coupon-code", payload, sessionToken);
	} catch (error) {
		if (
			isAxiosError(error) &&
			error.response?.status === HttpStatus.BAD_REQUEST &&
			error.response.data.globalError
		) {
			throw new GlobalError(error.response.data.globalError);
		}
		throw error;
	}
};

export const getUserCoupons = async (
	sessionToken: string
): Promise<WalletCoupon[]> => {
	const { data: coupons } = await HTTPService.get<WalletCoupon[]>(
		`user/coupons`,
		sessionToken
	);
	return coupons;
};

export const checkoutAcuvueCoupons = async (
	payload: IAcuvueCouponCheckout,
	sessionToken?: string
): Promise<void> => {
	try {
		await HTTPService.post(
			"coupon-store/acuvue/checkout",
			payload,
			sessionToken
		);
	} catch (error) {
		if (
			isAxiosError(error) &&
			error.response?.status === HttpStatus.CONFLICT &&
			error.response.data.globalError
		) {
			throw new GlobalError(error.response.data.globalError);
		}
		throw error;
	}
};

export const getAcuvueCoupons = async (
	sessionToken: string
): Promise<IAcuvueCoupon[]> => {
	const config = getConfig();
	const { data: couponStores } = await HTTPService.get<IAcuvueCoupon[]>(
		`coupon-store/acuvue?region=${config?.region}`,
		sessionToken
	);
	return couponStores;
};

export const getLifestyleCoupons = async (
	sessionToken: string
): Promise<ILifestyleCoupon[]> => {
	const config = getConfig();
	const { data: lifestyleCoupons } = await HTTPService.get<
		ILifestyleCoupon[]
	>(`coupon-store/lifestyle?region=${config?.region}`, sessionToken);
	return lifestyleCoupons;
};

export const checkoutLifestyleCoupons = async (
	payload: ILifestyleCouponCheckout,
	sessionToken: string
): Promise<void> => {
	try {
		await HTTPService.post(
			"coupon-store/lifestyle/checkout",
			payload,
			sessionToken
		);
	} catch (error) {
		if (
			isAxiosError(error) &&
			error.response?.status === HttpStatus.CONFLICT &&
			error.response.data.globalError
		) {
			throw new GlobalError(error.response.data.globalError);
		}
		throw error;
	}
};
