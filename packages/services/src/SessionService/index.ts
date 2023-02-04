import { HTTPService, ISessionToken } from "../index";
import { InvalidFormSubmissionError } from "../errors/InvalidFormSubmissionError";
import { HttpStatus } from "../HTTPService/HttpStatus";
import JsonWebTokenService from "../JsonWebTokenService";
import axios from "axios";

const { isAxiosError } = axios;

const startSession = async (xiamToken: string): Promise<ISessionToken> => {
	try {
		const {
			data: { sessionToken: sessionTokenString },
		} = await HTTPService.post<{ sessionToken: string }>(
			"session/start",
			undefined,
			xiamToken
		);
		return JsonWebTokenService.parse<ISessionToken>(sessionTokenString);
	} catch (error) {
		if (
			isAxiosError(error) &&
			error.response?.status === HttpStatus.UNAUTHORIZED
		) {
			throw new InvalidFormSubmissionError(
				error.response.data.payloadErrors
			);
		}
		throw error;
	}
};

const SessionService = {
	startSession,
};

export default SessionService;
