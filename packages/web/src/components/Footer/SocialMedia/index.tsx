import { ClassService, ConfigService } from "@myacuvue_thailand_web/services";
import { FC, ReactNode } from "react";
import "./index.scss";
import FacebookIcon, { IconSize } from "../../../icons/FacebookIcon";
import YouTubeIcon, {
	IconSize as YoutubeIconSize,
} from "../../../icons/YoutubeIcon";
import InstagramIcon, {
	IconSize as InstagramIconSize,
} from "../../../icons/InstagramIcon";
import LineIcon, { IconSize as LineIconSize } from "../../../icons/LineIcon";

interface IProps {
	socialNetworks: ConfigService.ISocialNetwork[];
	className?: string;
}

const socialNetworksIconsMap: Record<
	ConfigService.SocialNetworkIcons,
	ReactNode
> = {
	[ConfigService.SocialNetworkIcons.FACEBOOK]: (
		<FacebookIcon size={IconSize.LARGE} />
	),
	[ConfigService.SocialNetworkIcons.INSTAGRAM]: (
		<InstagramIcon size={InstagramIconSize.LARGE} />
	),
	[ConfigService.SocialNetworkIcons.YOUTUBE]: (
		<YouTubeIcon size={YoutubeIconSize.SMALL} />
	),
	[ConfigService.SocialNetworkIcons.LINE]: (
		<LineIcon size={LineIconSize.LARGE} />
	),
};

const SocialMedia: FC<IProps> = ({ socialNetworks, className }) => {
	const classNames = ClassService.createClassName(
		"social-media-list",
		className
	);

	return (
		<ul className={classNames}>
			{socialNetworks.map((item, index) => (
				<li className="list-item" key={index}>
					<a
						className="link"
						href={item.link}
						target="_blank"
						rel="noreferrer"
					>
						{socialNetworksIconsMap[item.icon]}
					</a>
				</li>
			))}
		</ul>
	);
};

export default SocialMedia;
