import { HTTPService, ISampleProduct } from "../index";
import { getSampleProducts } from "./index";

jest.mock("../index");

describe("getSampleProducts", () => {
	it("should call get with appropriate parameters", async () => {
		const fakeSessionToken = "session token";
		const language = "en";
		const region = "THA";

		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: [],
		});
		const url = "sample-products?language=en&region=THA";
		await getSampleProducts(language, region, fakeSessionToken);
		expect(HTTPService.get).toHaveBeenCalledWith(url, fakeSessionToken);
	});

	it("should return a list of sample products", async () => {
		const fakeSessionToken = "session token";
		const expectedResponse = {
			imageUrl: "fakeUrl",
			name: "fakeProductName",
			category: "BEAUTY",
			description: "Daily, 30 lenses/box",
			points: 150,
		};
		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: expectedResponse,
		});
		const language = "en";
		const region = "THA";

		const response = await getSampleProducts(
			language,
			region,
			fakeSessionToken
		);
		expect(response).toEqual(expectedResponse);
	});
});
