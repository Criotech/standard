import { Language } from "../LanguageService/types";
import { ValidateOtpResponse } from "./ValidateOtpResponse";
export declare const register: (phone: string, deviceId: string, language: Language) => Promise<void>;
export declare const isValidOtp: (otp: string) => boolean;
export declare const validateOtp: (phone: string, deviceId: string, otp: string, language: Language, sessionToken?: string | null) => Promise<ValidateOtpResponse>;
export declare const getPrivacyPolicy: (language: Language) => Promise<{
    data: unknown;
    headers: any;
    status: number;
}>;
export declare const acceptLegalTerms: (deviceId: string, deviceToken?: string) => Promise<unknown>;
export declare const resendOtp: (phone: string, deviceId: string, language: Language, sessionToken?: string) => Promise<void>;
export declare const registerPhone: (phone: string, deviceId: string, language: Language, countryPhoneCode: string, region: string, sessionToken?: string | null) => Promise<void>;
