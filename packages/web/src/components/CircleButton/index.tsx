import { FC } from "react";
import Button, { ButtonSize, ButtonType } from "../Button";
import "./index.scss";

export type CircleButtonProps = {
	disabled?: boolean;
	className?: string;
	children?: React.ReactNode;
	size?: ButtonSize;
	onClick?: React.MouseEventHandler<HTMLElement>;
};

const CircleButton: FC<CircleButtonProps> = ({
	children,
	disabled,
	className,
	onClick,
	size = ButtonSize.MEDIUM,
	...props
}) => {
	const classNames = ["acuvue-circle-button", className].join(" ");
	return (
		<Button
			className={classNames}
			onClick={onClick}
			type={ButtonType.OUTLINE}
			disabled={disabled}
			size={size}
			{...props}
		>
			{children}
		</Button>
	);
};

export default CircleButton;
