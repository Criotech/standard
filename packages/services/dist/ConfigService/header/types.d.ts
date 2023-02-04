import { TranslationKey } from "../..";
interface ISubLinkItem {
    name: TranslationKey;
    url?: string;
}
interface ISubHeaderItem {
    header?: TranslationKey;
    items: ISubLinkItem[];
}
export interface IHeaderMenuItem {
    title: TranslationKey;
    linkGroups: ISubHeaderItem[];
}
export interface ITopHeaderLinks {
    label: TranslationKey;
    url: string;
}
export {};
