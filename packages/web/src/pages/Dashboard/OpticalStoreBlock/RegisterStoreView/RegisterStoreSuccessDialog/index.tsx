import CustomAlert from "../../../../../components/CustomModal";
import Button from "../../../../../components/Button";
import { FC } from "react";
import Text from "../../../../../components/Text";
import { useWideScreen } from "../../../../../hooks/useWideScreen";
import { useService } from "../../../../../hooks/useService";
import "./index.scss";

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	className?: string;
}

const RegisterStoreSuccessDialog: FC<IProps> = ({
	isOpen = false,
	onClose,
	className,
}) => {
	const { isWideScreen } = useWideScreen();
	const { ClassService } = useService();

	const wideClass = isWideScreen ? "wide" : "";
	const classNames = ClassService.createClassName(
		"acuvue-register-store-success-dialog",
		wideClass,
		className
	);

	return (
		<CustomAlert
			titleKey="dashboardPage.opticalStore.successDialogTitle"
			className={classNames}
			visible={isOpen}
			buttons={[
				<Button onClick={onClose}>
					<Text textKey="dashboardPage.opticalStore.ok" />
				</Button>,
			]}
			close={onClose}
		>
			<Text textKey="dashboardPage.opticalStore.successDialogBody" />
		</CustomAlert>
	);
};

export default RegisterStoreSuccessDialog;
