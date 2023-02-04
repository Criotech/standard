import { FC, MouseEventHandler } from "react";
import { MinusOutlined } from "@ant-design/icons";
import { ButtonSize } from "../Button";
import CircleButton from "../CircleButton";
import "./index.scss";
import { useService } from "../../hooks/useService";

export type MinusButtonProps = {
	disabled?: boolean;
	className?: string;
	size?: ButtonSize;
	onClick?: MouseEventHandler<HTMLElement>;
};

const MinusButton: FC<MinusButtonProps> = ({
	disabled,
	className,
	onClick,
	size = ButtonSize.SMALL,
	...props
}) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName("minus-button", className);

	return (
		<CircleButton
			className={classNames}
			onClick={onClick}
			disabled={disabled}
			size={size}
			{...props}
		>
			<MinusOutlined className="minus-icon" />
		</CircleButton>
	);
};

export default MinusButton;
