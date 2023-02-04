import { FC } from "react";
import { ClassService } from "@myacuvue_thailand_web/services";
import "./index.scss";

interface IProps {
	className?: string;
}

const VerticalDivider: FC<IProps> = ({ className }) => {
	const classNames = ClassService.createClassName(
		"acuvue-vertical-divider",
		className
	);

	return <div className={classNames} />;
};

export default VerticalDivider;
