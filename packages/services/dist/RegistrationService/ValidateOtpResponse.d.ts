import { IDeviceToken } from "../JsonWebTokenService/types";
export declare type ValidateOtpResponse = {
    isExistingUser: boolean;
    deviceToken: IDeviceToken;
};
export declare type ValidateOtpApiResponse = {
    isExistingUser: boolean;
    deviceToken: string;
};
