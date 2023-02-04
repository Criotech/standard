import {
	ILifestyleCoupon,
	IPoints,
	ErrorTranslations,
	GlobalError,
	ProfileCompleteness,
} from "@myacuvue_thailand_web/services";
import { Divider } from "antd";
import { FC, useCallback, useContext, useState, useMemo } from "react";
import Button, { ButtonType } from "../../../components/Button";
import CartLifestyleCard from "../../../components/CartLifestyleCard";
import Text from "../../../components/Text";
import { LifestyleCartContext } from "../../../contexts/LifestyleCartContext";
import { useCoupon } from "../../../hooks/useCoupon";
import { useNavigate } from "react-router-dom-v5-compat";
import "./index.scss";
import NonEmptyCartErrorModal from "./NonEmptyCartErrorModal";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import RegistrationInviteModal from "./RegistrationInviteModal";
import NonEmptyCartSuccessModal from "./NonEmptyCartSuccessModal";

interface IProps {
	coupons: ILifestyleCoupon[];
	points: IPoints;
	refreshCoupons: () => void;
	quantityInCart: number;
}

interface CartCoupon extends ILifestyleCoupon {
	quantity: number;
}

const NonEmptyCartView: FC<IProps> = ({
	coupons,
	points,
	refreshCoupons,
	quantityInCart,
}) => {
	const navigate = useNavigate();
	const { cart, clearCart } = useContext(LifestyleCartContext);
	const { profileCompleteness } = useUserProfile();

	const cartCoupons: CartCoupon[] = coupons
		.filter((coupon) => cart[coupon.id])
		.map((coupon) => {
			const quantity = cart[coupon.id];
			return { quantity, ...coupon };
		});

	const pointsToRedeem = cartCoupons.reduce(
		(total, coupon) => total + coupon.points * coupon.quantity,
		0
	);
	const balanceAfterRedemption = points.availablePoints - pointsToRedeem;
	const { checkoutLifestyleCoupons } = useCoupon();
	const [globalError, setGlobalError] = useState<ErrorTranslations>();
	const [isErrorModalOpen, setErrorModalOpen] = useState(false);
	const [isRegistrationInviteModalOpen, setRegistrationInviteModalOpen] =
		useState(false);
	const [isSuccessModalOpen, setSuccessModalOpen] = useState<boolean>(false);

	const cartCouponIds = Object.keys(cart);
	const couponsWithInsufficientQuantity = useMemo(
		() =>
			cartCouponIds.filter((cartCouponId) => {
				const cartCoupon = cartCoupons.find(
					(coupon) => coupon.id === cartCouponId
				);

				if (!cartCoupon) {
					return false;
				}

				const { remainingQuantity } = cartCoupon;

				if (cart[cartCouponId] > remainingQuantity) {
					return true;
				}
				return false;
			}),
		[cart, cartCoupons, cartCouponIds]
	);

	const isAnyCouponOverTheQuota =
		couponsWithInsufficientQuantity &&
		couponsWithInsufficientQuantity.length > 0;

	const onCheckout = useCallback(async () => {
		if (profileCompleteness !== ProfileCompleteness.COMPLETE) {
			setRegistrationInviteModalOpen(true);
		} else if (isAnyCouponOverTheQuota) {
			setGlobalError({
				translationKey: "error.insufficientCoupons",
				translationData: {},
			});
			setErrorModalOpen(true);
		} else if (balanceAfterRedemption <= 0) {
			setGlobalError({
				translationKey:
					"rewardsPage.nonEmptyCartView.insufficientPoints",
				translationData: {},
			});
			setErrorModalOpen(true);
		} else {
			try {
				await checkoutLifestyleCoupons(cart);
				setSuccessModalOpen(true);
				clearCart();
			} catch (e) {
				if (e instanceof GlobalError) {
					setGlobalError(e.globalErrorData);
					setErrorModalOpen(true);
				}
			} finally {
				refreshCoupons();
			}
		}
	}, [
		profileCompleteness,
		isAnyCouponOverTheQuota,
		balanceAfterRedemption,
		checkoutLifestyleCoupons,
		cart,
		clearCart,
		refreshCoupons,
	]);

	return (
		<div className="non-empty-cart-view">
			{quantityInCart > 0 && (
				<>
					{cartCoupons.map((coupon, i) => (
						<div className="card-wrapper" key={coupon.id}>
							<CartLifestyleCard coupon={coupon} />
							{cart[coupon.id] > coupon.remainingQuantity && (
								<span className="coupon-quota-error">
									<Text textKey="cart.remainingQuotaError" />
								</span>
							)}
							{i < cartCoupons.length - 1 && <Divider plain />}
						</div>
					))}
					<Divider plain className="thicker" />

					<div className="summary">
						<p className="total-items">
							<Text
								textKey="cart.itemsCount"
								data={{ total: cartCoupons.length }}
							/>
						</p>
						<div className="total-points">
							<span>
								<Text textKey="cart.totalPointsToRedeem" />
							</span>
							<span>{pointsToRedeem}</span>
						</div>
						<div className="points-balance">
							<span>
								<Text textKey="cart.totalPointsAfterRedeem" />
							</span>
							<span
								className={
									balanceAfterRedemption < 0
										? "negative-balance"
										: ""
								}
							>
								{balanceAfterRedemption}
							</span>
						</div>
					</div>

					<div className="button-wrapper">
						<Button
							className="checkout-button"
							onClick={onCheckout}
						>
							<Text textKey="cart.checkout" />
						</Button>
						<Button
							type={ButtonType.OUTLINE}
							onClick={() =>
								navigate("/rewards/catalog/lifestyle")
							}
						>
							<Text textKey="cart.continueBrowsing" />
						</Button>
					</div>

					{globalError && (
						<NonEmptyCartErrorModal
							isOpen={isErrorModalOpen}
							setOpen={setErrorModalOpen}
							error={globalError}
						/>
					)}
					<RegistrationInviteModal
						isOpen={isRegistrationInviteModalOpen}
						setOpen={setRegistrationInviteModalOpen}
					/>
				</>
			)}
			<NonEmptyCartSuccessModal
				isOpen={isSuccessModalOpen}
				setOpen={setSuccessModalOpen}
			/>
		</div>
	);
};

export default NonEmptyCartView;
