import { HTTPService } from "../index";
import { HttpStatus } from "../HTTPService/HttpStatus";
import { GlobalError } from "../errors/GlobalError";
import { IEmailVerifyPayload } from "./types";
import { InvalidFormSubmissionError } from "../errors/InvalidFormSubmissionError";
import axios from "axios";

const { isAxiosError } = axios;

const verify = async (data: string) => {
	const payload: IEmailVerifyPayload = {
		data,
	};
	try {
		await HTTPService.post("email/verify", payload);
	} catch (error) {
		if (
			isAxiosError(error) &&
			error.response?.status === HttpStatus.BAD_REQUEST
		) {
			throw new InvalidFormSubmissionError(
				error.response.data.payloadErrors
			);
		} else if (
			isAxiosError(error) &&
			error.response?.status === HttpStatus.CONFLICT
		) {
			throw new GlobalError(error.response.data.globalError);
		} else {
			throw error;
		}
	}
};

const linkAccount = async (
	encodedDeviceToken: string,
	xiamToken: string
): Promise<void> => {
	try {
		await HTTPService.post<string>(
			"email/link-account",
			encodedDeviceToken,
			xiamToken
		);
	} catch (error) {
		if (
			isAxiosError(error) &&
			error.response?.status === HttpStatus.CONFLICT
		) {
			throw new GlobalError(error.response.data.globalError);
		}
		throw error;
	}
};

const sendVerificationLink = async (xiamToken: string): Promise<void> => {
	try {
		await HTTPService.post(
			"email/send-verification-link",
			undefined,
			xiamToken
		);
	} catch (error) {
		if (
			isAxiosError(error) &&
			error.response?.status === HttpStatus.CONFLICT
		) {
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
