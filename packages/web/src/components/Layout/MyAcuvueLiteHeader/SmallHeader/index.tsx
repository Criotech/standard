import { Affix } from "antd";
import AcuvueLogo from "../AcuvueLogo";
import Button from "../../../Button";
import { CloseOutlined } from "@ant-design/icons";
import MagnifyingGlassIcon from "../../../../icons/MagnifyingGlassIcon";
import MemberIcon from "../../../../icons/MemberIcon";
import HamburgerButton from "../HamburgerButton";
import SmallSearchBar from "../SmallSearchBar";
import MembershipSection from "../MembershipSection";
import MobileMenu from "../../../MobileMenu";
import MembershipCard from "../MembershipCard";
import { FC, useEffect, useMemo } from "react";
import { useToggle } from "react-use";
import { AuthStatus } from "../../../../contexts/AuthContext";
import { useAuthentication } from "../../../../hooks/useAuthentication";
import { useConfiguration } from "../../../../hooks/useConfiguration";
import "./index.scss";
import UserMenu from "../UserMenu";
import { useLocation } from "react-router-dom";

const SmallHeader: FC<{}> = () => {
	const [isMenuOpen, toggleMenuOpen] = useToggle(false);
	const [isLoginJoinNowOpen, toggleLoginJoinNowOpen] = useToggle(false);
	const [isUserMenuOpen, toggleUserMenuOpen] = useToggle(false);
	const [isSearchOpen, toggleSearchOpen] = useToggle(false);
	const { status } = useAuthentication();
	const { topHeaderLinks, headerMenu } = useConfiguration();

	useEffect(() => {
		if (isMenuOpen) {
			toggleLoginJoinNowOpen(false);
			toggleSearchOpen(false);
			toggleUserMenuOpen(false);
		}
	}, [
		isMenuOpen,
		toggleLoginJoinNowOpen,
		toggleSearchOpen,
		toggleUserMenuOpen,
	]);

	useEffect(() => {
		if (isLoginJoinNowOpen) {
			toggleMenuOpen(false);
			toggleSearchOpen(false);
			toggleUserMenuOpen(false);
		}
	}, [
		isLoginJoinNowOpen,
		toggleMenuOpen,
		toggleSearchOpen,
		toggleUserMenuOpen,
	]);

	useEffect(() => {
		if (isSearchOpen) {
			toggleLoginJoinNowOpen(false);
			toggleMenuOpen(false);
			toggleUserMenuOpen(false);
		}
	}, [
		isSearchOpen,
		toggleLoginJoinNowOpen,
		toggleMenuOpen,
		toggleUserMenuOpen,
	]);

	const searchButtonClassname = `mobile-search-button ${
		isSearchOpen ? "close-icon" : ""
	}`;

	const handleMemberButtonClick = () => {
		if (status === AuthStatus.AUTHENTICATED) {
			toggleUserMenuOpen();
		} else {
			toggleLoginJoinNowOpen();
		}
	};

	const activeMemberClass = useMemo(() => {
		return isUserMenuOpen ? "member-icon-active" : "";
	}, [isUserMenuOpen]);

	const memberClassName = `member-icon ${activeMemberClass}`;

	const currentRoute = useLocation().pathname;

	return (
		<Affix>
			<header className="acuvue-lite-small-header">
				<div className="mobile-header-wrapper">
					<AcuvueLogo />
					<div className="header-icons">
						<Button
							className={searchButtonClassname}
							onClick={toggleSearchOpen}
						>
							{isSearchOpen ? (
								<CloseOutlined
									style={{
										fontSize: "21px",
										color: "#fff",
									}}
								/>
							) : (
								<MagnifyingGlassIcon />
							)}
						</Button>
						{currentRoute !== "/registration/profile" ? (
							<Button
								className="member-button"
								onClick={handleMemberButtonClick}
							>
								<MemberIcon className={memberClassName} />
							</Button>
						) : (
							<></>
						)}
						<HamburgerButton
							isOpen={isMenuOpen}
							onClick={toggleMenuOpen}
						/>
					</div>
				</div>

				{isSearchOpen && <SmallSearchBar />}
				{isLoginJoinNowOpen && <MembershipSection />}
				{isUserMenuOpen && (
					<div>
						<UserMenu />
					</div>
				)}
				{isMenuOpen && (
					<div className="mobile-menu-wrapper">
						<MobileMenu
							topMenus={topHeaderLinks}
							menus={headerMenu}
						/>
						<MembershipCard className="membership-card" />
					</div>
				)}
			</header>
		</Affix>
	);
};

export default SmallHeader;
