import { FC } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { ButtonSize } from "../../../../../components/Button";
import CircleButton from "../../../../../components/CircleButton";
import "./index.scss";
import { useService } from "../../../../../hooks/useService";
import Text from "../../../../../components/Text";

export type SelectStoreButtonProps = {
	disabled?: boolean;
	size?: ButtonSize;
	className?: string;
	onClick: () => void;
};

const SelectStoreButton: FC<SelectStoreButtonProps> = ({
	disabled,
	size = ButtonSize.SMALL,
	className,
	onClick,
}) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-select-store-button",
		className
	);

	return (
		<div className={classNames}>
			<CircleButton
				className="circle-button"
				disabled={disabled}
				onClick={onClick}
				size={size}
			>
				<PlusOutlined className="plus-icon" />
			</CircleButton>
			<span className="select-store-text">
				<Text
					textKey={"dashboardPage.opticalStore.selectStoreButton"}
				/>
			</span>
		</div>
	);
};

export default SelectStoreButton;
