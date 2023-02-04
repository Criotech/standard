import { TranslationData, TranslationKey } from "../LanguageService/types";
import { ErrorTranslations } from "./ErrorTranslations";

type ErrorMessage = {
	[key in string]?: TranslationData;
};

export type GlobalErrorMessage = ErrorMessage;

export class GlobalError extends Error {
	public globalErrorData: ErrorTranslations;

	constructor(globalErrorMessage: GlobalErrorMessage) {
		super();
		this.globalErrorData = GlobalError.parseGlobalError(globalErrorMessage);
	}

	private static parseGlobalError(errorMessage: ErrorMessage) {
		const translationKey = Object.keys(errorMessage)[0] as TranslationKey;

		const translationData = errorMessage[translationKey];
		return {
			translationKey,
			translationData: translationData as TranslationData,
		};
	}
}
