import { FC } from "react";
import "./index.scss";
import Text from "../../../../components/Text";
import { useService } from "../../../../hooks/useService";

interface IProps {
	points: number;
	className?: string;
}

const PointsAvailable: FC<IProps> = ({ points, className }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-membership-block-points-available",
		className
	);

	return (
		<div className={classNames}>
			<span className="acuvue-membership-block-points">{points}</span>
			<span className="acuvue-membership-block-points-label">
				<Text
					textKey={"dashboardPage.membershipDetails.pointsAvailable"}
				/>
			</span>
		</div>
	);
};

export default PointsAvailable;
