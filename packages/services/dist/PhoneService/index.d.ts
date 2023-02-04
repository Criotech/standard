import { IPhoneRegisterRequest, ListConsentsResponseBody, SaveConsentsRequestBody, IPhoneValidationRequest } from "./types";
import { IDeviceToken } from "../JsonWebTokenService/types";
declare const PhoneService: {
    register: (requestData: IPhoneRegisterRequest, sessionToken?: string) => Promise<IPhoneRegisterRequest | null>;
    validateWithOtp: (requestData: IPhoneValidationRequest) => Promise<IDeviceToken | null>;
    getConsents: (deviceToken: string) => Promise<ListConsentsResponseBody>;
    saveConsents: (deviceToken: string, data: SaveConsentsRequestBody) => Promise<void>;
};
export default PhoneService;
