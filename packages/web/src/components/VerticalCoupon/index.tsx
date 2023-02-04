import { TranslationKey } from "@myacuvue_thailand_web/services";
import { FC, ReactNode } from "react";
import { Divider } from "antd";
import "./index.scss";
import Text from "../Text";
import moment from "moment";
import TagLabel from "../TagLabel";

export interface IProps {
	image: string;
	title: string;
	subTitle: string;
	validity: string;
	value?: ReactNode;
	button?: ReactNode;
	tags?: TranslationKey[];
}

const VerticalCoupon: FC<IProps> = ({
	image,
	title,
	subTitle,
	value,
	validity,
	tags,
	button,
}) => (
	<div className="vertical-coupon">
		<div className="image-wrapper">
			<img src={image} alt="coupon" className="vertical-coupon-image" />

			{tags && tags.length > 0 && (
				<div className="tags">
					{tags.map((tag) => (
						<TagLabel key={tag} labelKey={tag} />
					))}
				</div>
			)}
		</div>

		<div className="vertical-coupon-details">
			<div className="card-top">
				<h2 className="coupon-title">{title}</h2>
				<p className="sub-title">{subTitle}</p>
				<p className="coupon-validity">
					<Text
						textKey="rewardsPage.verticalCoupon.validTill"
						data={{
							validity: moment(validity).format("DD/MM/YYYY"),
						}}
					/>
				</p>
			</div>

			<Divider dashed />

			<div className="card-bottom">
				{value}

				{button}
			</div>
		</div>
	</div>
);

export default VerticalCoupon;
