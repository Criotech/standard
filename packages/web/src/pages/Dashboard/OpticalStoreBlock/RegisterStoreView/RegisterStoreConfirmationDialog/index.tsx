import CustomAlert from "../../../../../components/CustomModal";
import Button, { ButtonType } from "../../../../../components/Button";
import { useWideScreen } from "../../../../../hooks/useWideScreen";
import { FC } from "react";
import Text from "../../../../../components/Text";
import AddressSection from "../../AddressSection";
import { useService } from "../../../../../hooks/useService";
import "./index.scss";
import StoreName from "../../StoreName";
import ThinDivider from "../../../../../components/ThinDivider";

type Props = {
	isOpen: boolean;
	onConfirm: () => void;
	storeName: string;
	address: string;
	className?: string;
	onClose: () => void;
	onCancel: () => void;
};

const RegisterStoreConfirmationDialog: FC<Props> = ({
	isOpen = false,
	onConfirm,
	storeName,
	address,
	className,
	onClose,
	onCancel,
}) => {
	const { isWideScreen } = useWideScreen();
	const { ClassService } = useService();

	const wideClass = isWideScreen ? "wide" : "";
	const classNames = ClassService.createClassName(
		"register-store-confirmation",
		wideClass,
		className
	);

	return (
		<CustomAlert
			titleKey="dashboardPage.opticalStore.confirmationDialogTitle"
			visible={isOpen}
			className={classNames}
			buttons={[
				<Button type={ButtonType.OUTLINE} onClick={() => onCancel()}>
					<Text textKey="dashboardPage.opticalStore.cancel" />
				</Button>,
				<Button onClick={() => onConfirm()}>
					<Text textKey="dashboardPage.opticalStore.confirm" />
				</Button>,
			]}
			close={() => onClose()}
		>
			<StoreName name={storeName} />
			<AddressSection
				address={address}
				className={"register-confirmation-address-section"}
			/>
			<ThinDivider className="divider" />
			<span>
				<Text textKey="dashboardPage.opticalStore.confirmationDialogExplanation" />
			</span>
		</CustomAlert>
	);
};

export default RegisterStoreConfirmationDialog;
