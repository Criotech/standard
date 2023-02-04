import { FC, useMemo } from "react";
import Progress from "../Progress";
import "./index.scss";
import Text from "../Text";
import { BadgeType } from "../Progress/types";
import moment from "moment";
import { Link } from "react-router-dom-v5-compat";
import { IPoints } from "@myacuvue_thailand_web/services";

interface IProps {
	showPointsTerms?: boolean;
	points: IPoints;
}

const PointsBlock: FC<IProps> = ({ showPointsTerms, points }) => {
	const percentToPlatinum = useMemo(() => {
		const totalPoints =
			points.earnedPoints + points.remainingPointsToPlatinum;
		return (points.earnedPoints / totalPoints) * 100;
	}, [points]);

	const displayEarnedPoints = () => {
		if (points.earnedPoints) {
			if (points.earnedPoints >= 600) {
				return <Text textKey="pointsBlock.vipMessage" />;
			}
			return (
				<Text
					textKey="pointsBlock.pointsToPlatinumByDate"
					data={{
						number: points.remainingPointsToPlatinum,
						reachOutToPlatinumDate: moment(
							points.dateLimitToPlatinum!
						).format("DD/MM/YYYY"),
					}}
				/>
			);
		}
		if (points.remainingPointsToPlatinum) {
			return (
				<Text
					textKey="pointsBlock.pointsToPlatinum"
					data={{
						number: points.remainingPointsToPlatinum,
					}}
				/>
			);
		}
	};

	return (
		<div className="points-block">
			<Progress
				className="progress-block"
				percent={percentToPlatinum}
				badge={
					points.ladder === "normal"
						? BadgeType.NORMAL
						: BadgeType.PLATINUM
				}
			/>

			<div className="points-block-text">
				<h2 className="points-earned">
					<Text
						textKey="pointsBlock.earnedPoints"
						data={{
							earnedPoints: points.earnedPoints.toString(),
						}}
					/>
				</h2>

				<p className="points-to-platinum">{displayEarnedPoints()}</p>

				{showPointsTerms ? (
					<Link
						to="/points/terms-and-conditions"
						className="points-terms"
					>
						<Text textKey="pointsBlock.termsAndCondition" />
					</Link>
				) : (
					<p>
						{points.earnedPoints ? (
							<Link
								to="/membership/platinum"
								className="points-terms"
							>
								<Text textKey="pointsBlock.learnMembership" />
							</Link>
						) : (
							<Link to="/points/about" className="points-terms">
								<Text textKey="pointsBlock.learnEarnPoints" />
							</Link>
						)}
					</p>
				)}
			</div>
		</div>
	);
};

export default PointsBlock;
