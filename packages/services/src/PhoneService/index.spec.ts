import { HTTPService } from "../";
import { GlobalError } from "../errors/GlobalError";
import { InvalidFormSubmissionError } from "../errors/InvalidFormSubmissionError";
import JsonWebTokenService from "../JsonWebTokenService";
import { IDeviceToken } from "../JsonWebTokenService/types";
import PhoneService from "./index";
import {
	IPhoneRegisterRequest,
	ListConsentsResponseBody,
	SaveConsentsRequestBody,
	IPhoneValidationRequest,
} from "./types";

jest.mock("../ConfigService", () => ({
	getConfig: jest.fn().mockReturnValue({
		countryPhoneCode: "61",
		config: {
			baseUrl: "https://example.com",
		},
	}),
	Instance: {
		TH: "TH",
		AU: "AU",
	},
	ENV: {
		DEV: "DEV",
	},
}));

jest.mock("../index");

jest.mock("../JsonWebTokenService", () => ({
	__esModule: true,
	default: { parse: jest.fn() },
}));

beforeEach(() => {
	jest.resetAllMocks();
});

describe("register", () => {
	it("should call phone register request", async () => {
		const fakeSessionToken = "session token";
		const fakeRegistrationData: IPhoneRegisterRequest = {
			phone: "fakePhoneNumber",
			deviceType: "fakeDeviceType",
			deviceId: "fakeDeviceId",
		};

		const mockedPostResponse = {
			data: fakeRegistrationData,
		};
		(HTTPService.post as jest.Mock).mockResolvedValue(mockedPostResponse);

		const response = await PhoneService.register(
			fakeRegistrationData,
			fakeSessionToken
		);

		expect(HTTPService.post).toHaveBeenCalledWith(
			"phone/register",
			{ ...fakeRegistrationData, phone: "61fakePhoneNumber" },
			fakeSessionToken
		);

		expect(response).toStrictEqual(fakeRegistrationData);
	});

	it("should return null if http response is null", async () => {
		const fakeRegistrationData: IPhoneRegisterRequest = {
			phone: "fakePhoneNumber",
			deviceType: "fakeDeviceType",
			deviceId: "fakeDeviceId",
		};
		const fakeSessionToken = "session token";
		(HTTPService.post as jest.Mock).mockRejectedValue({
			response: null,
		});

		await expect(() =>
			PhoneService.register(fakeRegistrationData, fakeSessionToken)
		).rejects.toStrictEqual({ response: null });
	});

	it("should throw InvalidFormSubmissionError when post errors", async () => {
		const fakeRegistrationData: IPhoneRegisterRequest = {
			phone: "fakePhoneNumber",
			deviceType: "fakeDeviceType",
			deviceId: "fakeDeviceId",
		};
		const fakeSessionToken = "session token";
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
			PhoneService.register(fakeRegistrationData, fakeSessionToken)
		).rejects.toStrictEqual(new InvalidFormSubmissionError({}));
	});
});

describe("validateWithOtp ", () => {
	const fakeRequestBody: IPhoneValidationRequest = {
		phone: "1234567890",
		otp: "1234",
	};

	it("should call phone validateWithOtp request", async () => {
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
				region: "LITE",
				phone: "123456789",
			},
			rawValue: "raw value",
		};

		(JsonWebTokenService.parse as jest.Mock).mockReturnValue(fakeToken);

		(HTTPService.post as jest.Mock).mockResolvedValue({
			data: {
				deviceToken: "fake-device-token",
			},
		});

		const response = await PhoneService.validateWithOtp(fakeRequestBody);

		expect(HTTPService.post).toHaveBeenCalledWith("phone/validate", {
			phone: "611234567890",
			otp: "1234",
		});

		expect(response).toStrictEqual(fakeToken);
	});

	it("should return null if http response is null", async () => {
		(HTTPService.post as jest.Mock).mockRejectedValue({
			response: null,
		});

		await expect(() =>
			PhoneService.validateWithOtp(fakeRequestBody)
		).rejects.toStrictEqual({ response: null });
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
			PhoneService.validateWithOtp(fakeRequestBody)
		).rejects.toEqual(new InvalidFormSubmissionError({}));
	});
});

describe("getConsents", () => {
	it("should call phone getConsents request", async () => {
		const fakeDeviceToken = "device token";
		const fakeResponseData: ListConsentsResponseBody = [
			{
				type: "WEB:LITE:TERMS_AND_CONDITIONS",
				accepted: false,
			},
		];

		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: fakeResponseData,
		});

		const response = await PhoneService.getConsents(fakeDeviceToken);

		expect(HTTPService.get).toHaveBeenCalledWith(
			"phone/consents",
			fakeDeviceToken
		);
		expect(response).toStrictEqual(fakeResponseData);
	});

	it("should return null if http response is null", async () => {
		const fakeSessionToken = "session token";
		(HTTPService.get as jest.Mock).mockRejectedValue({
			response: null,
		});

		await expect(() =>
			PhoneService.getConsents(fakeSessionToken)
		).rejects.toStrictEqual({ response: null });
	});

	it("should throw InvalidFormSubmissionError when post errors", async () => {
		const fakeDeviceToken = "device token";

		const mockedPostError = {
			response: {
				status: 400,
				data: {
					payloadErrors: {},
				},
			},
			isAxiosError: true,
		};
		(HTTPService.get as jest.Mock).mockRejectedValue(mockedPostError);

		await expect(() =>
			PhoneService.getConsents(fakeDeviceToken)
		).rejects.toStrictEqual(new InvalidFormSubmissionError({}));
	});
});

describe("saveConsents", () => {
	it("should call phone saveConsents request", async () => {
		const fakeDeviceToken = "device-token";
		const fakeRequestData: SaveConsentsRequestBody = [
			"WEB:LITE:TERMS_AND_CONDITIONS",
		];

		(HTTPService.post as jest.Mock).mockResolvedValue(null);

		await PhoneService.saveConsents(fakeDeviceToken, fakeRequestData);

		expect(HTTPService.post).toHaveBeenCalledWith(
			"phone/consents",
			fakeRequestData,
			fakeDeviceToken
		);
	});

	it("should throw GlobarError for Request timeout error response", async () => {
		const fakeDeviceToken = "device-token";
		const fakeRequestData: SaveConsentsRequestBody = [
			"WEB:LITE:TERMS_AND_CONDITIONS",
		];
		const mockedErrorResponse = {
			isAxiosError: true,
			response: {
				status: 408,
				data: {
					globalError: {},
				},
			},
		};

		(HTTPService.post as jest.Mock).mockRejectedValue(mockedErrorResponse);

		await expect(() =>
			PhoneService.saveConsents(fakeDeviceToken, fakeRequestData)
		).rejects.toStrictEqual(new GlobalError({}));
	});
});
