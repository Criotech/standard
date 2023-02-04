import { useService } from "../../hooks/useService";
import Text from "../Text";
import ChevronRightIcon, { IconSize } from "../../icons/ChevronRightIcon";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import { FC } from "react";
import "./MegaMenuListItem.scss";

interface IProps {
	className?: string;
	url?: string;
	textKey: TranslationKey;
}

const MegaMenuListItem: FC<IProps> = ({ className, url, textKey }) => {
	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"acuvue-mega-menu-list-item",
		className
	);

	return (
		<li className={classNames}>
			{url ? (
				<a href={url}>
					<Text textKey={textKey} />
					<ChevronRightIcon
						size={IconSize.SMALL}
						className="chevron-right-icon"
					/>
				</a>
			) : (
				<Text textKey={textKey} />
			)}
		</li>
	);
};

export default MegaMenuListItem;
