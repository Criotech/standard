import { FC } from "react";
import { Progress as AntProgress } from "antd";
import "./index.scss";
import { NormalBadge } from "./NormalBadge";
import { PlatinumBadge } from "./PlatinumBadge";
import { BadgeType } from "./types";
import { useService } from "../../hooks/useService";

export interface Props {
	className?: string;
	type?: "circle" | "line" | "dashboard";
	percent?: number;
	showInfo?: boolean;
	status?: "normal";
	badge?: BadgeType;
	strokeWidth?: number;
	strokeColor?: string;
}

const Progress: FC<Props> = ({ className, badge, ...props }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-progress",
		className
	);

	const badgeType = () => {
		if (badge === BadgeType.NORMAL) {
			return <NormalBadge />;
		}
		if (badge === BadgeType.PLATINUM) {
			return <PlatinumBadge />;
		}
	};

	return (
		<AntProgress
			className={classNames}
			format={badgeType}
			strokeWidth={15}
			strokeColor="#0055f2"
			type="circle"
			status="normal"
			{...props}
		/>
	);
};

export default Progress;
