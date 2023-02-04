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
	SMALL,
	MEDIUM,
}

export type GreenButtonProps = {
	disabled?: boolean;
	className?: string;
	children?: ReactNode;
	autoFocus?: boolean;
	type?: ButtonType;
	size?: ButtonSize;
	htmlType?: "submit" | "reset" | "button";
	style?: CSSProperties;
	onClick?: MouseEventHandler<HTMLElement>;
};

const GreenButton: FC<GreenButtonProps> = ({
	className,
	type = ButtonType.PRIMARY,
	children,
	htmlType,
	...props
}) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-green-btn",
		typeClass[type],
		className
	);

	return (
		<button className={classNames} {...props} type={htmlType}>
			{children}
		</button>
	);
};

export default GreenButton;
