import { getConfig } from "../ConfigService";
import { HttpStatus } from "../HTTPService/HttpStatus";
import { HTTPService, } from "../index";
import axios from "axios";
const { isAxiosError } = axios;
const configuration = getConfig();
export const getStates = async (sessionToken) => {
    const { data } = await HTTPService.get(`states?region=${configuration?.region}`, sessionToken);
    return data;
};
export const saveMailingAddress = async (payload, sessionToken) => {
    const mailingAddressPayload = {
        ...payload,
        countryCode: configuration?.region,
    };
    await HTTPService.patch("user/address/MAILING", mailingAddressPayload, sessionToken);
};
export const getMailingAddress = async (sessionToken) => {
    try {
        const { data } = await HTTPService.get("user/address/MAILING", sessionToken);
        return data;
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.NOT_FOUND) {
            return undefined;
        }
        throw error;
    }
};
export const getShippingAddress = async (sessionToken) => {
    try {
        const { data } = await HTTPService.get("user/address/SHIPPING", sessionToken);
        return data;
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.NOT_FOUND) {
            return null;
        }
        throw error;
    }
};
export const saveShippingAddress = async (payload, sessionToken) => {
    const { data } = await HTTPService.patch("user/address/SHIPPING", payload, sessionToken);
    return data;
};
