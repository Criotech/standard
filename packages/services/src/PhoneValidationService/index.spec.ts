import PhoneValidationService from "./index";
import { getConfig } from "../ConfigService";

jest.mock("../ConfigService", () => ({
	getConfig: jest.fn(),
}));

const { isValidPhoneNumber } = PhoneValidationService;

describe("isValidPhoneNumber", () => {
	it("should return false if the configurations are not imported properly", () => {
		expect(isValidPhoneNumber("123456789")).toEqual(false);
	});

	describe("scenario: TH instance", () => {
		beforeEach(() => {
			(getConfig as jest.Mock).mockReturnValue({
				phoneNumberLength: 9,
				phoneNumberStartsWith: /(^s*([0-9])[0-9]{8})$/,
			});
		});

		it("should validate 9 digits", () => {
			expect(isValidPhoneNumber("123456789")).toEqual(true);
		});

		it("should not validate 8 digits", () => {
			expect(isValidPhoneNumber("12345678")).toEqual(false);
		});

		it("should not validate 10 digits", () => {
			expect(isValidPhoneNumber("1234567890")).toEqual(false);
		});

		it("should not validate length 9 with letter in the beginning", () => {
			expect(isValidPhoneNumber("a23456789")).toEqual(false);
		});

		it("should not validate length 9 with letter in the end", () => {
			expect(isValidPhoneNumber("12345678z")).toEqual(false);
		});

		it("should not validate 9 digits with a preceeding letter", () => {
			expect(isValidPhoneNumber("a123456789")).toEqual(false);
		});

		it("should not validate 9 digits with a succeeding letter", () => {
			expect(isValidPhoneNumber("123456789z")).toEqual(false);
		});

		it("should not validate 9 digits with a preceeding space", () => {
			expect(isValidPhoneNumber(" 123456789")).toEqual(false);
		});

		it("should not validate 9 digits with a succeeding space", () => {
			expect(isValidPhoneNumber("123456789 ")).toEqual(false);
		});
	});

	describe("scenario: AU instance", () => {
		beforeEach(() => {
			(getConfig as jest.Mock).mockReturnValue({
				phoneNumberLength: 10,
				phoneNumberStartsWith: /(^s*(04)[0-9]{8})$|(^s*(4)[0-9]{8})$/,
			});
		});

		it("should validate 9 digits", () => {
			expect(isValidPhoneNumber("423456789")).toEqual(true);
		});

		it("should not validate 8 digits", () => {
			expect(isValidPhoneNumber("42345678")).toEqual(false);
		});

		it("should not validate 10 digits", () => {
			expect(isValidPhoneNumber("4234567890")).toEqual(false);
		});

		it("should validate 10 digits when number starts with 04", () => {
			expect(isValidPhoneNumber("0423456789")).toEqual(true);
		});

		it("should not validate length 9 with letter in the beginning", () => {
			expect(isValidPhoneNumber("a23456789")).toEqual(false);
		});

		it("should not validate length 9 with letter in the end", () => {
			expect(isValidPhoneNumber("42345678z")).toEqual(false);
		});

		it("should not validate 9 digits with a preceeding letter", () => {
			expect(isValidPhoneNumber("a423456789")).toEqual(false);
		});

		it("should not validate 9 digits with a succeeding letter", () => {
			expect(isValidPhoneNumber("423456789z")).toEqual(false);
		});

		it("should not validate 9 digits with a preceeding space", () => {
			expect(isValidPhoneNumber(" 423456789")).toEqual(false);
		});

		it("should not validate 9 digits with a succeeding space", () => {
			expect(isValidPhoneNumber("423456789 ")).toEqual(false);
		});

		it("should return true if started with 4", () => {
			expect(isValidPhoneNumber("456676579")).toEqual(true);
		});

		it("should return false if not started with 4", () => {
			expect(isValidPhoneNumber("556676579")).toEqual(false);
		});
	});

	describe("scenario: IN instance", () => {
		beforeEach(() => {
			(getConfig as jest.Mock).mockReturnValue({
				phoneNumberLength: 10,
				phoneNumberStartsWith: /(^s*([6-9])[0-9]{9})$/,
			});
		});

		it("should validate 10 digits", () => {
			expect(isValidPhoneNumber("9123456789")).toEqual(true);
		});

		it("should not validate 9 digits", () => {
			expect(isValidPhoneNumber("912345678")).toEqual(false);
		});

		it("should not validate 11 digits", () => {
			expect(isValidPhoneNumber("91234567890")).toEqual(false);
		});

		it("should not validate length 10 with letter in the beginning", () => {
			expect(isValidPhoneNumber("a912345678")).toEqual(false);
		});

		it("should not validate length 10 with letter in the end", () => {
			expect(isValidPhoneNumber("912345678z")).toEqual(false);
		});

		it("should not validate 10 digits with a preceding letter", () => {
			expect(isValidPhoneNumber("a9123456789")).toEqual(false);
		});

		it("should not validate 10 digits with a succeeding letter", () => {
			expect(isValidPhoneNumber("9123456789z")).toEqual(false);
		});

		it("should not validate 10 digits with a preceeding space", () => {
			expect(isValidPhoneNumber(" 9123456789")).toEqual(false);
		});

		it("should not validate 10 digits with a succeeding space", () => {
			expect(isValidPhoneNumber("9123456789 ")).toEqual(false);
		});

		it("should return true if number starts with digits from 6 to 9", () => {
			expect(isValidPhoneNumber("9123456789")).toEqual(true);
		});

		it("should return false if number not starts with digits from 6 to 9", () => {
			expect(isValidPhoneNumber("5123456789")).toEqual(false);
		});
	});
});
