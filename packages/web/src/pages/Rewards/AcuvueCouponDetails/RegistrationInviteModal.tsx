import CustomAlert, { ButtonsStyleType } from "../../../components/CustomModal";
import Button, { ButtonType } from "../../../components/Button";
import { FC, useCallback, Dispatch, SetStateAction } from "react";
import alertIcon from "../../../images/alert-icon.svg";
import Text from "../../../components/Text";
import { useHistory } from "react-router-dom";

interface IProps {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

const RegistrationInviteModal: FC<IProps> = ({ isOpen = false, setOpen }) => {
	const history = useHistory();
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
					<Text textKey="acuvueRewards.cancel" />
				</Button>,
				<Button onClick={() => history.push("/registration")}>
					<Text textKey="acuvueRewards.register" />
				</Button>,
			]}
			buttonsStyleType={ButtonsStyleType.INLINE}
			close={closeModal}
		>
			<Text textKey="acuvueRewards.registerDescription" />
		</CustomAlert>
	);
};

export default RegistrationInviteModal;
