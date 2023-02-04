import { FC } from "react";
import { ConfigService } from "@myacuvue_thailand_web/services";
import { useService } from "../../hooks/useService";
import { useConfiguration } from "../../hooks/useConfiguration";
import Text from "../Text";
import MegaMenuListItem from "./MegaMenuListItem";
import MegaMenuListItemHeader from "./MegaMenuListItemHeader";
import "./index.scss";

interface IProps {
	menus: ConfigService.IHeaderMenuItem[];
	className?: string;
}

const MegaMenu: FC<IProps> = ({ menus, className }) => {
	const { ClassService } = useService();
	const { topHeaderLinks } = useConfiguration();

	const classNames = ClassService.createClassName(
		"acuvue-mega-menu",
		topHeaderLinks.length === 0 ? "no-top-header-links" : "",
		className
	);

	return (
		<div className={classNames}>
			{menus.map((menu, menuIndex) => (
				<div key={menuIndex} className="menu-item">
					<div className="menu-title typography-heading-overline">
						<Text textKey={menu.title} />
					</div>
					<div className="dropdown-content">
						<div className="dropdown-content-wrapper">
							{menu.linkGroups.map(
								(linkGroup, linkGroupIndex) => (
									<nav
										key={linkGroupIndex}
										className="link-group"
									>
										<ul>
											{linkGroup.header && (
												<MegaMenuListItemHeader
													className="list-header"
													textKey={linkGroup.header}
												/>
											)}
											{linkGroup.items.map(
												(subItem, subItemIndex) => (
													<MegaMenuListItem
														className="list-item"
														textKey={subItem.name}
														url={subItem.url}
														key={subItemIndex}
													/>
												)
											)}
										</ul>
									</nav>
								)
							)}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default MegaMenu;
