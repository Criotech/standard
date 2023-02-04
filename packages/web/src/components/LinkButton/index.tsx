import { ClassService } from "@myacuvue_thailand_web/services";
import { ComponentProps, FC } from "react";
import "./index.scss";

const LinkButton: FC<ComponentProps<"button">> = ({
	className,
	...remainingProps
}) => {
	const classNames = ClassService.createClassName(
		"acuvue-link-button",
		className
	);
	return <button {...remainingProps} className={classNames} />;
};

export default LinkButton;
