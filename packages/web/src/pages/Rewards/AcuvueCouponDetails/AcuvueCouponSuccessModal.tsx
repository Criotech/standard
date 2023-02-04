import CustomAlert from "../../../components/CustomModal";
import Button from "../../../components/Button";
import { FC, useCallback, Dispatch, SetStateAction } from "react";
import rewardsIcon from "../../../images/deco-icon-coupon-rewards.svg";
import Text from "../../../components/Text";
import { useNavigate } from "react-router-dom-v5-compat";

type Props = {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

const AcuvueCouponSuccessModal: FC<Props> = ({ isOpen = false, setOpen }) => {
	const navigate = useNavigate();
	const closeModal = useCallback(() => {
		navigate("/rewards/wallet");
		setOpen(false);
	}, [setOpen, navigate]);

	return (
		<CustomAlert
			titleKey="acuvueRewards.successTitle"
			visible={isOpen}
			iconSrc={rewardsIcon}
			buttons={[
				<Button onClick={closeModal}>
					<Text textKey="button.okLabel" />
				</Button>,
			]}
			close={closeModal}
		>
			<Text textKey="acuvueRewards.success" />
		</CustomAlert>
	);
};

export default AcuvueCouponSuccessModal;
