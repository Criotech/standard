import { HttpStatus } from "../HTTPService/HttpStatus";
import LoggerService from "../LoggerService";

const isLocalhost = Boolean(
	window.location.hostname === "localhost" ||
		// [::1] is the IPv6 localhost address.
		window.location.hostname === "[::1]" ||
		// 127.0.0.0/8 are considered localhost for IPv4.
		window.location.hostname.match(
			/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
		)
);

export type SWConfig = {
	onActive?: (registration: ServiceWorkerRegistration) => void;
	onSuccess?: (registration: ServiceWorkerRegistration) => void;
	onUpdate?: (registration: ServiceWorkerRegistration) => void;
	NODE_ENV: string;
	PUBLIC_URL: string;
};

function beforeInstallPromptHandler(event: Event) {
	event.preventDefault();
}
window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);

const pageLoadedPromise = new Promise((resolve) =>
	window.addEventListener("load", resolve)
);

function register(config: SWConfig) {
	if (config.NODE_ENV === "production" && "serviceWorker" in navigator) {
		// The URL constructor is available in all browsers that support SW.
		const publicUrl = new URL(config.PUBLIC_URL, window.location.href);
		if (publicUrl.origin !== window.location.origin) {
			// Our service worker won't work if PUBLIC_URL is on a different origin
			// from what our page is served on. This might happen if a CDN is used to
			// serve assets; see https://github.com/facebook/create-react-app/issues/2374
			return;
		}
		pageLoadedPromise.then(() => {
			onLoad(config);
		});
	}
}

function onLoad(config: SWConfig) {
	const swUrl = `${config.PUBLIC_URL}/service-worker.js`;

	if (isLocalhost) {
		// This is running on localhost. Let's check if a service worker still exists or not.
		checkValidServiceWorker(swUrl, config);

		// Add some additional logging to localhost, pointing developers to the
		// service worker/PWA documentation.
		navigator.serviceWorker.ready.then(() => {
			LoggerService.info(
				"This web app is being served cache-first by a service " +
					"worker. To learn more, visit https://cra.link/PWA"
			);
		});
	} else {
		// Is not localhost. Just register service worker
		registerValidSW(swUrl, config);
	}
}

function registerValidSW(swUrl: string, config: SWConfig) {
	navigator.serviceWorker
		.register(swUrl)
		.then((registration) => {
			if (config && config.onActive) {
				config.onActive(registration);
			}
			registration.onupdatefound = () => {
				const installingWorker = registration.installing;
				if (installingWorker == null) {
					return;
				}
				installingWorker.onstatechange = () => {
					if (installingWorker.state === "installed") {
						if (navigator.serviceWorker.controller) {
							// At this point, the updated precached content has been fetched,
							// but the previous service worker will still serve the older
							// content until all client tabs are closed.
							LoggerService.info(
								"New content is available and will be used when all " +
									"tabs for this page are closed. See https://cra.link/PWA."
							);

							// Execute callback
							if (config && config.onUpdate) {
								config.onUpdate(registration);
							}
						} else {
							// At this point, everything has been precached.
							// It's the perfect time to display a
							// "Content is cached for offline use." message.
							LoggerService.info(
								"Content is cached for offline use."
							);

							// Execute callback
							if (config && config.onSuccess) {
								config.onSuccess(registration);
							}
						}
					}
				};
			};
		})
		.catch((error) => {
			LoggerService.error(
				"Error during service worker registration:",
				error
			);
		});
}

function checkValidServiceWorker(swUrl: string, config: SWConfig) {
	// Check if the service worker can be found. If it can't reload the page.
	fetch(swUrl, {
		headers: { "Service-Worker": "script" },
	})
		.then((response) => {
			// Ensure service worker exists, and that we really are getting a JS file.
			const contentType = response.headers.get("content-type");
			if (
				response.status === HttpStatus.NOT_FOUND ||
				(contentType != null &&
					contentType.indexOf("javascript") === -1)
			) {
				// No service worker found. Probably a different app. Reload the page.
				navigator.serviceWorker.ready.then((registration) => {
					registration.unregister().then(() => {
						window.location.reload();
					});
				});
			} else {
				// Service worker found. Proceed as normal.
				registerValidSW(swUrl, config);
			}
		})
		.catch(() => {
			LoggerService.info(
				"No internet connection found. App is running in offline mode."
			);
		});
}

function unregister() {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.ready
			.then((registration) => {
				registration.unregister();
			})
			.catch((error) => {
				LoggerService.error(error.message);
			});
	}
}

const SWService = { register, unregister };

export default SWService;
