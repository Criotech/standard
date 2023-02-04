import {
	FC,
	createContext,
	useEffect,
	useCallback,
	useState,
	useMemo,
	PropsWithChildren,
} from "react";
import { SetValueAction } from "../hooks/useStorage";
import { useService } from "../hooks/useService";
import {
	IDeviceToken,
	ISessionToken,
	IUser,
	JsonWebTokenService,
} from "@myacuvue_thailand_web/services";
import { useDeviceToken } from "./DeviceTokenContext";
import { useUserProfile } from "./UserProfileContext";
import { useConfiguration } from "../hooks/useConfiguration";
import { ConfigService } from "@myacuvue_thailand_web/services";
import { useSessionToken } from "./SessionTokenContext";
import { useCallbackWithLoading } from "../hooks/useCallbackWithLoading";

export enum AuthStatus {
	LOADING,
	PENDING_OTP,
	PENDING_TC,
	PENDING_XIAM,
	PENDING_EMAIL_VALIDATION,
	PENDING_ACCOUNT_LINKING,
	AUTHENTICATED,
}

export interface IAuthContext {
	status: AuthStatus;
	user?: IUser;
	deviceToken?: IDeviceToken;
	sessionToken?: ISessionToken;
	setDeviceToken: SetValueAction<IDeviceToken | undefined>;
	resetAuth: (signOutRedirectUrl?: string) => Promise<void>;
	processSessionToken: () => void;
	getUser: () => void;
}

export const AuthContext = createContext<IAuthContext>(undefined as any);

const { isExpired, getRemainingTimeInSeconds, getTotalDurationInSeconds } =
	JsonWebTokenService;

const isTokenValid = (token?: IDeviceToken | ISessionToken): boolean => {
	return !!token && !!token.rawValue && !isExpired(token);
};

export const AuthProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const { AuthenticationService, LegacyUserService } = useService();

	const [status, setStatus] = useState<AuthStatus>(AuthStatus.LOADING);

	const { deviceToken, setDeviceToken, deleteDeviceToken } = useDeviceToken();

	const { userProfile, refreshUserProfile } = useUserProfile();
	const { authenticationType, deviceTokenRefreshTimeLimitInPercent } =
		useConfiguration();

	const isDeviceTokenValid: boolean = useMemo(() => {
		return isTokenValid(deviceToken);
	}, [deviceToken]);

	const { sessionToken, setSessionToken } = useSessionToken();

	const isSessionTokenValid: boolean = useMemo(() => {
		return isTokenValid(sessionToken) && isDeviceTokenValid;
	}, [sessionToken, isDeviceTokenValid]);

	const [user, setUser] = useState<IUser | undefined>(undefined);

	const isUserValid: boolean = useMemo(() => {
		return !!user && isSessionTokenValid;
	}, [user, isSessionTokenValid]);

	const resetAuth = useCallback(async () => {
		deleteDeviceToken();
		setSessionToken(undefined);
	}, [deleteDeviceToken, setSessionToken]);

	const getSessionToken = useCallback(async () => {
		const newSessionToken = await AuthenticationService.getSessionToken(
			deviceToken?.rawValue as string
		);
		setSessionToken(newSessionToken);
	}, [AuthenticationService, deviceToken?.rawValue, setSessionToken]);

	const getUser = useCallback(async () => {
		if (authenticationType === ConfigService.AuthenticationType.LEGACY) {
			const newUser = await LegacyUserService.getUser(
				sessionToken?.rawValue as string
			);
			setUser(newUser);
		} else {
			refreshUserProfile();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [LegacyUserService, authenticationType, sessionToken?.rawValue]);

	const processSessionToken = useCallbackWithLoading(async () => {
		if (!isSessionTokenValid) {
			try {
				await getSessionToken();
			} catch {
				setStatus(AuthStatus.PENDING_TC);
			}
		} else {
			try {
				await getUser();
				await refreshUserProfile();
			} catch {
				setStatus(AuthStatus.PENDING_OTP);
			}
		}
	}, [setStatus, isSessionTokenValid, getSessionToken, getUser]);

	useEffect(() => {
		if (isDeviceTokenValid) {
			const totalTime = getTotalDurationInSeconds(deviceToken!);
			const remainingTime = getRemainingTimeInSeconds(deviceToken!);
			if (
				remainingTime <
				Math.floor(totalTime * deviceTokenRefreshTimeLimitInPercent)
			) {
				(async () => {
					try {
						const newDeviceToken =
							await AuthenticationService.refreshDeviceToken(
								deviceToken?.rawValue as string
							);
						setDeviceToken(newDeviceToken);
					} catch {
						processSessionToken();
					}
				})();
			} else {
				processSessionToken();
			}
		} else {
			setStatus(AuthStatus.PENDING_OTP);
		}
	}, [
		processSessionToken,
		isDeviceTokenValid,
		setStatus,
		AuthenticationService,
		deviceToken?.rawValue,
		setDeviceToken,
		getUser,
		deviceToken,
		deviceTokenRefreshTimeLimitInPercent,
	]);

	useEffect(() => {
		if (userProfile) {
			setStatus(AuthStatus.AUTHENTICATED);
		}
	}, [userProfile]);

	useEffect(() => {
		if (
			authenticationType === ConfigService.AuthenticationType.TOKEN_ONLY
		) {
			if (userProfile && userProfile.myAcuvueId && userProfile.phone) {
				setUser({
					id: userProfile.myAcuvueId,
					phone: userProfile.phone,
					profile: {
						firstName: userProfile.firstName!,
						lastName: userProfile.lastName!,
						gender: userProfile.gender!,
						birthday: `${userProfile.birthMonth}-${userProfile.birthYear}`,
						email: userProfile.email!,
					},
				});
			}
		}
	}, [authenticationType, userProfile]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (sessionToken) {
				const totalTime = getTotalDurationInSeconds(sessionToken);
				const remainingTime = getRemainingTimeInSeconds(sessionToken);
				if (remainingTime < Math.floor(totalTime * 0.8)) {
					(async () => {
						const newSessionToken =
							await AuthenticationService.refreshSessionToken(
								sessionToken.rawValue
							);
						setSessionToken(newSessionToken);
					})();
				}
			}
		}, 1000 * 60);
		return () => {
			clearInterval(interval);
		};
	}, [sessionToken, AuthenticationService, setSessionToken]);

	return (
		<AuthContext.Provider
			value={{
				status,
				user: isUserValid ? user : undefined,
				deviceToken,
				sessionToken,
				setDeviceToken,
				resetAuth,
				processSessionToken,
				getUser,
			}}
		>
			{status !== AuthStatus.LOADING && children}
		</AuthContext.Provider>
	);
};
