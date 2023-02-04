import { Gender } from "../LegacyUserService/Gender";
export declare type LensesUsage = "NON_USER" | "ACUVUE_USER" | "OTHER_BRAND_USER";
export interface IProfile {
    myAcuvueId: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    birthYear: string;
    birthMonth: string;
    hasParentalConsent: boolean;
    gender: Gender;
    isSpectaclesWearer: boolean;
    lensesUsage: LensesUsage;
}
