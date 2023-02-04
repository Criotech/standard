import { FC } from "react";
import CustomAlert from "../../components/CustomModal";
import Text from "../../components/Text";
import Button from "../../components/Button";

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	onClickOk: () => void;
}

const CooldownDialog: FC<IProps> = ({ isOpen, onClose, onClickOk }) => {
	return (
		<CustomAlert
			visible={isOpen}
			buttons={[
				<Button onClick={onClickOk}>
					<Text textKey="emailVerification.cooldownDialog.okButton" />
				</Button>,
			]}
			close={onClose}
		>
			<Text textKey="emailVerification.cooldownDialog.body" />
		</CustomAlert>
	);
};

export default CooldownDialog;
