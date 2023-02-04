import {
	Language,
	TranslationData,
	Translations,
	TranslationType,
} from "./types";
import languageNames from "./translations/languageNames.json";
import { getConfig, Instance } from "../ConfigService";
import WindowService from "../WindowService";
const { getLanguage } = WindowService;
import mustache from "mustache";

type TranslationOverrides<T extends TranslationType> = PartialRecord<
	Instance,
	Partial<Translations[T]>
>;

type LoadedTranslation<T extends TranslationType> = {
	base: Translations[T];
	overrides: TranslationOverrides<T>;
};

const loadedTranslations: {
	[T in TranslationType]?: {
		[L in Language]?: LoadedTranslation<T>;
	};
} = {};

const baseTranslationLoader: {
	[T in TranslationType]?: {
		[L in Language]?: () => Promise<{ default: Translations[T] }>;
	};
} = {
	[TranslationType.default]: {
		[Language.EN]: async () => import("./translations/default/en.json"),
		[Language.TH]: async () => import("./translations/default/th.json"),
		[Language.ZH]: async () => import("./translations/default/zh.json"),
	},
	[TranslationType.updatePrompt]: {
		[Language.EN]: async () =>
			import("./translations/updatePrompt/en.json"),
		[Language.TH]: async () =>
			import("./translations/updatePrompt/th.json"),
		[Language.ZH]: async () =>
			import("./translations/updatePrompt/zh.json"),
	},
	[TranslationType.liteTheme]: {
		[Language.EN]: async () => import("./translations/liteTheme/en.json"),
		[Language.ZH]: async () => import("./translations/liteTheme/zh.json"),
	},
};

type PartialRecord<T extends keyof any, J> = Partial<Record<T, J>>;

const overrideTranslationLoader: {
	[T in TranslationType]?: {
		[L in Language]?: {
			[I in Instance]?: () => Promise<{
				default: Partial<Translations[T]>;
			}>;
		};
	};
} = {
	[TranslationType.default]: {
		[Language.EN]: {
			[Instance.AU]: async () =>
				import("./translations/default/en_au.json"),
			[Instance.IN]: async () =>
				import("./translations/default/en_in.json"),
			[Instance.SG]: async () =>
				import("./translations/default/en_sg.json"),
			[Instance.MY]: async () =>
				import("./translations/default/en_my.json"),
			[Instance.NZ]: async () =>
				import("./translations/default/en_nz.json"),
		},
		[Language.ZH]: {
			[Instance.HK]: async () =>
				import("./translations/default/zh_hk.json"),
			[Instance.TW]: async () =>
				import("./translations/default/zh_tw.json"),
		},
	},
	[TranslationType.liteTheme]: {
		[Language.EN]: {
			[Instance.IN]: async () =>
				import("./translations/liteTheme/en_in.json"),
			[Instance.AU]: async () =>
				import("./translations/liteTheme/en_au.json"),
			[Instance.SG]: async () =>
				import("./translations/liteTheme/en_sg.json"),
			[Instance.MY]: async () =>
				import("./translations/liteTheme/en_my.json"),
			[Instance.NZ]: async () =>
				import("./translations/liteTheme/en_nz.json"),
		},
		[Language.ZH]: {
			[Instance.HK]: async () =>
				import("./translations/liteTheme/zh_hk.json"),
			[Instance.TW]: async () =>
				import("./translations/liteTheme/zh_tw.json"),
		},
	},
};

function initializeTranslationObject<T extends TranslationType>(
	type: T,
	language: Language
) {
	loadedTranslations[type] = loadedTranslations[type] || {};
	const loadedTranslationType = loadedTranslations[type] as Record<
		Language,
		LoadedTranslation<T>
	>;
	loadedTranslationType[language] = loadedTranslationType[language] || {};
	const loadedTranslationTypeLanguage = loadedTranslationType[
		language
	] as LoadedTranslation<T>;
	loadedTranslationTypeLanguage.overrides =
		loadedTranslationTypeLanguage.overrides || {};
}

async function loadBaseTranslation(type: TranslationType, language: Language) {
	const typeLoader = baseTranslationLoader[type];
	if (typeLoader) {
		const languageLoader = typeLoader[language];
		if (languageLoader) {
			const { default: baseTranslation } = await languageLoader();
			initializeTranslationObject(type, language);
			loadedTranslations[type]![language]!.base = baseTranslation;
		}
	}
}

async function loadOverrideTranslation(
	type: TranslationType,
	language: Language,
	instance: Instance
) {
	const typeLoader = overrideTranslationLoader[type];
	if (typeLoader) {
		const languageLoader = typeLoader[language];
		if (languageLoader) {
			const instanceLoader = languageLoader[instance];
			if (instanceLoader) {
				const { default: overrideTranslation } = await instanceLoader();
				initializeTranslationObject(type, language);
				loadedTranslations[type]![language]!.overrides[instance] =
					overrideTranslation;
			}
		}
	}
}

export const render = (value: string, data?: TranslationData): string => {
	return mustache.render(
		value,
		data,
		{},
		{
			escape: (text: string): string => text,
			tags: ["${", "}"],
		}
	);
};

export const getLanguageNames = (): Record<Language, string> => languageNames;

export const getDefaultLanguage = (): Language => {
	const config = getConfig();
	if (config) {
		const { forcedDefaultLanguage, supportedLanguages } = config;
		const browserLanguage = getLanguage() as Language;
		const supportedBrowserLanguage = supportedLanguages.includes(
			browserLanguage
		)
			? browserLanguage
			: undefined;
		return (
			forcedDefaultLanguage ||
			supportedBrowserLanguage ||
			supportedLanguages[0]
		);
	} else {
		return Language.EN;
	}
};

export const getTranslation = async <T extends TranslationType>(
	type: T,
	language: Language,
	instance: Instance
): Promise<Translations[T]> => {
	await Promise.all([
		loadBaseTranslation(type, language),
		loadOverrideTranslation(type, language, instance),
	]);
	return Object.assign(
		loadedTranslations[type]![language]?.base!,
		loadedTranslations[type]![language]?.overrides[instance]
	) as Translations[T];
};
