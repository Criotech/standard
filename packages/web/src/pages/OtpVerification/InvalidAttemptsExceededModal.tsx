import Button from "../../components/Button";
import CustomAlert from "../../components/CustomModal";
import { useCallback } from "react";
import Text from "../../components/Text";
import { useHistory } from "react-router-dom";

type Props = {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InvalidAttemptsExceededModal: React.FC<Props> = ({
	isOpen = false,
	setOpen,
}) => {
	const history = useHistory();

	const redirectToHome = useCallback(() => {
		setOpen(false);
		history.push("/home");
	}, [setOpen, history]);

	return (
		<CustomAlert
			visible={isOpen}
			buttons={[
				<Button onClick={redirectToHome}>
					<Text textKey="otpVerificationPage.resentButton.resendOk" />
				</Button>,
			]}
			closable={false}
			maskClosable={false}
		>
			<Text textKey="otpVerificationPage.invalidAttemptsExceededModal.wrongTriesLimitExceeded" />
		</CustomAlert>
	);
};
