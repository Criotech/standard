import { Language, TranslationType, } from "./types";
import languageNames from "./translations/languageNames.json";
import { getConfig, Instance } from "../ConfigService";
import WindowService from "../WindowService";
const { getLanguage } = WindowService;
import mustache from "mustache";
const loadedTranslations = {};
const baseTranslationLoader = {
    [TranslationType.default]: {
        [Language.EN]: async () => import("./translations/default/en.json"),
        [Language.TH]: async () => import("./translations/default/th.json"),
        [Language.ZH]: async () => import("./translations/default/zh.json"),
    },
    [TranslationType.updatePrompt]: {
        [Language.EN]: async () => import("./translations/updatePrompt/en.json"),
        [Language.TH]: async () => import("./translations/updatePrompt/th.json"),
        [Language.ZH]: async () => import("./translations/updatePrompt/zh.json"),
    },
    [TranslationType.liteTheme]: {
        [Language.EN]: async () => import("./translations/liteTheme/en.json"),
        [Language.ZH]: async () => import("./translations/liteTheme/zh.json"),
    },
};
const overrideTranslationLoader = {
    [TranslationType.default]: {
        [Language.EN]: {
            [Instance.AU]: async () => import("./translations/default/en_au.json"),
            [Instance.IN]: async () => import("./translations/default/en_in.json"),
            [Instance.SG]: async () => import("./translations/default/en_sg.json"),
            [Instance.MY]: async () => import("./translations/default/en_my.json"),
            [Instance.NZ]: async () => import("./translations/default/en_nz.json"),
        },
        [Language.ZH]: {
            [Instance.HK]: async () => import("./translations/default/zh_hk.json"),
            [Instance.TW]: async () => import("./translations/default/zh_tw.json"),
        },
    },
    [TranslationType.liteTheme]: {
        [Language.EN]: {
            [Instance.IN]: async () => import("./translations/liteTheme/en_in.json"),
            [Instance.AU]: async () => import("./translations/liteTheme/en_au.json"),
            [Instance.SG]: async () => import("./translations/liteTheme/en_sg.json"),
            [Instance.MY]: async () => import("./translations/liteTheme/en_my.json"),
            [Instance.NZ]: async () => import("./translations/liteTheme/en_nz.json"),
        },
        [Language.ZH]: {
            [Instance.HK]: async () => import("./translations/liteTheme/zh_hk.json"),
            [Instance.TW]: async () => import("./translations/liteTheme/zh_tw.json"),
        },
    },
};
function initializeTranslationObject(type, language) {
    loadedTranslations[type] = loadedTranslations[type] || {};
    const loadedTranslationType = loadedTranslations[type];
    loadedTranslationType[language] = loadedTranslationType[language] || {};
    const loadedTranslationTypeLanguage = loadedTranslationType[language];
    loadedTranslationTypeLanguage.overrides =
        loadedTranslationTypeLanguage.overrides || {};
}
async function loadBaseTranslation(type, language) {
    const typeLoader = baseTranslationLoader[type];
    if (typeLoader) {
        const languageLoader = typeLoader[language];
        if (languageLoader) {
            const { default: baseTranslation } = await languageLoader();
            initializeTranslationObject(type, language);
            loadedTranslations[type][language].base = baseTranslation;
        }
    }
}
async function loadOverrideTranslation(type, language, instance) {
    const typeLoader = overrideTranslationLoader[type];
    if (typeLoader) {
        const languageLoader = typeLoader[language];
        if (languageLoader) {
            const instanceLoader = languageLoader[instance];
            if (instanceLoader) {
                const { default: overrideTranslation } = await instanceLoader();
                initializeTranslationObject(type, language);
                loadedTranslations[type][language].overrides[instance] =
                    overrideTranslation;
            }
        }
    }
}
export const render = (value, data) => {
    return mustache.render(value, data, {}, {
        escape: (text) => text,
        tags: ["${", "}"],
    });
};
export const getLanguageNames = () => languageNames;
export const getDefaultLanguage = () => {
    const config = getConfig();
    if (config) {
        const { forcedDefaultLanguage, supportedLanguages } = config;
        const browserLanguage = getLanguage();
        const supportedBrowserLanguage = supportedLanguages.includes(browserLanguage)
            ? browserLanguage
            : undefined;
        return (forcedDefaultLanguage ||
            supportedBrowserLanguage ||
            supportedLanguages[0]);
    }
    else {
        return Language.EN;
    }
};
export const getTranslation = async (type, language, instance) => {
    await Promise.all([
        loadBaseTranslation(type, language),
        loadOverrideTranslation(type, language, instance),
    ]);
    return Object.assign(loadedTranslations[type][language]?.base, loadedTranslations[type][language]?.overrides[instance]);
};
