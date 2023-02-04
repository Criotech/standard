import { FC } from "react";
import "./index.scss";
import LanguageToggle from "../../components/LanguageToggle";
import Text from "../../components/Text";
import PhoneForm from "./PhoneForm";
import { useQuery } from "../../hooks/useQuery";
import HeaderImage from "../../components/HeaderImage";

const PhoneRegistration: FC<{}> = () => {
	const query = useQuery();
	return (
		<div className="phone-registration">
			<header>
				<HeaderImage />
				<LanguageToggle className="language-toggle" />
			</header>
			<main>
				<h1>
					<Text textKey="phoneRegistrationPage.welcome" />
				</h1>
				<p>
					<Text textKey="phoneRegistrationPage.fillYourNumber" />
				</p>
				<PhoneForm defaultValue={{ phone: query.get("phone") || "" }} />
			</main>
		</div>
	);
};

export default PhoneRegistration;
