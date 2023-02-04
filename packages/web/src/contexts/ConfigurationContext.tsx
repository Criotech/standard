import { createContext, FC, PropsWithChildren, useMemo } from "react";
import { useService } from "../hooks/useService";
import type { ConfigService } from "@myacuvue_thailand_web/services";

export const ConfigurationContext = createContext<ConfigService.Config>(
	undefined as any
);

export const ConfigurationProvider: FC<PropsWithChildren<{}>> = ({
	children,
}) => {
	const { ConfigService } = useService();
	const configuration = useMemo(
		() => ConfigService.getConfig(),
		[ConfigService]
	);
	return configuration ? (
		<ConfigurationContext.Provider value={configuration}>
			{children}
		</ConfigurationContext.Provider>
	) : (
		<></>
	);
};
