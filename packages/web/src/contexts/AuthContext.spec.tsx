import { ComponentProps } from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import {
	ConfigService,
	IUser,
	ProfileCompleteness,
	ISessionToken,
	IDeviceToken,
} from "@myacuvue_thailand_web/services";
import { useService } from "../hooks/useService";
import { useConfiguration } from "../hooks/useConfiguration";
import { useAuthentication } from "../hooks/useAuthentication";
import { useCallbackWithLoading } from "../hooks/useCallbackWithLoading";
import { useDeviceToken } from "./DeviceTokenContext";
import { useSessionToken } from "./SessionTokenContext";
import { useUserProfile } from "../contexts/UserProfileContext";
import { AuthProvider, AuthStatus } from "./AuthContext";
import { mocked } from "ts-jest/utils";

jest.mock("../hooks/useService", () => ({
	useService: jest.fn(),
}));

jest.mock("../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../hooks/useCallbackWithLoading", () => ({
	useCallbackWithLoading: jest.fn(),
}));

jest.mock("./DeviceTokenContext", () => ({
	useDeviceToken: jest.fn(),
}));

jest.mock("./SessionTokenContext", () => ({
	useSessionToken: jest.fn(),
}));

jest.mock("../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

const DEFAULT_FAKE_USER: IUser = {
	id: "",
	phone: "",
	profile: null,
};

const DEFAULT_FAKE_DEVICE_TOKEN: IDeviceToken = {
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
	},
	rawValue: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9",
};

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

beforeEach(() => {
	(useService as jest.Mock).mockReturnValue({
		LegacyUserService: {
			getUser: jest.fn().mockResolvedValue({
				...DEFAULT_FAKE_USER,
			}),
		},
		AuthenticationService: {
			getSessionToken: jest.fn(),
			refreshDeviceToken: jest.fn(),
			refreshSessionToken: jest.fn(),
		},
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		authenticationType: ConfigService.AuthenticationType.LEGACY,
	});

	(useDeviceToken as jest.Mock).mockReturnValue({
		deviceToken: undefined,
		setDeviceToken: jest.fn(),
		deleteDeviceToken: jest.fn(),
	});

	(useSessionToken as jest.Mock).mockReturnValue({
		sessionToken: undefined,
		setSessionToken: jest.fn(),
	});

	(useCallbackWithLoading as jest.Mock).mockImplementation(
		(callback) => callback
	);

	(useUserProfile as jest.Mock).mockReturnValue({
		status: ProfileCompleteness.COMPLETE,
		userProfile: {
			myAcuvueId: "fakeId",
			phone: "123456789",
			firstName: "fakeFirstName",
			lastName: "fakeLastName",
		},
		refreshUserProfile: jest.fn(),
	});
});

describe("AuthContext", () => {
	it("should call deleteDeviceToken and setSessionToken with undefined if resetAuth() is called", async () => {
		const mockDeleteDeviceToken = jest.fn();
		const mockSetSessionToken = jest.fn();

		mocked(useDeviceToken).mockReturnValue({
			deviceToken: undefined,
			setDeviceToken: jest.fn(),
			deleteDeviceToken: mockDeleteDeviceToken,
		});

		(useSessionToken as jest.Mock).mockReturnValue({
			sessionToken: undefined,
			setSessionToken: mockSetSessionToken,
		});

		const { result, waitFor } = renderHook(() => useAuthentication(), {
			wrapper: ({ children }: ComponentProps<typeof AuthProvider>) => (
				<AuthProvider>{children}</AuthProvider>
			),
		});

		act(() => {
			result.current.resetAuth();
		});

		await waitFor(() => {
			expect(mockDeleteDeviceToken).toHaveBeenCalled();
			expect(mockSetSessionToken).toHaveBeenCalledWith(undefined);
			expect(result.current.status).toStrictEqual(AuthStatus.PENDING_OTP);
		});
	});

	it("should call getSessionToken when processSessionToken is called with invalid sessionToken", async () => {
		const fakeDeviceToken: IDeviceToken = {
			...DEFAULT_FAKE_DEVICE_TOKEN,
			payload: {
				...DEFAULT_FAKE_DEVICE_TOKEN.payload,
				exp: Date.now() / 1000 + 20,
				iat: Date.now() / 1000 - 180,
			},
		};
		const mockGetSessionToken = jest.fn();

		(useService as jest.Mock).mockReturnValue({
			LegacyUserService: {
				getUser: jest.fn().mockResolvedValue({
					...DEFAULT_FAKE_USER,
				}),
			},
			AuthenticationService: {
				getSessionToken: mockGetSessionToken,
				refreshDeviceToken: jest.fn(),
				refreshSessionToken: jest.fn(),
			},
		});

		(useDeviceToken as jest.Mock).mockReturnValue({
			deviceToken: fakeDeviceToken,
			setDeviceToken: jest.fn(),
			deleteDeviceToken: jest.fn(),
		});

		(useSessionToken as jest.Mock).mockReturnValue({
			sessionToken: undefined,
			setSessionToken: jest.fn(),
		});

		const { result, waitFor } = renderHook(() => useAuthentication(), {
			wrapper: ({ children }: ComponentProps<typeof AuthProvider>) => (
				<AuthProvider>{children}</AuthProvider>
			),
		});

		act(() => {
			result.current?.processSessionToken();
		});

		await waitFor(() => {
			expect(mockGetSessionToken).toHaveBeenCalled();
		});
	});

	it("should call getUser and refreshUserProfile if processSessionToken() is called with valid sessionToken", async () => {
		const fakeDeviceToken: IDeviceToken = {
			...DEFAULT_FAKE_DEVICE_TOKEN,
			payload: {
				...DEFAULT_FAKE_DEVICE_TOKEN.payload,
				exp: Date.now() / 1000 + 20,
				iat: Date.now() / 1000 - 180,
			},
		};

		const fakeSessionToken: ISessionToken = {
			...DEFAULT_FAKE_SESSION_TOKEN,
			payload: {
				...DEFAULT_FAKE_SESSION_TOKEN.payload,
				exp: Date.now() / 1000 + 20,
				iat: Date.now() / 1000 - 180,
			},
		};
		const mockGetUser = jest.fn();
		const mockRefreshUserProfile = jest.fn();

		(useService as jest.Mock).mockReturnValue({
			LegacyUserService: {
				getUser: mockGetUser,
			},
			AuthenticationService: {
				getSessionToken: jest.fn(),

				refreshDeviceToken: jest.fn(),
				refreshSessionToken: jest.fn(),
			},
		});

		(useUserProfile as jest.Mock).mockReturnValue({
			status: ProfileCompleteness.COMPLETE,
			userProfile: {
				myAcuvueId: "fakeId",
				phone: "123456789",
				firstName: "fakeFirstName",
				lastName: "fakeLastName",
			},
			refreshUserProfile: mockRefreshUserProfile,
		});

		(useDeviceToken as jest.Mock).mockReturnValue({
			deviceToken: fakeDeviceToken,
			setDeviceToken: jest.fn(),
			deleteDeviceToken: jest.fn(),
		});

		(useSessionToken as jest.Mock).mockReturnValue({
			sessionToken: fakeSessionToken,
			setSessionToken: jest.fn(),
		});

		const { result, waitFor } = renderHook(() => useAuthentication(), {
			wrapper: ({ children }: ComponentProps<typeof AuthProvider>) => (
				<AuthProvider>{children}</AuthProvider>
			),
		});

		act(() => {
			result.current?.processSessionToken();
		});

		await waitFor(() => {
			expect(mockGetUser).toHaveBeenCalled();

			expect(mockRefreshUserProfile).toHaveBeenCalled();
		});
	});

	it("should set AuthStatus to PENDING_TC if getSessionToken failed when processSessionToken is called", async () => {
		const fakeDeviceToken: IDeviceToken = {
			...DEFAULT_FAKE_DEVICE_TOKEN,
			payload: {
				...DEFAULT_FAKE_DEVICE_TOKEN.payload,
				exp: Date.now() / 1000 + 20,
				iat: Date.now() / 1000 - 180,
			},
		};

		(useService as jest.Mock).mockReturnValue({
			LegacyUserService: {
				getUser: jest.fn().mockResolvedValue({
					...DEFAULT_FAKE_USER,
				}),
			},
			AuthenticationService: {
				getSessionToken: jest
					.fn()
					.mockRejectedValueOnce(new Error("API Error")),
				refreshDeviceToken: jest.fn(),
				refreshSessionToken: jest.fn(),
			},
		});

		(useDeviceToken as jest.Mock).mockReturnValue({
			deviceToken: fakeDeviceToken,
			setDeviceToken: jest.fn(),
			deleteDeviceToken: jest.fn(),
		});

		(useSessionToken as jest.Mock).mockReturnValue({
			sessionToken: undefined,
			setSessionToken: jest.fn(),
		});

		const { result, waitFor } = renderHook(() => useAuthentication(), {
			wrapper: ({ children }: ComponentProps<typeof AuthProvider>) => (
				<AuthProvider>{children}</AuthProvider>
			),
		});

		act(() => {
			result.current?.processSessionToken();
		});
		await waitFor(() => {
			expect(result.current.status).toStrictEqual(AuthStatus.PENDING_TC);
		});
	});

	it("should set AuthStatus to PENDING_OTP if getUser failed when processSessionToken called", async () => {
		const fakeDeviceToken: IDeviceToken = {
			...DEFAULT_FAKE_DEVICE_TOKEN,
			payload: {
				...DEFAULT_FAKE_DEVICE_TOKEN.payload,
				exp: Date.now() / 1000 + 20,
				iat: Date.now() / 1000 - 180,
			},
		};

		const fakeSessionToken: ISessionToken = {
			...DEFAULT_FAKE_SESSION_TOKEN,
			payload: {
				...DEFAULT_FAKE_SESSION_TOKEN.payload,
				exp: Date.now() / 1000 + 20,
				iat: Date.now() / 1000 - 180,
			},
		};

		(useService as jest.Mock).mockReturnValue({
			LegacyUserService: {
				getUser: jest.fn().mockImplementation(() => {
					throw new Error();
				}),
			},
			AuthenticationService: {
				getSessionToken: jest
					.fn()
					.mockRejectedValueOnce(new Error("API Error")),
				refreshDeviceToken: jest.fn(),
				refreshSessionToken: jest.fn(),
			},
		});

		(useDeviceToken as jest.Mock).mockReturnValue({
			deviceToken: fakeDeviceToken,
			setDeviceToken: jest.fn(),
			deleteDeviceToken: jest.fn(),
		});

		(useSessionToken as jest.Mock).mockReturnValue({
			sessionToken: fakeSessionToken,
			setSessionToken: jest.fn(),
		});

		const { result, waitFor } = renderHook(() => useAuthentication(), {
			wrapper: ({ children }: ComponentProps<typeof AuthProvider>) => (
				<AuthProvider>{children}</AuthProvider>
			),
		});

		act(() => {
			result.current?.processSessionToken();
		});

		await waitFor(() => {
			expect(result.current?.status).toStrictEqual(
				AuthStatus.PENDING_OTP
			);
		});
	});

	it("should set AuthStatus to AUTHENTICATED for valid userProfile", async () => {
		const fakeDeviceToken: IDeviceToken = {
			...DEFAULT_FAKE_DEVICE_TOKEN,
			payload: {
				...DEFAULT_FAKE_DEVICE_TOKEN.payload,
				exp: Date.now() / 1000 + 20,
				iat: Date.now() / 1000 - 180,
			},
		};

		const fakeSessionToken: ISessionToken = {
			...DEFAULT_FAKE_SESSION_TOKEN,
			payload: {
				...DEFAULT_FAKE_SESSION_TOKEN.payload,
				exp: Date.now() / 1000 + 20,
				iat: Date.now() / 1000 - 180,
			},
		};

		(useDeviceToken as jest.Mock).mockReturnValue({
			deviceToken: fakeDeviceToken,
			setDeviceToken: jest.fn(),
			deleteDeviceToken: jest.fn(),
		});

		(useSessionToken as jest.Mock).mockReturnValue({
			sessionToken: fakeSessionToken,
			setSessionToken: jest.fn(),
		});

		const { result, waitFor } = renderHook(() => useAuthentication(), {
			wrapper: ({ children }: ComponentProps<typeof AuthProvider>) => (
				<AuthProvider>{children}</AuthProvider>
			),
		});

		await act(async () => {
			result.current?.getUser();
		});

		await waitFor(() => {
			expect(result.current.status).toStrictEqual(
				AuthStatus.AUTHENTICATED
			);
		});
	});

	it("should renew the sessionToken for predefined time period", async () => {
		const mockRefreshSessionToken = jest.fn();

		const fakeSessionToken: ISessionToken = {
			...DEFAULT_FAKE_SESSION_TOKEN,
			payload: {
				...DEFAULT_FAKE_SESSION_TOKEN.payload,
				exp: Date.now() / 1000 + 20,
				iat: Date.now() / 1000 - 180,
			},
		};

		(useService as jest.Mock).mockReturnValue({
			LegacyUserService: {
				getUser: jest.fn().mockResolvedValue({
					...DEFAULT_FAKE_USER,
				}),
			},
			AuthenticationService: {
				getSessionToken: jest.fn(),
				refreshDeviceToken: jest.fn(),
				refreshSessionToken: mockRefreshSessionToken,
			},
		});

		(useSessionToken as jest.Mock).mockReturnValue({
			sessionToken: fakeSessionToken,
			setSessionToken: jest.fn(),
		});

		jest.useFakeTimers();

		const { waitFor } = renderHook(() => useAuthentication(), {
			wrapper: ({ children }: ComponentProps<typeof AuthProvider>) => (
				<AuthProvider>{children}</AuthProvider>
			),
		});

		jest.advanceTimersByTime(60000);

		await waitFor(() => {
			expect(mockRefreshSessionToken).toHaveBeenCalled();
		});
	});
});
