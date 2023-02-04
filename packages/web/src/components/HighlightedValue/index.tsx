import { TranslationKey } from "@myacuvue_thailand_web/services";
import { FC } from "react";
import Text from "../../components/Text";
import "./index.scss";

export interface IProps {
	value: number;
	textKey: TranslationKey;
}

const HighlightedValue: FC<IProps> = ({ value, textKey }) => (
	<span className="highlighted-value">
		<span className="value">{value}</span> <Text textKey={textKey} />
	</span>
);

export default HighlightedValue;
