import "./App.scss";
import { FC } from "react";
import { Layout as AntLayout } from "antd";
import LegacyRoutes from "./LegacyRoutes";
import Routes from "./Routes";
import { ConfigService } from "@myacuvue_thailand_web/services";
import { useConfiguration } from "../hooks/useConfiguration";
import RoutesForTokenOnlyFlow from "./RoutesForTokenOnlyFlow";
import { usePageView } from "../hooks/useTracking";

const routingByFlow: Record<ConfigService.RoutesType, FC> = {
	[ConfigService.RoutesType.LEGACY]: LegacyRoutes,
	[ConfigService.RoutesType.XIAM_FLOW]: Routes,
	[ConfigService.RoutesType.TOKEN_ONLY_FLOW]: RoutesForTokenOnlyFlow,
};

const App: FC<{}> = () => {
	const { routesType } = useConfiguration();
	const InstanceRoutes = routingByFlow[routesType];
	usePageView("", "");
	return (
		<AntLayout style={{ position: "relative" }}>
			<InstanceRoutes />
		</AntLayout>
	);
};

export default App;
