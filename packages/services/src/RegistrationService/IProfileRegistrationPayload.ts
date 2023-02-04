import { Gender } from "../LegacyUserService/Gender";

export interface IProfileRegistrationPayload {
	birthday: string;
	email: string;
	firstName: string;
	lastName: string;
	gender: Gender;
	myaccuveBrandLense: string;
	hasParentalConsent?: boolean;
}
