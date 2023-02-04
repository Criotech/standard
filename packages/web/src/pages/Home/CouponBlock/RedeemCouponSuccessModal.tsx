import CustomAlert from "../../../components/CustomModal";
import Button from "../../../components/Button";
import { FC, useCallback } from "react";
import rewardsIcon from "../../../images/deco-icon-coupon-rewards.svg";
import Text from "../../../components/Text";

type Props = {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RedeemCouponSuccessModal: FC<Props> = ({ isOpen = false, setOpen }) => {
	const closeModal = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	return (
		<CustomAlert
			titleKey="homePage.redeemCoupon.rewardsAdded"
			visible={isOpen}
			iconSrc={rewardsIcon}
			buttons={[
				<Button onClick={closeModal}>
					<Text textKey="homePage.redeemCoupon.ok" />
				</Button>,
			]}
			close={closeModal}
		>
			<Text textKey="validation.member.couponCode.success" />
		</CustomAlert>
	);
};

export default RedeemCouponSuccessModal;
