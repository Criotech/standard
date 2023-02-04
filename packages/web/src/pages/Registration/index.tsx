import { FC } from "react";
import RegistrationForm from "./RegistrationForm";
import LanguageToggle from "../../components/LanguageToggle";
import "./index.scss";
import HeaderImage from "../../components/HeaderImage";
import Text from "../../components/Text";

const RegistrationPage: FC<{}> = () => (
	<div className="registration-page">
		<header>
			<HeaderImage />
			<LanguageToggle className="language-toggle" />
			<h1>
				<Text textKey="registrationPage.button.registerLabel" />
			</h1>
		</header>
		<RegistrationForm />
	</div>
);

export default RegistrationPage;
