import {
	InvalidFormSubmissionError,
	PayloadErrors,
} from "./InvalidFormSubmissionError";

describe("parseFormFieldErrors", () => {
	it("should parse 1 field", () => {
		const payloadErrors = {
			phone: {
				"validation.any.invalid": {},
			},
		} as PayloadErrors;

		const error = new InvalidFormSubmissionError(payloadErrors);

		const expectedFormFieldErrors = [
			{
				fieldName: "phone",
				translationKey: "validation.phone.any.invalid",
				translationData: {},
			},
		];
		expect(error.formFieldErrors).toStrictEqual(expectedFormFieldErrors);
	});

	it("should parse 2 fields", () => {
		const payloadErrors: PayloadErrors = {
			phone: {
				"validation.any.invalid": {},
			},
			name: {
				"validation.any.invalid": {
					length: "10",
				},
			},
		};

		const error = new InvalidFormSubmissionError(payloadErrors);

		const expectedFormFieldErrors = [
			{
				fieldName: "phone",
				translationKey: "validation.phone.any.invalid",
				translationData: {},
			},
			{
				fieldName: "name",
				translationKey: "validation.name.any.invalid",
				translationData: {
					length: "10",
				},
			},
		];
		expect(error.formFieldErrors).toStrictEqual(expectedFormFieldErrors);
	});
});
