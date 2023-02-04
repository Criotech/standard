import { FC, useMemo } from "react";
import { WalletCoupon } from "@myacuvue_thailand_web/services";
import { useCoupon } from "../../../../hooks/useCoupon";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom-v5-compat";
import WalletCouponCard from "../../WalletCouponCard/index";
import "./index.scss";
import { useAsync } from "react-use";
import LoadingBlock from "../../../../components/LoadingBlock";

const WalletCouponList: FC<{}> = () => {
	const { getUserCoupons } = useCoupon();
	const location = useLocation();

	const isActivePage = useMemo(
		() => location.pathname === "/rewards/wallet/active",
		[location.pathname]
	);

	const { value, loading } = useAsync(
		() => getUserCoupons(),
		[getUserCoupons]
	);
	const userCoupons = useMemo(() => (value as WalletCoupon[]) || [], [value]);

	const filteredCoupons = useMemo(() => {
		if (isActivePage) {
			return userCoupons.filter((coupon) => coupon.status === "active");
		}
		return userCoupons.filter((coupon) => coupon.status !== "active");
	}, [isActivePage, userCoupons]);

	return (
		<div className="wallet-coupon-list">
			{loading ? (
				<LoadingBlock />
			) : (
				filteredCoupons.map((coupon) => {
					if (isActivePage) {
						return (
							<Link
								to={{
									pathname: `/wallet/${coupon.id}`,
									state: {
										coupon,
									},
								}}
								key={coupon.id}
							>
								<WalletCouponCard
									coupon={coupon}
									key={coupon.id}
								/>
							</Link>
						);
					}
					return <WalletCouponCard key={coupon.id} coupon={coupon} />;
				})
			)}
		</div>
	);
};

export default WalletCouponList;
