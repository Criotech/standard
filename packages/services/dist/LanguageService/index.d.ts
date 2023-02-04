import { Language, TranslationData, Translations, TranslationType } from "./types";
import { Instance } from "../ConfigService";
export declare const render: (value: string, data?: TranslationData) => string;
export declare const getLanguageNames: () => Record<Language, string>;
export declare const getDefaultLanguage: () => Language;
export declare const getTranslation: <T extends TranslationType>(type: T, language: Language, instance: Instance) => Promise<Translations[T]>;
