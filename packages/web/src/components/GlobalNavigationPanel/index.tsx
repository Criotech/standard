import { FC, ReactNode } from "react";
import StoreIcon, { IconSize } from "../../icons/StoreIcon";
import HomeIcon from "../../icons/HomeIcon";
import PointsIcon from "../../icons/PointsIcon";
import "./index.scss";
import Text from "../Text";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import { NavLink } from "react-router-dom-v5-compat";
import { Affix } from "antd";
import RewardsIcon from "../../icons/RewardsIcon";

interface ILink {
	icon: ReactNode;
	name: TranslationKey;
	pathname: string;
	exact: boolean;
}

const GlobalNavigationPanel: FC<{}> = () => {
	const links: ILink[] = [
		{
			icon: <HomeIcon />,
			name: "globalNavigation.home",
			pathname: "/",
			exact: true,
		},
		{
			icon: <PointsIcon />,
			name: "globalNavigation.points",
			pathname: "/points",
			exact: false,
		},
		{
			icon: <RewardsIcon />,
			name: "globalNavigation.rewards",
			pathname: "/rewards",
			exact: false,
		},
		{
			icon: <StoreIcon size={IconSize.MEDIUM} />,
			name: "globalNavigation.store",
			pathname: "/store",
			exact: false,
		},
	];

	return (
		<Affix offsetBottom={0} className="global-navigation-panel">
			<ul className="nav-list">
				{links.map((link) => (
					<li key={link.pathname} className="nav-item">
						<NavLink
							to={link.pathname}
							className={({ isActive }) =>
								isActive ? "nav-link is-active" : "nav-link"
							}
							end={link.exact}
						>
							<p className="nav-item-icon">{link.icon}</p>
							<p className="nav-item-text">
								<Text textKey={link.name} />
							</p>
						</NavLink>
					</li>
				))}
			</ul>
		</Affix>
	);
};

export default GlobalNavigationPanel;
