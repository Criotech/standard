import { getBanners } from "./index";
import { GetBannersResponse, HTTPService, HttpStatus } from "../index";

jest.mock("../index");

jest.mock("../ConfigService", () => ({
	getConfig: jest.fn().mockReturnValue({
		countryPhoneCode: "61",
		config: {
			baseUrl: "http://example.com",
		},
		region: "AUS",
	}),
	Instance: {
		TH: "TH",
		AU: "AU",
	},
	ENV: {
		DEV: "DEV",
	},
}));

describe("getBanners", () => {
	it("should call get with appropriate parameters", async () => {
		const fakeSessionToken = "session token";
		const expectedResponse: GetBannersResponse[] = [];

		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: { stores: expectedResponse },
		});
		await getBanners(fakeSessionToken);

		expect(HTTPService.get).toHaveBeenCalledWith(
			"banners?region=AUS",
			fakeSessionToken
		);
	});
});
