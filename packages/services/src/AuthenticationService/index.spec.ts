import {
	getSessionToken,
	refreshDeviceToken,
	refreshSessionToken,
} from "./index";
import { post } from "../HTTPService";
import JsonWebTokenService from "../JsonWebTokenService";
import { IDeviceToken, ISessionToken } from "../JsonWebTokenService/types";

jest.mock("../HTTPService", () => ({
	post: jest.fn(),
}));

jest.mock("../JsonWebTokenService", () => ({
	__esModule: true,
	default: { parse: jest.fn() },
}));

beforeEach(() => {
	(post as jest.Mock).mockResolvedValue({
		data: {},
	});
	jest.resetAllMocks();
});

describe("getSessionToken", () => {
	it("should call post with correct parameters", async () => {
		(post as jest.Mock).mockResolvedValue({
			data: { sessionToken: "session token" },
		});

		await getSessionToken("device token");

		expect(post).toHaveBeenCalledWith("session-token", {}, "device token");
	});

	it("should call parse with correct parameters and return the same value as the parse", async () => {
		(post as jest.Mock).mockResolvedValue({
			data: { sessionToken: "session token string" },
		});
		const fakeSessionToken: ISessionToken = {
			header: {
				typ: "JWT",
				alg: "HS256",
			},
			payload: {
				exp: 123,
				iat: 456,
				jti: "jti",
				userType: "user type",
				region: "THA",
				sessionId: "session id",
				userId: "user id",
			},
			rawValue: "raw value",
		};
		(JsonWebTokenService.parse as jest.Mock).mockReturnValue(
			fakeSessionToken
		);

		const response = await getSessionToken("current device token");

		expect(JsonWebTokenService.parse).toHaveBeenCalledWith(
			"session token string"
		);
		const expectedResponse: ISessionToken = {
			header: {
				typ: "JWT",
				alg: "HS256",
			},
			payload: {
				exp: 123,
				iat: 456,
				jti: "jti",
				userType: "user type",
				region: "THA",
				sessionId: "session id",
				userId: "user id",
			},
			rawValue: "raw value",
		};
		expect(response).toStrictEqual(expectedResponse);
	});
});

describe("refreshSessionToken", () => {
	it("should call post with correct parameters", async () => {
		(post as jest.Mock).mockResolvedValue({
			data: { sessionToken: "session token string" },
		});
		await refreshSessionToken("current session token");

		expect(post).toHaveBeenCalledWith(
			"refresh-session-token",
			{},
			"current session token"
		);
	});

	it("should call parse with correct parameters and return the same value as the parse", async () => {
		(post as jest.Mock).mockResolvedValue({
			data: { sessionToken: "session token string" },
		});
		const fakeToken: ISessionToken = {
			header: {
				typ: "JWT",
				alg: "HS256",
			},
			payload: {
				exp: 123,
				iat: 456,
				jti: "jti",
				userType: "user type",
				region: "THA",
				sessionId: "session id",
				userId: "user id",
			},
			rawValue: "raw value",
		};
		(JsonWebTokenService.parse as jest.Mock).mockReturnValue(fakeToken);

		const response = await refreshSessionToken("current session token");

		expect(JsonWebTokenService.parse).toHaveBeenCalledWith(
			"session token string"
		);
		const expectedResponse: ISessionToken = {
			header: {
				typ: "JWT",
				alg: "HS256",
			},
			payload: {
				exp: 123,
				iat: 456,
				jti: "jti",
				userType: "user type",
				region: "THA",
				sessionId: "session id",
				userId: "user id",
			},
			rawValue: "raw value",
		};
		expect(response).toStrictEqual(expectedResponse);
	});
});

describe("refreshDeviceToken", () => {
	it("should call post with correct parameters", async () => {
		(post as jest.Mock).mockResolvedValue({
			data: { deviceToken: "device token string" },
		});

		await refreshDeviceToken("current device token");

		expect(post).toHaveBeenCalledWith(
			"refresh-device-token",
			{},
			"current device token"
		);
	});

	it("should call parse with correct parameters and return the same value as the parse", async () => {
		(post as jest.Mock).mockResolvedValue({
			data: { deviceToken: "device token string" },
		});
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
				region: "THA",
				phone: "123456789",
			},
			rawValue: "raw value",
		};
		(JsonWebTokenService.parse as jest.Mock).mockReturnValue(fakeToken);

		const response = await refreshDeviceToken("current device token");

		expect(JsonWebTokenService.parse).toHaveBeenCalledWith(
			"device token string"
		);
		const expectedResponse: IDeviceToken = {
			header: {
				typ: "JWT",
				alg: "HS256",
			},
			payload: {
				exp: 123,
				iat: 456,
				jti: "jti",
				userType: "user type",
				region: "THA",
				phone: "123456789",
			},
			rawValue: "raw value",
		};
		expect(response).toStrictEqual(expectedResponse);
	});
});
