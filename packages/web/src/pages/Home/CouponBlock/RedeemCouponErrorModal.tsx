import CustomAlert from "../../../components/CustomModal";
import Button from "../../../components/Button";
import { FC, useCallback, Dispatch, SetStateAction } from "react";
import alertIcon from "../../../images/alert-icon.svg";
import Text from "../../../components/Text";
import { ErrorTranslations } from "@myacuvue_thailand_web/services";

type Props = {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	error?: ErrorTranslations;
};

const RedeemCouponErrorModal: FC<Props> = ({
	isOpen = false,
	setOpen,
	error,
}) => {
	const closeModal = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	return (
		<CustomAlert
			titleKey="homePage.redeemCoupon.oops"
			visible={isOpen}
			iconSrc={alertIcon}
			buttons={[
				<Button onClick={closeModal}>
					<Text textKey="homePage.redeemCoupon.ok" />
				</Button>,
			]}
			close={closeModal}
		>
			{error && (
				<div className="redeem-coupon-error-message">
					<Text
						textKey={error.translationKey}
						data={error.translationData}
					/>
				</div>
			)}
		</CustomAlert>
	);
};

export default RedeemCouponErrorModal;
