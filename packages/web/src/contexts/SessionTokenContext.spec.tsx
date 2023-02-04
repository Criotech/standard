import { renderHook } from "@testing-library/react-hooks";
import { ComponentProps } from "react";

import { useSessionToken, SessionTokenProvider } from "./SessionTokenContext";
import { useSessionStorage } from "../hooks/useSessionStorage";

import {
	ISessionToken,
	AuthenticationService,
	JsonWebTokenService,
} from "@myacuvue_thailand_web/services";

jest.mock("../hooks/useSessionStorage", () => ({
	useSessionStorage: jest.fn(),
}));

jest.mock("@myacuvue_thailand_web/services", () => {
	return {
		AuthenticationService: {
			refreshSessionToken: jest.fn(),
		},
		JsonWebTokenService: {
			getElapsedTimeInPercent: jest.fn(),
		},
	};
});

const DEFAULT_FAKE_SESSION_TOKEN: ISessionToken = {
	header: {
		typ: "JWT",
		alg: "HS256",
	},
	payload: {
		region: "",
		exp: 1,
		iat: 1,
		jti: "3d7d9e16-8a3d-4d61-8fc9-86b8aab9cce6",
		phone: "66111111111",
		userType: "consumer",
		sessionId: "123",
		userId: "1111",
	},
	rawValue: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9",
};

const { refreshSessionToken } = AuthenticationService;
const { getElapsedTimeInPercent } = JsonWebTokenService;

beforeEach(async () => {
	(useSessionStorage as jest.Mock).mockReturnValue([undefined, jest.fn()]);
});

describe("useSessionToken", () => {
	it("should have correct default values when there is no provider", async () => {
		const { result } = renderHook(() => useSessionToken());
		expect(result.current).toStrictEqual(undefined);
	});

	it("should have sessionToken as the default one from session storage by the end of its initialization", async () => {
		const { result } = renderHook(() => useSessionToken(), {
			wrapper: ({
				children,
			}: ComponentProps<typeof SessionTokenProvider>) => (
				<SessionTokenProvider>{children}</SessionTokenProvider>
			),
		});

		expect(result.current.sessionToken).toStrictEqual(undefined);
	});

	it("should refresh the session token if it exists and is about to expire", async () => {
		const mockSetStorage = jest.fn();
		(useSessionStorage as jest.Mock).mockReturnValue([
			DEFAULT_FAKE_SESSION_TOKEN,
			mockSetStorage,
		]);

		(getElapsedTimeInPercent as jest.Mock).mockReturnValue(0.81);
		(refreshSessionToken as jest.Mock).mockReturnValue(
			DEFAULT_FAKE_SESSION_TOKEN
		);

		const { waitFor } = renderHook(() => useSessionToken(), {
			wrapper: ({
				children,
			}: ComponentProps<typeof SessionTokenProvider>) => (
				<SessionTokenProvider>{children}</SessionTokenProvider>
			),
		});

		await waitFor(() => {
			expect(refreshSessionToken).toHaveBeenCalled();
			expect(mockSetStorage).toHaveBeenCalled();
		});
	});
});
