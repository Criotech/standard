import EmailValidationService from "./index";

const { isValidEmailAddress } = EmailValidationService;

describe("isValidEmailAddress", () => {
	it("should return true for valid email", () => {
		const fakeValidEmail = "test@email.com";
		const emailValidationResponse = isValidEmailAddress(fakeValidEmail);
		expect(emailValidationResponse).toBe(true);
	});

	it("should return false if there is a space before @ symbol", () => {
		const fakeInvalidEmail = "test @email.com";
		const emailValidationResponse = isValidEmailAddress(fakeInvalidEmail);
		expect(emailValidationResponse).toBe(false);
	});

	it("should return false if there is a space after @ symbol", () => {
		const fakeInvalidEmail = "test@em ail.com";
		const emailValidationResponse = isValidEmailAddress(fakeInvalidEmail);
		expect(emailValidationResponse).toBe(false);
	});

	it("should return false if there is a space after .(dot) symbol", () => {
		const fakeInvalidEmail = "test@email.c om";
		const emailValidationResponse = isValidEmailAddress(fakeInvalidEmail);
		expect(emailValidationResponse).toBe(false);
	});

	it("should return false if there are two at(@) symbols in the email", () => {
		const fakeInvalidEmail = "test@em@il.com";
		const emailValidationResponse = isValidEmailAddress(fakeInvalidEmail);
		expect(emailValidationResponse).toBe(false);
	});

	it("should return false if there is an at(@) symbol after the dot(.)", () => {
		const fakeInvalidEmail = "test@emil.c@om";
		const emailValidationResponse = isValidEmailAddress(fakeInvalidEmail);
		expect(emailValidationResponse).toBe(false);
	});

	it("should return false if there is no (.)dot in the email", () => {
		const fakeInvalidEmail = "test@emailcom";
		const emailValidationResponse = isValidEmailAddress(fakeInvalidEmail);
		expect(emailValidationResponse).toBe(false);
	});

	it("should return false if there is no @ symbol in the email", () => {
		const fakeInvalidEmail = "testemailcom";
		const emailValidationResponse = isValidEmailAddress(fakeInvalidEmail);
		expect(emailValidationResponse).toBe(false);
	});

	it("should return false if there are no characters before the at(@) symbol", () => {
		const fakeInvalidEmail = "@testemail.com";
		const emailValidationResponse = isValidEmailAddress(fakeInvalidEmail);
		expect(emailValidationResponse).toBe(false);
	});

	it("should return false if there are no characters after the at(@) symbol", () => {
		const fakeInvalidEmail = "testemail@com";
		const emailValidationResponse = isValidEmailAddress(fakeInvalidEmail);
		expect(emailValidationResponse).toBe(false);
	});

	it("should return false if there are no characters after the dot(.) symbol", () => {
		const fakeInvalidEmail = "test@emailcom.";
		const emailValidationResponse = isValidEmailAddress(fakeInvalidEmail);
		expect(emailValidationResponse).toBe(false);
	});
});
