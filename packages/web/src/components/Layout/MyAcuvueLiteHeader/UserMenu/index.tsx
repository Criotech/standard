import { FC, useCallback } from "react";
import { Link } from "react-router-dom";
import { useService } from "../../../../hooks/useService";
import ChevronRightIcon from "../../../../icons/ChevronRightIcon";
import ExitIcon, { IconSize } from "../../../../icons/ExitIcon";
import Text from "../../../Text";
import acuvueLogo from "../../../../images/myacuvue-icon.png";
import "./index.scss";
import { useAuthentication } from "../../../../hooks/useAuthentication";
import MemberIcon from "../../../../icons/MemberIcon";
import { useConfiguration } from "../../../../hooks/useConfiguration";

interface IProps {
	className?: string;
}

const UserMenu: FC<IProps> = ({ className }) => {
	const { resetAuth } = useAuthentication();
	const { ClassService } = useService();
	const { hasProfileDetailsMenu, signOutRedirectUrl } = useConfiguration();

	const classNames = ClassService.createClassName(
		"user-menu-section",
		className
	);

	const handleSignout = useCallback(
		async (
			event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
		): Promise<void> => {
			event.preventDefault();
			await resetAuth(signOutRedirectUrl);
		},
		[resetAuth, signOutRedirectUrl]
	);

	return (
		<div className={classNames}>
			<Link className="link" to="/">
				<img className="acuvue-logo icon" src={acuvueLogo} alt="" />
				<Text textKey="myacuvueLiteHeader.memberDashboard" />
				<ChevronRightIcon size={IconSize.SMALL} />
			</Link>
			{hasProfileDetailsMenu && (
				<Link className="link" to="/profile">
					<MemberIcon className="member-icon" />
					<Text textKey="myacuvueLiteHeader.profileDetails" />
					<ChevronRightIcon size={IconSize.SMALL} />
				</Link>
			)}
			<Link className="link" to="#" onClick={handleSignout}>
				<ExitIcon className="exit-icon" />
				<Text textKey="myacuvueLiteHeader.signOut" />
				<ChevronRightIcon size={IconSize.SMALL} />
			</Link>
		</div>
	);
};

export default UserMenu;
