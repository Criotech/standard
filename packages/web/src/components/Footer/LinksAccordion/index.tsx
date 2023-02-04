import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Menu as AntMenu } from "antd";
import { FC } from "react";
import {
	TranslationType,
	ConfigService,
} from "@myacuvue_thailand_web/services";
import ChevronRightIcon, { IconSize } from "../../../icons/ChevronRightIcon";
import Text from "../../Text";
import "./index.scss";
import { useService } from "../../../hooks/useService";

interface IProps {
	data: ConfigService.IFooterLinkItem[];
	className?: string;
}

const LinksAccordion: FC<IProps> = ({ data, className }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"links-accordion",
		className
	);

	return (
		<AntMenu
			className={classNames}
			expandIcon={({ isOpen }) => {
				return isOpen ? <MinusOutlined /> : <PlusOutlined />;
			}}
			mode="inline"
		>
			{data.map((footerLink) =>
				footerLink.items.length > 0 ? (
					<AntMenu.SubMenu
						key={footerLink.title}
						title={
							<Text
								textKey={footerLink.title}
								type={TranslationType.liteTheme}
							/>
						}
						className="footer-item"
					>
						{footerLink.items.map((item, itemIndex) => (
							<AntMenu.Item key={itemIndex + item.name}>
								{item.url ? (
									<a className="footer-link" href={item.url}>
										<span className="footer-link-items">
											<Text
												textKey={item.name}
												type={TranslationType.liteTheme}
											/>
											<ChevronRightIcon
												size={IconSize.SMALL}
											/>
										</span>
									</a>
								) : (
									<Text
										key={itemIndex + item.name}
										textKey={item.name}
										type={TranslationType.liteTheme}
									/>
								)}
							</AntMenu.Item>
						))}
					</AntMenu.SubMenu>
				) : (
					<AntMenu.Item
						key={footerLink.title}
						className="footer-item footer-item-with-no-links"
					>
						<Text
							textKey={footerLink.title}
							type={TranslationType.liteTheme}
						/>
					</AntMenu.Item>
				)
			)}
		</AntMenu>
	);
};

export default LinksAccordion;
