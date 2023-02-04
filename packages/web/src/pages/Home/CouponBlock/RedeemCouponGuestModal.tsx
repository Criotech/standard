import CustomAlert from "../../../components/CustomModal";
import Button, { ButtonType } from "../../../components/Button";
import { FC, useCallback } from "react";
import alertIcon from "../../../images/alert-icon.svg";
import { useNavigate } from "react-router-dom-v5-compat";
import Text from "../../../components/Text";

type Props = {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RedeemCouponGuestModal: FC<Props> = ({ isOpen = false, setOpen }) => {
	const navigate = useNavigate();
	const closeModal = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const handleRegister = () => {
		navigate("/registration");
	};

	return (
		<CustomAlert
			titleKey="homePage.redeemCoupon.oops"
			visible={isOpen}
			iconSrc={alertIcon}
			buttons={[
				<Button type={ButtonType.OUTLINE} onClick={closeModal}>
					<Text textKey="homePage.redeemCoupon.cancel" />
				</Button>,
				<Button onClick={handleRegister}>
					<Text textKey="homePage.couponBlock.register" />
				</Button>,
			]}
			close={closeModal}
		>
			<Text textKey="validation.guest.couponCode.denied" />
		</CustomAlert>
	);
};

export default RedeemCouponGuestModal;
