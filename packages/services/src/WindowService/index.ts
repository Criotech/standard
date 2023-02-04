import { MobileDevice } from "./types";

function reload(): void {
	window.location.reload();
}
function redirect(url: string): void {
	window.location.href = url;
}

function getHostname(): string {
	return window.location.hostname;
}

function getHost(): string {
	return window.location.host;
}

function getPathname(): string {
	return window.location.pathname;
}

function getLanguage(): string {
	const language = navigator.language.split("-")[0];
	document.documentElement.lang = language;
	return language;
}

function setLanguage(language: string): void {
	document.documentElement.lang = language;
}

const copyToClipboard = async (text: string): Promise<void> => {
	if (!navigator.clipboard) {
		return;
	}
	return navigator.clipboard.writeText(text);
};

const getCurrentPosition = (
	onSuccess: PositionCallback,
	onError?: PositionErrorCallback | undefined,
	options?: PositionOptions
): void => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
	}
};

const getElementById = (id: string): HTMLElement | null => {
	return window.document.getElementById(id);
};

const scrollTo = (
	top: number,
	left: number,
	behavior: ScrollBehavior
): void => {
	window.scrollTo({
		top,
		left,
		behavior,
	});
};

const isLiffBrowser = (): boolean => {
	return /Line/i.test(navigator.userAgent);
};

const checkMobileDeviceType = (): MobileDevice | null => {
	if (/Android/i.test(navigator.userAgent)) {
		return MobileDevice.ANDROID;
	}
	if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
		return MobileDevice.IOS;
	}
	if (
		/IEMobile/i.test(navigator.userAgent) ||
		/WPDesktop/i.test(navigator.userAgent)
	) {
		return MobileDevice.WINDOWS;
	}
	return null;
};

const localStoragePrefix = "myacuvue:";
const addItemToLocalStorage = <T extends Object>(name: string, value: T) => {
	window.localStorage.setItem(
		`${localStoragePrefix}${name}`,
		JSON.stringify(value)
	);
};

const getItemFromLocalStorage = <T>(name: string): T | undefined => {
	try {
		return JSON.parse(
			window.localStorage.getItem(`${localStoragePrefix}${name}`) ||
				"undefined"
		) as T;
	} catch (e) {
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
