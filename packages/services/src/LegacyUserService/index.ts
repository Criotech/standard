import { HTTPService } from "../index";
import { UpdateProfileRequest } from "./UpdateProfileRequest";
import { IUser } from "./types";
import {
	ListConsentsResponseBody,
	SaveConsentsRequestBody,
} from "../PhoneService/types";

const getUser = async (sessionToken: string): Promise<IUser> => {
	const { data } = await HTTPService.get<IUser>("profile", sessionToken);
	return data;
};

const updateProfile = async (
	sessionToken: string,
	data: UpdateProfileRequest
): Promise<void> => {
	await HTTPService.patch("profile", data, sessionToken);
};

const getConsents = async (
	sessionToken: string
): Promise<ListConsentsResponseBody> => {
	try {
		const { data } = await HTTPService.get<ListConsentsResponseBody>(
			"user/consents",
			sessionToken
		);
		return data;
	} catch (error) {
		throw error;
	}
};

const saveConsents = async (
	sessionToken: string,
	data: SaveConsentsRequestBody
): Promise<void> => {
	await HTTPService.post("user/consents", data, sessionToken);
};

const LegacyUserService = {
	getUser,
	updateProfile,
	getConsents,
	saveConsents,
};

export default LegacyUserService;
