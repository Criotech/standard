import { FC, MouseEventHandler } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { ButtonSize } from "../Button";
import CircleButton from "../CircleButton";
import "./index.scss";
import { useService } from "../../hooks/useService";

export type PlusButtonWithCircleProps = {
	disabled?: boolean;
	className?: string;
	size?: ButtonSize;
	onClick?: MouseEventHandler<HTMLElement>;
};

const PlusButtonWithCircle: FC<PlusButtonWithCircleProps> = ({
	disabled,
	className,
	onClick,
	size = ButtonSize.SMALL,
	...props
}) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"plus-button-with-circle",
		className
	);

	return (
		<CircleButton
			className={classNames}
			onClick={onClick}
			disabled={disabled}
			size={size}
			{...props}
		>
			<PlusOutlined className="plus-icon" />
		</CircleButton>
	);
};

export default PlusButtonWithCircle;
