import { FC } from "react";
import HorizontalCoupon from "../../../components/HorizontalCoupon";
import OpticalStoreIcon from "../../../icons/OpticalStoreIcon";
import Text from "../../../components/Text";
import DeliveryIcon from "../../../icons/DeliveryIcon";
import "./index.scss";
import { IAcuvueCoupon } from "@myacuvue_thailand_web/services";
import moment from "moment";

interface IProps {
	coupon: IAcuvueCoupon;
}

const AcuvueCouponCard: FC<IProps> = ({ coupon }) => {
	const description = (
		<Text
			textKey="rewardsPage.acuvueCouponCard.expiringOn"
			data={{
				expiringDate: moment(coupon.validPeriod.to).format(
					"DD/MM/YYYY"
				),
			}}
		/>
	);

	const bonus = coupon.points && (
		<span>
			<span className="coupon-points">{coupon.points} </span>
			<Text textKey="rewardsPage.acuvueCouponCard.points" />
		</span>
	);

	const icons = [];
	if (coupon.isEligibleForInStore) {
		icons.push(<OpticalStoreIcon />);
	}
	if (coupon.isEligibleForHomeDelivery) {
		icons.push(<DeliveryIcon />);
	}

	return (
		<div className="acuvue-coupon-card">
			<HorizontalCoupon
				image={coupon.imageUrl}
				title={coupon.title}
				description={description}
				bonus={bonus}
				icons={icons}
				faded={false}
			/>
		</div>
	);
};

export default AcuvueCouponCard;
