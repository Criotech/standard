import { HttpStatus } from "../HTTPService/HttpStatus";
import LoggerService from "../LoggerService";
const isLocalhost = Boolean(window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
function beforeInstallPromptHandler(event) {
    event.preventDefault();
}
window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);
const pageLoadedPromise = new Promise((resolve) => window.addEventListener("load", resolve));
function register(config) {
    if (config.NODE_ENV === "production" && "serviceWorker" in navigator) {
        const publicUrl = new URL(config.PUBLIC_URL, window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            return;
        }
        pageLoadedPromise.then(() => {
            onLoad(config);
        });
    }
}
function onLoad(config) {
    const swUrl = `${config.PUBLIC_URL}/service-worker.js`;
    if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);
        navigator.serviceWorker.ready.then(() => {
            LoggerService.info("This web app is being served cache-first by a service " +
                "worker. To learn more, visit https://cra.link/PWA");
        });
    }
    else {
        registerValidSW(swUrl, config);
    }
}
function registerValidSW(swUrl, config) {
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
                        LoggerService.info("New content is available and will be used when all " +
                            "tabs for this page are closed. See https://cra.link/PWA.");
                        if (config && config.onUpdate) {
                            config.onUpdate(registration);
                        }
                    }
                    else {
                        LoggerService.info("Content is cached for offline use.");
                        if (config && config.onSuccess) {
                            config.onSuccess(registration);
                        }
                    }
                }
            };
        };
    })
        .catch((error) => {
        LoggerService.error("Error during service worker registration:", error);
    });
}
function checkValidServiceWorker(swUrl, config) {
    fetch(swUrl, {
        headers: { "Service-Worker": "script" },
    })
        .then((response) => {
        const contentType = response.headers.get("content-type");
        if (response.status === HttpStatus.NOT_FOUND ||
            (contentType != null &&
                contentType.indexOf("javascript") === -1)) {
            navigator.serviceWorker.ready.then((registration) => {
                registration.unregister().then(() => {
                    window.location.reload();
                });
            });
        }
        else {
            registerValidSW(swUrl, config);
        }
    })
        .catch(() => {
        LoggerService.info("No internet connection found. App is running in offline mode.");
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
