import CustomAlert from "../../../../components/CustomModal";
import Button from "../../../../components/Button";
import { FC } from "react";
import Text from "../../../../components/Text";

interface IProps {
	isOpen: boolean;
	onClose: () => void;
}

const SavePurchaseFeedbackSuccessDialog: FC<IProps> = ({
	isOpen = false,
	onClose,
}) => {
	return (
		<CustomAlert
			visible={isOpen}
			buttons={[
				<Button onClick={onClose}>
					<Text textKey="button.okLabel" />
				</Button>,
			]}
			close={onClose}
		>
			<Text textKey="feedbackBlock.feedbackForm.successModalBody" />
		</CustomAlert>
	);
};

export default SavePurchaseFeedbackSuccessDialog;
