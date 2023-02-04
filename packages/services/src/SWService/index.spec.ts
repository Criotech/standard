import SWService, { SWConfig } from "./index";

describe("SW Service", () => {
	beforeAll(() => {
		Object.defineProperty(window, "location", {
			writable: true,
			value: { ...window.location, reload: jest.fn() },
		});
	});

	it("should register sw", async () => {
		const onUpdate = jest.fn();
		const onActive = jest.fn();

		global.fetch = jest.fn().mockResolvedValue({
			status: 200,
			headers: {
				get: jest.fn(),
			},
		});

		const fakeRegistration = {
			onupdatefound: jest.fn(),
			installing: {
				onstatechange: jest.fn(),
				state: "installed",
			},
		};

		const fakeServiceWorker = {
			ready: Promise.resolve(),
			register: jest.fn().mockResolvedValue(fakeRegistration),
			controller: {},
		};

		Object.assign(global.navigator, {
			serviceWorker: fakeServiceWorker,
		});

		const swConfig: SWConfig = {
			onActive,
			onSuccess: jest.fn(),
			onUpdate,
			NODE_ENV: "production",
			PUBLIC_URL: "",
		};

		SWService.register(swConfig);

		await new Promise((resolve) => setTimeout(resolve, 100));
		expect(onActive).toHaveBeenCalled();

		fakeRegistration.onupdatefound();
		fakeRegistration.installing.onstatechange();

		expect(onUpdate).toHaveBeenCalled();
	});

	it("should handle invalid service worker", async () => {
		const onUpdate = jest.fn();
		const onActive = jest.fn();

		global.fetch = jest.fn().mockResolvedValue({
			status: 404,
			headers: {
				get: jest.fn(),
			},
		});

		const fakeRegistration = {
			installing: {
				onstatechange: jest.fn(),
				state: "installed",
			},
			onupdatefound: jest.fn(),
			unregister: jest.fn().mockResolvedValue(true),
		};

		const fakeServiceWorker = {
			ready: Promise.resolve(fakeRegistration),
			register: jest.fn().mockResolvedValue(fakeRegistration),
			controller: {},
		};

		Object.assign(global.navigator, {
			serviceWorker: fakeServiceWorker,
		});

		const swConfig: SWConfig = {
			onActive,
			onSuccess: jest.fn(),
			onUpdate,
			NODE_ENV: "production",
			PUBLIC_URL: "",
		};

		SWService.register(swConfig);
		await new Promise((resolve) => setTimeout(resolve, 1));

		expect(global.window.location.reload).toHaveBeenCalled();
	});

	it("should unregister sw service", async () => {
		const fakeRegistration = {
			unregister: jest.fn(),
		};

		const fakeServiceWorker = {
			ready: Promise.resolve(fakeRegistration),
		};

		Object.assign(global.navigator, {
			serviceWorker: fakeServiceWorker,
		});

		SWService.unregister();

		await new Promise((resolve) => setTimeout(resolve, 1));
		expect(fakeRegistration.unregister).toHaveBeenCalled();
	});

	it("should handle offline", async () => {
		const onSuccess = jest.fn();

		global.fetch = jest.fn().mockResolvedValue({
			status: 200,
			headers: {
				get: jest.fn(),
			},
		});

		const fakeRegistration = {
			onupdatefound: jest.fn(),
			installing: {
				onstatechange: jest.fn(),
				state: "installed",
			},
		};

		const fakeServiceWorker = {
			ready: Promise.resolve(),
			register: jest.fn().mockResolvedValue(fakeRegistration),
		};

		Object.assign(global.navigator, {
			serviceWorker: fakeServiceWorker,
		});

		const swConfig: SWConfig = {
			onSuccess,
			NODE_ENV: "production",
			PUBLIC_URL: "",
		};

		SWService.register(swConfig);

		await new Promise((resolve) => setTimeout(resolve, 100));

		fakeRegistration.onupdatefound();
		fakeRegistration.installing.onstatechange();

		expect(onSuccess).toHaveBeenCalled();
	});

	it("should prevent installation", () => {
		const event = new Event("beforeinstallprompt");
		event.preventDefault = jest.fn();

		window.dispatchEvent(event);

		expect(event.preventDefault).toHaveBeenCalled();
	});
});
