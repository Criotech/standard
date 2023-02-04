import { FC, MouseEventHandler } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Button, { ButtonSize, ButtonType } from "../Button";
import "./index.scss";
import { useService } from "../../hooks/useService";

export type PlusButtonProps = {
	disabled?: boolean;
	className?: string;
	size?: ButtonSize;
	onClick?: MouseEventHandler<HTMLElement>;
};

const PlusButton: FC<PlusButtonProps> = ({
	disabled,
	className,
	onClick,
	size = ButtonSize.SMALL,
	...props
}) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName("plus-button", className);

	return (
		<Button
			className={classNames}
			onClick={onClick}
			type={ButtonType.NO_OUTLINE}
			disabled={disabled}
			size={size}
			{...props}
		>
			<PlusOutlined className="plus-icon" />
		</Button>
	);
};

export default PlusButton;
