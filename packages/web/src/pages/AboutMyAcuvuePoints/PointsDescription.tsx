import { FC } from "react";
import Text from "../../components/Text";
import "./index.scss";
import Button, { ButtonSize, ButtonType } from "../../components/Button";
import paymentIcon from "../../images/payment-icon.svg";
import acuvueLogoIcon from "../../images/acuvue-logo-icon.svg";
import { useNavigate } from "react-router-dom-v5-compat";
import SectionDivider from "../../components/SectionDivider";

const PointsDescription: FC<{}> = () => {
	const navigate = useNavigate();

	return (
		<div className="points-description">
			<div className="my-acuvue-points">
				<h1>
					<Text textKey="aboutPointsPage.aboutMyAcuvuePoints.title" />
				</h1>
				<p>
					<Text textKey="aboutPointsPage.pointsDescription.body" />
				</p>
			</div>
			<SectionDivider />
			<div className="earn-my-acuvue-points">
				<h1>
					<Text textKey="aboutPointsPage.pointsDescription.earnMyAcuvuePoints" />
				</h1>
				<div className="acuvue-logo-icon">
					<img src={acuvueLogoIcon} alt="" />
				</div>
				<p>
					<Text textKey="aboutPointsPage.pointsDescription.point1" />
				</p>
				<div className="payment-icon">
					<img src={paymentIcon} alt="" />
				</div>
				<p>
					<Text textKey="aboutPointsPage.pointsDescription.point2" />
				</p>
				<Button
					className="member-benefits-button"
					type={ButtonType.PRIMARY}
					size={ButtonSize.MEDIUM}
					onClick={() => navigate("/membership")}
				>
					<Text textKey="aboutPointsPage.pointsDescription.viewMemberBenefits" />
				</Button>
			</div>
		</div>
	);
};
export default PointsDescription;
