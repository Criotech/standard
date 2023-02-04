import {
	TranslationKey,
	TranslationType,
	TranslationData,
} from "@myacuvue_thailand_web/services";

export const useTranslation = () => {
	return {
		t: (key: TranslationKey<TranslationType>, data?: TranslationData) => {
			let dataString = "";
			if (data) {
				dataString = JSON.stringify(data);
			}
			return `${key}${dataString}`;
		},
	};
};
