import ChevronLeftIcon, { IconSize } from "../../icons/ChevronLeftIcon";
import React, { ComponentPropsWithoutRef, FC } from "react";
import "./index.scss";
import { ClassService } from "@myacuvue_thailand_web/services";

interface IProps {
	onClick: ComponentPropsWithoutRef<"button">["onClick"];
	className?: string;
}

const LeftArrowButton: FC<IProps> = ({ onClick, className }) => {
	const classNames = ClassService.createClassName(
		"acuvue-left-arrow-button",
		className
	);

	return (
		<button className={classNames} onClick={onClick}>
			<ChevronLeftIcon size={IconSize.LARGE} />
		</button>
	);
};

export default LeftArrowButton;
