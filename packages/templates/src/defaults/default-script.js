function query(selector) {
	return document.querySelector(selector);
}

function queryAll(selector) {
	return document.querySelectorAll(selector);
}

function createElement(elementTag) {
	return document.createElement(elementTag);
}

function createNode(text) {
	return document.createTextNode(text);
}

function disableElement(elementId) {
	return (query(elementId).disabled = true);
}

function getAppendedElement(elementTag, className, text) {
	let element = createElement(elementTag);
	element.className = className;
	let elementText = createNode(text);
	element.appendChild(elementText);
	return element;
}

function show(element) {
	element.style.position = "";
}

function hide(element) {
	element.style.position = "absolute";
	element.style.left = "-9999em";
}

var stringToHTML = function (str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, "text/html");
	return doc.body;
};

function showLoading() {
	const loader = query("#loadingmodal-container");
	loader.style.display = "inline";
}

function hideLoading() {
	const loader = query("#loadingmodal-container");
	loader.style.display = "none";
}

window.pages = window.pages || {};

const pageNames = Object.keys(window.pages || {});

function getCurrentPage() {
	return pageNames.find((pageName) => window.pages[pageName].identifier());
}

const state = {};

function applyChangesToCurrentPage() {
	const currentPage = getCurrentPage();
	if (state.page !== currentPage) {
		state.page = currentPage;
		window.pages[currentPage].applyChanges();
	}
}

function main() {
	new MutationObserver(applyChangesToCurrentPage).observe(query("#api"), {
		childList: true,
		attributes: true,
		characterData: false,
		subtree: true,
		attributeFilter: ["style"],
	});

	applyChangesToCurrentPage();
}

if (document.readyState !== "loading") {
	main();
} else {
	document.addEventListener("DOMContentLoaded", main);
}

function isValidEmail(mail) {
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}

function isValidPassword(password) {
	return /^((?=.*[a-z])(?=.*[A-Z])(?=.*\d))([A-Za-z\d@#$%^&*\-_+=[\]{}|\\:',?/`~&quot;();!]|\.(?!@)){8,16}$/.test(
		password
	);
}

// <!-- Google Tag Manager -->
(function (w, d, s, l, i) {
	w[l] = w[l] || [];
	w[l].push({
		"gtm.start": new Date().getTime(),
		event: "gtm.js",
	});
	var f = d.getElementsByTagName(s)[0];
	var j = d.createElement(s);
	var dl = l !== "dataLayer" ? "&l=" + l : "";
	j.async = true;
	j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
	f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-KBJZV5C");
// <!-- End Google Tag Manager -->

function pageView() {
	var page_data = {
		page_name: "",
		page_referrer: document.referrer,
		page_title: document.title,
		page_path: document.location.pathname,
		page_category: "",
		user_login_state: "notSignedIn",
	};
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ page_data: null, user_data: null });
	window.dataLayer.push({
		event: "page_view",
		page_data,
		user_data: "not set",
	});
}

/**
 * @param name {FormType}
 */
function formView(name) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ event_data: null });
	window.dataLayer.push({
		event: "form_view",
		event_data: { name },
	});
}

/**
 * @param name {FormType}
 */
function formComplete(name) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ event_data: null });
	window.dataLayer.push({
		event: "form_complete",
		event_data: { name },
		user_data: "not set",
	});
}

/**
 * @param name {FormType}
 */
function formStart(name) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ event_data: null });
	window.dataLayer.push({
		event: "form_start",
		event_data: { name },
	});
}

/**
 * @param name {FormType}
 * @param error_message {string}
 */
function formError(name, error_message) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ event_data: null });
	window.dataLayer.push({
		event: "form_error",
		event_data: {
			name,
			error_message,
		},
	});
}

var formStartSent = false;
/**
 * @param name {FormType}
 */
function registerFormEvent(name) {
	formView(name);
	["click"].forEach(function (eventName) {
		document.body.addEventListener(eventName, function (event) {
			if (event.target.tagName === "BUTTON") {
				const errors = document.querySelectorAll(".error-message");
				if (errors.length > 0) {
					errors.forEach(function (error) {
						formError(name, error.innerText);
					});
				} else {
					formComplete(name);
				}
			}
		});
	});

	["change", "input", "click"].forEach(function (eventName) {
		document.body.addEventListener(eventName, function (event) {
			if (!formStartSent) {
				formStartSent = true;
				formStart(name);
			}
		});
	});
}
