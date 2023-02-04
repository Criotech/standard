import {
	HTTPService,
	InvalidFormSubmissionError,
	ProfileCompleteness,
	HttpStatus,
	ConfigService,
} from "../index";
import { UpdateProfilePayload } from "./UpdateProfilePayload";
import { IGetProfileResponse } from "./IGetProfileResponse";
import { GlobalError } from "../errors/GlobalError";
import { IPromocode } from "./IPromocode";
import axios from "axios";

const { isAxiosError } = axios;

const saveProfile = async (
	sessionToken: string,
	payload: UpdateProfilePayload
) => {
	try {
		await HTTPService.patch("user/profile", payload, sessionToken);
	} catch (error) {
		if (isAxiosError(error) && error.response?.status === 400) {
			throw new InvalidFormSubmissionError(
				error.response.data.payloadErrors
			);
		}
	}
};

const getProfile = async (
	sessionToken: string
): Promise<IGetProfileResponse> => {
	const { data } = await HTTPService.get<IGetProfileResponse>(
		"user/profile",
		sessionToken
	);
	return data;
};

const getProfileCompleteness = (
	profile: IGetProfileResponse
): ProfileCompleteness => {
	const mandatoryFields = ConfigService.getConfig()!.profileMandatoryFields;

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
	} else {
		return ProfileCompleteness.INCOMPLETE;
	}
};

export const updateAuthenticationDone = async (sessionToken: string) => {
	await HTTPService.post("user/authentication/done", {}, sessionToken);
};

export const generatePromocode = async (
	sessionToken: string
): Promise<IPromocode> => {
	try {
		const { data } = await HTTPService.post<IPromocode>(
			"user/promocode/generate",
			{},
			sessionToken
		);
		return data;
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

const getPromocode = async (sessionToken: string): Promise<IPromocode> => {
	try {
		const { data } = await HTTPService.get<IPromocode>(
			"user/promocode/active",
			sessionToken
		);
		return data;
	} catch (error) {
		if (
			isAxiosError(error) &&
			error.response?.status === HttpStatus.NOT_FOUND
		) {
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
