import {
	TranslationKey,
	TranslationData,
} from "@myacuvue_thailand_web/services";
import { FC } from "react";
import LoadingBlock from "../../../../components/LoadingBlock";
import BenefitsList from "../BenefitsList";
import PointsAvailable from "../PointsAvailable";
import PointsExpiring from "../PointsExpiring";
import StatusHeading from "../StatusHeading";
import StatusName from "../StatusName";
import "./index.scss";
import VerticalDivider from "../../../../components/VerticalDivider";
import Text from "../../../../components/Text";

interface IProps {
	isStatusVisible: boolean;
	benefitKeys: TranslationKey[];
	availablePoints?: number;
	isLoading: boolean;
	pointsExpiringKey: TranslationKey;
	statusKey: TranslationKey;
	pointsExpiringData: TranslationData;
}

const WideView: FC<IProps> = ({
	isStatusVisible,
	statusKey,
	availablePoints,
	pointsExpiringKey,
	pointsExpiringData,
	isLoading,
	benefitKeys,
}) => {
	if (isLoading) {
		return <LoadingBlock />;
	}

	return (
		<div className="acuvue-member-wide-view">
			<h2 className="typography-heading-2 membership-heading">
				<Text textKey="dashboardPage.blockTitle.myAcuvueMembership" />
			</h2>

			<div className="content-container">
				<div className="status-and-benefits">
					{isStatusVisible && (
						<div className="status">
							<StatusHeading />
							<StatusName
								className="status-name"
								statusKey={statusKey}
							/>
						</div>
					)}

					<BenefitsList
						benefitsHeadingKey="dashboardPage.membership.benefitsHeading"
						benefitsKeys={benefitKeys}
					/>
					<p className="navigate-to-qr-code-text">
						<Text textKey="dashboardPage.membershipDetails.navigateToQRCode" />
					</p>
				</div>

				<VerticalDivider className="vertical-divider" />

				<div className="points-available-expiring">
					{availablePoints !== undefined && (
						<PointsAvailable points={availablePoints} />
					)}

					<PointsExpiring
						className="points-expiring"
						pointsExpiringKey={pointsExpiringKey}
						pointsExpiringData={pointsExpiringData}
					/>
				</div>
			</div>
		</div>
	);
};

export default WideView;
