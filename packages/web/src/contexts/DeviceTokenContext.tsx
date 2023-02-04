import {
	createContext,
	FC,
	PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
} from "react";
import {
	DeleteValueAction,
	SetValueAction,
	useStorage,
} from "../hooks/useStorage";
import {
	AuthenticationService,
	IDeviceToken,
	JsonWebTokenService,
} from "@myacuvue_thailand_web/services";
import { useConfiguration } from "../hooks/useConfiguration";

export interface IDeviceTokenContext {
	deviceToken?: IDeviceToken;
	setDeviceToken: SetValueAction<IDeviceToken | undefined>;
	deleteDeviceToken: DeleteValueAction;
}

export const DeviceTokenContext = createContext<IDeviceTokenContext>(
	undefined as any
);

const { getElapsedTimeInPercent } = JsonWebTokenService;

export const DeviceTokenProvider: FC<PropsWithChildren<{}>> = ({
	children,
}) => {
	const [deviceToken, setDeviceToken, deleteDeviceToken] =
		useStorage<IDeviceToken>("device-token");
	const { deviceTokenRefreshTimeLimitInPercent } = useConfiguration();

	const refreshDeviceToken = useCallback(
		async (_deviceToken: IDeviceToken) => {
			const newDeviceToken =
				await AuthenticationService.refreshDeviceToken(
					_deviceToken.rawValue
				);
			setDeviceToken(newDeviceToken);
		},
		[setDeviceToken]
	);

	useEffect(() => {
		if (deviceToken) {
			if (
				getElapsedTimeInPercent(deviceToken) >
					deviceTokenRefreshTimeLimitInPercent &&
				deviceTokenRefreshTimeLimitInPercent > 0
			) {
				(async () => {
					await refreshDeviceToken(deviceToken);
				})();
			}
		}
	}, [deviceToken, deviceTokenRefreshTimeLimitInPercent, refreshDeviceToken]);

	return (
		<DeviceTokenContext.Provider
			value={{
				deviceToken,
				setDeviceToken,
				deleteDeviceToken,
			}}
		>
			{children}
		</DeviceTokenContext.Provider>
	);
};

export const useDeviceToken = () => {
	return useContext(DeviceTokenContext);
};
