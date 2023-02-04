import { FC } from "react";
import "./index.scss";
import { CampaignBanner } from "@myacuvue_thailand_web/services";
import { useService } from "../../../hooks/useService";

interface IProps {
	banner: CampaignBanner;
	className?: string;
}

const PromotionsBlock: FC<IProps> = ({ banner, className, ...props }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"promotions-image-container",
		className
	);

	return (
		<div className={classNames} {...props}>
			<a href={banner.redirectLink}>
				<img
					src={banner.imageUrl}
					alt={banner.alt}
					className="promotions-image"
				/>
			</a>
		</div>
	);
};

export default PromotionsBlock;
