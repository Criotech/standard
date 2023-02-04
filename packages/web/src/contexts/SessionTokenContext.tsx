import {
	createContext,
	FC,
	PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
} from "react";

import { useSessionStorage, SetValueAction } from "../hooks/useSessionStorage";
import {
	ISessionToken,
	AuthenticationService,
	JsonWebTokenService,
} from "@myacuvue_thailand_web/services";

export interface ISessionTokenContext {
	sessionToken?: ISessionToken;
	setSessionToken: SetValueAction<ISessionToken | undefined>;
}

export const SessionTokenContext = createContext<ISessionTokenContext>(
	undefined as any
);

const { getElapsedTimeInPercent } = JsonWebTokenService;

export const SessionTokenProvider: FC<PropsWithChildren<{}>> = ({
	children,
}) => {
	const [sessionToken, setSessionToken] =
		useSessionStorage<ISessionToken>("session-token");

	const refreshSessionToken = useCallback(
		async (_sessionToken: ISessionToken) => {
			const newSessionToken =
				await AuthenticationService.refreshSessionToken(
					_sessionToken.rawValue
				);
			setSessionToken(newSessionToken);
		},
		[setSessionToken]
	);

	useEffect(() => {
		if (sessionToken) {
			const percent = 0.8;
			if (getElapsedTimeInPercent(sessionToken) > percent) {
				(async () => {
					await refreshSessionToken(sessionToken);
				})();
			}
		}
	}, [sessionToken, refreshSessionToken]);

	return (
		<SessionTokenContext.Provider
			value={{
				sessionToken,
				setSessionToken,
			}}
		>
			{children}
		</SessionTokenContext.Provider>
	);
};

export const useSessionToken = () => {
	return useContext(SessionTokenContext);
};
