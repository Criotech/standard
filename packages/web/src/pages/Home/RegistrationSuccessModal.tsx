import CustomAlert from "../../components/CustomModal";
import Button from "../../components/Button";
import { FC, useCallback, useState } from "react";
import rewardsIcon from "../../images/deco-icon-coupon-rewards.svg";
import Text from "../../components/Text";
import { useHistory } from "react-router-dom";

type Props = {
	isOpen: boolean;
};

const RegistrationSuccessModal: FC<Props> = ({ isOpen = false }) => {
	const history = useHistory();
	const couponValue = sessionStorage.getItem("myacuvue:coupon-value");
	const [_isOpen, setIsOpen] = useState(isOpen);

	const closeModal = useCallback(() => {
		history.push("/rewards/wallet/active");
		setIsOpen(false);
		sessionStorage.removeItem("myacuvue:coupon-value");
	}, [history, setIsOpen]);

	return (
		<CustomAlert
			titleKey="homePage.registrationSuccess.title"
			visible={_isOpen}
			iconSrc={rewardsIcon}
			buttons={[
				<Button onClick={closeModal}>
					<Text textKey="homePage.registrationSuccess.buttonText" />
				</Button>,
			]}
			close={closeModal}
		>
			<Text
				textKey="homePage.registrationSuccess.body"
				data={{
					couponValue: couponValue ?? "0",
				}}
			/>
		</CustomAlert>
	);
};

export default RegistrationSuccessModal;
