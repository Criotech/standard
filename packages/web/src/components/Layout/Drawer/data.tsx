import { TranslationKey } from "@myacuvue_thailand_web/services";
import myacuvueIcon from "../../../images/myacuvue-icon.png";
import membershipIcon from "../../../images/membership-icon.svg";
import PromotionIcon from "../../../icons/PromotionIcon";
import { ReactNode } from "react";

type DataProps = {
	icon: ReactNode;
	link: string;
	textKey: TranslationKey;
}[];

export const data: DataProps = [
	{
		link: "/promotions-events",
		textKey: "drawer.promotions",
		icon: <PromotionIcon />,
	},
	{
		link: "/membership",
		textKey: "drawer.membership",
		icon: (
			<img
				src={membershipIcon}
				alt="drawer.membership"
				className="membership-icon"
			/>
		),
	},
	{
		link: "/about",
		textKey: "drawer.about",
		icon: (
			<img
				src={myacuvueIcon}
				alt="drawer.about"
				className="acuvue-icon"
			/>
		),
	},
];
