import { FC } from "react";
import Text from "../../../components/Text";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import pointBadge from "../../../images/point-badge.svg";
import couponRewardsIcon from "../../../images/deco-icon-coupon-rewards.svg";
import birthdayIcon from "../../../images/birthday-icon.svg";
import rewardsBadge from "../../../images/Acuvue_Icon-Design_V1_Reward_export.jpg";
import complementaryIcon from "../../../images/Acuvue_Icon-Design_V1_Optical_export.jpg";
import lensIcon from "../../../images/Acuvue_Icon-Design_V1_Lenses_export.jpg";
import specialMemberIcon from "../../../images/Acuvue_Icon-Design_V1_Trophy_export.jpg";
import "./index.scss";

interface IMemberViewList {
	icon: string;
	title: TranslationKey;
	description: TranslationKey;
	eVoucherValue?: number;
}

const MemberView: FC<{}> = () => {
	const memberViewList: IMemberViewList[] = [
		{
			icon: couponRewardsIcon,
			title: "membershipPage.memberView.memberGift",
			description: "membershipPage.memberView.memberGiftDescription",
			eVoucherValue: 500,
		},
		{
			icon: birthdayIcon,
			title: "membershipPage.memberView.memberBirthdayMonth",
			description: "membershipPage.memberView.memberBirthdayDescription",
		},
		{
			icon: pointBadge,
			title: "membershipPage.memberView.memberPurchase",
			description: "membershipPage.memberView.memberPurchaseDescription",
		},
		{
			icon: rewardsBadge,
			title: "membershipPage.memberView.memberRedeem",
			description: "membershipPage.memberView.memberRedeemDescription",
		},
		{
			icon: complementaryIcon,
			title: "membershipPage.memberView.memberComplementaryTest",
			description:
				"membershipPage.memberView.memberComplementaryTestDescription",
		},
		{
			icon: lensIcon,
			title: "membershipPage.memberView.memberComplementaryContactLens",
			description:
				"membershipPage.memberView.memberComplementaryContactLensDescription",
		},
		{
			icon: specialMemberIcon,
			title: "membershipPage.memberView.memberSpecialMember",
			description:
				"membershipPage.memberView.memberSpecialMemberDescription",
		},
	];

	return (
		<div className="membership-member-view">
			<h1>
				<Text textKey="aboutAcuvuePage.memberBenefits" />
			</h1>
			{memberViewList.map(
				({ icon, title, description, eVoucherValue }) => (
					<div key={title}>
						<img
							className="member-image"
							src={icon}
							alt="Member View"
						/>

						<h2>
							{eVoucherValue !== undefined ? (
								<Text
									textKey={title}
									data={{ eVoucherValue }}
								/>
							) : (
								<Text textKey={title} />
							)}
						</h2>
						<p>
							{eVoucherValue !== undefined ? (
								<Text
									textKey={description}
									data={{ eVoucherValue }}
								/>
							) : (
								<Text textKey={description} />
							)}
						</p>
					</div>
				)
			)}
		</div>
	);
};

export default MemberView;
