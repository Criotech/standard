import {
	TranslationKey,
	TranslationData,
} from "@myacuvue_thailand_web/services";
import { FC } from "react";
import LoadingBlock from "../../../../components/LoadingBlock";
import BlockTitle from "../../BlockTitle";
import PointsAvailable from "../PointsAvailable";
import PointsExpiring from "../PointsExpiring";
import StatusHeading from "../StatusHeading";
import StatusName from "../StatusName";
import "./index.scss";

interface IProps {
	isStatusVisible: boolean;
	availablePoints?: number;
	isLoading: boolean;
	pointsExpiringKey: TranslationKey;
	statusKey: TranslationKey;
	pointsExpiringData: TranslationData;
}

const SmallView: FC<IProps> = ({
	isStatusVisible,
	statusKey,
	availablePoints,
	isLoading,
	pointsExpiringKey,
	pointsExpiringData,
}) => {
	if (isLoading) {
		return <LoadingBlock />;
	}

	return (
		<div className="acuvue-member-small-view">
			<BlockTitle textKey="dashboardPage.blockTitle.myAcuvueMembership" />

			{isStatusVisible && (
				<div className="status">
					<StatusHeading className="status-heading" />
					<StatusName className="status-name" statusKey={statusKey} />
				</div>
			)}

			<div className="points-available-expiring">
				{availablePoints !== undefined && (
					<PointsAvailable
						points={availablePoints}
						className="points-available"
					/>
				)}

				<PointsExpiring
					className="points-expiring"
					pointsExpiringKey={pointsExpiringKey}
					pointsExpiringData={pointsExpiringData}
				/>
			</div>
		</div>
	);
};

export default SmallView;
