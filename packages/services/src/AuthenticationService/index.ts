import { IDeviceToken, ISessionToken } from "../index";
import { post } from "../HTTPService";
import JsonWebTokenService from "../JsonWebTokenService";

export const getSessionToken = async (
	deviceToken: string
): Promise<ISessionToken> => {
	const {
		data: { sessionToken: sessionTokenString },
	} = await post<{ sessionToken: string }>("session-token", {}, deviceToken);
	return JsonWebTokenService.parse<ISessionToken>(sessionTokenString);
};

export const refreshSessionToken = async (
	sessionToken: string
): Promise<ISessionToken> => {
	const {
		data: { sessionToken: newSessionTokenString },
	} = await post<{ sessionToken: string }>(
		"refresh-session-token",
		{},
		sessionToken
	);
	return JsonWebTokenService.parse<ISessionToken>(newSessionTokenString);
};

export const refreshDeviceToken = async (
	deviceToken: string
): Promise<IDeviceToken> => {
	const {
		data: { deviceToken: newDeviceTokenString },
	} = await post<{ deviceToken: string }>(
		"refresh-device-token",
		{},
		deviceToken
	);
	return JsonWebTokenService.parse<IDeviceToken>(newDeviceTokenString);
};
