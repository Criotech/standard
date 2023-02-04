function handler(event) {
	var request = event.request;
	var headers = request.headers;
	var authHeaders = headers.authorization;

	if(request.uri.indexOf(".") <0){
		request.uri = "/index.html"
	}

	if (
		request.uri.indexOf("/xiam-templates") >= 0 ||
		request.uri.indexOf("/sfdc-templates") >= 0 ||
		(["dev.app.acuvue.co.th", "stage.app.acuvue.co.th"].includes(headers.host.value) && request.headers["user-agent"].value.toUpperCase().indexOf("LINE") >= 0) ||
		[%{ for host in basicAuthHostException ~}"${host}",%{ endfor ~}].includes(headers.host.value)
	) {
		return request;
	}

	// The Base64-encoded Auth string that should be present.
	// It is an encoding of `Basic base64(username:password)`
	var expected = "Basic ${basicAuthEncoded}";

	// If an Authorization header is supplied and it's an exact match, pass the
	// request on through to CF/the origin without any modification.
	if (authHeaders && authHeaders.value === expected) {
		return request;
	}

	// But if we get here, we must either be missing the auth header or the
	// credentials failed to match what we expected.
	// Request the browser present the Basic Auth dialog.
	var response = {
		statusCode: 401,
		statusDescription: "Unauthorized",
		headers: {
			"www-authenticate": {
				value: "Basic",
			},
		},
	};

	return response;
}
