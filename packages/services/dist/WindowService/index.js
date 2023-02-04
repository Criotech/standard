import { MobileDevice } from "./types";
function reload() {
    window.location.reload();
}
function redirect(url) {
    window.location.href = url;
}
function getHostname() {
    return window.location.hostname;
}
function getHost() {
    return window.location.host;
}
function getPathname() {
    return window.location.pathname;
}
function getLanguage() {
    const language = navigator.language.split("-")[0];
    document.documentElement.lang = language;
    return language;
}
function setLanguage(language) {
    document.documentElement.lang = language;
}
const copyToClipboard = async (text) => {
    if (!navigator.clipboard) {
        return;
    }
    return navigator.clipboard.writeText(text);
};
const getCurrentPosition = (onSuccess, onError, options) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    }
};
const getElementById = (id) => {
    return window.document.getElementById(id);
};
const scrollTo = (top, left, behavior) => {
    window.scrollTo({
        top,
        left,
        behavior,
    });
};
const isLiffBrowser = () => {
    return /Line/i.test(navigator.userAgent);
};
const checkMobileDeviceType = () => {
    if (/Android/i.test(navigator.userAgent)) {
        return MobileDevice.ANDROID;
    }
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        return MobileDevice.IOS;
    }
    if (/IEMobile/i.test(navigator.userAgent) ||
        /WPDesktop/i.test(navigator.userAgent)) {
        return MobileDevice.WINDOWS;
    }
    return null;
};
const localStoragePrefix = "myacuvue:";
const addItemToLocalStorage = (name, value) => {
    window.localStorage.setItem(`${localStoragePrefix}${name}`, JSON.stringify(value));
};
const getItemFromLocalStorage = (name) => {
    try {
        return JSON.parse(window.localStorage.getItem(`${localStoragePrefix}${name}`) ||
            "undefined");
    }
    catch (e) {
        return undefined;
    }
};
const console = {
    debug: window.console.debug.bind(window.console),
    info: window.console.info.bind(window.console),
    warn: window.console.warn.bind(window.console),
    error: window.console.error.bind(window.console),
};
const WindowService = {
    reload,
    getHostname,
    getHost,
    getPathname,
    getLanguage,
    setLanguage,
    copyToClipboard,
    getCurrentPosition,
    getElementById,
    scrollTo,
    isLiffBrowser,
    checkMobileDeviceType,
    addItemToLocalStorage,
    getItemFromLocalStorage,
    redirect,
    console,
};
export default WindowService;
