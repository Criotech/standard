import Text from "../../Text";
import ChevronRightIcon, { IconSize } from "../../../icons/ChevronRightIcon";
import { FC } from "react";
import {
	TranslationKey,
	TranslationType,
} from "@myacuvue_thailand_web/services";
import "./LinksSectionListItem.scss";
import { useService } from "../../../hooks/useService";

interface IProps {
	url?: string;
	textKey: TranslationKey<TranslationType.liteTheme>;
	className?: string;
}

const LinksSectionListItem: FC<IProps> = ({ url, textKey, className }) => {
	const { ClassService } = useService();

	const classNames = ClassService.createClassName(
		"acuvue-links-section-list-item",
		className
	);

	return (
		<li className={classNames}>
			{url ? (
				<a className="sub-item-url" href={url}>
					<span>
						<Text
							textKey={textKey}
							type={TranslationType.liteTheme}
						/>
						<ChevronRightIcon
							size={IconSize.SMALL}
							className="chevron-right-icon"
						/>
					</span>
				</a>
			) : null}
		</li>
	);
};

export default LinksSectionListItem;
