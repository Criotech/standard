import { FC, ReactNode } from "react";
import "./index.scss";
import Text from "../../../components/Text";
import NextIcon from "../../../icons/NextIcon";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import { Link } from "react-router-dom";
import PointsIcon from "../../../icons/PointsIcon";
import RewardsIcon from "../../../icons/RewardsIcon";

interface IProfileMenuList {
	name: TranslationKey;
	pathname: string;
	icon: ReactNode;
}

const ProfileMenu: FC<{}> = () => {
	const profileMenuList: IProfileMenuList[] = [
		{
			name: "profileAndSettingsPage.points",
			pathname: "/points",
			icon: <PointsIcon color="#6c7680" />,
		},
		{
			name: "profileAndSettingsPage.rewardsWallet",
			pathname: "/rewards",
			icon: <RewardsIcon color="#6c7680" />,
		},
	];

	return (
		<div>
			{profileMenuList.map(({ name, pathname, icon }) => (
				<div key={name} className="profile-menu">
					<Link to={pathname} className="menu-item-link">
						<div className="menu-item-name">
							{icon}
							<div>
								<span className="menu">
									<Text textKey={name} />
								</span>
							</div>
						</div>
						<NextIcon color="#6c7680" />
					</Link>
				</div>
			))}
		</div>
	);
};

export default ProfileMenu;
