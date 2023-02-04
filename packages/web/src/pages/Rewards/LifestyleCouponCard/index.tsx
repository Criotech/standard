import { FC } from "react";
import {
	ILifestyleCoupon,
	TranslationKey,
} from "@myacuvue_thailand_web/services";
import VerticalCoupon from "../../../components/VerticalCoupon";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import CouponPoints from "../../../components/CouponPoints";

interface IProps {
	coupon: ILifestyleCoupon;
}

const LifestyleCouponCard: FC<IProps> = ({ coupon }) => {
	const tags: TranslationKey[] = [];
	if (coupon.isPlatinum) {
		tags.push("couponTag.platinum");
	}
	if (coupon.tag) {
		if (coupon.tag === "new") {
			tags.push("couponTag.new");
		} else if (coupon.tag === "hot") {
			tags.push("couponTag.hot");
		}
	}

	return (
		<div className="lifestyle-coupon-card">
			<VerticalCoupon
				image={coupon.imageUrl}
				value={<CouponPoints value={coupon.points.toString()} />}
				title={coupon.title}
				subTitle={coupon.issuer}
				button={
					<Button>
						<Text textKey="rewardsPage.lifestylecouponCard.points" />
					</Button>
				}
				validity={coupon.validPeriod.to}
				tags={tags}
			/>
		</div>
	);
};

export default LifestyleCouponCard;
