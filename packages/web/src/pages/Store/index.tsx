import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom-v5-compat";
import YourOpticalStore from "./YourOpticalStore";
import HomeDelivery from "./HomeDelivery";
import NavigationTabs from "../../components/NavigationTabs";
import Header from "../../components/Layout/Header";
import ShoppingBagIcon from "../../icons/ShoppingBagIcon";
import "./index.scss";
import GlobalNavigationPanel from "../../components/GlobalNavigationPanel";

const Store: FC<{}> = () => (
	<div className="store-page">
		<Header
			titleKey="storePage.opticalStore.yourOpticalStore"
			icon={<ShoppingBagIcon color="#003087" />}
		/>
		<NavigationTabs
			navItems={[
				{
					labelKey: "storePage.acuvueToHome",
					path: "/store/home-delivery",
				},
				{
					labelKey: "storePage.yourOpticalStore",
					path: "/store/your-optical-store",
				},
			]}
		/>
		<Routes>
			<Route
				path="*"
				element={<Navigate to="/store/your-optical-store" />}
			/>
			<Route path="home-delivery" element={<HomeDelivery />} />
			<Route path="your-optical-store" element={<YourOpticalStore />} />
		</Routes>
		<GlobalNavigationPanel />
	</div>
);

export default Store;
