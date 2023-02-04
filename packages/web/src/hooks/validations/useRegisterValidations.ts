import { LegalAgeRange, TranslationKey } from "@myacuvue_thailand_web/services";
import { useCallback } from "react";
import { useLegalAge } from "../useLegalAge";
import { useService } from "../useService";
interface IUseRegisterValidations {
	validateEmail: (email?: string) => TranslationKey | undefined;
	validateFirstName: (firstName?: string) => TranslationKey | undefined;
	validateLastName: (lastName?: string) => TranslationKey | undefined;
	validateBirthday: (
		birthMonth?: number,
		birthYear?: number
	) => TranslationKey | undefined;
	validateLensesUsage: (
		myaccuveBrandLense?: string
	) => TranslationKey | undefined;
	validateSpectableWearer: (
		isSpectableWearer?: boolean
	) => TranslationKey | undefined;
	validateGender: (gender?: string) => TranslationKey | undefined;
	isValidPhoneNumber: (phoneNumber: string) => boolean;
	removeZeroPrefix: (phoneNumber: string) => string;
}

export const useRegisterValidations = (): IUseRegisterValidations => {
	const { EmailValidationService, PhoneValidationService } = useService();
	const { isValidPhoneNumber: isValidPhoneNumberService } =
		PhoneValidationService;
	const { isValidEmailAddress } = EmailValidationService;

	const { getLegalAgeRange } = useLegalAge();

	const validateEmail = useCallback(
		(email?: string): TranslationKey | undefined => {
			if (!email) {
				return "registrationPage.validations.emailIsRequiredError";
			}
			if (!isValidEmailAddress(email)) {
				return "registrationPage.validations.emailValidationError";
			}
		},
		[isValidEmailAddress]
	);

	const validateFirstName = useCallback(
		(firstName?: string): TranslationKey | undefined => {
			if (!firstName) {
				return "registrationPage.validations.firstNameIsRequiredError";
			}
			if (firstName.length > 35) {
				return "registrationPage.validations.firstNameValidationError";
			}
		},
		[]
	);

	const validateLastName = useCallback(
		(lastName?: string): TranslationKey | undefined => {
			if (!lastName) {
				return "registrationPage.validations.lastNameIsRequiredError";
			}
			if (lastName.length > 35) {
				return "registrationPage.validations.lastNameValidationError";
			}
		},
		[]
	);

	const validateBirthday = useCallback(
		(
			birthMonth?: number,
			birthYear?: number
		): TranslationKey | undefined => {
			const legalAgeRange = getLegalAgeRange(birthMonth, birthYear);
			if (legalAgeRange === LegalAgeRange.UNDEFINED) {
				return "registrationPage.validations.birthdayIsRequiredError";
			}
			if (legalAgeRange === LegalAgeRange.MINOR_UNABLE_TO_REGISTER) {
				return "registrationPage.validations.ageThresholdError";
			}
			if (legalAgeRange === LegalAgeRange.MINOR_NEEDS_PARENTAL_CONSENT) {
				return undefined;
			}
			if (legalAgeRange === LegalAgeRange.ADULT) {
				return undefined;
			}
		},
		[getLegalAgeRange]
	);

	const isValidPhoneNumber = useCallback(
		(phoneNumber: string): boolean => {
			return isValidPhoneNumberService(phoneNumber);
		},
		[isValidPhoneNumberService]
	);

	const removeZeroPrefix = useCallback((phoneNumber: string): string => {
		return phoneNumber.charAt(0) === "0"
			? phoneNumber.slice(1)
			: phoneNumber;
	}, []);

	const validateLensesUsage = useCallback(
		(myaccuveBrandLense?: string): TranslationKey | undefined => {
			if (!myaccuveBrandLense) {
				return "registrationPage.validations.myAcuvueBrandLenseIsRequiredError";
			}
		},
		[]
	);

	const validateSpectableWearer = useCallback(
		(isSpectableWearer?: boolean): TranslationKey | undefined => {
			if (isSpectableWearer === undefined) {
				return "registrationPage.validations.spectacleWearer";
			}
		},
		[]
	);

	const validateGender = useCallback(
		(gender?: string): TranslationKey | undefined => {
			if (!gender) {
				return "registrationPage.validations.genderIsRequiredError";
			}
		},
		[]
	);

	return {
		validateEmail,
		validateFirstName,
		validateLastName,
		validateBirthday,
		validateLensesUsage,
		isValidPhoneNumber,
		removeZeroPrefix,
		validateSpectableWearer,
		validateGender,
	};
};
