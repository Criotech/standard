import { ClassService } from "@myacuvue_thailand_web/services";
import { FC } from "react";
import Text from "../../../../../components/Text";
import RefreshIcon, { IconSize } from "../../../../../icons/RefreshIcon";
import "./index.scss";

interface IProps {
	onClick: () => void;
	className?: string;
}

const ChangeStoreButton: FC<IProps> = ({ onClick, className }) => {
	const classNames = ClassService.createClassName(
		"change-store-button",
		className
	);

	return (
		<button className={classNames} onClick={onClick}>
			<RefreshIcon size={IconSize.SMALL} />
			<span className="text">
				<Text textKey="dashboardPage.opticalStore.changeStoreButton" />
			</span>
		</button>
	);
};

export default ChangeStoreButton;
