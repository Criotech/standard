import { HTTPService } from "../index";
import { HttpStatus } from "../HTTPService/HttpStatus";
import { GlobalError } from "../errors/GlobalError";
import { InvalidFormSubmissionError } from "../errors/InvalidFormSubmissionError";
import axios from "axios";
const { isAxiosError } = axios;
const verify = async (data) => {
    const payload = {
        data,
    };
    try {
        await HTTPService.post("email/verify", payload);
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
const linkAccount = async (encodedDeviceToken, xiamToken) => {
    try {
        await HTTPService.post("email/link-account", encodedDeviceToken, xiamToken);
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.CONFLICT) {
            throw new GlobalError(error.response.data.globalError);
        }
        throw error;
    }
};
const sendVerificationLink = async (xiamToken) => {
    try {
        await HTTPService.post("email/send-verification-link", undefined, xiamToken);
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.CONFLICT) {
            throw new GlobalError(error.response.data.globalError);
        }
        throw error;
    }
};
const EmailService = {
    linkAccount,
    verify,
    sendVerificationLink,
};
export default EmailService;
