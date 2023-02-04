import { Affix } from "antd";
import TopHeader from "../TopHeader";
import AcuvueLogo from "../AcuvueLogo";
import MegaMenu from "../../../MegaMenu";
import WideSearchForm from "../WideSearchForm";
import DesktopMembership from "../DesktopMembership";
import { AuthStatus } from "../../../../contexts/AuthContext";
import { useAuthentication } from "../../../../hooks/useAuthentication";
import { useConfiguration } from "../../../../hooks/useConfiguration";
import MemberMenuDropdownTrigger from "../MemberMenuDropdownTrigger";
import "./index.scss";
import { useLocation } from "react-router-dom";
import { useUserProfile } from "../../../../contexts/UserProfileContext";

const WideHeader = () => {
	const { status } = useAuthentication();
	const { userProfile } = useUserProfile();
	const isAuthenticated = status === AuthStatus.AUTHENTICATED;
	const { headerMenu } = useConfiguration();

	const name = userProfile?.firstName || "";

	const currentRoute = useLocation().pathname;
	return (
		<Affix>
			<header className="acuvue-lite-wide-header">
				<TopHeader />
				<div className="desktop-header-wrapper">
					<AcuvueLogo />
					<div>
						<MegaMenu menus={headerMenu} />
					</div>
					<WideSearchForm />
					{isAuthenticated &&
					currentRoute !== "/registration/profile" ? (
						<MemberMenuDropdownTrigger
							name={name}
							className="wide-header-dropdown"
						/>
					) : (
						currentRoute !== "/registration/profile" &&
						!isAuthenticated && <DesktopMembership />
					)}
				</div>
			</header>
		</Affix>
	);
};

export default WideHeader;
