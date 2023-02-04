import axios from "axios";
import { post, get, patch } from "./index";

jest.mock("ulid", () => ({
	ulid: jest.fn().mockReturnValue("fake-ulid-string"),
}));

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;
const url = "http://example.com";

jest.mock("../ConfigService", () => ({
	getConfig: jest.fn().mockReturnValue({
		config: {
			baseUrl: "http://example.com",
		},
	}),
}));

describe("POST", () => {
	it("successfully posts data to an API", async () => {
		const data = {
			data: "OK",
		};
		const payload = {
			fakeData: "fakeData",
		};
		const token = "fake-device-token";
		const config = {
			headers: {
				Authorization: "Bearer " + token,
				"Frontend-Type": "WEB:LITE",
				"X-Correlation-Id": "fake-ulid-string",
			},
		};
		mockAxios.post.mockImplementationOnce(() => Promise.resolve(data));
		await expect(post(url, payload, token)).resolves.toEqual(data);
		expect(mockAxios.post).toHaveBeenCalledTimes(1);
		expect(mockAxios.post).toHaveBeenCalledWith(url, payload, config);
	});
});

describe("GET", () => {
	it("fetches erroneously data from an API", async () => {
		const errorMessage = "Network Error";

		mockAxios.post.mockImplementationOnce(() =>
			Promise.reject(new Error(errorMessage))
		);
		await expect(post(url)).rejects.toThrow(errorMessage);
	});

	it("fetches successfully data from an API", async () => {
		const data = {
			data: "OK",
		};
		const token = "fake-device-token";
		const config = {
			headers: {
				Authorization: "Bearer " + token,
				"Frontend-Type": "WEB:LITE",
				"X-Correlation-Id": "fake-ulid-string",
			},
		};

		mockAxios.get.mockImplementationOnce(() => Promise.resolve(data));
		const response = await get(url, token);
		expect(response).toEqual(data);
		expect(mockAxios.get).toHaveBeenCalledTimes(1);
		expect(mockAxios.get).toHaveBeenCalledWith(url, config);
	});
});

describe("PATCH", () => {
	it("successfully patch data to an API", async () => {
		const data = {
			data: "OK",
		};
		const payload = {
			fakeData: "fakeData",
		};
		const token = "fake-session-token";
		const config = {
			headers: {
				Authorization: "Bearer " + token,
				"Frontend-Type": "WEB:LITE",
				"X-Correlation-Id": "fake-ulid-string",
			},
		};
		mockAxios.patch.mockImplementationOnce(() => Promise.resolve(data));
		const response = await patch(url, payload, token);
		expect(response).toEqual(data);
		expect(mockAxios.patch).toHaveBeenCalledTimes(1);
		expect(mockAxios.patch).toHaveBeenCalledWith(url, payload, config);
	});
});
