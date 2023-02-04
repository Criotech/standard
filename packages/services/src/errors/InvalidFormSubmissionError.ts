import { TranslationKey, TranslationData } from "../LanguageService/types";

type ErrorMessage = {
	[key in string]?: TranslationData;
};

export type PayloadErrors = Record<string, ErrorMessage>;

export type FormFieldError = {
	fieldName: string;
	translationKey: TranslationKey;
	translationData: TranslationData;
};

export class InvalidFormSubmissionError extends Error {
	public formFieldErrors: FormFieldError[] = [];

	constructor(payloadErrors: PayloadErrors) {
		super();
		this.formFieldErrors =
			InvalidFormSubmissionError.parseFormFieldErrors(payloadErrors);
	}

	private static parseFormFieldErrors(
		payloadErrors: PayloadErrors
	): FormFieldError[] {
		const formFieldErrors: FormFieldError[] = [];
		const fieldNames = Object.keys(payloadErrors);
		fieldNames.forEach((fieldName: string) => {
			const fieldError = payloadErrors[fieldName];
			const formFieldError =
				InvalidFormSubmissionError.parseOneFormFieldError(
					fieldName,
					fieldError
				);
			formFieldErrors.push(formFieldError);
		});
		return formFieldErrors;
	}

	private static parseOneFormFieldError(
		fieldName: string,
		fieldError: ErrorMessage
	) {
		const key = Object.keys(fieldError)[0];
		const translationKey = key.replace(
			"validation",
			`validation.${fieldName}`
		) as TranslationKey;
		const translationData = fieldError[key];
		return {
			fieldName,
			translationKey,
			translationData: translationData as TranslationData,
		};
	}
}
