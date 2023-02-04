import { HTTPService } from "../index";
import JsonWebTokenService from "../JsonWebTokenService";
import { InvalidFormSubmissionError } from "../errors/InvalidFormSubmissionError";
import { GlobalError } from "../errors/GlobalError";
import { HttpStatus } from "../HTTPService/HttpStatus";
import { getConfig } from "../ConfigService";
import axios from "axios";
const { isAxiosError } = axios;
const configuration = getConfig();
const register = async (requestData, sessionToken) => {
    try {
        const payload = {
            ...requestData,
            phone: configuration.countryPhoneCode + requestData.phone,
        };
        const { data } = await HTTPService.post("phone/register", payload, sessionToken);
        return data;
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.BAD_REQUEST) {
            throw new InvalidFormSubmissionError(error.response.data.payloadErrors);
        }
        throw error;
    }
};
const validateWithOtp = async (requestData) => {
    try {
        const payload = {
            ...requestData,
            phone: configuration.countryPhoneCode + requestData.phone,
        };
        const { data: { deviceToken: deviceTokenString }, } = await HTTPService.post("phone/validate", payload);
        return JsonWebTokenService.parse(deviceTokenString);
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.BAD_REQUEST) {
            throw new InvalidFormSubmissionError(error.response.data.payloadErrors);
        }
        throw error;
    }
};
const getConsents = async (deviceToken) => {
    try {
        const { data } = await HTTPService.get("phone/consents", deviceToken);
        return data;
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.BAD_REQUEST) {
            throw new InvalidFormSubmissionError(error.response.data.payloadErrors);
        }
        throw error;
    }
};
const saveConsents = async (deviceToken, data) => {
    try {
        await HTTPService.post("phone/consents", data, deviceToken);
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.REQUEST_TIMEOUT) {
            throw new GlobalError(error.response.data.globalError);
        }
        throw error;
    }
};
const PhoneService = {
    register,
    validateWithOtp,
    getConsents,
    saveConsents,
};
export default PhoneService;
