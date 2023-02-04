import {
	TranslationKey,
	TranslationData,
} from "@myacuvue_thailand_web/services";
import { FC } from "react";
import Text from "../../../../components/Text";
import discountCouponIcon from "../../../../images/discount-coupon-icon.svg";
import "./index.scss";

interface IProps {
	emptyMessageKey: TranslationKey;
	emptyMessageData: TranslationData;
}

const EmptyView: FC<IProps> = ({ emptyMessageKey, emptyMessageData }) => (
	<div className="empty-view">
		<img className="empty-view-image" src={discountCouponIcon} alt="" />

		<p className="empty-view-text">
			<Text textKey={emptyMessageKey} data={emptyMessageData} />
		</p>
	</div>
);

export default EmptyView;
