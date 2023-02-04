import { FC, useMemo } from "react";
import { ILifestyleCoupon } from "@myacuvue_thailand_web/services";
import { useCoupon } from "../../../../hooks/useCoupon";
import Carousel from "../../../../components/Carousel";
import LifestyleCouponCard from "../../LifestyleCouponCard";
import { Link } from "react-router-dom";
import Text from "../../../../components/Text";
import "./index.scss";
import { useGroupedCoupons } from "../../../../hooks/useGroupedCoupons";
import ThinDivider from "../../../../components/ThinDivider";
import { useAsync } from "react-use";
import LoadingBlock from "../../../../components/LoadingBlock";

const LifestyleCatalog: FC<{}> = () => {
	const { getLifestyleCoupons } = useCoupon();
	const { value, loading } = useAsync(
		() => getLifestyleCoupons(),
		[getLifestyleCoupons]
	);
	const lifestyleCoupons = value as ILifestyleCoupon[];
	const { getGroupedCoupons } = useGroupedCoupons();

	const featuredCoupons = useMemo(
		() =>
			lifestyleCoupons &&
			lifestyleCoupons.filter((coupon) => coupon.isFeatured),
		[lifestyleCoupons]
	);

	const groupedFeaturedCoupons =
		featuredCoupons && getGroupedCoupons(featuredCoupons);
	const groupedLifestyleCoupons =
		featuredCoupons && getGroupedCoupons(lifestyleCoupons);

	return (
		<div className="lifestyle-catalog">
			{loading ? (
				<LoadingBlock />
			) : (
				<>
					<p className="redeem-title">
						<Text textKey="rewardsPage.lifestyleReward.select" />
					</p>
					<h2 className="rewards-featured">
						<Text textKey="rewardsPage.lifestyleReward.featured" />
					</h2>
					<p className="redeem-new-rewards">
						<Text textKey="rewardsPage.lifestyleReward.newRewards" />
					</p>

					<Carousel>
						{groupedFeaturedCoupons.map(
							(coupons: ILifestyleCoupon[], couponIndex) => (
								<div
									className="grouped-coupons"
									key={couponIndex}
								>
									{coupons.map((coupon) => {
										const couponCards = [
											<Link
												className="lifestyle-coupon-card-link"
												to={{
													pathname: `/lifestyle/${coupon.id}`,
													state: {
														coupon,
													},
												}}
												key={coupon.id}
											>
												<LifestyleCouponCard
													coupon={coupon}
												/>
											</Link>,
										];
										if (coupons.length === 1) {
											couponCards.push(
												<div className="lifestyle-coupon-card-filler" />
											);
										}
										return couponCards;
									})}
								</div>
							)
						)}
					</Carousel>
					<ThinDivider />
					<h2 className="other-rewards">
						<Text textKey="rewardsPage.lifestyleReward.otherRewards" />
					</h2>
					{groupedLifestyleCoupons.map(
						(coupons: ILifestyleCoupon[], couponIndex) => (
							<div className="grouped-coupons" key={couponIndex}>
								{coupons.map((coupon) => {
									const couponCards = [
										<Link
											className="lifestyle-coupon-card-link"
											to={{
												pathname: `/lifestyle/${coupon.id}`,
												state: {
													coupon,
												},
											}}
											key={coupon.id}
										>
											<LifestyleCouponCard
												coupon={coupon}
											/>
										</Link>,
									];
									if (coupons.length === 1) {
										couponCards.push(
											<div className="lifestyle-coupon-card-filler" />
										);
									}
									return couponCards;
								})}
							</div>
						)
					)}
				</>
			)}
		</div>
	);
};

export default LifestyleCatalog;
