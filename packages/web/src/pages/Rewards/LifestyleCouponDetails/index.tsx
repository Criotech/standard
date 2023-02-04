import { FC, useCallback, useState, useMemo } from "react";
import {
	ILifestyleCoupon,
	IPoints,
	TranslationKey,
} from "@myacuvue_thailand_web/services";
import Header from "../../../components/Layout/Header";
import { useLocation, useNavigate } from "react-router-dom-v5-compat";
import "./index.scss";
import Text from "../../../components/Text";
import { Divider } from "antd";
import Button from "../../../components/Button";
import DisplayHTML from "../../../components/DisplayHTML";
import moment from "moment";
import QuantityInput from "../../../components/QuantityInput";
import TagLabel from "../../../components/TagLabel";
import CartButton from "../../../components/CartButton";
import { useAsync } from "react-use";
import { usePoints } from "../../../hooks/usePoints";
import LoadingBlock from "../../../components/LoadingBlock";
import LifestyleCouponErrorModal from "./LifestyleCouponErrorModal";
import GlobalNavigationPanel from "../../../components/GlobalNavigationPanel";
import { useLifestyleCartContext } from "../../../hooks/useLifestyleCartContext";

interface LocationProps {
	state: {
		coupon: ILifestyleCoupon;
	};
}

const labelKeyByTag: Record<
	Exclude<ILifestyleCoupon["tag"], null>,
	TranslationKey
> = {
	new: "couponTag.new",
	hot: "couponTag.hot",
};

const MAXIMUM_COUPON_QUANTITY_TO_REVEAL = 100;

const LifestyleCouponDetails: FC<{}> = () => {
	const navigate = useNavigate();
	const location: LocationProps = useLocation();
	const { coupon } = location.state;

	const { cart, incrementOnCart, decrementOnCart } =
		useLifestyleCartContext();

	const { getUserPoints } = usePoints();
	const { value, loading } = useAsync(() => getUserPoints(), [getUserPoints]);
	const points = value as IPoints;
	const [isErrorModalOpen, setErrorModalOpen] = useState(false);

	const handleIncrement = useCallback(
		(_coupon: ILifestyleCoupon) => {
			if (_coupon.isPlatinum && points.ladder !== "platinum") {
				setErrorModalOpen(true);
			} else {
				incrementOnCart(_coupon.id);
			}
		},
		[points, incrementOnCart]
	);

	const tagLabels: TranslationKey[] = [];
	if (coupon.isPlatinum) {
		tagLabels.push("couponTag.platinum");
	}
	if (coupon.tag) {
		tagLabels.push(labelKeyByTag[coupon.tag]);
	}

	const remainingQuota = useMemo(() => {
		if (coupon.remainingQuantity <= MAXIMUM_COUPON_QUANTITY_TO_REVEAL) {
			return String(coupon.remainingQuantity);
		} else {
			return "100+";
		}
	}, [coupon]);

	const quantityInputValue = useMemo(() => {
		if (!cart[coupon.id]) {
			return 0;
		}
		return cart[coupon.id];
	}, [cart, coupon.id]);

	return (
		<div className="lifestyle-coupon-details-page">
			<Header
				titleKey="rewardsPage.lifestyleCouponDetails.title"
				icon={<CartButton />}
			/>
			<img
				className="coupon-cover-image"
				src={coupon.imageUrl}
				alt="Lifestyle Coupon"
			/>
			{loading ? (
				<LoadingBlock />
			) : (
				<div className="coupon-details">
					<h1>{coupon.title}</h1>
					<p className="coupon-issuer">{coupon.issuer}</p>

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

					<div className="point-tags">
						<h2>
							{coupon.points}{" "}
							<span>
								<Text textKey="couponDetails.points" />
							</span>
						</h2>
						<div className="lifestyle-tags">
							{tagLabels.map((tagLabel) => (
								<TagLabel key={tagLabel} labelKey={tagLabel} />
							))}
						</div>
					</div>
					<Divider className="ant-lifestyle-divider" />

					<h2>
						<Text textKey="rewardsPage.couponDetails.terms" />
					</h2>

					<DisplayHTML unsafeHTML={coupon.terms} />

					<QuantityInput
						value={quantityInputValue}
						minValue={0}
						maxValue={coupon.remainingQuantity}
						increment={() => handleIncrement(coupon)}
						decrement={() => decrementOnCart(coupon.id)}
					/>
					<div className="remaining-quota">
						<Text
							textKey="rewardsPage.lifestyleCouponDetails.remainingQuota"
							data={{ remainingQuota }}
						/>
					</div>
					<div className="button-wrapper">
						<Button onClick={() => navigate("/rewards-cart")}>
							<Text textKey="rewardsPage.lifestyleCouponDetails.viewYourCart" />
						</Button>
					</div>
					{points.dateLimitToPlatinum && (
						<LifestyleCouponErrorModal
							isOpen={isErrorModalOpen}
							setOpen={setErrorModalOpen}
							points={points.remainingPointsToPlatinum}
							date={moment(points.dateLimitToPlatinum).format(
								"DD/MM/YYYY"
							)}
						/>
					)}
				</div>
			)}
			<GlobalNavigationPanel />
		</div>
	);
};

export default LifestyleCouponDetails;
