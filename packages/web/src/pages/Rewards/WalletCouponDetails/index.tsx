import { FC } from "react";
import { WalletCoupon } from "@myacuvue_thailand_web/services";
import Header from "../../../components/Layout/Header";
import "./index.scss";
import Text from "../../../components/Text";
import DeliveryIcon from "../../../icons/DeliveryIcon";
import StoreIcon from "../../../icons/StoreIcon";
import { Divider } from "antd";
import DisplayHTML from "../../../components/DisplayHTML";
import moment from "moment";
import { useLocation } from "react-router-dom-v5-compat";
import GlobalNavigationPanel from "../../../components/GlobalNavigationPanel";

interface LocationProps {
	state: {
		coupon: WalletCoupon;
	};
}

const WalletCouponDetails: FC = () => {
	const location: LocationProps = useLocation();
	const { coupon } = location.state;

	return (
		<div className="wallet-coupon-details-page">
			<Header titleKey="rewardsPage.couponDetails.title" />
			<img
				className="coupon-cover-image"
				src={coupon.imageUrl}
				alt="Wallet Coupon Cover"
			/>

			<div className="coupon-details">
				<h1>{coupon.title}</h1>
				<p className="valid-period">
					<Text
						textKey="rewardsPage.couponDetails.validPeriod"
						data={{
							from: moment(coupon.validPeriod.from).format(
								"DD/MM/YYYY"
							),
							to: moment(coupon.validPeriod.to).format(
								"DD/MM/YYYY"
							),
						}}
					/>
				</p>

				<h2>
					{coupon.bonusMultiplier && (
						<span>
							<span className="coupon-multiplier">
								X{coupon.bonusMultiplier}{" "}
							</span>
							<Text textKey="rewardsPage.walletCouponCard.pointReward" />
						</span>
					)}
				</h2>

				{coupon.isEligibleForInStore && (
					<div className="coupon-is-eligible-for-in-store">
						<StoreIcon color="#003087" />
						<span className="is-eligible-text">
							<Text textKey="rewardsPage.couponDetails.eligibleForStore" />
						</span>
					</div>
				)}

				{coupon.isEligibleForHomeDelivery && (
					<div className="coupon-is-eligible-for-home-delivery">
						<DeliveryIcon color="#003087" />
						<span className="is-eligible-text">
							<Text textKey="rewardsPage.couponDetails.eligibleForHome" />
						</span>
					</div>
				)}
				<Divider plain />
				<h2>
					<Text textKey="rewardsPage.couponDetails.terms" />
				</h2>
				<DisplayHTML unsafeHTML={coupon.terms} />
			</div>
			<GlobalNavigationPanel />
		</div>
	);
};

export default WalletCouponDetails;
