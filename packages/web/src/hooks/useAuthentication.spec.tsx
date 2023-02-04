import { useAuthentication } from "./useAuthentication";
import { renderHook, act } from "@testing-library/react-hooks";
import { AuthProvider, AuthStatus } from "../contexts/AuthContext";
import { useService } from "./useService";
import {
	ConfigService,
	IDeviceToken,
	IUser,
	ProfileCompleteness,
} from "@myacuvue_thailand_web/services";
import { useLoading } from "./useLoading";
import { ComponentProps } from "react";
import { useDeviceToken } from "../contexts/DeviceTokenContext";
import { useSessionToken } from "../contexts/SessionTokenContext";
import { useUserProfile } from "../contexts/UserProfileContext";
import { useConfiguration } from "./useConfiguration";
import { mocked } from "ts-jest/utils";

jest.mock("../hooks/useLoading", () => ({
	useLoading: jest.fn(),
}));

jest.mock("../hooks/useService", () => ({
	useService: jest.fn(),
}));

jest.mock("../contexts/DeviceTokenContext", () => ({
	useDeviceToken: jest.fn(),
}));

jest.mock("../contexts/SessionTokenContext", () => ({
	useSessionToken: jest.fn(),
}));

jest.mock("../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("./useConfiguration", () => ({
	useConfiguration: jest.fn(),
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

	mocked(useLoading).mockReturnValue({
		showLoading: jest.fn(),
		hideLoading: jest.fn(),
		isLoading: false,
	});

	mocked(useDeviceToken).mockReturnValue({
		deviceToken: undefined,
		setDeviceToken: jest.fn(),
		deleteDeviceToken: jest.fn(),
	});

	mocked(useSessionToken).mockReturnValue({
		sessionToken: undefined,
		setSessionToken: jest.fn(),
	});

	mocked(useUserProfile).mockReturnValue({
		profileCompleteness: ProfileCompleteness.COMPLETE,
		userProfile: {
			firstName: "fakeFirstName",
			lastName: "fakeLastName",
			isSpectaclesWearer: null,
			phone: null,
			gender: null,
			hasParentalConsent: null,
			birthMonth: null,
			lensesUsage: null,
			birthYear: null,
			myAcuvueId: null,
			email: null,
		},
		refreshUserProfile: jest.fn(),
		isLoading: false,
		setEmptyBefore: jest.fn(),
		wasEmptyBefore: false,
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		authenticationType: ConfigService.AuthenticationType.TOKEN_ONLY,
		deviceTokenRefreshTimeLimitInPercent: 0.8,
	});
});

describe("useAuthentication", () => {
	it("should have correct default values when there is no provider", async () => {
		const { result } = renderHook(() => useAuthentication());

		expect(result.current).toStrictEqual(undefined);
	});

	it("should have deviceToken as the default one from storage by the end of its initialization", async () => {
		const { result } = renderHook(() => useAuthentication(), {
			wrapper: ({ children }: ComponentProps<typeof AuthProvider>) => (
				<AuthProvider>{children}</AuthProvider>
			),
		});

		expect(result.current.deviceToken).toStrictEqual(undefined);
	});

	it("should have status PENDING_OTP by the end of its initialization", async () => {
		mocked(useUserProfile).mockReturnValue({
			profileCompleteness: ProfileCompleteness.INCOMPLETE,
			userProfile: undefined,
			isLoading: false,
			refreshUserProfile: jest.fn(),
			wasEmptyBefore: false,
			setEmptyBefore: jest.fn(),
		});

		const { result } = renderHook(() => useAuthentication(), {
			wrapper: ({ children }: ComponentProps<typeof AuthProvider>) => (
				<AuthProvider>{children}</AuthProvider>
			),
		});

		expect(result.current.status).toStrictEqual(AuthStatus.PENDING_OTP);
	});

	it("should delete device token when resetAuth is called", async () => {
		const mockDeleteStorage = jest.fn();

		mocked(useDeviceToken).mockReturnValue({
			deviceToken: undefined,
			setDeviceToken: jest.fn(),
			deleteDeviceToken: mockDeleteStorage,
		});

		const { result } = renderHook(() => useAuthentication(), {
			wrapper: ({ children }: ComponentProps<typeof AuthProvider>) => (
				<AuthProvider>{children}</AuthProvider>
			),
		});

		act(() => {
			result.current.resetAuth();
		});

		expect(mockDeleteStorage).toHaveBeenCalled();
	});

	it("should show loader when processSessionToken is called", async () => {
		const { result } = renderHook(() => useAuthentication(), {
			wrapper: ({ children }: ComponentProps<typeof AuthProvider>) => (
				<AuthProvider>{children}</AuthProvider>
			),
		});

		await act(async () => {
			await result.current.processSessionToken();
		});

		expect(useLoading().showLoading).toHaveBeenCalled();
		expect(useLoading().hideLoading).toHaveBeenCalled();
	});

	it("should call refreshDeviceToken when device token is valid and expiration is close", async () => {
		(
			useService().AuthenticationService.refreshDeviceToken as jest.Mock
		).mockReturnValue(
			"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbnN0YW5jZSI6Im1zaHAiLCJwaG9uZSI6IjY2MTExMTExMTExIiwidXNlclR5cGUiOiJjb25zdW1lciIsImV4cCI6MTY0Nzk0NzA3MywiaWF0IjoxNjQ3OTE4MjczLCJqdGkiOiIzZDdkOWUxNi04YTNkLTRkNjEtOGZjOS04NmI4YWFiOWNjZTYifQ.wvyT3uebfNr8Syo0dsCb9FQQjvL4nFlWLk_Ekyb1LOk"
		);

		const deviceToken: IDeviceToken = {
			...DEFAULT_FAKE_DEVICE_TOKEN,
			payload: {
				...DEFAULT_FAKE_DEVICE_TOKEN.payload,
				exp: Date.now() / 1000 + 20,
				iat: Date.now() / 1000 - 180,
			},
		};

		mocked(useDeviceToken).mockReturnValue({
			deviceToken: deviceToken,
			setDeviceToken: jest.fn(),
			deleteDeviceToken: jest.fn(),
		});

		await act(async () => {
			renderHook(() => useAuthentication(), {
				wrapper: ({
					children,
				}: ComponentProps<typeof AuthProvider>) => (
					<AuthProvider>{children}</AuthProvider>
				),
			});
		});

		expect(
			useService().AuthenticationService.refreshDeviceToken
		).toHaveBeenCalled();
	});

	it("should not call refreshDeviceToken when deviceTokenRefreshTimeLimitInPercent is -1 and valid device token is about to expire", async () => {
		(
			useService().AuthenticationService.refreshDeviceToken as jest.Mock
		).mockReturnValue(
			"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbnN0YW5jZSI6Im1zaHAiLCJwaG9uZSI6IjY2MTExMTExMTExIiwidXNlclR5cGUiOiJjb25zdW1lciIsImV4cCI6MTY0Nzk0NzA3MywiaWF0IjoxNjQ3OTE4MjczLCJqdGkiOiIzZDdkOWUxNi04YTNkLTRkNjEtOGZjOS04NmI4YWFiOWNjZTYifQ.wvyT3uebfNr8Syo0dsCb9FQQjvL4nFlWLk_Ekyb1LOk"
		);

		(useConfiguration as jest.Mock).mockReturnValue({
			authenticationType: ConfigService.AuthenticationType.TOKEN_ONLY,
			deviceTokenRefreshTimeLimitInPercent: -1,
		});

		const deviceToken: IDeviceToken = {
			...DEFAULT_FAKE_DEVICE_TOKEN,
			payload: {
				...DEFAULT_FAKE_DEVICE_TOKEN.payload,
				exp: Date.now() / 1000 + 20,
				iat: Date.now() / 1000 - 180,
			},
		};

		mocked(useDeviceToken).mockReturnValue({
			deviceToken: deviceToken,
			setDeviceToken: jest.fn(),
			deleteDeviceToken: jest.fn(),
		});

		await act(async () => {
			renderHook(() => useAuthentication(), {
				wrapper: ({
					children,
				}: ComponentProps<typeof AuthProvider>) => (
					<AuthProvider>{children}</AuthProvider>
				),
			});
		});

		expect(
			useService().AuthenticationService.refreshDeviceToken
		).not.toHaveBeenCalled();
	});

	it("should call processSessionToken when device token is valid and expiration is close, but refreshDeviceToken raised error", async () => {
		mocked(
			useService().AuthenticationService.refreshDeviceToken
		).mockRejectedValue(new Error());

		const deviceToken: IDeviceToken = {
			...DEFAULT_FAKE_DEVICE_TOKEN,
			payload: {
				...DEFAULT_FAKE_DEVICE_TOKEN.payload,
				exp: Date.now() / 1000 + 20,
				iat: Date.now() / 1000 - 180,
			},
		};

		mocked(useDeviceToken).mockReturnValue({
			deviceToken: deviceToken,
			setDeviceToken: jest.fn(),
			deleteDeviceToken: jest.fn(),
		});

		await act(async () => {
			renderHook(() => useAuthentication(), {
				wrapper: ({
					children,
				}: ComponentProps<typeof AuthProvider>) => (
					<AuthProvider>{children}</AuthProvider>
				),
			});
		});

		expect(
			useService().AuthenticationService.refreshDeviceToken
		).toHaveBeenCalled();
		expect(useLoading().showLoading).toHaveBeenCalled();
		expect(useLoading().hideLoading).toHaveBeenCalled();
	});

	it("should call processSessionToken when device token is valid and expiration is NOT close", async () => {
		const deviceToken: IDeviceToken = {
			...DEFAULT_FAKE_DEVICE_TOKEN,
			payload: {
				...DEFAULT_FAKE_DEVICE_TOKEN.payload,
				exp: Date.now() / 1000 + 200000,
				iat: Date.now() / 1000 - 180,
			},
		};

		mocked(useDeviceToken).mockReturnValue({
			deviceToken: deviceToken,
			setDeviceToken: jest.fn(),
			deleteDeviceToken: jest.fn(),
		});

		await act(async () => {
			renderHook(() => useAuthentication(), {
				wrapper: ({
					children,
				}: ComponentProps<typeof AuthProvider>) => (
					<AuthProvider>{children}</AuthProvider>
				),
			});
		});

		expect(useLoading().showLoading).toHaveBeenCalled();
		expect(useLoading().hideLoading).toHaveBeenCalled();
	});
});
