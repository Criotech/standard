import WindowService from "./index";

const {
	copyToClipboard,
	getLanguage,
	reload,
	setLanguage,
	getCurrentPosition,
	scrollTo,
	getElementById,
	getHostname,
	getHost,
	isLiffBrowser,
	checkMobileDeviceType,
	addItemToLocalStorage,
	getItemFromLocalStorage,
	redirect,
} = WindowService;
import { MobileDevice } from "./types";

const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
};

beforeEach(() => {
	const originalWindowLocation = window.location;
	// @ts-ignore
	delete window.location;
	// @ts-ignore
	window.location = Object.defineProperties(
		{},
		{
			...Object.getOwnPropertyDescriptors(originalWindowLocation),
			reload: {
				configurable: true,
				value: jest.fn(),
			},
			href: {
				value: "",
				configurable: true,
				writable: true,
				enumerable: true,
			},
			host: {
				configurable: true,
				value: "some-host:3000",
			},
			hostname: {
				configurable: true,
				value: "some-hostname",
			},
		}
	);

	Object.assign(window, {
		scrollTo: jest.fn(),
	});

	Object.defineProperty(window, "localStorage", { value: localStorageMock });

	Object.assign(document, {
		getElementById: jest.fn(),
	});

	Object.assign(navigator, {
		clipboard: {
			writeText: jest.fn(),
		},
		geolocation: {
			getCurrentPosition: jest.fn(),
		},
	});
});

describe("reload", () => {
	it("should call window.location.reload()", () => {
		reload();
		expect(window.location.reload).toHaveBeenCalledTimes(1);
		expect(window.location.reload).toHaveBeenCalledWith();
	});
});

describe("redirect", () => {
	it("should change the window.location.href", () => {
		window.location.href = "some-host:3000";
		const expectedURL = "myacuvue.test.com";
		redirect(expectedURL);
		expect(window.location.href).toEqual(expectedURL);
	});
});

describe("getHostname", () => {
	it("should return window.location.hostname", () => {
		expect(getHostname()).toEqual("some-hostname");
	});
});

describe("getHost", () => {
	it("should return window.location.host", () => {
		expect(getHost()).toEqual("some-host:3000");
	});
});

describe("getLanguage", () => {
	it("should assign navigator language to document language", () => {
		const navigatorLanguage = "lang-COUNTRY";
		document.documentElement.lang = "some-lang-before";
		Object.defineProperty(window.navigator, "language", {
			value: navigatorLanguage,
			configurable: true,
		});
		getLanguage();
		expect(document.documentElement.lang).toEqual("lang");
	});

	it("should return the lang code without the country part", () => {
		document.documentElement.lang = "some-lang-before";
		Object.defineProperty(window.navigator, "language", {
			value: "lang-COUNTRY",
			configurable: true,
		});
		expect(getLanguage()).toEqual("lang");
	});
});

describe("setLanguage", () => {
	it("should change the document lang", () => {
		document.documentElement.lang = "some-lang-before";
		const expectedLanguage = "some-lang-after";
		setLanguage(expectedLanguage);
		expect(document.documentElement.lang).toEqual(expectedLanguage);
	});
});

describe("copyToClipboard", () => {
	it("should call writeText with correct parameter", () => {
		copyToClipboard("test");
		expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
		expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test");
	});
});

describe("getCurrentPostion", () => {
	it("should call getCurrentPostion with correct parameters", () => {
		const onSuccess = () => {};
		const onError = () => {};
		const options = {
			enableHighAccuracy: true,
			maximumAge: 1,
			timeout: 2,
		};
		getCurrentPosition(onSuccess, onError, options);
		expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledTimes(
			1
		);
		expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledWith(
			onSuccess,
			onError,
			options
		);
	});
});

describe("getElementById", () => {
	it("should call getElementById with correct parameters", () => {
		getElementById("some-id");
		expect(window.document.getElementById).toHaveBeenCalledTimes(1);
		expect(window.document.getElementById).toHaveBeenCalledWith("some-id");
	});
});

describe("scrollTo", () => {
	it("should call scrollTo with correct parameters", () => {
		scrollTo(1000, 0, "smooth");
		expect(window.scrollTo).toHaveBeenCalledTimes(1);
		expect(window.scrollTo).toHaveBeenCalledWith({
			top: 1000,
			left: 0,
			behavior: "smooth",
		});
	});
});

describe("isLiffBrowser", () => {
	const navigatorObject = window.navigator;

	it("should call isLiffBrowser return true", () => {
		const expectedResponse =
			"Mozilla/5.0 (iPhone; CPU iPhone OS 15_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Mobile/15E148 Line/604.1";

		Object.defineProperty(navigatorObject, "userAgent", {
			value: expectedResponse,
			writable: true,
		});

		const response = isLiffBrowser();
		expect(window.navigator.userAgent).toBe(expectedResponse);
		expect(response).toBe(true);
	});
});

describe("checkMobileDeviceType", () => {
	const navigatorObject = window.navigator;

	it("should call checkMobileDeviceType return IOS as mobile device", () => {
		const expectedResponse =
			"Mozilla/5.0 (iPhone; CPU iPhone OS 15_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Mobile/15E148 Line/604.1";

		Object.defineProperty(navigatorObject, "userAgent", {
			value: expectedResponse,
			writable: true,
		});

		const response = checkMobileDeviceType();
		expect(window.navigator.userAgent).toBe(expectedResponse);
		expect(response).toBe(MobileDevice.IOS);
	});

	it("should call checkMobileDeviceType return Andriod as mobile device", () => {
		const expectedResponse =
			"Mozilla/5.0 (Linux; Android 9; SM-G955F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.66 Mobile Safari/537.36";

		Object.defineProperty(navigatorObject, "userAgent", {
			value: expectedResponse,
			writable: true,
		});

		const response = checkMobileDeviceType();
		expect(window.navigator.userAgent).toBe(expectedResponse);
		expect(response).toBe(MobileDevice.ANDROID);
	});

	it("should call checkMobileDeviceType and return Windows as mobile device", () => {
		const expectedResponse =
			"Mozilla/5.0 (Linux; IEMobile 9; SM-G955F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.66 Mobile Safari/537.36";

		Object.defineProperty(navigatorObject, "userAgent", {
			value: expectedResponse,
			writable: true,
		});

		const response = checkMobileDeviceType();
		expect(window.navigator.userAgent).toBe(expectedResponse);
		expect(response).toBe(MobileDevice.WINDOWS);
	});

	it(" should return null if the device type is not found", () => {
		const expectedResponse =
			"Mozilla/5.0 (Linux; Opera 9; SM-G955F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.66 Mobile Safari/537.36";

		Object.defineProperty(navigatorObject, "userAgent", {
			value: expectedResponse,
			writable: true,
		});

		const response = checkMobileDeviceType();
		expect(window.navigator.userAgent).toBe(expectedResponse);
		expect(response).toBe(null);
	});
});

describe("Localstorage", () => {
	it("should save data in localstorage", () => {
		addItemToLocalStorage("test", "test");

		expect(localStorageMock.setItem).toHaveBeenCalledWith(
			"myacuvue:test",
			'"test"'
		);
	});

	it("should get data from localstorage", () => {
		localStorageMock.getItem.mockReturnValue('"test"');

		const data = getItemFromLocalStorage("test");

		expect(localStorageMock.getItem).toHaveBeenCalledWith("myacuvue:test");

		expect(data).toBe("test");
	});
});
