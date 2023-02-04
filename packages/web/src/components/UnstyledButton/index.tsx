import { ComponentProps, FC } from "react";
import { useService } from "../../hooks/useService";
import "./index.scss";

interface IProps extends ComponentProps<"button"> {}

const UnstyledButton: FC<IProps> = ({
	className,
	children,
	...buttonProps
}) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"unstyled-button",
		className
	);

	return (
		<button className={classNames} {...buttonProps}>
			{children}
		</button>
	);
};

export default UnstyledButton;
