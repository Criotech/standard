import { useState, useCallback, useEffect } from "react";
import Button, { ButtonSize, ButtonType } from "../../components/Button";
import Tab from "../../components/Tab";
import "./index.scss";
import { useLegalPolicies } from "../../hooks/useLegalPolicies";
import Text from "../../components/Text";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAsync } from "react-use";
import LoadingBlock from "../../components/LoadingBlock";
import DisplayHTML from "../../components/DisplayHTML";
import { Affix } from "antd";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { useNavigate } from "react-router-dom-v5-compat";

enum TabType {
	TERMS = "TermsTab",
	PRIVACY = "PrivacyTab",
}

const TermsConditionsPrivacyPolicy = () => {
	const navigate = useNavigate();
	const [isTermsAccepted, setIsTermsAccepted] = useState(false);
	const [selectedTab, setSelectedTab] = useState(TabType.TERMS);

	const { resetAuth } = useAuthentication();
	const { userProfile } = useUserProfile();

	const { getTermsAndConditions, getPrivacyPolicy, acceptLegalTerms } =
		useLegalPolicies();

	const { loading, value } = useAsync(
		async () => Promise.all([getTermsAndConditions(), getPrivacyPolicy()]),
		[getTermsAndConditions, getPrivacyPolicy]
	);
	const [termsUnsafeHTML, privacyUnsafeHTML] =
		(value as [string, string]) || [];

	const handleTermsAccepted = useCallback(() => {
		setIsTermsAccepted(true);
		setSelectedTab(TabType.PRIVACY);
	}, [setIsTermsAccepted, setSelectedTab]);

	useEffect(() => {
		if (userProfile) {
			navigate("/registration");
		}
	}, [navigate, userProfile]);

	const handlePrivacyAccepted = useCallback(async () => {
		await acceptLegalTerms();
	}, [acceptLegalTerms]);

	const handleDeclined = useCallback(async () => {
		await resetAuth();
	}, [resetAuth]);

	return (
		<div className="terms-policy">
			{loading ? (
				<LoadingBlock />
			) : (
				<main>
					<Affix>
						<Tab
							className="policy-tabs"
							value={selectedTab}
							onChange={(tappedTab) =>
								setSelectedTab(tappedTab as TabType)
							}
							items={[
								{
									labelKey: "termsAndConditions.title",
									value: TabType.TERMS,
									disabled: false,
								},
								{
									labelKey: "privacyPolicy.title",
									value: TabType.PRIVACY,
									disabled: !isTermsAccepted,
								},
							]}
						/>
					</Affix>

					<div className="policy-content">
						<DisplayHTML
							unsafeHTML={
								selectedTab === TabType.TERMS
									? termsUnsafeHTML
									: privacyUnsafeHTML
							}
						/>
					</div>

					<div className="buttons-wrapper">
						{!isTermsAccepted && (
							<Button
								className="next-button"
								type={ButtonType.PRIMARY}
								size={ButtonSize.MEDIUM}
								onClick={handleTermsAccepted}
							>
								<Text textKey="termsAndConditionsPage.button.nextLabel" />
							</Button>
						)}

						{isTermsAccepted && (
							<>
								<Button
									className="accept-button"
									type={ButtonType.PRIMARY}
									size={ButtonSize.MEDIUM}
									onClick={handlePrivacyAccepted}
								>
									<Text textKey="termsAndConditionsPage.button.acceptLabel" />
								</Button>

								<Button
									className="decline-button"
									type={ButtonType.PRIMARY}
									size={ButtonSize.MEDIUM}
									onClick={handleDeclined}
								>
									<Text textKey="termsAndConditionsPage.button.declineLabel" />
								</Button>
							</>
						)}
					</div>
				</main>
			)}
		</div>
	);
};

export default TermsConditionsPrivacyPolicy;
