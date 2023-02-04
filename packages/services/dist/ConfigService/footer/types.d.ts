import { SocialNetworkIcons } from "../types";
import { TranslationKey, TranslationType } from "../..";
interface ISubFooterItem {
    name: TranslationKey<TranslationType.liteTheme>;
    url?: string;
}
export interface IFooterLinkItem {
    title: TranslationKey<TranslationType.liteTheme>;
    items: ISubFooterItem[];
}
export interface ISocialNetwork {
    icon: SocialNetworkIcons;
    link: string;
}
export {};
