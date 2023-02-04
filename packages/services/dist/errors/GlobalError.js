export class GlobalError extends Error {
    constructor(globalErrorMessage) {
        super();
        this.globalErrorData = GlobalError.parseGlobalError(globalErrorMessage);
    }
    static parseGlobalError(errorMessage) {
        const translationKey = Object.keys(errorMessage)[0];
        const translationData = errorMessage[translationKey];
        return {
            translationKey,
            translationData: translationData,
        };
    }
}
