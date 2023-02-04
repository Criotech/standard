import {
	TranslationKey,
	TranslationData,
} from "@myacuvue_thailand_web/services";
import { FC } from "react";
import Text from "../../../../components/Text";
import { useService } from "../../../../hooks/useService";
import "./index.scss";

interface IProps {
	pointsExpiringKey: TranslationKey;
	pointsExpiringData?: TranslationData;
	className?: string;
}

const PointsExpiring: FC<IProps> = ({
	pointsExpiringKey,
	pointsExpiringData,
	className,
}) => {
	const { ClassService } = useService();

	const classNames = ClassService.createClassName(
		"acuvue-membership-points-expiring",
		className
	);

	return (
		<div className={classNames}>
			<Text textKey={pointsExpiringKey} data={pointsExpiringData} />
		</div>
	);
};

export default PointsExpiring;
