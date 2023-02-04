import {
	createContext,
	FC,
	PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
} from "react";
import {
	Configuration,
	InteractionRequiredAuthError,
	PopupRequest,
	PublicClientApplication,
} from "@azure/msal-browser";
import {
	AzureConfigurationService,
	JsonWebToken,
	JsonWebTokenService,
} from "@myacuvue_thailand_web/services";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { undefinedContext } from "./undefinedContext";
import { useBoolean } from "react-use";
import { Status, useSnackbar } from "../hooks/useSnackbar";

const { getConfig } = AzureConfigurationService;
const xiamConfig = getConfig()!;

const msalConfig: Configuration = {
	auth: {
		clientId: xiamConfig.clientId,
		authority: xiamConfig.policies.login.authority,
		knownAuthorities: [xiamConfig.authorityDomain],
		redirectUri: window.location.origin + "/redirect.html",
	},
	cache: {
		cacheLocation: "localStorage",
		storeAuthStateInCookie: false,
	},
	system: {
		asyncPopups: true,
	},
};

const msalInstance = new PublicClientApplication(msalConfig);

interface IXiamContext {
	getXiamToken: () => Promise<JsonWebToken | undefined>;
	registrationPopup: () => Promise<void>;
	loginPopup: () => Promise<void>;
	updatePassword: () => Promise<void>;
	logout: (postLogoutRedirectUri?: string) => Promise<void>;
	loginRedirect: () => Promise<void>;
	isForgotPassword: boolean;
}

const XiamContext = createContext<IXiamContext>(undefinedContext);

const registrationPopupRequest: PopupRequest = {
	scopes: [xiamConfig.clientId],
	authority: xiamConfig.policies.registration.authority,
	redirectUri: window.location.origin + "/email/registration",
	extraQueryParameters: xiamConfig.policies.registration.extraQueryParameters,
};

const loginPopupRequest: PopupRequest = {
	scopes: [xiamConfig.clientId],
	authority: xiamConfig.policies.login.authority,
	extraQueryParameters: xiamConfig.policies.login.extraQueryParameters,
};

const loginRedirectRequest: PopupRequest = {
	scopes: [xiamConfig.clientId],
	authority: xiamConfig.policies.login.authority,
	redirectUri: window.location.origin + "/sign-in",
	extraQueryParameters: xiamConfig.policies.login.extraQueryParameters,
};

const updatePasswordRequest: PopupRequest = {
	scopes: [xiamConfig.clientId],
	authority: xiamConfig.policies.updatePassword.authority,
	extraQueryParameters:
		xiamConfig.policies.updatePassword.extraQueryParameters,
};

export const XiamInternalProvider: FC<PropsWithChildren<{}>> = ({
	children,
}) => {
	const { instance, accounts } = useMsal();
	const [isForgotPassword, setIsForgotPassword] = useBoolean(false);
	const [isLogoutInProgress, setIsLogoutInProgress] = useBoolean(false);

	const { showSnackbar } = useSnackbar();

	const registrationPopup = useCallback(async () => {
		await instance.loginRedirect(registrationPopupRequest);
	}, [instance]);

	const loginPopup = useCallback(async () => {
		const authenticationResult = await instance.loginPopup(
			loginPopupRequest
		);
		const decodedToken = JsonWebTokenService.parse(
			authenticationResult.idToken
		);
		const _isForgotPassword = Boolean(
			decodedToken.payload.isForgotPassword
		);
		if (_isForgotPassword) {
			setIsForgotPassword(true);
		}
	}, [instance, setIsForgotPassword]);

	const logout = useCallback(
		async (postLogoutRedirectUri?: string) => {
			try {
				if (!isLogoutInProgress) {
					setIsLogoutInProgress(true);
					await new Promise((resolve) => setTimeout(resolve, 1));
					await instance.logout({
						postLogoutRedirectUri,
					});
				}
			} finally {
				setIsLogoutInProgress(false);
			}
		},
		[instance, isLogoutInProgress, setIsLogoutInProgress]
	);

	const updatePassword = useCallback(async () => {
		await instance.loginPopup(updatePasswordRequest);
		showSnackbar(Status.SUCCESS, "updatePassword.successSnackbar");
	}, [instance, showSnackbar]);

	const getXiamToken = useCallback(async () => {
		await instance.handleRedirectPromise();
		if (accounts.length < 1) {
			return undefined;
		}

		try {
			const authenticationResult = await instance.acquireTokenSilent({
				scopes: [xiamConfig.clientId],
				account: accounts[0],
			});
			return JsonWebTokenService.parse(authenticationResult.idToken);
		} catch (error) {
			if (
				error instanceof InteractionRequiredAuthError &&
				!isLogoutInProgress
			) {
				await logout();
			} else {
				throw error;
			}
		}
	}, [accounts, instance, isLogoutInProgress, logout]);

	const loginRedirect = useCallback(async () => {
		await instance.loginRedirect(loginRedirectRequest);
	}, [instance]);

	useEffect(() => {
		if (accounts.length > 0) {
			const idTokenClaims = accounts[0].idTokenClaims;
			const _isForgotPassword = Boolean(
				idTokenClaims && idTokenClaims.isForgotPassword
			);
			if (_isForgotPassword) {
				setIsForgotPassword(true);
			}
		}
	}, [accounts, setIsForgotPassword]);

	return (
		<XiamContext.Provider
			value={{
				registrationPopup,
				loginPopup,
				updatePassword,
				logout,
				getXiamToken,
				loginRedirect,
				isForgotPassword,
			}}
		>
			{children}
		</XiamContext.Provider>
	);
};

export const XiamProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<MsalProvider instance={msalInstance}>
			<XiamInternalProvider>{children}</XiamInternalProvider>
		</MsalProvider>
	);
};

export const useXiam = () => useContext(XiamContext);
