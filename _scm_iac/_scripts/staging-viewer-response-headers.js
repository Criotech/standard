var xiamTemplates = "/xiam-templates";
var azureXiamOrigin = "https://xiamaspac1.b2clogin.com";
var apigeeOrigin = "https://jnj-global-staging.apigee.net";

var sfdcTemplates = "/sfdc-templates";
var salesforceOrigin = "https://jjskywalker--staging.sandbox.my.salesforce-sites.com";

var csp = {
	"default-src": ["'self'", "*", "data:", "'unsafe-inline'", "'unsafe-eval'"],
};

var cspReport = {
	"default-src": ["'self'", apigeeOrigin],
	"frame-src": ["'self'", azureXiamOrigin],
	"img-src": [
		"'self'",
		"data:",
		"https://maps.gstatic.com",
		"https://maps.googleapis.com",
		"*.google-analytics.com",
		"*.googletagmanager.com",
		"https://www.google.com",
		"https://www.google.com.sg",
		"https://developers.google.com"
	],
	"font-src": ["'self'", "https://fonts.gstatic.com"],
	"script-src": [
		"'self'",
		"'unsafe-inline'",
		"'unsafe-eval'",
		"*.googletagmanager.com",
	],
	"script-src-elem": [
		"'self'",
		"'unsafe-inline'",
		"https://www.googletagmanager.com",
		"*.google-analytics.com",
		"https://maps.googleapis.com",
	],
	"style-src": ["'self'", "'unsafe-inline'"],
	"style-src-elem": [
		"'self'",
		"'unsafe-inline'",
		"https://fonts.googleapis.com",
	],
	"connect-src": [
		"'self'",
		azureXiamOrigin,
		apigeeOrigin,
		"https://maps.googleapis.com",
		"https://fonts.gstatic.com",
		"*.google-analytics.com",
		"*.analytics.google.com",
		"*.googletagmanager.com",
		"https://maps.gstatic.com",
		"https://stats.g.doubleclick.net",
		"https://ampcid.google.com",
		"https://ampcid.google.com.sg",
	],
};

var cspString = Object.keys(csp)
	.map(function (key) {
		return [key].concat(csp[key]).join(" ");
	})
	.join("; ");

var cspReportString = Object.keys(cspReport)
	.map(function (key) {
		return [key].concat(cspReport[key]).join(" ");
	})
	.join("; ");

function handler(event) {
	var response = event.response;
	var request = event.request;
	var headers = response.headers;

	headers["strict-transport-security"] = {
		value: "max-age=63072000; includeSubdomains; preload",
	};
	headers["content-security-policy-report-only"] = {
		value: cspReportString,
	};
	headers["content-security-policy"] = {
		value: cspString,
	};

	headers["x-content-type-options"] = { value: "nosniff" };
	headers["x-frame-options"] = { value: "SAMEORIGIN" };
	headers["x-xss-protection"] = { value: "1; mode=block" };

	if (request.uri.indexOf(xiamTemplates) > -1) {
		headers["access-control-allow-origin"] = { value: azureXiamOrigin };
	}

	if (request.uri.indexOf(sfdcTemplates) > -1) {
		headers["access-control-allow-origin"] = { value: salesforceOrigin };
	}

	return response;
}
