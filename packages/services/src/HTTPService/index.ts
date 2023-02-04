import axios from "axios";
import { ulid } from "ulid";
import { FrontendType, getConfig } from "../ConfigService";
const configuration = getConfig();

if (configuration) {
	axios.defaults.baseURL = configuration.baseUrl;
}

const frontendType: FrontendType = "WEB:LITE";

export const post = async <T, J extends {} = {}>(
	url: string,
	payload?: J,
	token?: string
) => {
	const authorizationHeader = token
		? { Authorization: `Bearer ${token}` }
		: {};
	const config = {
		headers: {
			...authorizationHeader,
			"X-Correlation-Id": ulid(),
			"Frontend-Type": frontendType,
		},
	};

	const { data, headers, status } = await axios.post<T>(url, payload, config);

	return {
		data,
		headers,
		status,
	};
};

export const get = async <T>(url: string, token?: string) => {
	const authorizationHeader = token
		? { Authorization: `Bearer ${token}` }
		: {};
	const config = {
		headers: {
			...authorizationHeader,
			"X-Correlation-Id": ulid(),
			"Frontend-Type": frontendType,
		},
	};

	const { data, headers, status } = await axios.get<T>(url, config);
	return {
		data,
		headers,
		status,
	};
};

export const patch = async <T, J extends {} = {}>(
	url: string,
	payload?: J,
	token?: string
) => {
	const authorizationHeader = token
		? { Authorization: `Bearer ${token}` }
		: {};
	const config = {
		headers: {
			...authorizationHeader,
			"X-Correlation-Id": ulid(),
			"Frontend-Type": frontendType,
		},
	};

	const { data, headers, status } = await axios.patch<T>(
		url,
		payload,
		config
	);

	return {
		data,
		headers,
		status,
	};
};
