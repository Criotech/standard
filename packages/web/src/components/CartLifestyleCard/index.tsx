import { FC, useContext } from "react";
import {
	ILifestyleCoupon,
	TranslationKey,
} from "@myacuvue_thailand_web/services";
import TrashIcon from "../../icons/TrashIcon";
import "./index.scss";
import TagLabel from "../TagLabel";
import { LifestyleCartContext } from "../../contexts/LifestyleCartContext";
import QuantityInput from "../QuantityInput";
import HighlightedValue from "../HighlightedValue";

export interface IProps {
	coupon: ILifestyleCoupon;
}

const labelKeyByTag: Record<
	Exclude<ILifestyleCoupon["tag"], null>,
	TranslationKey
> = {
	new: "couponTag.new",
	hot: "couponTag.hot",
};

const CartLifestyleCard: FC<IProps> = ({ coupon }) => {
	const { incrementOnCart, decrementOnCart, removeFromCart, cart } =
		useContext(LifestyleCartContext);
	const tagLabels: TranslationKey[] = [];
	if (coupon.isPlatinum) {
		tagLabels.push("couponTag.platinum");
	}
	if (coupon.tag) {
		tagLabels.push(labelKeyByTag[coupon.tag]);
	}

	return (
		<div className="cart-lifestyle-card">
			<div className="lifestyle-tag-image">
				<img
					src={coupon.imageUrl}
					alt="coupon"
					className="cart-lifestyle-card-image"
				/>
				<div className="lifestyle-tags">
					{tagLabels.map((tagLabel) => (
						<TagLabel key={tagLabel} labelKey={tagLabel} />
					))}
				</div>
			</div>

			<div className="lifestyle-card-details">
				<div className="title-and-trash-icon">
					<h2 className="coupon-title">{coupon.title}</h2>
					<button
						className="trash-button"
						onClick={() => removeFromCart(coupon.id)}
					>
						<TrashIcon color="#6C7680" />
					</button>
				</div>

				<p className="coupon-issuer">{coupon.issuer}</p>

				<p className="coupon-points">
					<HighlightedValue
						value={coupon.points}
						textKey="couponDetails.points"
					/>
				</p>

				<QuantityInput
					value={cart[coupon.id]}
					minValue={0}
					maxValue={coupon.remainingQuantity}
					increment={() => incrementOnCart(coupon.id)}
					decrement={() => decrementOnCart(coupon.id)}
				/>
			</div>
		</div>
	);
};

export default CartLifestyleCard;
