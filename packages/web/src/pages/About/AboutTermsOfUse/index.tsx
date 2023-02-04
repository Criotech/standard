import { useCallback, useState } from "react";
import Button, { ButtonSize, ButtonType } from "../../../components/Button";
import { useNavigate } from "react-router-dom-v5-compat";
import "./index.scss";
import { useLegalPolicies } from "../../../hooks/useLegalPolicies";
import Text from "../../../components/Text";
import DisplayHTML from "../../../components/DisplayHTML";
import Header from "../../../components/Layout/Header";
import GlobalNavigationPanel from "../../../components/GlobalNavigationPanel";
import { useAsyncWithLoading } from "../../../hooks/useAsyncWithLoading";

const AboutTermsOfUse = () => {
	const navigate = useNavigate();
	const [termsHtml, setTermsHtml] = useState("");
	const { getTermsAndConditions } = useLegalPolicies();

	useAsyncWithLoading(async () => {
		const receivedTerms = await getTermsAndConditions();
		setTermsHtml(receivedTerms);
	}, [getTermsAndConditions, setTermsHtml]);

	const handleAboutTermsBack = useCallback(() => {
		navigate("/about");
	}, [navigate]);

	return (
		<div className="about-terms-of-use">
			<Header titleKey="aboutAcuvuePage.termsOfUse" />
			<main>
				<h1>
					<Text textKey="aboutAcuvuePage.termsOfUse" />
				</h1>
				<DisplayHTML unsafeHTML={termsHtml} />
				<Button
					className="back-button"
					type={ButtonType.PRIMARY}
					size={ButtonSize.MEDIUM}
					onClick={handleAboutTermsBack}
				>
					<Text textKey="button.backLabel" />
				</Button>
			</main>
			<GlobalNavigationPanel />
		</div>
	);
};

export default AboutTermsOfUse;
