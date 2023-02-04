import { GlobalError, GlobalErrorMessage } from "./GlobalError";

describe("parseGlobalError", () => {
	it("should parse global error", () => {
		const GlobalErrorMessage: GlobalErrorMessage = {
			"validation.global.error": {},
		};
		const error = new GlobalError(GlobalErrorMessage);
		const expectedGlobalError = {
			translationKey: "validation.global.error",
			translationData: {},
		};
		expect(error.globalErrorData).toStrictEqual(expectedGlobalError);
	});
});
