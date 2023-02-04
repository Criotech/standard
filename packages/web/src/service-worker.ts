/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
	StaleWhileRevalidate,
	NetworkFirst,
	CacheFirst,
} from "workbox-strategies";

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
	({ request, url }) =>
		!(
			request.mode !== "navigate" ||
			url.pathname.startsWith("/_") ||
			url.pathname.match(fileExtensionRegexp)
		),
	createHandlerBoundToURL(`${process.env.PUBLIC_URL}/index.html`)
);

registerRoute(
	({ url, request }) =>
		request.destination === "image" && url.origin.includes("maps"),
	new StaleWhileRevalidate({
		cacheName: "map-images",
		plugins: [new ExpirationPlugin({ maxAgeSeconds: 60 * 60 })],
	})
);

registerRoute(
	({ url, request }) =>
		request.destination === "image" && url.origin.includes("acuvue"),
	new StaleWhileRevalidate({
		cacheName: "images",
		plugins: [new ExpirationPlugin({ maxAgeSeconds: 60 * 60 })],
	})
);

registerRoute(
	({ request, url }) => {
		return (
			url.pathname.startsWith("/fonts/") || request.destination === "font"
		);
	},
	new CacheFirst({
		cacheName: "fonts",
		plugins: [new ExpirationPlugin({ maxAgeSeconds: 60 * 60 * 24 * 7 })],
	})
);

registerRoute(
	({ url, request }) =>
		url.origin.includes("apigee.net") && !url.pathname.includes("token"),
	new NetworkFirst({
		cacheName: "api",
		networkTimeoutSeconds: 5000,
	})
);

self.addEventListener("message", (event) => {
	if (event.data && event.data.type === "SKIP_WAITING") {
		self.skipWaiting();
	}
});
