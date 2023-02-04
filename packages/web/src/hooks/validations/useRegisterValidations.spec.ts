import { renderHook } from "@testing-library/react-hooks";
import { mocked } from "ts-jest/utils";
import { useRegisterValidations } from "./useRegisterValidations";
import { LegalAgeRange } from "@myacuvue_thailand_web/services";
import { useService } from "../useService";
import { useLegalAge } from "../useLegalAge";

jest.mock("../useService", () => ({
	useService: jest.fn(),
}));

jest.mock("../useLegalAge", () => ({
	useLegalAge: jest.fn(),
}));

beforeEach(() => {
	(useService as jest.Mock).mockReturnValue({
		EmailValidationService: {
			isValidEmailAddress: jest.fn(),
		},
		PhoneValidationService: {
			isValidPhoneNumber: jest.fn(),
		},
	});

	mocked(useLegalAge).mockReturnValue({
		getLegalAgeRange: jest.fn(),
	});
});

describe("validateEmail", () => {
	it("should return required error when email is empty", () => {
		const { result } = renderHook(() => useRegisterValidations());
		const validateEmailReturn = result.current.validateEmail("");
		expect(validateEmailReturn).toBe(
			"registrationPage.validations.emailIsRequiredError"
		);
	});

	it("should return validation error when email is not a valid email", () => {
		const { EmailValidationService } = useService();
		mocked(EmailValidationService.isValidEmailAddress).mockReturnValue(
			false
		);

		const { result } = renderHook(() => useRegisterValidations());
		const validateEmailReturn =
			result.current.validateEmail("invali.mail.com");

		expect(validateEmailReturn).toBe(
			"registrationPage.validations.emailValidationError"
		);
	});

	it("should return undefined for valid emails", () => {
		const { EmailValidationService } = useService();
		mocked(EmailValidationService.isValidEmailAddress).mockReturnValue(
			true
		);

		const { result } = renderHook(() => useRegisterValidations());
		const validateEmailReturn =
			result.current.validateEmail("valid@email.com");

		expect(validateEmailReturn).toBe(undefined);
	});
});

describe("validateFirstName", () => {
	it("should return required error when firstName is empty", () => {
		const { result } = renderHook(() => useRegisterValidations());
		const validateFirstNameReturn = result.current.validateFirstName("");

		expect(validateFirstNameReturn).toBe(
			"registrationPage.validations.firstNameIsRequiredError"
		);
	});

	it("should return validation error when firstName length is 36 characters", () => {
		const fakeFirstName = "a".repeat(36);
		const { result } = renderHook(() => useRegisterValidations());
		const validateFirstNameReturn =
			result.current.validateFirstName(fakeFirstName);
		expect(validateFirstNameReturn).toBe(
			"registrationPage.validations.firstNameValidationError"
		);
	});

	it("should return undefined when firstName length is 35 characters", () => {
		const fakeFirstName = "a".repeat(35);
		const { result } = renderHook(() => useRegisterValidations());
		const validateFirstNameReturn =
			result.current.validateFirstName(fakeFirstName);
		expect(validateFirstNameReturn).toBe(undefined);
	});

	it("should return undefined for valid firstName", () => {
		const fakeFirstName = "fakeFirstName";
		const { result } = renderHook(() => useRegisterValidations());
		const validateFirstNameReturn =
			result.current.validateFirstName(fakeFirstName);
		expect(validateFirstNameReturn).toBe(undefined);
	});
});

describe("validateLastName", () => {
	it("should return required error when lastName is empty", () => {
		const { result } = renderHook(() => useRegisterValidations());
		const validateLastNameReturn = result.current.validateLastName("");
		expect(validateLastNameReturn).toBe(
			"registrationPage.validations.lastNameIsRequiredError"
		);
	});

	it("should return validation error when lastName length is 36 characters", () => {
		const fakeLastName = "a".repeat(36);
		const { result } = renderHook(() => useRegisterValidations());
		const validateLastNameReturn =
			result.current.validateLastName(fakeLastName);
		expect(validateLastNameReturn).toBe(
			"registrationPage.validations.lastNameValidationError"
		);
	});

	it("should return undefined when lastName length is 35 characters", () => {
		const fakeLastName = "a".repeat(35);
		const { result } = renderHook(() => useRegisterValidations());
		const validateLastNameReturn =
			result.current.validateLastName(fakeLastName);
		expect(validateLastNameReturn).toBe(undefined);
	});

	it("should return undefined for valid lastName", () => {
		const fakeLastName = "fakeLastName";
		const { result } = renderHook(() => useRegisterValidations());
		const validateLastNameReturn =
			result.current.validateLastName(fakeLastName);
		expect(validateLastNameReturn).toBe(undefined);
	});
});

describe("validateBirthday", () => {
	it("should return required error when age range is undefined", () => {
		const { getLegalAgeRange } = useLegalAge();
		mocked(getLegalAgeRange).mockReturnValue(LegalAgeRange.UNDEFINED);

		const { result } = renderHook(() => useRegisterValidations());
		const returnValue = result.current.validateBirthday();
		expect(returnValue).toBe(
			"registrationPage.validations.birthdayIsRequiredError"
		);
	});

	it("should return age threshold error if age range is minor", () => {
		const { getLegalAgeRange } = useLegalAge();
		mocked(getLegalAgeRange).mockReturnValue(
			LegalAgeRange.MINOR_UNABLE_TO_REGISTER
		);

		const { result } = renderHook(() => useRegisterValidations());
		const returnValue = result.current.validateBirthday(2, 2022);
		expect(returnValue).toBe(
			"registrationPage.validations.ageThresholdError"
		);
	});

	it("should return undefined if age range is minor but need parental consent", () => {
		const { getLegalAgeRange } = useLegalAge();
		mocked(getLegalAgeRange).mockReturnValue(
			LegalAgeRange.MINOR_NEEDS_PARENTAL_CONSENT
		);

		const { result } = renderHook(() => useRegisterValidations());
		const returnValue = result.current.validateBirthday(2, 2005);
		expect(returnValue).toBe(undefined);
	});

	it("should return undefined if age range is adult", () => {
		const { getLegalAgeRange } = useLegalAge();
		mocked(getLegalAgeRange).mockReturnValue(LegalAgeRange.ADULT);

		const { result } = renderHook(() => useRegisterValidations());
		const returnValue = result.current.validateBirthday(2, 2000);
		expect(returnValue).toBe(undefined);
	});
});

describe("isValidPhoneNumber", () => {
	it("should return true when isValidPhoneNumber is true", () => {
		const { PhoneValidationService } = useService();
		mocked(PhoneValidationService.isValidPhoneNumber).mockReturnValue(true);

		const { result } = renderHook(() => useRegisterValidations());
		const returnValue = result.current.isValidPhoneNumber("400123440");
		expect(returnValue).toBe(true);
	});

	it("should return false when isValidPhoneNumber is false", () => {
		const { PhoneValidationService } = useService();
		mocked(PhoneValidationService.isValidPhoneNumber).mockReturnValue(
			false
		);

		const { result } = renderHook(() => useRegisterValidations());
		const returnValue = result.current.isValidPhoneNumber("0224abc849");
		expect(returnValue).toBe(false);
	});
});

describe("removeZeroPrefix", () => {
	it("should return number without zero prefix if input has zero prefix", () => {
		const { result } = renderHook(() => useRegisterValidations());
		const removeZeroPrefixReturn =
			result.current.removeZeroPrefix("0400123440");
		expect(removeZeroPrefixReturn).toBe("400123440");
	});

	it("should return same number if input do not has zero prefix", () => {
		const { result } = renderHook(() => useRegisterValidations());
		const removeZeroPrefixReturn =
			result.current.removeZeroPrefix("400123440");
		expect(removeZeroPrefixReturn).toBe("400123440");
	});
});

describe("validateLensesUsage", () => {
	it("should return required error when lenses usage is empty", () => {
		const { result } = renderHook(() => useRegisterValidations());
		const validateLensesUsageReturn =
			result.current.validateLensesUsage("");
		expect(validateLensesUsageReturn).toBe(
			"registrationPage.validations.myAcuvueBrandLenseIsRequiredError"
		);
	});

	it("should return undefined for valid lenses usage parameter value", () => {
		const fakeLensesUsage = "No";
		const { result } = renderHook(() => useRegisterValidations());
		const validateLensesUsageReturn =
			result.current.validateLensesUsage(fakeLensesUsage);
		expect(validateLensesUsageReturn).toBe(undefined);
	});
});

describe("validateSpectableWearer", () => {
	it("should return required error when isSpectaclesWearer is empty", () => {
		const { result } = renderHook(() => useRegisterValidations());
		const validateSpectableWearerReturn =
			result.current.validateSpectableWearer();
		expect(validateSpectableWearerReturn).toBe(
			"registrationPage.validations.spectacleWearer"
		);
	});

	it("should return undefined for valid isSpectaclesWearer parameter value", () => {
		const { result } = renderHook(() => useRegisterValidations());
		const validateSpectableWearerReturn =
			result.current.validateSpectableWearer(false);
		expect(validateSpectableWearerReturn).toBe(undefined);
	});
});

describe("validateGender", () => {
	it("should return required error when gender field is empty", () => {
		const { result } = renderHook(() => useRegisterValidations());
		const returnValue = result.current.validateGender("");
		expect(returnValue).toBe(
			"registrationPage.validations.genderIsRequiredError"
		);
	});

	it("should return undefined when gender field is filled", () => {
		const { result } = renderHook(() => useRegisterValidations());
		const returnValue = result.current.validateGender("Male");
		expect(returnValue).toBe(undefined);
	});
});
