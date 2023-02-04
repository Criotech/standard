import { FC } from "react";
import Button, { ButtonSize, ButtonType } from "../../components/Button";
import Text from "../../components/Text";

interface IProps {
	onCancel: () => void;
	hasError: boolean;
}

const EditAddressActionButtons: FC<IProps> = ({ onCancel, hasError }) => {
	return (
		<>
			<Button
				className="update-button"
				type={ButtonType.PRIMARY}
				size={ButtonSize.MEDIUM}
				htmlType="submit"
				disabled={hasError}
			>
				<Text textKey="editProfilePage.form.update" />
			</Button>

			<Button
				className="cancel-button"
				type={ButtonType.OUTLINE}
				size={ButtonSize.MEDIUM}
				htmlType="button"
				onClick={onCancel}
			>
				<Text textKey="editProfilePage.form.cancel" />
			</Button>
		</>
	);
};

export default EditAddressActionButtons;
