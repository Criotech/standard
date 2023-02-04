import Button from "../../components/Button";
import CustomAlert from "../../components/CustomModal";
import { useCallback } from "react";
import Text from "../../components/Text";

type Props = {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	phone: string;
};

export const OtpResentModal: React.FC<Props> = ({
	isOpen = false,
	setOpen,
	phone,
}) => {
	const closeModal = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	return (
		<CustomAlert
			visible={isOpen}
			buttons={[
				<Button onClick={closeModal}>
					<Text textKey="otpVerificationPage.resentButton.resendOk" />
				</Button>,
			]}
			close={closeModal}
		>
			<b>
				<Text
					textKey="otpVerificationPage.otpResentModal.otpHasBeenResent"
					data={{ phoneNumber: phone }}
				/>
			</b>
		</CustomAlert>
	);
};
