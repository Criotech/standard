import { TranslationKey, TranslationData } from "../LanguageService/types";
declare type ErrorMessage = {
    [key in string]?: TranslationData;
};
export declare type PayloadErrors = Record<string, ErrorMessage>;
export declare type FormFieldError = {
    fieldName: string;
    translationKey: TranslationKey;
    translationData: TranslationData;
};
export declare class InvalidFormSubmissionError extends Error {
    formFieldErrors: FormFieldError[];
    constructor(payloadErrors: PayloadErrors);
    private static parseFormFieldErrors;
    private static parseOneFormFieldError;
}
export {};
