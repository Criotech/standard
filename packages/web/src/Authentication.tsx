import { FC, PropsWithChildren } from "react";
import { DeviceTokenProvider } from "./contexts/DeviceTokenContext";
import LineProviderProxy from "./contexts/LineProviderProxy";
import { AuthProvider } from "./contexts/AuthContext";
import { XiamProvider } from "./contexts/XiamContext";
import { ConfigService } from "@myacuvue_thailand_web/services";
import { useConfiguration } from "./hooks/useConfiguration";
import { SessionTokenProvider } from "./contexts/SessionTokenContext";
import { NeoAuthProvider } from "./contexts/NeoAuthContext";
import { UserProfileProvider } from "./contexts/UserProfileContext";

const LineAuthentication: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<DeviceTokenProvider>
			<SessionTokenProvider>
				<LineProviderProxy>
					<UserProfileProvider>
						<AuthProvider>{children}</AuthProvider>
					</UserProfileProvider>
				</LineProviderProxy>
			</SessionTokenProvider>
		</DeviceTokenProvider>
	);
};

const XiamAuthentication: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<DeviceTokenProvider>
			<XiamProvider>
				<SessionTokenProvider>
					<UserProfileProvider>
						<NeoAuthProvider>{children}</NeoAuthProvider>
					</UserProfileProvider>
				</SessionTokenProvider>
			</XiamProvider>
		</DeviceTokenProvider>
	);
};

const TokenOnlyAuthentication: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<DeviceTokenProvider>
			<SessionTokenProvider>
				<UserProfileProvider>
					<AuthProvider>{children}</AuthProvider>
				</UserProfileProvider>
			</SessionTokenProvider>
		</DeviceTokenProvider>
	);
};

const authTypeMap: Record<
	ConfigService.AuthenticationType,
	FC<PropsWithChildren<{}>>
> = {
	[ConfigService.AuthenticationType.LEGACY]: LineAuthentication,
	[ConfigService.AuthenticationType.XIAM]: XiamAuthentication,
	[ConfigService.AuthenticationType.TOKEN_ONLY]: TokenOnlyAuthentication,
};

const Authentication: FC<PropsWithChildren<{}>> = ({ children }) => {
	const { authenticationType } = useConfiguration();
	const InstanceAuth = authTypeMap[authenticationType];

	return <InstanceAuth>{children}</InstanceAuth>;
};

export default Authentication;
