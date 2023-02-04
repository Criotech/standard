import { Language } from "../LanguageService/types";
import { HTTPService, IDeviceToken } from "../index";
import { GlobalError } from "../errors/GlobalError";
import { InvalidFormSubmissionError } from "../errors/InvalidFormSubmissionError";
import {
	RegisterPayload,
	OtpVerificationPayload,
	LegalTermsPayload,
	ResendOtpPayload,
} from "./types";
import {
	ValidateOtpApiResponse,
	ValidateOtpResponse,
} from "./ValidateOtpResponse";
import { HttpStatus } from "../HTTPService/HttpStatus";
import StringService from "../StringService";
import JsonWebTokenService from "../JsonWebTokenService";
import { getConfig } from "../ConfigService";
const configuration = getConfig();
import axios from "axios";

const { isAxiosError } = axios;

export const register = async (
	phone: string,
	deviceId: string,
	language: Language
) => {
	const payload: RegisterPayload = {
		phone: configuration!.countryPhoneCode + phone,
		deviceType: "web",
		language,
		region: configuration!.region,
		deviceId,
	};
	try {
		await HTTPService.post("register", payload);
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

const OTP_NUMBER_LENGTH = 4;
export const isValidOtp = (otp: string): boolean => {
	return otp.length === OTP_NUMBER_LENGTH && StringService.isOnlyDigits(otp);
};

export const validateOtp = async (
	phone: string,
	deviceId: string,
	otp: string,
	language: Language,
	sessionToken: string | null = null
): Promise<ValidateOtpResponse> => {
	const payload: OtpVerificationPayload = {
		phone: configuration!.countryPhoneCode + phone,
		otp,
		language,
		deviceId,
		deviceType: "web",
	};
	try {
		const {
			data: { isExistingUser, deviceToken: deviceTokenString },
		} = await HTTPService.post<ValidateOtpApiResponse>(
			"validate-otp",
			payload,
			sessionToken!
		);
		const deviceToken =
			JsonWebTokenService.parse<IDeviceToken>(deviceTokenString);
		return { isExistingUser, deviceToken };
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

export const getPrivacyPolicy = async (language: Language) => {
	const url = "privacy-policy?language=" + language;
	const response = await HTTPService.get(url);
	return response;
};

export const acceptLegalTerms = async (
	deviceId: string,
	deviceToken?: string
) => {
	const payload: LegalTermsPayload = {
		deviceId,
	};
	try {
		const response = await HTTPService.post(
			"accept-legal-terms",
			payload,
			deviceToken
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const resendOtp = async (
	phone: string,
	deviceId: string,
	language: Language,
	sessionToken?: string
): Promise<void> => {
	const payload: ResendOtpPayload = {
		phone: configuration!.countryPhoneCode + phone,
		deviceType: "web",
		language,
		region: configuration!.region,
		deviceId,
	};
	try {
		await HTTPService.post("resend-otp", payload, sessionToken);
	} catch (error) {
		if (
			isAxiosError(error) &&
			error.response?.status === HttpStatus.BAD_REQUEST
		) {
			throw new InvalidFormSubmissionError(
				error.response.data.payloadErrors
			);
		}

		throw new Error("Internal server error");
	}
};

export const registerPhone = async (
	phone: string,
	deviceId: string,
	language: Language,
	countryPhoneCode: string,
	region: string,
	sessionToken: string | null = null
): Promise<void> => {
	const payload: RegisterPayload = {
		phone: countryPhoneCode + phone,
		deviceType: "web",
		language,
		region,
		deviceId,
	};
	try {
		await HTTPService.post("register-phone", payload, sessionToken!);
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
