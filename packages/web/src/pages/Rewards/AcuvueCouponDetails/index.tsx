import { FC, useCallback, useState } from "react";
import {
	IAcuvueCoupon,
	IAcuvueCouponCheckout,
	ErrorTranslations,
	GlobalError,
	ProfileCompleteness,
} from "@myacuvue_thailand_web/services";
import Header from "../../../components/Layout/Header";
import { useLocation } from "react-router-dom-v5-compat";
import "./index.scss";
import Text from "../../../components/Text";
import DeliveryIcon from "../../../icons/DeliveryIcon";
import StoreIcon from "../../../icons/StoreIcon";
import { Divider } from "antd";
import Button from "../../../components/Button";
import DisplayHTML from "../../../components/DisplayHTML";
import moment from "moment";
import AcuvueCouponSuccessModal from "./AcuvueCouponSuccessModal";
import AcuvueCouponErrorModal from "./AcuvueCouponErrorModal";
import { useCoupon } from "../../../hooks/useCoupon";
import HighlightedValue from "../../../components/HighlightedValue";
import GlobalNavigationPanel from "../../../components/GlobalNavigationPanel";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import RegistrationInviteModal from "./RegistrationInviteModal";

interface LocationProps {
	state: {
		coupon: IAcuvueCoupon;
	};
}

const AcuvueCouponDetails: FC = () => {
	const location: LocationProps = useLocation();
	const { coupon } = location.state;
	const { profileCompleteness } = useUserProfile();

	const { checkoutAcuvueCoupons } = useCoupon();

	const [globalError, setGlobalError] = useState<ErrorTranslations>();

	const [isErrorModalOpen, setErrorModalOpen] = useState(false);

	const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);

	const [isRegistrationInviteModalOpen, setRegistrationInviteModalOpen] =
		useState(false);

	const addToWalletHandler = useCallback(async () => {
		if (profileCompleteness !== ProfileCompleteness.COMPLETE) {
			setRegistrationInviteModalOpen(true);
		} else {
			try {
				const payload: IAcuvueCouponCheckout = {
					[coupon.id]: 1,
				};
				await checkoutAcuvueCoupons(payload);
				setSuccessModalOpen(true);
			} catch (e) {
				if (e instanceof GlobalError) {
					setGlobalError(e.globalErrorData);
					setErrorModalOpen(true);
				}
			}
		}
	}, [profileCompleteness, coupon.id, checkoutAcuvueCoupons]);

	return (
		<div className="acuvue-coupon-details-page">
			<Header titleKey="rewardsPage.couponDetails.title" />
			<img src={coupon.imageUrl} alt="" />

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

				<p className="coupon-details-points">
					<HighlightedValue
						value={coupon.points}
						textKey="couponDetails.points"
					/>
				</p>

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

				<div className="button-wrapper">
					<Button onClick={addToWalletHandler}>
						<Text textKey="rewardsPage.couponDetails.addToWallet" />
					</Button>
				</div>
			</div>
			<GlobalNavigationPanel />
			<AcuvueCouponSuccessModal
				isOpen={isSuccessModalOpen}
				setOpen={setSuccessModalOpen}
			/>
			<AcuvueCouponErrorModal
				isOpen={isErrorModalOpen}
				setOpen={setErrorModalOpen}
				error={globalError}
			/>
			<RegistrationInviteModal
				isOpen={isRegistrationInviteModalOpen}
				setOpen={setRegistrationInviteModalOpen}
			/>
		</div>
	);
};

export default AcuvueCouponDetails;
