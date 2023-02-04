import { IDeviceToken } from "../JsonWebTokenService/types";

export type ValidateOtpResponse = {
	isExistingUser: boolean;
	deviceToken: IDeviceToken;
};

export type ValidateOtpApiResponse = {
	isExistingUser: boolean;
	deviceToken: string;
};
