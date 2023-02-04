import JsonWebTokenService from "./index";
import { JsonWebToken } from "./types";

beforeEach(() => {
	jest.clearAllTimers();
});

describe("parse", () => {
	it("should parse the JSON web token into the appropriate format", () => {
		const result = JsonWebTokenService.parse(
			"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbnN0YW5jZSI6Im1zaHAiLCJwaG9uZSI6IjY2MTExMTExMTExIiwidXNlclR5cGUiOiJjb25zdW1lciIsImV4cCI6MTY0Nzk0NzA3MywiaWF0IjoxNjQ3OTE4MjczLCJqdGkiOiIzZDdkOWUxNi04YTNkLTRkNjEtOGZjOS04NmI4YWFiOWNjZTYifQ.wvyT3uebfNr8Syo0dsCb9FQQjvL4nFlWLk_Ekyb1LOk"
		);

		const expectedToken: JsonWebToken = {
			header: {
				typ: "JWT",
				alg: "HS256",
			},
			payload: {
				exp: 1647947073,
				iat: 1647918273,
				jti: "3d7d9e16-8a3d-4d61-8fc9-86b8aab9cce6",
				instance: "mshp",
				phone: "66111111111",
				userType: "consumer",
			},
			rawValue:
				"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbnN0YW5jZSI6Im1zaHAiLCJwaG9uZSI6IjY2MTExMTExMTExIiwidXNlclR5cGUiOiJjb25zdW1lciIsImV4cCI6MTY0Nzk0NzA3MywiaWF0IjoxNjQ3OTE4MjczLCJqdGkiOiIzZDdkOWUxNi04YTNkLTRkNjEtOGZjOS04NmI4YWFiOWNjZTYifQ.wvyT3uebfNr8Syo0dsCb9FQQjvL4nFlWLk_Ekyb1LOk",
		};
		expect(result).toStrictEqual(expectedToken);
	});
});

const DEFAULT_FAKE_TOKEN: JsonWebToken = {
	header: {
		typ: "JWT",
		alg: "HS256",
	},
	payload: {
		exp: 1647947073,
		iat: 1647918273,
		jti: "3d7d9e16-8a3d-4d61-8fc9-86b8aab9cce6",
		instance: "mshp",
		phone: "66111111111",
		userType: "consumer",
	},
	rawValue:
		"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbnN0YW5jZSI6Im1zaHAiLCJwaG9uZSI6IjY2MTExMTExMTExIiwidXNlclR5cGUiOiJjb25zdW1lciIsImV4cCI6MTY0Nzk0NzA3MywiaWF0IjoxNjQ3OTE4MjczLCJqdGkiOiIzZDdkOWUxNi04YTNkLTRkNjEtOGZjOS04NmI4YWFiOWNjZTYifQ.wvyT3uebfNr8Syo0dsCb9FQQjvL4nFlWLk_Ekyb1LOk",
};

describe("getRemainingTimeInSeconds", () => {
	it("should return 1 when token exp is 11s and now is 10s", () => {
		const fakeDateNowInSeconds = 10;
		const fakeDateNowInMs = fakeDateNowInSeconds * 1000;
		jest.useFakeTimers("modern").setSystemTime(fakeDateNowInMs);

		const fakeToken: JsonWebToken = {
			...DEFAULT_FAKE_TOKEN,
			payload: {
				...DEFAULT_FAKE_TOKEN.payload,
				exp: 11,
			},
		};

		const remainingTime =
			JsonWebTokenService.getRemainingTimeInSeconds(fakeToken);

		expect(remainingTime).toStrictEqual(1);
	});
});

describe("isExpired", () => {
	it("should return false when token exp (11) is after now (10)", () => {
		const fakeDateNowInSeconds = 10;
		const fakeDateNowInMs = fakeDateNowInSeconds * 1000;
		jest.useFakeTimers("modern").setSystemTime(fakeDateNowInMs);

		const fakeToken: JsonWebToken = {
			...DEFAULT_FAKE_TOKEN,
			payload: {
				...DEFAULT_FAKE_TOKEN.payload,
				exp: 11,
			},
		};

		const isExpired = JsonWebTokenService.isExpired(fakeToken);

		expect(isExpired).toStrictEqual(false);
	});

	it("should return true when token exp (9) is before now (10)", () => {
		const fakeDateNowInSeconds = 10;
		const fakeDateNowInMs = fakeDateNowInSeconds * 1000;
		jest.useFakeTimers("modern").setSystemTime(fakeDateNowInMs);

		const fakeToken: JsonWebToken = {
			...DEFAULT_FAKE_TOKEN,
			payload: {
				...DEFAULT_FAKE_TOKEN.payload,
				exp: 9,
			},
		};

		const isExpired = JsonWebTokenService.isExpired(fakeToken);

		expect(isExpired).toStrictEqual(true);
	});

	it("should return true when token exp (10) is now (10)", () => {
		const fakeDateNowInSeconds = 10;
		const fakeDateNowInMs = fakeDateNowInSeconds * 1000;
		jest.useFakeTimers("modern").setSystemTime(fakeDateNowInMs);

		const fakeToken: JsonWebToken = {
			...DEFAULT_FAKE_TOKEN,
			payload: {
				...DEFAULT_FAKE_TOKEN.payload,
				exp: 10,
			},
		};

		const isExpired = JsonWebTokenService.isExpired(fakeToken);

		expect(isExpired).toStrictEqual(true);
	});
});

describe("getTotalDurationInSeconds", () => {
	it("should return 2 when token is issued at 10s and expires at 12s", () => {
		const fakeToken: JsonWebToken = {
			...DEFAULT_FAKE_TOKEN,
			payload: {
				...DEFAULT_FAKE_TOKEN.payload,
				iat: 10,
				exp: 12,
			},
		};

		const totalDurationInSeconds =
			JsonWebTokenService.getTotalDurationInSeconds(fakeToken);

		expect(totalDurationInSeconds).toStrictEqual(2);
	});
});

describe("getElapsedTimeInPercent", () => {
	it("should be close to 10%, when the token is issued at 0s, expires at 10s and now is 1s", () => {
		const fakeToken: JsonWebToken = {
			...DEFAULT_FAKE_TOKEN,
			payload: {
				...DEFAULT_FAKE_TOKEN.payload,
				iat: 0,
				exp: 10,
			},
		};
		const fakeDateNowInSeconds = 1;
		const fakeDateNowInMs = fakeDateNowInSeconds * 1000;
		jest.useFakeTimers("modern").setSystemTime(fakeDateNowInMs);

		const elapsedInPercent =
			JsonWebTokenService.getElapsedTimeInPercent(fakeToken);
		expect(elapsedInPercent).toBeCloseTo(0.1);
	});

	it("should be close to 100%, when the token is issued at 2s, expires at 2s and now is 4s", () => {
		const fakeToken: JsonWebToken = {
			...DEFAULT_FAKE_TOKEN,
			payload: {
				...DEFAULT_FAKE_TOKEN.payload,
				iat: 2,
				exp: 2,
			},
		};
		const fakeDateNowInSeconds = 4;
		const fakeDateNowInMs = fakeDateNowInSeconds * 1000;
		jest.useFakeTimers("modern").setSystemTime(fakeDateNowInMs);

		const elapsedInPercent =
			JsonWebTokenService.getElapsedTimeInPercent(fakeToken);
		expect(elapsedInPercent).toBeCloseTo(1);
	});
});
