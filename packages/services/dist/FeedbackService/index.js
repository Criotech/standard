import { HTTPService } from "../index";
import { HttpStatus } from "../HTTPService/HttpStatus";
import { GlobalError } from "../errors/GlobalError";
import { InvalidFormSubmissionError } from "../errors/InvalidFormSubmissionError";
import axios from "axios";
const { isAxiosError } = axios;
const savePurchaseFeedback = async (purchaseId, payload, sessionToken) => {
    try {
        await HTTPService.post(`user/purchases/${purchaseId}/feedback`, payload, sessionToken);
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
const getLatestPurchase = async (sessionToken) => {
    try {
        const { data } = await HTTPService.get(`user/purchases/latest`, sessionToken);
        return data;
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.NOT_FOUND &&
            error.response.data.globalError) {
            throw new GlobalError(error.response.data.globalError);
        }
        throw error;
    }
};
const FeedbackService = {
    savePurchaseFeedback,
    getLatestPurchase,
};
export default FeedbackService;
