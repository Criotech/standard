import { act, renderHook } from "@testing-library/react-hooks";
import { useAuthentication } from "../hooks/useAuthentication";
import { ComponentProps } from "react";
import { AuthProvider, AuthStatus } from "./AuthContext";
import { NeoAuthProvider } from "./NeoAuthContext";
import { useDeviceToken } from "./DeviceTokenContext";
import { useSessionToken } from "./SessionTokenContext";
import { useXiam } from "./XiamContext";
import { useSession } from "../hooks/useSession";
import {
	JsonWebTokenService,
	NavigateToCanvasOnSignOutStatus,
	PhoneService,
	ProfileCompleteness,
} from "@myacuvue_thailand_web/services";
import { useUserProfile } from "./UserProfileContext";
import { useEmailVerification } from "../pages/EmailVerification/useEmailVerification";
import { mocked } from "ts-jest/utils";
import { useConfiguration } from "../hooks/useConfiguration";
import { useFeatureSwitch } from "../hooks/useFeatureSwitch";

jest.mock("../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../hooks/useFeatureSwitch", () => ({
	useFeatureSwitch: jest.fn(),
}));

jest.mock("../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("./DeviceTokenContext", () => ({
	useDeviceToken: jest.fn(),
}));

jest.mock("./SessionTokenContext", () => ({
	useSessionToken: jest.fn(),
}));

jest.mock("./XiamContext", () => ({
	useXiam: jest.fn(),
}));

jest.mock("@myacuvue_thailand_web/services", () => ({
	PhoneService: {
		getConsents: jest.fn(),
	},
	JsonWebTokenService: {
		isExpired: jest.fn(),
		getRemainingTimeInSeconds: jest.fn(),
		getTotalDurationInSeconds: jest.fn(),
	},
	ProfileCompleteness: {
		COMPLETE: "COMPLETE",
		INCOMPLETE: "INCOMPLETE",
	},
	NavigateToCanvasOnSignOutStatus: {
		ENABLED: "ENABLED",
		DISABLED: "DISABLED",
	},
}));

jest.mock("../hooks/useSession", () => ({
	useSession: jest.fn(),
}));

jest.mock("../pages/EmailVerification/useEmailVerification", () => ({
	useEmailVerification: jest.fn(),
}));

beforeEach(() => {
	mocked(useDeviceToken).mockReturnValue({
		deviceToken: undefined,
		setDeviceToken: jest.fn(),
		deleteDeviceToken: jest.fn(),
	});

	mocked(useSessionToken).mockReturnValue({
		sessionToken: undefined,
		setSessionToken: jest.fn(),
	});

	mocked(useSession).mockReturnValue({
		startSession: jest.fn(),
	});

	mocked(useXiam).mockReturnValue({
		getXiamToken: jest.fn(),
		logout: jest.fn(),
		loginPopup: jest.fn(),
		loginRedirect: jest.fn(),
		registrationPopup: jest.fn(),
		updatePassword: jest.fn(),
		isForgotPassword: false,
	});

	mocked(useUserProfile).mockReturnValue({
		userProfile: {
			firstName: "fakeFirstName",
			lastName: "fakeLastName",
			email: null,
			gender: null,
			phone: null,
			birthMonth: null,
			isSpectaclesWearer: null,
			lensesUsage: null,
			birthYear: null,
			hasParentalConsent: null,
			myAcuvueId: null,
		},
		refreshUserProfile: jest.fn(),
		profileCompleteness: ProfileCompleteness.INCOMPLETE,
		isLoading: false,
		wasEmptyBefore: false,
		setEmptyBefore: jest.fn(),
	});

	mocked(useEmailVerification).mockReturnValue({
		deleteVerificationEmailIssuedAt: jest.fn(),
		canIssueVerificationEmail: jest.fn(),
		sendEmail: jest.fn(),
	});

	mocked(PhoneService.getConsents).mockResolvedValue([]);

	mocked(JsonWebTokenService.isExpired).mockReturnValue(false);

	(useConfiguration as jest.Mock).mockReturnValue({
		signOutRedirectUrl: "",
	});

	(useFeatureSwitch as jest.Mock).mockReturnValue(["ENABLED", true]);
});

describe("NeoAuthContext", () => {
	it("should have deviceToken as the default one from DeviceTokenContext by the end of its initialization", async () => {
		mocked(useDeviceToken).mockReturnValue({
			deviceToken: undefined,
			setDeviceToken: jest.fn(),
			deleteDeviceToken: jest.fn(),
		});

		const { result, waitFor } = renderHook(() => useAuthentication(), {
			wrapper: ({ children }: ComponentProps<typeof AuthProvider>) => (
				<NeoAuthProvider>{children}</NeoAuthProvider>
			),
		});

		expect(result.current.deviceToken).toStrictEqual(undefined);

		await waitFor(() => {
			expect(result.current.status).toStrictEqual(AuthStatus.PENDING_OTP);
		});
	});

	it("should call deleteDeviceToken and setSessionToken with undefined if resetAuth() is called", async () => {
		const mockDeleteDeviceToken = jest.fn();
		const mockDeleteVerifyEmailIssuedAt = jest.fn();
		mocked(useDeviceToken).mockReturnValue({
			deviceToken: undefined,
			setDeviceToken: jest.fn(),
			deleteDeviceToken: mockDeleteDeviceToken,
		});

		mocked(useEmailVerification).mockReturnValue({
			deleteVerificationEmailIssuedAt: mockDeleteVerifyEmailIssuedAt,
			sendEmail: jest.fn(),
			canIssueVerificationEmail: jest.fn(),
		});

		const mockSetSessionToken = jest.fn();
		mocked(useSessionToken).mockReturnValue({
			sessionToken: undefined,
			setSessionToken: mockSetSessionToken,
		});

		const { result, waitFor, waitForNextUpdate } = renderHook(
			() => useAuthentication(),
			{
				wrapper: ({
					children,
				}: ComponentProps<typeof AuthProvider>) => (
					<NeoAuthProvider>{children}</NeoAuthProvider>
				),
			}
		);

		act(() => {
			result.current.resetAuth();
		});

		expect(mockDeleteDeviceToken).toHaveBeenCalled();
		expect(mockSetSessionToken).toHaveBeenCalledWith(undefined);
		expect(mockDeleteVerifyEmailIssuedAt).toHaveBeenCalledWith();

		await waitFor(() => {
			expect(result.current.status).toStrictEqual(AuthStatus.PENDING_OTP);
		});
	});

	it("should call evaluateStatus if processSessionToken() is called", async () => {
		mocked(useSessionToken).mockReturnValue({
			sessionToken: undefined,
			setSessionToken: jest.fn(),
		});

		mocked(useDeviceToken).mockReturnValue({
			deviceToken: undefined,
			setDeviceToken: jest.fn(),
			deleteDeviceToken: jest.fn(),
		});

		mocked(useXiam).mockReturnValue({
			getXiamToken: jest.fn().mockReturnValue({}),
			logout: jest.fn(),
			updatePassword: jest.fn(),
			registrationPopup: jest.fn(),
			loginRedirect: jest.fn(),
			loginPopup: jest.fn(),
			isForgotPassword: false,
		});

		const { result } = renderHook(() => useAuthentication(), {
			wrapper: ({ children }: ComponentProps<typeof AuthProvider>) => (
				<NeoAuthProvider>{children}</NeoAuthProvider>
			),
		});

		await act(async () => {
			await result.current.processSessionToken();
		});

		expect(result.current.status).toEqual(AuthStatus.AUTHENTICATED);
	});

	it("should call tryStartSession if processSessionToken() is called without session token", async () => {
		mocked(useDeviceToken).mockReturnValue({
			deviceToken: undefined,
			setDeviceToken: jest.fn(),
			deleteDeviceToken: jest.fn(),
		});

		mocked(useSessionToken).mockReturnValue({
			sessionToken: undefined,
			setSessionToken: jest.fn(),
		});

		mocked(useXiam).mockReturnValue({
			getXiamToken: jest.fn().mockReturnValue({}),
			logout: jest.fn(),
			loginPopup: jest.fn(),
			loginRedirect: jest.fn(),
			registrationPopup: jest.fn(),
			updatePassword: jest.fn(),
			isForgotPassword: false,
		});

		const fakeStartSession = jest.fn();
		mocked(useSession).mockReturnValue({
			startSession: fakeStartSession,
		});

		const { result } = renderHook(() => useAuthentication(), {
			wrapper: ({ children }: ComponentProps<typeof AuthProvider>) => (
				<NeoAuthProvider>{children}</NeoAuthProvider>
			),
		});

		await act(async () => {
			await result.current.processSessionToken();
		});

		expect(fakeStartSession).toHaveBeenCalled();
	});
});
