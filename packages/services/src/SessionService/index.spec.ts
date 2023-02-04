import { HTTPService, ISessionToken } from "..";
import { InvalidFormSubmissionError } from "../errors/InvalidFormSubmissionError";
import SessionService from "./index";
import JsonWebTokenService from "../JsonWebTokenService";

jest.mock("../index");

jest.mock("../JsonWebTokenService", () => ({
	__esModule: true,
	default: {
		parse: jest.fn(),
	},
}));

beforeEach(() => {
	jest.resetAllMocks();
});

describe("startSession", () => {
	it("should parse the token and return it", async () => {
		const mockedPostResponse = {
			data: { sessionToken: "fake-session-token" },
		};
		(HTTPService.post as jest.Mock).mockResolvedValue(mockedPostResponse);

		const fakeSessionToken: ISessionToken = {
			header: {
				alg: "",
				typ: "",
			},
			payload: {
				iat: 1,
				exp: 2,
				sessionId: "",
				jti: "",
				region: "",
				userId: "",
				userType: "",
			},
			rawValue: "",
		};
		(JsonWebTokenService.parse as jest.Mock).mockReturnValue(
			fakeSessionToken
		);

		const fakeXiamToken = "fake-xiam-token";

		const response = await SessionService.startSession(fakeXiamToken);

		expect(HTTPService.post).toHaveBeenCalledWith(
			"session/start",
			undefined,
			fakeXiamToken
		);

		expect(response).toStrictEqual({
			header: {
				alg: "",
				typ: "",
			},
			payload: {
				iat: 1,
				exp: 2,
				sessionId: "",
				jti: "",
				region: "",
				userId: "",
				userType: "",
			},
			rawValue: "",
		});
	});

	it("should return null if http response is null", async () => {
		const fakeXiamToken = "fake-xiam-token";
		(HTTPService.post as jest.Mock).mockRejectedValue({
			response: null,
		});

		await expect(
			async () => await SessionService.startSession(fakeXiamToken)
		).rejects.toStrictEqual({ response: null });
	});

	it("should throw InvalidFormSubmissionError when unauthorized", async () => {
		const fakeXiamToken = "fake-xiam-token";
		const mockedPostError = {
			response: {
				status: 401,
				data: {
					payloadErrors: {},
				},
			},
			isAxiosError: true,
		};
		(HTTPService.post as jest.Mock).mockRejectedValue(mockedPostError);

		await expect(() =>
			SessionService.startSession(fakeXiamToken)
		).rejects.toStrictEqual(new InvalidFormSubmissionError({}));
	});
});
