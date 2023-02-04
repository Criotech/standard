import ChevronRightWithCircleIcon from "../../icons/ChevronRightWithCircleIcon";
import { IconSize } from "../../icons/ChevronLeftIcon";
import React, { ComponentPropsWithoutRef, FC } from "react";
import "./index.scss";
import { ClassService } from "@myacuvue_thailand_web/services";

interface IProps {
	onClick?: ComponentPropsWithoutRef<"button">["onClick"];
	className?: string;
}

const RightArrowButton: FC<IProps> = ({ onClick, className }) => {
	const classNames = ClassService.createClassName(
		"acuvue-right-arrow-button",
		className
	);

	return (
		<button className={classNames} onClick={onClick}>
			<ChevronRightWithCircleIcon size={IconSize.LARGE} />
		</button>
	);
};

export default RightArrowButton;
