import { FC } from "react";
import { IAcuvueCoupon } from "@myacuvue_thailand_web/services";
import { useCoupon } from "../../../../hooks/useCoupon";
import { Link } from "react-router-dom";
import AcuvueCouponCard from "../../AcuvueCouponCard";
import { useAsync } from "react-use";
import LoadingBlock from "../../../../components/LoadingBlock";

const AcuvueCatalog: FC<{}> = () => {
	const { getAcuvueCoupons } = useCoupon();

	const { value, loading } = useAsync(
		() => getAcuvueCoupons(),
		[getAcuvueCoupons]
	);
	const acuvueCoupons = value as IAcuvueCoupon[];

	return (
		<>
			{loading ? (
				<LoadingBlock />
			) : (
				acuvueCoupons.map((coupon) => (
					<Link
						to={{
							pathname: `/catalog/${coupon.id}`,
							state: {
								coupon,
							},
						}}
						key={coupon.id}
					>
						<AcuvueCouponCard coupon={coupon} />
					</Link>
				))
			)}
		</>
	);
};

export default AcuvueCatalog;
