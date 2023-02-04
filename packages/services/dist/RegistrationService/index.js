import { HTTPService } from "../index";
import { GlobalError } from "../errors/GlobalError";
import { InvalidFormSubmissionError } from "../errors/InvalidFormSubmissionError";
import { HttpStatus } from "../HTTPService/HttpStatus";
import StringService from "../StringService";
import JsonWebTokenService from "../JsonWebTokenService";
import { getConfig } from "../ConfigService";
const configuration = getConfig();
import axios from "axios";
const { isAxiosError } = axios;
export const register = async (phone, deviceId, language) => {
    const payload = {
        phone: configuration.countryPhoneCode + phone,
        deviceType: "web",
        language,
        region: configuration.region,
        deviceId,
    };
    try {
        await HTTPService.post("register", payload);
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.BAD_REQUEST) {
            throw new InvalidFormSubmissionError(error.response.data.payloadErrors);
        }
        else if (isAxiosError(error) &&
            error.response?.status === HttpStatus.CONFLICT) {
            throw new GlobalError(error.response.data.globalError);
        }
        else {
            throw error;
        }
    }
};
const OTP_NUMBER_LENGTH = 4;
export const isValidOtp = (otp) => {
    return otp.length === OTP_NUMBER_LENGTH && StringService.isOnlyDigits(otp);
};
export const validateOtp = async (phone, deviceId, otp, language, sessionToken = null) => {
    const payload = {
        phone: configuration.countryPhoneCode + phone,
        otp,
        language,
        deviceId,
        deviceType: "web",
    };
    try {
        const { data: { isExistingUser, deviceToken: deviceTokenString }, } = await HTTPService.post("validate-otp", payload, sessionToken);
        const deviceToken = JsonWebTokenService.parse(deviceTokenString);
        return { isExistingUser, deviceToken };
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.BAD_REQUEST) {
            throw new InvalidFormSubmissionError(error.response.data.payloadErrors);
        }
        throw error;
    }
};
export const getPrivacyPolicy = async (language) => {
    const url = "privacy-policy?language=" + language;
    const response = await HTTPService.get(url);
    return response;
};
export const acceptLegalTerms = async (deviceId, deviceToken) => {
    const payload = {
        deviceId,
    };
    try {
        const response = await HTTPService.post("accept-legal-terms", payload, deviceToken);
        return response.data;
    }
    catch (error) {
        throw error;
    }
};
export const resendOtp = async (phone, deviceId, language, sessionToken) => {
    const payload = {
        phone: configuration.countryPhoneCode + phone,
        deviceType: "web",
        language,
        region: configuration.region,
        deviceId,
    };
    try {
        await HTTPService.post("resend-otp", payload, sessionToken);
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.BAD_REQUEST) {
            throw new InvalidFormSubmissionError(error.response.data.payloadErrors);
        }
        throw new Error("Internal server error");
    }
};
export const registerPhone = async (phone, deviceId, language, countryPhoneCode, region, sessionToken = null) => {
    const payload = {
        phone: countryPhoneCode + phone,
        deviceType: "web",
        language,
        region,
        deviceId,
    };
    try {
        await HTTPService.post("register-phone", payload, sessionToken);
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.BAD_REQUEST) {
            throw new InvalidFormSubmissionError(error.response.data.payloadErrors);
        }
        throw error;
    }
};
