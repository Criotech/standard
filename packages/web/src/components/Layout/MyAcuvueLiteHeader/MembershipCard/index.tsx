import { FC } from "react";
import CircleDecorationIcon from "../../../../icons/CircleDecorationIcon";
import myAcuvueLogo from "../../../../images/myacuvue-icon.png";
import { useHistory } from "react-router-dom";
import Button, { ButtonType } from "../../../Button";
import Text from "../../../Text";
import "./index.scss";
import { useService } from "../../../../hooks/useService";
import { useConfiguration } from "../../../../hooks/useConfiguration";
import SignInButton from "../../../SignInButton";

interface IProps {
	className?: string;
}

const MembershipCard: FC<IProps> = ({ className }) => {
	const { ClassService } = useService();
	const { hasSignIn } = useConfiguration();
	const classNames = ClassService.createClassName(
		"membership-card",
		className
	);
	const history = useHistory();

	return (
		<div className={classNames}>
			<div className="circle-decoration-icon-wrapper">
				<CircleDecorationIcon className="circle-decoration-icon" />
			</div>
			<div className="content-wrapper">
				<div className="title">
					<img
						className="myacuvue-logo-img"
						src={myAcuvueLogo}
						alt="MyAcuvue logo"
					/>
					<span>
						<Text textKey="headerPage.membershipCard.myacuvueRewards" />
					</span>
				</div>

				<span className="description">
					<Text textKey="headerPage.membershipCard.rewardsDescription" />
				</span>

				<div className="action-buttons-wrapper">
					{hasSignIn && (
						<SignInButton
							className="sign-in-btn"
							buttonLabel="headerPage.membershipCard.signIn"
							type={ButtonType.OUTLINE}
						/>
					)}

					<Button
						className="join-now-btn"
						onClick={() => history.push("/phone-registration")}
					>
						<Text textKey="headerPage.membershipCard.joinNow" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default MembershipCard;
