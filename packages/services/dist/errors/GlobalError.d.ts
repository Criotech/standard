import { TranslationData } from "../LanguageService/types";
import { ErrorTranslations } from "./ErrorTranslations";
declare type ErrorMessage = {
    [key in string]?: TranslationData;
};
export declare type GlobalErrorMessage = ErrorMessage;
export declare class GlobalError extends Error {
    globalErrorData: ErrorTranslations;
    constructor(globalErrorMessage: GlobalErrorMessage);
    private static parseGlobalError;
}
export {};
