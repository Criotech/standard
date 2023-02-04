import { FC } from "react";
import { Link } from "react-router-dom";
import ChevronRightIcon from "../../../../icons/ChevronRightIcon";
import Text from "../../../Text";
import "./index.scss";
import { useConfiguration } from "../../../../hooks/useConfiguration";
import SignInButton from "../../../SignInButton";

const MembershipSection: FC<{}> = () => {
	const { hasSignIn } = useConfiguration();

	return (
		<div className="membership-section">
			{hasSignIn && (
				<SignInButton
					className="sign-in"
					buttonLabel="myacuvueLiteHeader.signIn"
				>
					<ChevronRightIcon />
				</SignInButton>
			)}

			<Link to="/phone-registration">
				<Text textKey="myacuvueLiteHeader.joinNow" />
				<ChevronRightIcon />
			</Link>
		</div>
	);
};

export default MembershipSection;
