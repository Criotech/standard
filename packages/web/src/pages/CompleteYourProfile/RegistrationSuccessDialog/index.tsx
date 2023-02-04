import CustomAlert from "../../../components/CustomModal";
import Button from "../../../components/Button";
import { FC, Dispatch, SetStateAction } from "react";
import myacuvueIcon from "../../../images/myacuvue-icon.png";
import Text from "../../../components/Text";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import CircleDecorationIcon from "../../../icons/CircleDecorationIcon";
import "./index.scss";
import { useService } from "../../../hooks/useService";
import { useWideScreen } from "../../../hooks/useWideScreen";

interface IProps {
	registrationSuccessDialogHeadingKey: TranslationKey;
	registrationSuccessDialogBodyKey1: TranslationKey;
	registrationSuccessDialogBodyKey2: TranslationKey;
	registrationSuccessDialogBodyKey3?: TranslationKey;
	isOpen: boolean;
	onClick: Dispatch<SetStateAction<boolean>>;
}

const RegistrationSuccessDialog: FC<IProps> = ({
	isOpen,
	registrationSuccessDialogHeadingKey,
	registrationSuccessDialogBodyKey1,
	registrationSuccessDialogBodyKey2,
	registrationSuccessDialogBodyKey3,
	onClick,
}) => {
	const { ClassService } = useService();
	const { isWideScreen } = useWideScreen();

	const classNames = ClassService.createClassName(
		isWideScreen ? "wide" : "",
		"registration-success-dialog"
	);

	const closeModal = () => {
		onClick(false);
	};

	return (
		<CustomAlert
			titleKey={registrationSuccessDialogHeadingKey}
			visible={isOpen}
			iconSrc={myacuvueIcon}
			className={classNames}
			buttons={[
				<Button onClick={closeModal}>
					<Text textKey="button.okLabel" />
				</Button>,
			]}
			close={closeModal}
			maskClosable={false}
		>
			<div className="circle-decoration-icon-wrapper">
				<CircleDecorationIcon className="circle-decoration-icon" />
			</div>

			<p className="body-one">
				<Text textKey={registrationSuccessDialogBodyKey1} />
			</p>

			<p>
				<Text textKey={registrationSuccessDialogBodyKey2} />
			</p>

			<p className="registration-success-dialog-t-and-c">
				{registrationSuccessDialogBodyKey3 && (
					<Text textKey={registrationSuccessDialogBodyKey3} />
				)}
			</p>
		</CustomAlert>
	);
};

export default RegistrationSuccessDialog;
