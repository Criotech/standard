import { FC } from "react";
import { Link } from "react-router-dom";
import myAcuvueLogo from "../../../../images/myacuvue-icon.png";
import Text from "../../../Text";
import "./index.scss";
import { useService } from "../../../../hooks/useService";
import VerticalDivider from "../../../VerticalDivider";
import { useConfiguration } from "../../../../hooks/useConfiguration";
import SignInButton from "../../../SignInButton";

interface IProps {
	className?: string;
}

const DesktopMembership: FC<IProps> = ({ className }) => {
	const { ClassService } = useService();
	const { hasSignIn } = useConfiguration();
	const classNames = ClassService.createClassName(
		"desktop-membership",
		className
	);

	return (
		<div className={classNames}>
			<div className="acuvue-image-and-acuvue-rewards">
				<img
					src={myAcuvueLogo}
					alt="MyAcuvue logo"
					className="acuvue-logo"
				/>
				<span className="rewards-text">
					<Text textKey="headerPage.membershipCard.myacuvueRewards" />
				</span>
			</div>

			<div className="action-buttons-wrapper">
				{hasSignIn && (
					<>
						<SignInButton buttonLabel="headerPage.membershipCard.signIn" />
						<VerticalDivider />
					</>
				)}
				<div>
					<Link to="/phone-registration">
						<Text textKey="headerPage.membershipCard.joinNow" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default DesktopMembership;
