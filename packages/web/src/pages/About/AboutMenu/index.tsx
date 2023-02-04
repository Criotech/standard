import { FC } from "react";
import "./index.scss";
import Text from "../../../components/Text";
import NextIcon from "../../../icons/NextIcon";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import { Link } from "react-router-dom";
import ThinDivider from "../../../components/ThinDivider";

interface IAboutMenuList {
	name: TranslationKey;
	pathname: string;
}

const AboutMenu: FC<{}> = () => {
	const aboutMenuList: IAboutMenuList[] = [
		{
			name: "aboutAcuvuePage.contactUs",
			pathname: "/about/contact-us",
		},
		{
			name: "aboutAcuvuePage.termsOfUse",
			pathname: "/about/terms-of-use",
		},
		{
			name: "aboutAcuvuePage.privacyPolicy",
			pathname: "/about/privacy-policy",
		},
	];

	return (
		<div className="about-menu">
			{aboutMenuList.map((menuItem) => (
				<div key={menuItem.name}>
					<div className="acuvue-internal-page-link">
						<Link
							to={menuItem.pathname}
							className="about-menu-link"
						>
							<p className="about-menu-name">
								<Text textKey={menuItem.name} />
							</p>
							<NextIcon />
						</Link>
					</div>
					<ThinDivider />
				</div>
			))}
		</div>
	);
};

export default AboutMenu;
