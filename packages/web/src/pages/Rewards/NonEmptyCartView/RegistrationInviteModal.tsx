import CustomAlert, { ButtonsStyleType } from "../../../components/CustomModal";
import Button, { ButtonType } from "../../../components/Button";
import { FC, useCallback, Dispatch, SetStateAction } from "react";
import alertIcon from "../../../images/alert-icon.svg";
import Text from "../../../components/Text";
import { useNavigate } from "react-router-dom-v5-compat";

interface IProps {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const RegistrationInviteModal: FC<IProps> = ({ isOpen = false, setOpen }) => {
	const navigate = useNavigate();
	const closeModal = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	return (
		<CustomAlert
			className="registration-invite-modal"
			titleKey="acuvueRewards.errorTitle"
			visible={isOpen}
			iconSrc={alertIcon}
			buttons={[
				<Button type={ButtonType.OUTLINE} onClick={closeModal}>
					<Text textKey="cart.cancel" />
				</Button>,
				<Button onClick={() => navigate("/registration")}>
					<Text textKey="cart.register" />
				</Button>,
			]}
			buttonsStyleType={ButtonsStyleType.INLINE}
			close={closeModal}
		>
			<Text textKey="cart.registerDescription" />
		</CustomAlert>
	);
};

export default RegistrationInviteModal;
