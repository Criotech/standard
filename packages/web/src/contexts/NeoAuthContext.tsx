import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useSessionToken } from "./SessionTokenContext";
import { useDeviceToken } from "./DeviceTokenContext";
import { AuthContext, AuthStatus } from "./AuthContext";
import { useXiam } from "./XiamContext";
import { useSession } from "../hooks/useSession";
import {
	HttpStatus,
	IUser,
	JsonWebToken,
	JsonWebTokenService,
	ListConsentsResponseBody,
	NavigateToCanvasOnSignOutStatus,
	NavigateToSignInOnResetPasswordStatus,
	PhoneService,
} from "@myacuvue_thailand_web/services";
import { useUserProfile } from "./UserProfileContext";
import { useEmailVerification } from "../pages/EmailVerification/useEmailVerification";
import { useFeatureSwitch } from "../hooks/useFeatureSwitch";
import { unstable_batchedUpdates } from "react-dom";
import axios from "axios";

const { isAxiosError } = axios;

const doNothing = () => {};

const { isExpired } = JsonWebTokenService;

const isEveryConsentAccepted = (
	consents: ListConsentsResponseBody
): boolean => {
	const filteredConsents = consents.filter((consent) =>
		["WEB:LITE:TERMS_AND_CONDITIONS", "WEB:LITE:PRIVACY_POLICY"].includes(
			consent.type
		)
	);
	return filteredConsents.every((consent) => consent.accepted);
};

export const NeoAuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const { deviceToken, setDeviceToken, deleteDeviceToken } = useDeviceToken();
	const { sessionToken, setSessionToken } = useSessionToken();
	const { startSession } = useSession();
	const { getXiamToken, logout, isForgotPassword } = useXiam();
	const [status, setStatus] = useState<AuthStatus>(AuthStatus.LOADING);
	const { deleteVerificationEmailIssuedAt } = useEmailVerification();
	const [isLogoutTriggered, setLogoutTriggered] = useState<boolean>(false);

	const { userProfile, refreshUserProfile } = useUserProfile();

	const [shouldNavigateToCanvasOnSignOutStatus, isFSNavigateCanvasReady] =
		useFeatureSwitch("navigateToCanvasOnSignOut");
	const [navigateToSignInOnResetPassword, isFSNavigateSignInReady] =
		useFeatureSwitch("navigateToSignInOnResetPassword");

	const isFeatureSwitchReady =
		isFSNavigateCanvasReady && isFSNavigateSignInReady;

	const [user, setUser] = useState<IUser>();

	const resetAuth = useCallback(
		async (signOutRedirectUrl?: string) => {
			unstable_batchedUpdates(async () => {
				let postSignoutRedirectUrl = undefined;
				if (
					isFeatureSwitchReady &&
					shouldNavigateToCanvasOnSignOutStatus ===
						NavigateToCanvasOnSignOutStatus.ENABLED
				) {
					postSignoutRedirectUrl = signOutRedirectUrl || "/";
				}

				const postPromise = logout(postSignoutRedirectUrl);

				deleteDeviceToken();
				setSessionToken(undefined);
				deleteVerificationEmailIssuedAt();
				await postPromise;
			});
		},
		[
			deleteDeviceToken,
			setSessionToken,
			deleteVerificationEmailIssuedAt,
			isFeatureSwitchReady,
			shouldNavigateToCanvasOnSignOutStatus,
			logout,
		]
	);

	useEffect(() => {
		if (
			isForgotPassword &&
			navigateToSignInOnResetPassword ===
				NavigateToSignInOnResetPasswordStatus.ENABLED &&
			isFeatureSwitchReady &&
			!isLogoutTriggered
		) {
			setLogoutTriggered(true);
			resetAuth("/reset-password-success");
		}
	}, [
		isFeatureSwitchReady,
		isForgotPassword,
		resetAuth,
		navigateToSignInOnResetPassword,
		isLogoutTriggered,
	]);

	const tryStartSession = useCallback(async () => {
		try {
			await startSession();
		} catch (error) {
			if (
				isAxiosError(error) &&
				error.response?.status === HttpStatus.CONFLICT
			) {
				const errors: Record<string, AuthStatus> = {
					"error.email.notVerified":
						AuthStatus.PENDING_EMAIL_VALIDATION,
					"error.email.notLinked": AuthStatus.PENDING_ACCOUNT_LINKING,
				};
				const found = Object.keys(errors).find((errorKey) => {
					return (
						isAxiosError(error) &&
						errorKey in error.response?.data.globalError
					);
				});
				if (found) {
					setStatus(errors[found]);
				}
			}
		}
	}, [startSession, setStatus]);

	const evaluateSession = useCallback(async () => {
		if (sessionToken && !isExpired(sessionToken)) {
			refreshUserProfile();
			setStatus(AuthStatus.AUTHENTICATED);
		} else {
			await tryStartSession();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sessionToken, tryStartSession]);

	const evaluateXiamToken = useCallback(async () => {
		const xiamToken = await getXiamToken();
		if (xiamToken && !isExpired(xiamToken)) {
			await evaluateSession();
		} else {
			setStatus(AuthStatus.PENDING_XIAM);
		}
	}, [evaluateSession, getXiamToken]);

	const evaluateConsents = useCallback(
		async (_deviceToken: JsonWebToken) => {
			const consents = await PhoneService.getConsents(
				_deviceToken.rawValue!
			);
			if (isEveryConsentAccepted(consents)) {
				await evaluateXiamToken();
			} else {
				setStatus(AuthStatus.PENDING_TC);
			}
		},
		[evaluateXiamToken, setStatus]
	);

	const evaluateDeviceToken = useCallback(async () => {
		if (deviceToken && !isExpired(deviceToken)) {
			await evaluateConsents(deviceToken);
		} else {
			setStatus(AuthStatus.PENDING_OTP);
		}
	}, [deviceToken, evaluateConsents, setStatus]);

	const evaluateStatus = useCallback(async () => {
		const xiamToken = await getXiamToken();
		if (xiamToken && !isExpired(xiamToken)) {
			await evaluateSession();
		} else {
			await evaluateDeviceToken();
		}
	}, [evaluateDeviceToken, evaluateSession, getXiamToken]);

	useEffect(() => {
		evaluateStatus();
	}, [evaluateStatus]);

	useEffect(() => {
		if (userProfile) {
			setStatus(AuthStatus.AUTHENTICATED);
			setUser({
				id: userProfile.myAcuvueId!,
				phone: userProfile.phone!,
				profile: {
					firstName: userProfile.firstName!,
					lastName: userProfile.lastName!,
					email: userProfile.email!,
					birthday: `${userProfile.birthMonth} - ${userProfile.birthYear}`,
					gender: userProfile.gender!,
				},
			});
		}
	}, [userProfile, setUser]);

	return (
		<AuthContext.Provider
			value={{
				status,
				user,
				processSessionToken: evaluateStatus,
				getUser: doNothing,
				deviceToken,
				setDeviceToken,
				sessionToken,
				resetAuth,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
