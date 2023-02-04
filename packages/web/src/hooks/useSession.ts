import { useCallback } from "react";
import { useService } from "./useService";
import { useXiam } from "../contexts/XiamContext";
import { useSessionToken } from "../contexts/SessionTokenContext";
import { useCallbackWithLoading } from "./useCallbackWithLoading";
import { useConfiguration } from "./useConfiguration";
import { ConfigService, WindowService } from "@myacuvue_thailand_web/services";

interface IUseSession {
	startSession: () => Promise<void>;
}

export const useSession = (): IUseSession => {
	const { SessionService } = useService();
	const { getXiamToken } = useXiam();
	const { setSessionToken } = useSessionToken();
	const { region, domainInstanceEnvMap } = useConfiguration();
	const instanceEnv = ConfigService.getCurrentInstanceEnv();

	const redirectUserFromOtherRegion = useCallback(
		(userRegion) => {
			if (instanceEnv) {
				const originalUserDomain =
					domainInstanceEnvMap[userRegion as ConfigService.Region][
						instanceEnv.env
					];

				WindowService.redirect(`${originalUserDomain}/sign-in`);
			}
		},
		[domainInstanceEnvMap, instanceEnv]
	);

	const startSession = useCallbackWithLoading(async () => {
		const xiamToken = await getXiamToken();
		if (xiamToken) {
			const sessionToken = await SessionService.startSession(
				xiamToken.rawValue
			);

			const userRegion = sessionToken.payload.userId.substring(0, 3);

			if (region !== userRegion) {
				redirectUserFromOtherRegion(userRegion);
			} else {
				setSessionToken(sessionToken);
			}
		}
	}, [
		getXiamToken,
		SessionService,
		region,
		setSessionToken,
		redirectUserFromOtherRegion,
	]);

	return {
		startSession,
	};
};
