import {
	createContext,
	FC,
	PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
} from "react";
import { useStorage } from "../hooks/useStorage";
import {
	Language,
	TranslationKey,
	TranslationType,
	TranslationData,
} from "@myacuvue_thailand_web/services";
import { useService } from "../hooks/useService";
import { useConfiguration } from "../hooks/useConfiguration";
import { ConfigService } from "@myacuvue_thailand_web/services";

export interface ILanguageContext {
	language: Language;
	setLanguage: (language: Language) => void;
	languageNames: Record<Language, string>;
	languages: Language[];
	translate: <T extends TranslationType>(
		key: TranslationKey<T>,
		type: T,
		data?: TranslationData
	) => Promise<string>;
}

export const LanguageContext = createContext<ILanguageContext>(
	undefined as any
);

export const LanguageProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const { WindowService, LanguageService } = useService();
	const { instance } = useConfiguration();
	const defaultLanguage = LanguageService.getDefaultLanguage();

	const [language, setLanguage] = useStorage<Language>(
		"default-language",
		defaultLanguage
	);

	const languageNames = useMemo(
		() => LanguageService.getLanguageNames(),
		[LanguageService]
	);

	const languages = useMemo(() => {
		const config = ConfigService.getConfig();
		if (config) {
			return config.supportedLanguages;
		}
		return [];
	}, []);

	useEffect(() => {
		WindowService.setLanguage(language);
	}, [WindowService, language]);

	const translate = useCallback(
		async <T extends TranslationType = TranslationType.default>(
			key: TranslationKey<T>,
			type: T,
			data?: TranslationData
		) => {
			const translation = await LanguageService.getTranslation(
				type,
				language,
				instance
			);
			const translationString = translation[key] as any as string;
			return LanguageService.render(translationString, data);
		},
		[LanguageService, language, instance]
	);

	return (
		<LanguageContext.Provider
			value={{
				language,
				setLanguage,
				languageNames,
				languages,
				translate,
			}}
		>
			{children}
		</LanguageContext.Provider>
	);
};
