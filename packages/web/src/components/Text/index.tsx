import { useText } from "../../hooks/useText";
import {
	TranslationKey,
	TranslationType,
	TranslationData,
} from "@myacuvue_thailand_web/services";

interface IProps<T extends TranslationType> {
	textKey: TranslationKey<T>;
	type?: T;
	data?: TranslationData;
}

function Text<T extends TranslationType = TranslationType.default>({
	type,
	textKey,
	data,
}: IProps<T>) {
	return <>{useText<T>(textKey, type, data)}</>;
}

export default Text;
