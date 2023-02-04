import { FC, PropsWithChildren, StrictMode } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import App from "./pages/App";
import { UpdatePrompt } from "./components/UpdatePrompt";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { ConfigurationProvider } from "./contexts/ConfigurationContext";
import Authentication from "./Authentication";
import StyleProvider from "./contexts/StyleProvider";
import { CompatRouter } from "react-router-dom-v5-compat";
import MaintenanceBanner from "./components/MaintenanceBanner";

const RootProviders: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<ConfigurationProvider>
			<StyleProvider>
				<LoadingProvider>
					<LanguageProvider>
						<MaintenanceBanner>
							<Authentication>
								<BrowserRouter>
									<CompatRouter>
										<ScrollToTop />
										<UpdatePrompt />
										{children}
									</CompatRouter>
								</BrowserRouter>
							</Authentication>
						</MaintenanceBanner>
					</LanguageProvider>
				</LoadingProvider>
			</StyleProvider>
		</ConfigurationProvider>
	);
};

const Root: FC<{}> = () => (
	<StrictMode>
		<RootProviders>
			<App />
		</RootProviders>
	</StrictMode>
);

export default Root;
