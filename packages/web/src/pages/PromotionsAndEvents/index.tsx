import GlobalNavigationPanel from "../../components/GlobalNavigationPanel";
import Iframe from "../../components/Iframe";
import Header from "../../components/Layout/Header";
import "./index.scss";
import { useConfiguration } from "../../hooks/useConfiguration";

const PromotionsAndEvents = () => {
	const { promoEventsIFrameUrl } = useConfiguration();

	return (
		<div className="promotions-events">
			<Header titleKey="drawer.promotions" />
			{promoEventsIFrameUrl && <Iframe url={promoEventsIFrameUrl} />}
			<GlobalNavigationPanel />
		</div>
	);
};

export default PromotionsAndEvents;
