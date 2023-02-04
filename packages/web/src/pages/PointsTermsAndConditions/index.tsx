import { useEffect, useCallback, useState } from "react";
import Button, { ButtonSize, ButtonType } from "../../components/Button";
import Text from "../../components/Text";
import { useNavigate } from "react-router-dom-v5-compat";
import "./index.scss";
import { useLegalPolicies } from "../../hooks/useLegalPolicies";
import DisplayHTML from "../../components/DisplayHTML";
import Header from "../../components/Layout/Header";
import GlobalNavigationPanel from "../../components/GlobalNavigationPanel";

const PointsTermsAndConditions = () => {
	const navigate = useNavigate();
	const [pointsTermsAndConditionData, setPointsTermsAndConditionData] =
		useState("");
	const { getPointsTermsAndConditions } = useLegalPolicies();

	useEffect(() => {
		(async () => {
			const pointsTermsAndConditionsUnsafeHTML =
				await getPointsTermsAndConditions();
			setPointsTermsAndConditionData(pointsTermsAndConditionsUnsafeHTML);
		})();
	}, [setPointsTermsAndConditionData, getPointsTermsAndConditions]);

	const handlePointsTermsClose = useCallback(() => {
		navigate("/points");
	}, [navigate]);

	return (
		<div className="points-terms-and-conditions">
			<Header titleKey="pointsTermsAndCondition.title" />

			<main>
				<h1>
					<Text textKey="pointsTermsAndCondition.title" />
				</h1>
				<DisplayHTML unsafeHTML={pointsTermsAndConditionData} />
				<Button
					className="close-button"
					type={ButtonType.PRIMARY}
					size={ButtonSize.MEDIUM}
					onClick={handlePointsTermsClose}
				>
					<Text textKey="button.closeLabel" />
				</Button>
			</main>

			<GlobalNavigationPanel />
		</div>
	);
};

export default PointsTermsAndConditions;
