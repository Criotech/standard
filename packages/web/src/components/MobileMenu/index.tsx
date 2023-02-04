import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { ConfigService } from "@myacuvue_thailand_web/services";
import { Menu as AntMenu } from "antd";
import { FC } from "react";
import ChevronRightIcon, { IconSize } from "../../icons/ChevronRightIcon";
import "./index.scss";
import Text from "../Text";
import { useService } from "../../hooks/useService";

interface IProps {
	topMenus: ConfigService.ITopHeaderLinks[];
	menus: ConfigService.IHeaderMenuItem[];
	className?: string;
}

const MobileMenu: FC<IProps> = ({ topMenus, menus, className }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-mobile-menu",
		className
	);

	return (
		<AntMenu
			className={classNames}
			expandIcon={({ isOpen }) =>
				isOpen ? <MinusOutlined /> : <PlusOutlined />
			}
			mode="inline"
		>
			{menus.map((menu) => (
				<AntMenu.SubMenu
					key={menu.title}
					title={<Text textKey={menu.title} />}
					className="menu-item"
				>
					{menu.linkGroups.map((linkGroup, linkGroupIndex) =>
						linkGroup.header ? (
							<AntMenu.SubMenu
								key={linkGroupIndex + linkGroup.header}
								title={<Text textKey={linkGroup.header} />}
								className="link-group"
							>
								{linkGroup.items.map(
									(subItem, subItemIndex) => (
										<AntMenu.Item
											key={subItemIndex + subItem.name}
										>
											{subItem.url ? (
												<a href={subItem.url}>
													<span>
														<Text
															textKey={
																subItem.name
															}
														/>
														<ChevronRightIcon
															size={
																IconSize.SMALL
															}
														/>
													</span>
												</a>
											) : (
												<Text textKey={subItem.name} />
											)}
										</AntMenu.Item>
									)
								)}
							</AntMenu.SubMenu>
						) : (
							linkGroup.items.map((subItem, subItemIndex) => (
								<AntMenu.Item key={subItemIndex + subItem.name}>
									{subItem.url ? (
										<a href={subItem.url}>
											<span>
												<Text textKey={subItem.name} />
												<ChevronRightIcon
													size={IconSize.SMALL}
												/>
											</span>
										</a>
									) : (
										<Text textKey={subItem.name} />
									)}
								</AntMenu.Item>
							))
						)
					)}
				</AntMenu.SubMenu>
			))}

			{topMenus.map(({ url, label }, index) => (
				<AntMenu.Item key={index}>
					<a href={url}>
						<span>
							<Text textKey={label} />
							<ChevronRightIcon size={IconSize.SMALL} />
						</span>
					</a>
				</AntMenu.Item>
			))}
		</AntMenu>
	);
};

export default MobileMenu;
