export class InvalidFormSubmissionError extends Error {
    constructor(payloadErrors) {
        super();
        this.formFieldErrors = [];
        this.formFieldErrors =
            InvalidFormSubmissionError.parseFormFieldErrors(payloadErrors);
    }
    static parseFormFieldErrors(payloadErrors) {
        const formFieldErrors = [];
        const fieldNames = Object.keys(payloadErrors);
        fieldNames.forEach((fieldName) => {
            const fieldError = payloadErrors[fieldName];
            const formFieldError = InvalidFormSubmissionError.parseOneFormFieldError(fieldName, fieldError);
            formFieldErrors.push(formFieldError);
        });
        return formFieldErrors;
    }
    static parseOneFormFieldError(fieldName, fieldError) {
        const key = Object.keys(fieldError)[0];
        const translationKey = key.replace("validation", `validation.${fieldName}`);
        const translationData = fieldError[key];
        return {
            fieldName,
            translationKey,
            translationData: translationData,
        };
    }
}
