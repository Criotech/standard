import { FC } from "react";
import Text from "../../../components/Text";
import platinumBadge from "../../../images/platinum-badge.png";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import pointBadge from "../../../images/point-badge.svg";
import couponRewardsIcon from "../../../images/Acuvue_Icon-Design_V1_Gift-box_export.jpg";
import birthdayIcon from "../../../images/birthday-icon.svg";
import rewardIcon from "../../../images/Acuvue_Icon-Design_V1_Reward_export.jpg";
import complementaryIcon from "../../../images/Acuvue_Icon-Design_V1_Optical_export.jpg";
import lensIcon from "../../../images/Acuvue_Icon-Design_V1_Lenses_export.jpg";
import specialMemberIcon from "../../../images/Acuvue_Icon-Design_V1_Point_export.jpg";
import "./index.scss";

interface IPlatinumViewList {
	icon: string;
	title: TranslationKey;
	description: TranslationKey;
}

const platinumViewList: IPlatinumViewList[] = [
	{
		icon: couponRewardsIcon,
		title: "membershipPage.platinumView.gift",
		description: "membershipPage.platinumView.giftDescription",
	},
	{
		icon: birthdayIcon,
		title: "membershipPage.platinumView.platinumBirthdayMonth",
		description: "membershipPage.platinumView.platinumBirthdayDescription",
	},
	{
		icon: pointBadge,
		title: "membershipPage.platinumView.platinumPurchase",
		description: "membershipPage.platinumView.platinumPurchaseDescription",
	},
	{
		icon: rewardIcon,
		title: "membershipPage.platinumView.platinumRedeem",
		description: "membershipPage.platinumView.platinumRedeemDescription",
	},
	{
		icon: complementaryIcon,
		title: "membershipPage.memberView.platinumComplementaryTest",
		description:
			"membershipPage.memberView.platinumComplementaryTestDescription",
	},
	{
		icon: lensIcon,
		title: "membershipPage.memberView.platinumComplementaryContactLens",
		description:
			"membershipPage.memberView.platinumComplementaryContactLensDescription",
	},
	{
		icon: specialMemberIcon,
		title: "membershipPage.memberView.platinumSpecialMember",
		description:
			"membershipPage.memberView.platinumSpecialMemberDescription",
	},
];

const PlatinumView: FC = () => {
	return (
		<div className="platinum-view">
			<div className="platinum-badge-view">
				<img
					className="platinum-badge-image"
					src={platinumBadge}
					alt="Platinum Badge"
				/>
				<p className="platinum-point">
					<Text
						textKey="membershipPage.platinumView.points"
						data={{
							platinumPoints: "600",
						}}
					/>
				</p>
			</div>

			<h1>
				<Text textKey="membershipPage.platinumBenefits" />
			</h1>
			{platinumViewList.map(({ icon, title, description }) => (
				<div key={title}>
					<img
						className="platinum-image"
						src={icon}
						alt="Platinum View"
					/>
					<h2>
						<Text textKey={title} />
					</h2>
					<p>
						<Text textKey={description} />
					</p>
				</div>
			))}
		</div>
	);
};

export default PlatinumView;
