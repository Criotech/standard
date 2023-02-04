import {
	TranslationKey,
	TranslationType,
} from "@myacuvue_thailand_web/services";
import { FC } from "react";
import Text from "../../Text";

interface IProps {
	textKey: TranslationKey<TranslationType.liteTheme>;
	className?: string;
}

const LinksSectionListHeader: FC<IProps> = ({ textKey, className }) => {
	return (
		<li className={className}>
			<h4>
				<Text textKey={textKey} type={TranslationType.liteTheme} />
			</h4>
		</li>
	);
};

export default LinksSectionListHeader;
