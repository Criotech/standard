import { FC } from "react";
import { ConfigService } from "@myacuvue_thailand_web/services";
import "./index.scss";
import { useService } from "../../../hooks/useService";
import LinksSectionListItem from "./LinksSectionListItem";
import LinksSectionListHeader from "./LinksSectionListHeader";

interface IProps {
	data: ConfigService.IFooterLinkItem[];
	className?: string;
}

const LinksSection: FC<IProps> = ({ data, className }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-links-section",
		className
	);

	return (
		<div className={classNames}>
			<div className="links-content">
				{data.map(({ items, title }) => (
					<ul key={title} className="link-group-list">
						<LinksSectionListHeader
							className="list-header"
							textKey={title}
						/>

						{items.map((subItem, subItemIndex) => (
							<LinksSectionListItem
								key={subItemIndex}
								url={subItem.url}
								textKey={subItem.name}
								className="list-item"
							/>
						))}
					</ul>
				))}
			</div>
		</div>
	);
};

export default LinksSection;
