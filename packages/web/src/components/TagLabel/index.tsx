import { FC } from "react";
import Text from "../Text";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import "./index.scss";

type Props = {
	labelKey: TranslationKey;
};

const TagLabel: FC<Props> = ({ labelKey }) => (
	<div className="tag-label">
		<Text textKey={labelKey} />
	</div>
);

export default TagLabel;
