import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom-v5-compat";
import { Affix } from "antd";
import NavigationTabs from "../../components/NavigationTabs";
import MemberView from "./MemberView";
import GlobalNavigationPanel from "../../components/GlobalNavigationPanel";
import PlatinumView from "./PlatinumView";
import "./index.scss";
import Header from "../../components/Layout/Header";
import ScanCodeButton from "../../components/ScanCodeButton";

const Membership: FC<{}> = () => (
	<div className="membership-page">
		<Header titleKey="drawer.membership" icon={<ScanCodeButton />} />
		<main>
			<Affix>
				<NavigationTabs
					navItems={[
						{
							labelKey: "membershipPage.platinum",
							path: "/membership/platinum",
						},
						{
							labelKey: "membershipPage.member",
							path: "/membership/member",
						},
					]}
				/>
			</Affix>
			<Routes>
				<Route index element={<Navigate to="/membership/platinum" />} />
				<Route path="platinum" element={<PlatinumView />} />
				<Route path="member" element={<MemberView />} />
			</Routes>
			<GlobalNavigationPanel />
		</main>
	</div>
);

export default Membership;
