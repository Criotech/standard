import { HTTPService, InvalidFormSubmissionError, ProfileCompleteness, HttpStatus, ConfigService, } from "../index";
import { GlobalError } from "../errors/GlobalError";
import axios from "axios";
const { isAxiosError } = axios;
const saveProfile = async (sessionToken, payload) => {
    try {
        await HTTPService.patch("user/profile", payload, sessionToken);
    }
    catch (error) {
        if (isAxiosError(error) && error.response?.status === 400) {
            throw new InvalidFormSubmissionError(error.response.data.payloadErrors);
        }
    }
};
const getProfile = async (sessionToken) => {
    const { data } = await HTTPService.get("user/profile", sessionToken);
    return data;
};
const getProfileCompleteness = (profile) => {
    const mandatoryFields = ConfigService.getConfig().profileMandatoryFields;
    const isFullyFilled = mandatoryFields
        .map((mandatoryField) => profile[mandatoryField])
        .every((field) => {
        const isFieldUndefined = field === undefined;
        const isFieldNull = field === null;
        const isFieldEmptyString = field === "";
        return !isFieldUndefined && !isFieldNull && !isFieldEmptyString;
    });
    if (isFullyFilled) {
        return ProfileCompleteness.COMPLETE;
    }
    else {
        return ProfileCompleteness.INCOMPLETE;
    }
};
export const updateAuthenticationDone = async (sessionToken) => {
    await HTTPService.post("user/authentication/done", {}, sessionToken);
};
export const generatePromocode = async (sessionToken) => {
    try {
        const { data } = await HTTPService.post("user/promocode/generate", {}, sessionToken);
        return data;
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.CONFLICT) {
            throw new GlobalError(error.response.data.globalError);
        }
        throw error;
    }
};
const getPromocode = async (sessionToken) => {
    try {
        const { data } = await HTTPService.get("user/promocode/active", sessionToken);
        return data;
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.NOT_FOUND) {
            if (error.response.data.globalError) {
                throw new GlobalError(error.response.data.globalError);
            }
        }
        throw error;
    }
};
const UserService = {
    getProfile,
    saveProfile,
    getProfileCompleteness,
    updateAuthenticationDone,
    getPromocode,
    generatePromocode,
};
export default UserService;
