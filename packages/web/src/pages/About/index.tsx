import { FC } from "react";
import "./index.scss";
import acuvueLogoIcon from "../../images/acuvue-logo-icon.svg";
import Text from "../../components/Text";
import Button, { ButtonSize, ButtonType } from "../../components/Button";
import GlobalNavigationPanel from "../../components/GlobalNavigationPanel";
import { useNavigate } from "react-router-dom-v5-compat";
import Header from "../../components/Layout/Header";
import SectionDivider from "../../components/SectionDivider";
import AboutMenu from "./AboutMenu";

const About: FC<{}> = () => {
	const navigate = useNavigate();

	return (
		<div className="about-my-acuvue">
			<Header titleKey="drawer.about" />
			<main>
				<div className="acuvue-logo-icon">
					<img src={acuvueLogoIcon} alt="Acuvue-Logo" />
				</div>
				<p className="about-acuvue-description">
					<Text textKey="aboutAcuvuePage.description" />
				</p>
				<div className="about-acuvue-buttons">
					<Button
						onClick={() => navigate("/points/about")}
						className="how-to-earn-points-button"
						type={ButtonType.OUTLINE}
						size={ButtonSize.MEDIUM}
					>
						<Text textKey="aboutAcuvuePage.howToEarnPoints" />
					</Button>
					<Button
						className="member-benefits-button"
						type={ButtonType.OUTLINE}
						size={ButtonSize.MEDIUM}
						onClick={() => navigate("/membership")}
					>
						<Text textKey="aboutAcuvuePage.memberBenefits" />
					</Button>
				</div>
				<SectionDivider />
				<AboutMenu />
				<div className="acuvue-copyright">
					<p>
						<Text textKey="aboutAcuvuePage.copyright" />
					</p>
					<p>
						<Text textKey="aboutAcuvuePage.copyrightText" />
					</p>
					<p>
						<Text textKey="aboutAcuvuePage.licenseNumber" />
					</p>
				</div>
				<GlobalNavigationPanel />
			</main>
		</div>
	);
};

export default About;
