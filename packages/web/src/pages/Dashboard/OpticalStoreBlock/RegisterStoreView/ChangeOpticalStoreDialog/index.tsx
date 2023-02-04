import CustomAlert from "../../../../../components/CustomModal";
import Button from "../../../../../components/Button";
import { FC } from "react";
import Text from "../../../../../components/Text";
import { useWideScreen } from "../../../../../hooks/useWideScreen";
import { useService } from "../../../../../hooks/useService";
import "./index.scss";
import { useConfiguration } from "../../../../../hooks/useConfiguration";

interface IProps {
	isOpen: boolean;
	onClose: () => void;
	className?: string;
}

const ChangeOpticalStoreDialog: FC<IProps> = ({
	isOpen = false,
	onClose,
	className,
}) => {
	const { isWideScreen } = useWideScreen();
	const { ClassService } = useService();
	const { changeOpticalStoreDialogExtraLines } = useConfiguration();

	const wideClass = isWideScreen ? "wide" : "";
	const classNames = ClassService.createClassName(
		"acuvue-change-optical-store-dialog",
		wideClass,
		className
	);

	return (
		<CustomAlert
			titleKey="dashboardPage.opticalStore.changeOpticalStoreDialogTitle"
			className={classNames}
			visible={isOpen}
			buttons={[
				<Button onClick={onClose}>
					<Text textKey="dashboardPage.opticalStore.ok" />
				</Button>,
			]}
			close={onClose}
		>
			<Text textKey="dashboardPage.opticalStore.changeOpticalStoreDialogBody" />

			<div className="change-optical-store-detail-list">
				{changeOpticalStoreDialogExtraLines.map((dialogLineKey) => (
					<p
						className="change-optical-store-dialog-line"
						key={dialogLineKey}
					>
						<Text textKey={dialogLineKey} />
					</p>
				))}
			</div>
		</CustomAlert>
	);
};

export default ChangeOpticalStoreDialog;
