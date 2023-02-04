import { MobileDevice } from "./types";
declare function reload(): void;
declare function redirect(url: string): void;
declare function getHostname(): string;
declare function getHost(): string;
declare function getPathname(): string;
declare function getLanguage(): string;
declare function setLanguage(language: string): void;
declare const WindowService: {
    reload: typeof reload;
    getHostname: typeof getHostname;
    getHost: typeof getHost;
    getPathname: typeof getPathname;
    getLanguage: typeof getLanguage;
    setLanguage: typeof setLanguage;
    copyToClipboard: (text: string) => Promise<void>;
    getCurrentPosition: (onSuccess: PositionCallback, onError?: PositionErrorCallback | undefined, options?: PositionOptions) => void;
    getElementById: (id: string) => HTMLElement | null;
    scrollTo: (top: number, left: number, behavior: ScrollBehavior) => void;
    isLiffBrowser: () => boolean;
    checkMobileDeviceType: () => MobileDevice | null;
    addItemToLocalStorage: <T extends Object>(name: string, value: T) => void;
    getItemFromLocalStorage: <T_1>(name: string) => T_1 | undefined;
    redirect: typeof redirect;
    console: {
        debug: {
            (...data: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
        };
        info: {
            (...data: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
        };
        warn: {
            (...data: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
        };
        error: {
            (...data: any[]): void;
            (message?: any, ...optionalParams: any[]): void;
        };
    };
};
export default WindowService;
