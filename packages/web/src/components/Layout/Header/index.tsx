import { FC, ReactNode } from "react";
import { Affix } from "antd";
import "./index.scss";
import Drawer from "../Drawer";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import Text from "../../Text";
import HamburgerToggle from "../../HamburgerToggle";
import { useToggle } from "react-use";

export type Props = {
	titleKey?: TranslationKey;
	icon?: ReactNode;
};

const Header: FC<Props> = ({ titleKey, icon }) => {
	const [isDrawerOpen, toggleDrawerOpen] = useToggle(false);

	return (
		<>
			<Affix offsetTop={0} className="header-wrapper">
				<div className="header-content">
					<HamburgerToggle
						onClick={toggleDrawerOpen}
						isToggled={isDrawerOpen}
					/>

					{titleKey && (
						<div className="header-text">
							<Text textKey={titleKey} />
						</div>
					)}

					<div className="header-icon">{icon}</div>
				</div>
			</Affix>
			<Drawer onClose={toggleDrawerOpen} visible={isDrawerOpen} />
		</>
	);
};

export default Header;
