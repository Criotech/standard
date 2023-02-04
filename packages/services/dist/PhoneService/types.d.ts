export declare type DeviceType = "web";
export interface IPhoneRegisterRequest {
    phone: string;
    deviceType: string;
    deviceId: string;
}
export interface IPhoneValidationRequest {
    phone: string;
    otp: string;
}
export interface IPhoneValidationResponse {
    deviceToken: string;
}
declare type ConsentType = "WEB:LITE:TERMS_AND_CONDITIONS" | "WEB:LITE:PRIVACY_POLICY";
interface Consent {
    type: ConsentType;
    accepted: boolean;
}
export declare type ListConsentsResponseBody = Consent[];
export declare type SaveConsentsRequestBody = ConsentType[];
export {};
