import {
	register,
	isValidOtp,
	validateOtp,
	resendOtp,
	registerPhone,
} from "./index";
import {
	OtpVerificationPayload,
	RegisterPayload,
	ResendOtpPayload,
	ValidateOtpResponse,
} from "./types";
import { IDeviceToken } from "../JsonWebTokenService/types";
import { Language } from "../LanguageService/types";
import { HTTPService } from "../index";
import { InvalidFormSubmissionError } from "../errors/InvalidFormSubmissionError";
import { GlobalError } from "../errors/GlobalError";
import JsonWebTokenService from "../JsonWebTokenService";

jest.mock("../index");

jest.mock("../ConfigService", () => ({
	getConfig: jest.fn().mockReturnValue({
		countryPhoneCode: "61",
		config: {
			baseUrl: "http://example.com",
		},
		region: "AUS",
	}),
	Instance: {
		TH: "TH",
		AU: "AU",
	},
	ENV: {
		DEV: "DEV",
	},
}));

jest.mock("../JsonWebTokenService", () => ({
	__esModule: true,
	default: { parse: jest.fn() },
}));

beforeEach(() => {
	jest.resetAllMocks();
});

describe("register", () => {
	it("should call post with correct parameters", async () => {
		(HTTPService.post as jest.Mock).mockReturnValue(Promise.resolve());
		const phoneFormData = {
			phone: "123456789",
			deviceId: "fake-line-id",
		};
		await register(
			phoneFormData.phone,
			phoneFormData.deviceId,
			Language.EN
		);
		const expectedPayload: RegisterPayload = {
			phone: "61123456789",
			deviceType: "web",
			language: Language.EN,
			region: "AUS",
			deviceId: "fake-line-id",
		};
		expect(HTTPService.post).toHaveBeenCalledWith(
			"register",
			expectedPayload
		);
	});

	it("should throw InvalidFormSubmissionError", async () => {
		const mockedPostError = {
			response: {
				status: 400,
				data: {
					payloadErrors: {},
				},
			},
			isAxiosError: true,
		};
		const phoneFormData = {
			phone: "123456789",
			deviceId: "fake-line-id",
		};
		(HTTPService.post as jest.Mock).mockRejectedValue(mockedPostError);
		await expect(async () =>
			register(phoneFormData.phone, phoneFormData.deviceId, Language.EN)
		).rejects.toStrictEqual(new InvalidFormSubmissionError({}));
	});

	it("should throw GlobalError when post errors on 409", async () => {
		const mockedPostError = {
			response: {
				status: 409,
				data: {
					globalError: {},
				},
			},
			isAxiosError: true,
		};

		const phoneFormData = {
			phone: "123456789",
			deviceId: "fake-line-id",
		};
		(HTTPService.post as jest.Mock).mockRejectedValue(mockedPostError);
		await expect(() =>
			register(phoneFormData.phone, phoneFormData.deviceId, Language.EN)
		).rejects.toStrictEqual(new GlobalError({}));
	});
});

describe("isValidOtp", () => {
	it("should validate 4 digits", () => {
		expect(isValidOtp("1234")).toEqual(true);
	});

	it("should not validate 3 digits", () => {
		expect(isValidOtp("123")).toEqual(false);
	});

	it("should not validate 5 digits", () => {
		expect(isValidOtp("12345")).toEqual(false);
	});

	it("should not validate length 4 with letter in the end", () => {
		expect(isValidOtp("1234a")).toEqual(false);
	});

	it("should not validate length 4 with letter in the beginning", () => {
		expect(isValidOtp("a1234")).toEqual(false);
	});

	it("should not validate 4 digits with a preceeding letter", () => {
		expect(isValidOtp("a1234")).toEqual(false);
	});

	it("should not validate 4 digits with a succeeding letter", () => {
		expect(isValidOtp("1234a")).toEqual(false);
	});

	it("should not validate 4 digits with a preceeding space", () => {
		expect(isValidOtp(" 1234")).toEqual(false);
	});

	it("should not validate 4 digits with a succeeding space", () => {
		expect(isValidOtp("1234 ")).toEqual(false);
	});
});

describe("validateOtp", () => {
	it("should call post with correct parameters and return validate otp response without sessionToken", async () => {
		const mockedPostResponse = {
			data: {
				isExistingUser: true,
				deviceToken: "token",
				deviceId: "fake-line-id",
			},
		};
		(HTTPService.post as jest.Mock).mockResolvedValue(mockedPostResponse);

		const fakeToken: IDeviceToken = {
			header: {
				typ: "JWT",
				alg: "HS256",
			},
			payload: {
				exp: 123,
				iat: 456,
				jti: "jti",
				userType: "user type",
				region: "AUS",
				phone: "123456789",
			},
			rawValue: "raw value",
		};

		(JsonWebTokenService.parse as jest.Mock).mockReturnValue(fakeToken);

		const response = await validateOtp(
			"111222333",
			"fake-line-id",
			"1234",
			Language.EN,
			null
		);
		const expectedPayload: OtpVerificationPayload = {
			phone: "61111222333",
			otp: "1234",
			language: Language.EN,
			deviceId: "fake-line-id",
			deviceType: "web",
		};

		const expectedResponse: ValidateOtpResponse = {
			isExistingUser: true,
			deviceToken: {
				header: {
					typ: "JWT",
					alg: "HS256",
				},
				payload: {
					exp: 123,
					iat: 456,
					jti: "jti",
					userType: "user type",
					region: "AUS",
					phone: "123456789",
				},
				rawValue: "raw value",
			},
		};

		expect(HTTPService.post).toHaveBeenCalledWith(
			"validate-otp",
			expectedPayload,
			null
		);
		expect(response).toEqual(expectedResponse);
	});

	it("should call post with correct parameters and return validate otp response with sessionToken", async () => {
		const mockedPostResponse = {
			data: {
				isExistingUser: true,
				deviceToken: "token",
			},
		};
		(HTTPService.post as jest.Mock).mockResolvedValue(mockedPostResponse);

		const fakeToken: IDeviceToken = {
			header: {
				typ: "JWT",
				alg: "HS256",
			},
			payload: {
				exp: 123,
				iat: 456,
				jti: "jti",
				userType: "user type",
				region: "AUS",
				phone: "123456789",
			},
			rawValue: "raw value",
		};

		(JsonWebTokenService.parse as jest.Mock).mockReturnValue(fakeToken);

		const response = await validateOtp(
			"111222333",
			"fake-line-id",
			"1234",
			Language.EN,
			"fake-session-token"
		);
		const expectedPayload: OtpVerificationPayload = {
			phone: "61111222333",
			deviceId: "fake-line-id",
			otp: "1234",
			language: Language.EN,
			deviceType: "web",
		};

		const expectedResponse: ValidateOtpResponse = {
			isExistingUser: true,
			deviceToken: {
				header: {
					typ: "JWT",
					alg: "HS256",
				},
				payload: {
					exp: 123,
					iat: 456,
					jti: "jti",
					userType: "user type",
					region: "AUS",
					phone: "123456789",
				},
				rawValue: "raw value",
			},
		};

		expect(HTTPService.post).toHaveBeenCalledWith(
			"validate-otp",
			expectedPayload,
			"fake-session-token"
		);
		expect(HTTPService.post).not.toHaveBeenCalledWith(
			"validate-otp",
			expectedPayload
		);
		expect(response).toEqual(expectedResponse);
	});

	it("should throw InvalidFormSubmissionError when post errors", async () => {
		const mockedPostError = {
			response: {
				status: 400,
				data: {
					payloadErrors: {},
				},
			},
			isAxiosError: true,
		};
		(HTTPService.post as jest.Mock).mockRejectedValue(mockedPostError);

		await expect(() =>
			validateOtp("111222333", "fake-line-id", "3456", Language.EN)
		).rejects.toEqual(new InvalidFormSubmissionError({}));
	});
});

describe("resendOtp", () => {
	it("should call post with correct parameters", async () => {
		const phoneFormData = {
			phone: "123456789",
			deviceId: "fake-line-id",
		};
		await resendOtp(
			phoneFormData.phone,
			phoneFormData.deviceId,
			Language.EN,
			"fakeSessionToken"
		);
		const expectedPayload: ResendOtpPayload = {
			phone: "61123456789",
			deviceType: "web",
			language: Language.EN,
			region: "AUS",
			deviceId: "fake-line-id",
		};
		expect(HTTPService.post).toHaveBeenCalledWith(
			"resend-otp",
			expectedPayload,
			"fakeSessionToken"
		);
	});

	it("should throw InvalidFormSubmissionError when post fails", async () => {
		const mockedPostError = {
			response: {
				status: 400,
				data: {
					payloadErrors: {},
				},
			},
			isAxiosError: true,
		};
		(HTTPService.post as jest.Mock).mockRejectedValue(mockedPostError);

		const expectedError = new InvalidFormSubmissionError({});
		await expect(async () => {
			await resendOtp("111222333", "fake-line-id", Language.EN);
		}).rejects.toEqual(expectedError);
	});

	it("should throw Internal server error if not InvalidFormSubmissionError", async () => {
		const mockedPostError = {
			response: {
				status: 500,
				data: {
					payloadErrors: {},
				},
			},
		};
		(HTTPService.post as jest.Mock).mockRejectedValue(mockedPostError);

		const expectedError = new Error("Internal server error");
		await expect(async () => {
			await resendOtp("111222333", "fake-line-id", Language.EN);
		}).rejects.toEqual(expectedError);
	});
});

describe("registerPhone", () => {
	const fakeSessionToken = "fake-session-token";
	it("should call post with correct parameters", async () => {
		const phoneFormData = {
			phone: "123456789",
			deviceId: "fake-line-id",
			countryPhoneCode: "66",
			region: "THA",
		};
		await registerPhone(
			phoneFormData.phone,
			phoneFormData.deviceId,
			Language.EN,
			phoneFormData.countryPhoneCode,
			phoneFormData.region,
			fakeSessionToken
		);
		const expectedPayload: RegisterPayload = {
			phone: "66123456789",
			deviceType: "web",
			language: Language.EN,
			region: "THA",
			deviceId: "fake-line-id",
		};
		expect(HTTPService.post).toHaveBeenCalledWith(
			"register-phone",
			expectedPayload,
			fakeSessionToken
		);
	});

	it("should throw InvalidFormSubmissionError", async () => {
		const mockedPostError = {
			response: {
				status: 400,
				data: {
					payloadErrors: {},
				},
			},
			isAxiosError: true,
		};
		const phoneFormData = {
			phone: "123456789",
			deviceId: "fake-line-id",
			countryPhoneCode: "66",
			region: "THA",
		};
		(HTTPService.post as jest.Mock).mockRejectedValue(mockedPostError);

		await expect(async () =>
			registerPhone(
				phoneFormData.phone,
				phoneFormData.deviceId,
				Language.EN,
				phoneFormData.countryPhoneCode,
				phoneFormData.region,
				fakeSessionToken
			)
		).rejects.toEqual(new InvalidFormSubmissionError({}));
	});
});
