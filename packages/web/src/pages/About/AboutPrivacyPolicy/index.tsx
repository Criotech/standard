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

const AboutPrivacyPolicy = () => {
	const navigate = useNavigate();
	const [privacyHtml, setPrivacyHtml] = useState("");
	const { getPrivacyPolicy } = useLegalPolicies();

	useAsyncWithLoading(async () => {
		const receivedPrivacy = await getPrivacyPolicy();
		setPrivacyHtml(receivedPrivacy);
	}, [getPrivacyPolicy, setPrivacyHtml]);

	const handleAboutPrivacyBack = useCallback(() => {
		navigate("/about");
	}, [navigate]);

	return (
		<div className="about-privacy-policy">
			<Header titleKey="aboutAcuvuePage.privacyPolicy" />
			<main>
				<h1>
					<Text textKey="aboutAcuvuePage.privacyPolicy" />
				</h1>
				<DisplayHTML unsafeHTML={privacyHtml} />
				<Button
					className="back-button"
					type={ButtonType.PRIMARY}
					size={ButtonSize.MEDIUM}
					onClick={handleAboutPrivacyBack}
				>
					<Text textKey="button.backLabel" />
				</Button>
			</main>
			<GlobalNavigationPanel />
		</div>
	);
};

export default AboutPrivacyPolicy;
