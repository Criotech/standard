import { useState, useEffect } from "react";
import {
	TranslationKey,
	TranslationType,
	TranslationData,
} from "@myacuvue_thailand_web/services";
import { useTranslation } from "./useTranslation";

export function useText<T extends TranslationType = TranslationType.default>(
	key: TranslationKey<T>,
	type?: T,
	data?: TranslationData
) {
	const { t } = useTranslation();
	const typeOrDefault = type || (TranslationType.default as T);
	const [text, setText] = useState("");

	useEffect(() => {
		let isMounted = true;
		(async () => {
			const _text = await t(key, typeOrDefault, data);
			if (isMounted) {
				setText(_text);
			}
		})();
		return () => {
			isMounted = false;
		};
	}, [data, key, setText, t, text, typeOrDefault]);

	return text;
}
