import { FC } from "react";
import "./index.scss";
import LanguageToggle from "../../components/LanguageToggle";
import Text from "../../components/Text";
import HeaderImage from "../../components/HeaderImage";
import UpdatePhoneForm from "./UpdatePhoneForm";

const UpdatePhoneNumber: FC<{}> = () => (
	<div className="update-mobile-number">
		<header>
			<HeaderImage />
			<LanguageToggle className="language-toggle" />
		</header>
		<main>
			<h1>
				<Text textKey="updatePhoneNumberPage.title" />
			</h1>
			<p>
				<Text textKey="updatePhoneNumberPage.fillYourNumber" />
			</p>
			<UpdatePhoneForm defaultValue={{ phone: "" }} />
		</main>
	</div>
);

export default UpdatePhoneNumber;
