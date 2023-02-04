import { Divider } from "antd";
import { FC, useContext, useState } from "react";
import Text from "../../../components/Text";
import { useCoupon } from "../../../hooks/useCoupon";
import { usePoints } from "../../../hooks/usePoints";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import NonEmptyCartView from "../NonEmptyCartView";
import RewardsPoints from "../RewardsPoints";
import EmptyCartView from "../EmptyCartVIew";
import "./index.scss";
import { LifestyleCartContext } from "../../../contexts/LifestyleCartContext";
import NonEmptyCartSuccessModal from "../NonEmptyCartView/NonEmptyCartSuccessModal";
import { useAsync, useAsyncRetry } from "react-use";
import LoadingBlock from "../../../components/LoadingBlock";
import GlobalNavigationPanel from "../../../components/GlobalNavigationPanel";
import Header from "../../../components/Layout/Header";
import CartButton from "../../../components/CartButton";
import { ProfileCompleteness } from "@myacuvue_thailand_web/services";

const Cart: FC<{}> = () => {
	const { getUserPoints } = usePoints();
	const { profileCompleteness } = useUserProfile();
	const { getLifestyleCoupons } = useCoupon();
	const { quantityInCart } = useContext(LifestyleCartContext);
	const [isSuccessModalOpen, setSuccessModalOpen] = useState<boolean>(false);
	const { value: points, loading: isPointsLoading } = useAsync(
		() => getUserPoints(),
		[getUserPoints]
	);

	const { value: coupons, retry: refreshCoupons } = useAsyncRetry(
		() => getLifestyleCoupons(),
		[getLifestyleCoupons]
	);

	return (
		<div className="cart-page">
			<Header titleKey="cart.mastheadTitle" icon={<CartButton />} />
			<main>
				<div className="available-points-container">
					{isPointsLoading && <LoadingBlock />}
					{profileCompleteness === ProfileCompleteness.COMPLETE &&
						!isPointsLoading && <RewardsPoints points={points} />}
					{profileCompleteness === ProfileCompleteness.INCOMPLETE &&
						!isPointsLoading && (
							<p className="available-points">
								<Text
									textKey="rewardsPage.cart.availablePoints"
									data={{
										availablePoints: 0,
									}}
								/>
							</p>
						)}
				</div>

				<Divider plain className="thicker" />

				{quantityInCart === 0 && <EmptyCartView />}

				{points && coupons && (
					<NonEmptyCartView
						coupons={coupons}
						points={points}
						refreshCoupons={refreshCoupons}
						quantityInCart={quantityInCart}
					/>
				)}
			</main>
			<GlobalNavigationPanel />
			<NonEmptyCartSuccessModal
				isOpen={isSuccessModalOpen}
				setOpen={setSuccessModalOpen}
			/>
		</div>
	);
};

export default Cart;
