import {
	IPhoneRegisterRequest,
	ListConsentsResponseBody,
	SaveConsentsRequestBody,
	IPhoneValidationRequest,
	IPhoneValidationResponse,
} from "./types";
import { HTTPService } from "../index";
import JsonWebTokenService from "../JsonWebTokenService";
import { IDeviceToken } from "../JsonWebTokenService/types";
import { InvalidFormSubmissionError } from "../errors/InvalidFormSubmissionError";
import { GlobalError } from "../errors/GlobalError";
import { HttpStatus } from "../HTTPService/HttpStatus";
import { getConfig } from "../ConfigService";
import axios from "axios";

const { isAxiosError } = axios;

const configuration = getConfig();

const register = async (
	requestData: IPhoneRegisterRequest,
	sessionToken?: string
): Promise<IPhoneRegisterRequest | null> => {
	try {
		const payload = {
			...requestData,
			phone: configuration!.countryPhoneCode + requestData.phone,
		};
		const { data } = await HTTPService.post<IPhoneRegisterRequest>(
			"phone/register",
			payload,
			sessionToken
		);
		return data;
	} catch (error) {
		if (
			isAxiosError(error) &&
			error.response?.status === HttpStatus.BAD_REQUEST
		) {
			throw new InvalidFormSubmissionError(
				error.response.data.payloadErrors
			);
		}
		throw error;
	}
};

const validateWithOtp = async (
	requestData: IPhoneValidationRequest
): Promise<IDeviceToken | null> => {
	try {
		const payload = {
			...requestData,
			phone: configuration!.countryPhoneCode + requestData.phone,
		};
		const {
			data: { deviceToken: deviceTokenString },
		} = await HTTPService.post<IPhoneValidationResponse>(
			"phone/validate",
			payload
		);

		return JsonWebTokenService.parse<IDeviceToken>(deviceTokenString);
	} catch (error) {
		if (
			isAxiosError(error) &&
			error.response?.status === HttpStatus.BAD_REQUEST
		) {
			throw new InvalidFormSubmissionError(
				error.response.data.payloadErrors
			);
		}
		throw error;
	}
};

const getConsents = async (
	deviceToken: string
): Promise<ListConsentsResponseBody> => {
	try {
		const { data } = await HTTPService.get<ListConsentsResponseBody>(
			"phone/consents",
			deviceToken
		);
		return data;
	} catch (error) {
		if (
			isAxiosError(error) &&
			error.response?.status === HttpStatus.BAD_REQUEST
		) {
			throw new InvalidFormSubmissionError(
				error.response.data.payloadErrors
			);
		}
		throw error;
	}
};

const saveConsents = async (
	deviceToken: string,
	data: SaveConsentsRequestBody
): Promise<void> => {
	try {
		await HTTPService.post("phone/consents", data, deviceToken);
	} catch (error) {
		if (
			isAxiosError(error) &&
			error.response?.status === HttpStatus.REQUEST_TIMEOUT
		) {
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
