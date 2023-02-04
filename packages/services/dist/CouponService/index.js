import { HttpStatus } from "../HTTPService/HttpStatus";
import { getConfig } from "../ConfigService";
import { GlobalError } from "../errors/GlobalError";
import { HTTPService } from "..";
import axios from "axios";
const { isAxiosError } = axios;
export const redeemCoupon = async (couponCode, sessionToken) => {
    const config = getConfig();
    const payload = {
        couponCode: couponCode,
        region: `${config?.region}`,
    };
    try {
        await HTTPService.post("redeem-coupon-code", payload, sessionToken);
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.BAD_REQUEST &&
            error.response.data.globalError) {
            throw new GlobalError(error.response.data.globalError);
        }
        throw error;
    }
};
export const getUserCoupons = async (sessionToken) => {
    const { data: coupons } = await HTTPService.get(`user/coupons`, sessionToken);
    return coupons;
};
export const checkoutAcuvueCoupons = async (payload, sessionToken) => {
    try {
        await HTTPService.post("coupon-store/acuvue/checkout", payload, sessionToken);
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.CONFLICT &&
            error.response.data.globalError) {
            throw new GlobalError(error.response.data.globalError);
        }
        throw error;
    }
};
export const getAcuvueCoupons = async (sessionToken) => {
    const config = getConfig();
    const { data: couponStores } = await HTTPService.get(`coupon-store/acuvue?region=${config?.region}`, sessionToken);
    return couponStores;
};
export const getLifestyleCoupons = async (sessionToken) => {
    const config = getConfig();
    const { data: lifestyleCoupons } = await HTTPService.get(`coupon-store/lifestyle?region=${config?.region}`, sessionToken);
    return lifestyleCoupons;
};
export const checkoutLifestyleCoupons = async (payload, sessionToken) => {
    try {
        await HTTPService.post("coupon-store/lifestyle/checkout", payload, sessionToken);
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.CONFLICT &&
            error.response.data.globalError) {
            throw new GlobalError(error.response.data.globalError);
        }
        throw error;
    }
};
