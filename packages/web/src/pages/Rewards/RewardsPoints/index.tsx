import { FC } from "react";
import { IPoints } from "@myacuvue_thailand_web/services";
import Text from "../../../components/Text";
import moment from "moment";
import HighlightedValue from "../../../components/HighlightedValue";

interface IProps {
	points?: IPoints;
}

const RewardsPoints: FC<IProps> = ({ points }) => (
	<div>
		<p className="available-points">
			<HighlightedValue
				value={points ? points.availablePoints : 0}
				textKey="cart.availablePoint"
			/>
		</p>

		{points?.expiringPoints && points.expiringAt ? (
			<p className="expiry-point-message">
				<Text
					textKey="pointsBlock.pointsExpiringOn"
					data={{
						points: points.expiringPoints,
						expiryDate: moment(points.expiringAt).format(
							"DD/MM/YYYY"
						),
					}}
				/>
			</p>
		) : (
			<p className="expiry-point-message">
				<Text textKey="pointsBlock.noPointExpiring" />
			</p>
		)}
	</div>
);

export default RewardsPoints;
