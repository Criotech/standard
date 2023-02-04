import { FC, useCallback, useState } from "react";
import { Form } from "antd";
import Button, { ButtonSize, ButtonType } from "../../../components/Button";
import "./index.scss";
import RedeemCouponSuccessModal from "./RedeemCouponSuccessModal";
import RedeemCouponErrorModal from "./RedeemCouponErrorModal";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import RedeemCouponGuestModal from "./RedeemCouponGuestModal";
import Text from "../../../components/Text";
import GenericInput from "../../../components/GenericInput";
import {
	ErrorTranslations,
	GlobalError,
	ProfileCompleteness,
} from "@myacuvue_thailand_web/services";
import { useCoupon } from "../../../hooks/useCoupon";

interface IFormData {
	couponCode: string;
}

const CouponBlock: FC<{}> = () => {
	const { profileCompleteness } = useUserProfile();
	const { redeemCoupon } = useCoupon();

	const [formData, setFormData] = useState<Partial<IFormData>>({});
	const [globalError, setGlobalError] = useState<ErrorTranslations>();

	const [isRedeemCouponErrorModalOpen, setRedeemCouponErrorModalOpen] =
		useState(false);

	const [isRedeemCouponSuccessModalOpen, setRedeemCouponSuccessModalOpen] =
		useState(false);

	const [isRedeemCouponGuestModalOpen, setRedeemCouponGuestModalOpen] =
		useState(false);

	const handleSubmit = useCallback(async () => {
		if (profileCompleteness !== ProfileCompleteness.COMPLETE) {
			setRedeemCouponGuestModalOpen(true);
		} else {
			try {
				if (formData.couponCode) {
					await redeemCoupon(formData.couponCode);
					setRedeemCouponSuccessModalOpen(true);
				}
			} catch (e) {
				if (e instanceof GlobalError) {
					setGlobalError(e.globalErrorData);
					setRedeemCouponErrorModalOpen(true);
				}
			}
		}
		formData.couponCode = "";
	}, [profileCompleteness, formData, redeemCoupon]);

	return (
		<div className="coupon-block">
			<h2>
				<Text textKey="homePage.redeemCoupon.getMoreRewards" />
			</h2>
			<p>
				<Text textKey="homePage.redeemCoupon.enterYourCoupon" />
			</p>
			<Form className="apply-coupon-form" onFinish={handleSubmit}>
				<GenericInput
					type="text"
					name="couponCode"
					value={formData.couponCode || ""}
					onChange={(newValue) => {
						setFormData({ ...formData, couponCode: newValue });
					}}
					placeholder="homePage.redeemCoupon.couponCodePlaceholder"
					label="homePage.redeemCoupon.couponCodeLabel"
					className="coupon-input"
				/>

				<Button
					className="coupon-apply-button"
					type={ButtonType.PRIMARY}
					size={ButtonSize.MEDIUM}
					disabled={formData.couponCode?.trim().length === 0}
				>
					<Text textKey="homePage.redeemCoupon.button.applyLabel" />
				</Button>
			</Form>

			<RedeemCouponSuccessModal
				isOpen={isRedeemCouponSuccessModalOpen}
				setOpen={setRedeemCouponSuccessModalOpen}
			/>

			<RedeemCouponErrorModal
				isOpen={isRedeemCouponErrorModalOpen}
				setOpen={setRedeemCouponErrorModalOpen}
				error={globalError}
			/>

			<RedeemCouponGuestModal
				isOpen={isRedeemCouponGuestModalOpen}
				setOpen={setRedeemCouponGuestModalOpen}
			/>
		</div>
	);
};

export default CouponBlock;
