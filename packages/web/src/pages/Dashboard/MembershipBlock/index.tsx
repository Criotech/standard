import { FC, useMemo } from "react";
import {
	Ladder,
	TranslationKey,
	TranslationData,
} from "@myacuvue_thailand_web/services";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { useWideScreen } from "../../../hooks/useWideScreen";
import { useDate } from "../../../hooks/useDate";
import WideView from "./WideView";
import SmallView from "./SmallView";

interface IProps {
	availablePoints: number;
	expiringPoints: number | null;
	expiringAt: string | null;
	isLoading: boolean;
	ladderKey: Ladder;
}

const MembershipBlock: FC<IProps> = ({
	availablePoints,
	expiringPoints,
	expiringAt,
	isLoading,
	ladderKey,
}) => {
	const { isWideScreen } = useWideScreen();

	const { longDateToDisplay } = useDate();

	const { isMembershipStatusVisible, membershipBenefitKeysByLadder } =
		useConfiguration();

	const benefitKeys = membershipBenefitKeysByLadder[ladderKey];

	const statusKeyByLadder: TranslationKey = useMemo(() => {
		if (ladderKey === "platinum") {
			return "dashboardPage.membership.vip";
		} else {
			return "dashboardPage.membership.member";
		}
	}, [ladderKey]);

	const [pointsExpiringKey, pointsExpiringData] = useMemo<
		[TranslationKey, TranslationData]
	>(() => {
		let pointsExpiringKeyInternal: TranslationKey =
			"dashboardPage.membership.noPointsExpiring";
		let pointsExpiringDataInternal: TranslationData = {};
		if (expiringPoints && expiringPoints > 0) {
			pointsExpiringKeyInternal =
				"dashboardPage.membership.pointsExpiring";
			pointsExpiringDataInternal = {
				expiringPoints,
				expiringAt: longDateToDisplay(new Date(expiringAt!)),
			};
		}
		return [pointsExpiringKeyInternal, pointsExpiringDataInternal];
	}, [longDateToDisplay, expiringAt, expiringPoints]);

	return isWideScreen ? (
		<WideView
			isStatusVisible={isMembershipStatusVisible}
			benefitKeys={benefitKeys}
			isLoading={isLoading}
			availablePoints={availablePoints}
			statusKey={statusKeyByLadder}
			pointsExpiringKey={pointsExpiringKey}
			pointsExpiringData={pointsExpiringData}
		/>
	) : (
		<SmallView
			isStatusVisible={isMembershipStatusVisible}
			isLoading={isLoading}
			availablePoints={availablePoints}
			statusKey={statusKeyByLadder}
			pointsExpiringKey={pointsExpiringKey}
			pointsExpiringData={pointsExpiringData}
		/>
	);
};

export default MembershipBlock;
