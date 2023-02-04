import { FC } from "react";
import PointsDescription from "./PointsDescription";
import SampleProductCatalog from "./SampleProductCatalog";
import Header from "../../components/Layout/Header";
import "./index.scss";
import GlobalNavigationPanel from "../../components/GlobalNavigationPanel";
import ThinDivider from "../../components/ThinDivider";

const AboutMyAcuvuePoints: FC<{}> = () => (
	<>
		<Header titleKey="aboutPointsPage.aboutMyAcuvuePoints.title.masthead" />
		<PointsDescription />
		<ThinDivider />
		<SampleProductCatalog />
		<GlobalNavigationPanel />
	</>
);
export default AboutMyAcuvuePoints;
