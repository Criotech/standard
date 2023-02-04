import { FC } from "react";
import HorizontalCoupon from "../../../components/HorizontalCoupon";
import OpticalStoreIcon from "../../../icons/OpticalStoreIcon";
import Text from "../../../components/Text";
import DeliveryIcon from "../../../icons/DeliveryIcon";
import "./index.scss";
import {
	IRedeemedWalletCoupon,
	IExpiredWalletCoupon,
	WalletCoupon,
} from "@myacuvue_thailand_web/services";
import moment from "moment";

interface IProps {
	coupon: WalletCoupon;
}

const WalletCouponCard: FC<IProps> = ({ coupon }) => {
	const description = (
		<Text
			textKey="rewardsPage.walletCouponCard.expiringOn"
			data={{
				expiringDate: moment(coupon.validPeriod.to).format(
					"DD/MM/YYYY"
				),
			}}
		/>
	);

	const bonusMultiplier = coupon.bonusMultiplier && (
		<span>
			<span className="coupon-multiplier">
				X{coupon.bonusMultiplier}{" "}
			</span>
			<Text textKey="rewardsPage.walletCouponCard.pointReward" />
		</span>
	);

	const icons = [];
	if (coupon.isEligibleForInStore) {
		icons.push(<OpticalStoreIcon />);
	}
	if (coupon.isEligibleForHomeDelivery) {
		icons.push(<DeliveryIcon />);
	}

	const isFaded = ["expired", "redeemed"].includes(coupon.status);

	const isRedeemed = (
		coupon: WalletCoupon
	): coupon is IRedeemedWalletCoupon => coupon.status === "redeemed";

	const isExpired = (coupon: WalletCoupon): coupon is IExpiredWalletCoupon =>
		coupon.status === "expired";

	return (
		<div className="wallet-coupon-card">
			{isRedeemed(coupon) && (
				<>
					<p className="wallet-coupon-status">
						<Text
							textKey="rewardsPage.walletCouponCard.redeemedOn"
							data={{
								redeemedDate: moment(
									coupon.redemptionDate
								).format("DD/MM/YYYY"),
							}}
						/>
					</p>
					<p className="wallet-coupon-store">
						{coupon.redemptionStoreName}
					</p>
				</>
			)}
			{isExpired(coupon) && (
				<p className="wallet-coupon-status">
					<Text
						textKey="rewardsPage.walletCouponCard.expiredOn"
						data={{
							expiredDate: moment(coupon.expirationDate).format(
								"DD/MM/YYYY"
							),
						}}
					/>
				</p>
			)}

			<HorizontalCoupon
				image={coupon.imageUrl}
				title={coupon.title}
				description={description}
				bonus={bonusMultiplier}
				icons={icons}
				faded={isFaded}
			/>
		</div>
	);
};

export default WalletCouponCard;
