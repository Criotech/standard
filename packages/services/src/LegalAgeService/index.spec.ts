import LegalAgeService from ".";
import { getConfig } from "../ConfigService";
import { LegalAgeRange } from "./LegalAgeRange";

const { getLegalAgeRange } = LegalAgeService;

jest.mock("../ConfigService", () => ({
	getConfig: jest.fn(),
}));

describe("getLegalAgeRange", () => {
	beforeAll(() => {
		jest.useFakeTimers("modern").setSystemTime(
			new Date("2022-05-30").getTime()
		);
	});

	describe("scenario: TH instance", () => {
		beforeEach(() => {
			(getConfig as jest.Mock).mockReturnValue({
				legalAge: {
					minorThreshold: 10,
					minorThresholdWithGuardian: 20,
				},
			});
		});

		it("should return UNDEFINED if birthMonth and birthYear are not passed", () => {
			expect(getLegalAgeRange(undefined, undefined)).toEqual(
				LegalAgeRange.UNDEFINED
			);
		});

		it("should return UNDEFINED for birthMonth/birthYear = undefined/1995", () => {
			expect(getLegalAgeRange(undefined, 1995)).toEqual(
				LegalAgeRange.UNDEFINED
			);
		});

		it("should return UNDEFINED for birthMonth/birthYear = 01/undefined", () => {
			expect(getLegalAgeRange(1, undefined)).toEqual(
				LegalAgeRange.UNDEFINED
			);
		});

		it("should return MINOR_UNABLE_TO_REGISTER for birthMonth/birthYear 04/2022", () => {
			expect(getLegalAgeRange(4, 2022)).toEqual(
				LegalAgeRange.MINOR_UNABLE_TO_REGISTER
			);
		});

		it("should return MINOR_UNABLE_TO_REGISTER for birthMonth/birthYear 10/2012", () => {
			expect(getLegalAgeRange(10, 2012)).toEqual(
				LegalAgeRange.MINOR_UNABLE_TO_REGISTER
			);
		});

		it("should return MINOR_NEEDS_PARENTAL_CONSENT for birthMont/birthYear 04/2012", () => {
			expect(getLegalAgeRange(4, 2012)).toEqual(
				LegalAgeRange.MINOR_NEEDS_PARENTAL_CONSENT
			);
		});

		it("should return MINOR_NEEDS_PARENTAL_CONSENT for birthMonth/birthYear = 10/2002", () => {
			expect(getLegalAgeRange(10, 2002)).toEqual(
				LegalAgeRange.MINOR_NEEDS_PARENTAL_CONSENT
			);
		});

		it("should return ADULT for birthMonth/birthYear 04/2002", () => {
			expect(getLegalAgeRange(2, 2002)).toEqual(LegalAgeRange.ADULT);
		});
	});

	describe("scenario: AU instance", () => {
		beforeEach(() => {
			(getConfig as jest.Mock).mockReturnValue({
				legalAge: {
					minorThreshold: 16,
					minorThresholdWithGuardian: 18,
				},
			});
		});

		it("should return UNDEFINED if birthMonth and birthYear are not passed", () => {
			expect(getLegalAgeRange(undefined, undefined)).toEqual(
				LegalAgeRange.UNDEFINED
			);
		});

		it("should return UNDEFINED for birthMonth/birthYear = undefined/1995", () => {
			expect(getLegalAgeRange(undefined, 1995)).toEqual(
				LegalAgeRange.UNDEFINED
			);
		});

		it("should return UNDEFINED for birthMonth/birthYear = 01/undefined", () => {
			expect(getLegalAgeRange(1, undefined)).toEqual(
				LegalAgeRange.UNDEFINED
			);
		});

		it("should return MINOR_UNABLE_TO_REGISTER for birthMonth/birthYear 04/2022", () => {
			expect(getLegalAgeRange(4, 2022)).toEqual(
				LegalAgeRange.MINOR_UNABLE_TO_REGISTER
			);
		});

		it("should return MINOR_UNABLE_TO_REGISTER for birthMonth/birthYear 10/2006", () => {
			expect(getLegalAgeRange(10, 2006)).toEqual(
				LegalAgeRange.MINOR_UNABLE_TO_REGISTER
			);
		});

		it("should return MINOR_NEEDS_PARENTAL_CONSENT for birthMont/birthYear 04/2006", () => {
			expect(getLegalAgeRange(4, 2006)).toEqual(
				LegalAgeRange.MINOR_NEEDS_PARENTAL_CONSENT
			);
		});

		it("should return MINOR_NEEDS_PARENTAL_CONSENT for birthMonth/birthYear = 10/2004", () => {
			expect(getLegalAgeRange(10, 2004)).toEqual(
				LegalAgeRange.MINOR_NEEDS_PARENTAL_CONSENT
			);
		});

		it("should return ADULT for birthMonth/birthYear 04/2004", () => {
			expect(getLegalAgeRange(2, 2004)).toEqual(LegalAgeRange.ADULT);
		});
	});

	describe("scenario: IN instance", () => {
		beforeEach(() => {
			(getConfig as jest.Mock).mockReturnValue({
				legalAge: { minorThreshold: 0, minorThresholdWithGuardian: 0 },
			});
		});

		it("should return UNDEFINED if birthMonth and birthYear are not passed", () => {
			expect(getLegalAgeRange(undefined, undefined)).toEqual(
				LegalAgeRange.UNDEFINED
			);
		});

		it("should return UNDEFINED for birthMonth/birthYear = undefined/1995", () => {
			expect(getLegalAgeRange(undefined, 1995)).toEqual(
				LegalAgeRange.UNDEFINED
			);
		});

		it("should return UNDEFINED for birthMonth/birthYear = 01/undefined", () => {
			expect(getLegalAgeRange(1, undefined)).toEqual(
				LegalAgeRange.UNDEFINED
			);
		});

		it("should return ADULT for birthMonth/birthYear 04/2022", () => {
			expect(getLegalAgeRange(4, 2022)).toEqual(LegalAgeRange.ADULT);
		});

		it("should return ADULT for birthMonth/birthYear 10/2006", () => {
			expect(getLegalAgeRange(10, 2006)).toEqual(LegalAgeRange.ADULT);
		});

		it("should return ADULT for birthMont/birthYear 04/2006", () => {
			expect(getLegalAgeRange(4, 2006)).toEqual(LegalAgeRange.ADULT);
		});

		it("should return ADULT for birthMonth/birthYear = 10/2004", () => {
			expect(getLegalAgeRange(10, 2004)).toEqual(LegalAgeRange.ADULT);
		});

		it("should return ADULT for birthMonth/birthYear 04/2004", () => {
			expect(getLegalAgeRange(2, 2004)).toEqual(LegalAgeRange.ADULT);
		});
	});
});
