import { CSSProperties, FC, MouseEventHandler, ReactNode } from "react";
import "./index.scss";
import { useService } from "../../hooks/useService";

export enum ButtonType {
	PRIMARY = "acuvue-btn-primary",
	OUTLINE = "acuvue-btn-outline",
	NO_OUTLINE = "acuvue-btn-no-outline",
}

const typeClass: Record<ButtonType, string> = {
	[ButtonType.PRIMARY]: "acuvue-btn-primary",
	[ButtonType.OUTLINE]: "acuvue-btn-outline",
	[ButtonType.NO_OUTLINE]: "acuvue-btn-no-outline",
};

export enum ButtonSize {
	MEDIUM,
	SMALL,
}

const sizeClass: Record<ButtonSize, string> = {
	[ButtonSize.SMALL]: "acuvue-btn-small",
	[ButtonSize.MEDIUM]: "acuvue-btn-medium",
};

export type ButtonProps = {
	disabled?: boolean;
	className?: string;
	autoFocus?: boolean;
	children?: ReactNode;
	size?: ButtonSize;
	type?: ButtonType;
	htmlType?: "submit" | "reset" | "button";
	onClick?: MouseEventHandler<HTMLElement>;
	style?: CSSProperties;
};

const Button: FC<ButtonProps> = ({
	className,
	type = ButtonType.PRIMARY,
	size = ButtonSize.MEDIUM,
	children,
	htmlType,
	...props
}) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-btn",
		sizeClass[size],
		typeClass[type],
		className
	);

	return (
		<button className={classNames} {...props} type={htmlType}>
			{children}
		</button>
	);
};

export default Button;
