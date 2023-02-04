import { HTTPService } from "../index";
import { InvalidFormSubmissionError } from "../errors/InvalidFormSubmissionError";
import { HttpStatus } from "../HTTPService/HttpStatus";
import JsonWebTokenService from "../JsonWebTokenService";
import axios from "axios";
const { isAxiosError } = axios;
const startSession = async (xiamToken) => {
    try {
        const { data: { sessionToken: sessionTokenString }, } = await HTTPService.post("session/start", undefined, xiamToken);
        return JsonWebTokenService.parse(sessionTokenString);
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.UNAUTHORIZED) {
            throw new InvalidFormSubmissionError(error.response.data.payloadErrors);
        }
        throw error;
    }
};
const SessionService = {
    startSession,
};
export default SessionService;
