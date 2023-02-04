import CustomAlert from "../../../components/CustomModal";
import Button from "../../../components/Button";
import { FC, useCallback, Dispatch, SetStateAction } from "react";
import successIcon from "../../../images/success-icon.svg";
import Text from "../../../components/Text";
import { useNavigate } from "react-router-dom-v5-compat";

type Props = {
	isOpen: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

const NonEmptyCartSuccessModal: FC<Props> = ({ isOpen, setOpen }) => {
	const navigate = useNavigate();
	const closeModal = useCallback(() => {
		setOpen(false);
		navigate("/rewards/catalog/lifestyle");
	}, [setOpen, navigate]);

	return (
		<CustomAlert
			titleKey="checkout.successTitle"
			visible={isOpen}
			iconSrc={successIcon}
			buttons={[
				<Button onClick={closeModal}>
					<Text textKey="button.okLabel" />
				</Button>,
			]}
			close={closeModal}
			maskClosable={false}
		>
			<Text textKey="checkout.success" />
		</CustomAlert>
	);
};

export default NonEmptyCartSuccessModal;
