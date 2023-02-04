import { FC } from "react";
import { Affix } from "antd";
import NavigationToggle from "../../../components/NavigationToggle";
import AcuvueCatalog from "./AcuvueCatalog";
import "./index.scss";
import LifestyleCatalog from "./LifestyleCatalog";
import Text from "../../../components/Text";
import { Navigate, Routes, Route } from "react-router-dom-v5-compat";

const Catalog: FC<{}> = () => {
	return (
		<div className="catalog">
			<Affix offsetTop={60}>
				<NavigationToggle
					navItems={[
						{
							label: (
								<Text textKey="rewardsPage.catalog.acuvue" />
							),
							path: "/rewards/catalog/acuvue",
						},
						{
							label: (
								<Text textKey="rewardsPage.catalog.lifestyle" />
							),
							path: "/rewards/catalog/lifestyle",
						},
					]}
					className="catalog-navigation"
				/>
			</Affix>
			<Routes>
				<Route
					index
					path=""
					element={<Navigate to="/rewards/catalog/acuvue" />}
				/>
				<Route path="acuvue" element={<AcuvueCatalog />} />
				<Route path="lifestyle" element={<LifestyleCatalog />} />
			</Routes>
		</div>
	);
};

export default Catalog;
