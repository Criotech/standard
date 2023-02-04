import { Language } from "./Language";
import { TranslationType } from "./TranslationType";
declare type TranslationData = Record<string, string | number>;
declare type TranslationKeyType = {
    [TranslationType.default]: keyof typeof import("./translations/default/en.json");
    [TranslationType.updatePrompt]: keyof typeof import("./translations/updatePrompt/en.json");
    [TranslationType.liteTheme]: keyof typeof import("./translations/liteTheme/en.json");
};
declare type Translations = {
    [TranslationType.default]: Record<TranslationKeyType[TranslationType.default], string>;
    [TranslationType.updatePrompt]: Record<TranslationKeyType[TranslationType.updatePrompt], string>;
    [TranslationType.liteTheme]: Record<TranslationKeyType[TranslationType.liteTheme], string>;
};
declare type TranslationKey<T extends TranslationType = TranslationType.default> = keyof Translations[T];
export { Language, Translations, TranslationKey, TranslationData, TranslationType, };
