import { FC, PropsWithChildren, useMemo } from "react";
import { LineProvider } from "./LineContext";
import { useStorage } from "../hooks/useStorage";
import LineProviderFake from "./LineProviderFake";
import { useConfiguration } from "../hooks/useConfiguration";

const LineProviderProxy: FC<PropsWithChildren<{}>> = ({ children }) => {
	const { lineConfig } = useConfiguration();
	const [disableLineAuthentication] = useStorage<boolean>(
		"disable-line-authentication",
		false
	);

	const shouldLoadRealProvider = useMemo(() => {
		return !(
			lineConfig &&
			!!lineConfig.allowFakeLineProvider &&
			disableLineAuthentication
		);
	}, [lineConfig, disableLineAuthentication]);

	return shouldLoadRealProvider ? (
		<LineProvider>{children}</LineProvider>
	) : (
		<LineProviderFake>{children}</LineProviderFake>
	);
};

export default LineProviderProxy;
