import StoreService from "./index";
import { HTTPService, HttpStatus } from "../index";
import { IRegisterStore } from "./IRegisterStore";
import { IStoreWithCoordinates } from "./IStoreWithCoordinates";

const { getStores, isEligibleToChangeStore, registerStore, getMyStore } =
	StoreService;

jest.mock("../index");

jest.mock("../ConfigService", () => ({
	getConfig: jest.fn().mockReturnValue({
		countryPhoneCode: "61",
		config: {
			baseUrl: "https://example.com",
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

describe("getMyStore", () => {
	it("should call get with appropriate parameters", async () => {
		const fakeSessionToken = "session token";
		const expectedResponse: IStoreWithCoordinates[] = [];

		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: { stores: expectedResponse },
		});
		await getMyStore(fakeSessionToken);

		expect(HTTPService.get).toHaveBeenCalledWith(
			"my-store",
			fakeSessionToken
		);
	});

	it("should return my store response data", async () => {
		const fakeSessionToken = "session token";

		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: {
				id: "some-random-string",
				name: "John Doe",
				address: "2 New Jersey",
				openingTime: "9am",
				closingTime: "1pm",
				phone: "+2349031355699",
				isEligibleForHomeDelivery: true,
				district: "district",
				zone: "AZ",
				latitude: 1.045,
				longitude: -0.104,
			},
		});
		const data = await getMyStore(fakeSessionToken);

		expect(data).toStrictEqual({
			id: "some-random-string",
			name: "John Doe",
			address: "2 New Jersey",
			openingTime: "9am",
			closingTime: "1pm",
			phone: "+2349031355699",
			isEligibleForHomeDelivery: true,
			district: "district",
			zone: "AZ",
			latitude: 1.045,
			longitude: -0.104,
		});
	});

	it("should return null if http response is NOT_FOUND", async () => {
		const fakeSessionToken = "session token";

		(HTTPService.get as jest.Mock).mockRejectedValue({
			response: { status: HttpStatus.NOT_FOUND },
			isAxiosError: true,
		});
		const data = await getMyStore(fakeSessionToken);

		expect(data).toStrictEqual(null);
	});

	it("should throw error if http response is an error but not NOT_FOUND", async () => {
		const fakeSessionToken = "session token";

		(HTTPService.get as jest.Mock).mockRejectedValue({
			response: { status: "fakeRandomError" },
		});
		try {
			await getMyStore(fakeSessionToken);
		} catch (error) {
			expect(error).toStrictEqual({
				response: { status: "fakeRandomError" },
			});
		}
	});
});

describe("getStores", () => {
	it("should call get with appropriate parameters", async () => {
		const fakeSessionToken = "session token";
		const expectedResponse: IStoreWithCoordinates[] = [];

		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: { stores: expectedResponse },
		});
		await getStores(fakeSessionToken);

		expect(HTTPService.get).toHaveBeenCalledWith(
			"stores?region=AUS",
			fakeSessionToken
		);
	});

	it("should return a list of stores", async () => {
		const fakeSessionToken = "session token";
		const expectedResponse: IStoreWithCoordinates[] = [
			{
				id: "some-random-string",
				name: "John Doe",
				address: "2 New Jersey",
				openingTime: "9am",
				closingTime: "1pm",
				phone: "+2349031355699",
				isEligibleForHomeDelivery: true,
				district: "district",
				zone: "AZ",
				latitude: 1.045,
				longitude: -0.104,
			},
		];

		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: { stores: expectedResponse },
		});
		const response = await getStores(fakeSessionToken);
		expect(response).toEqual(expectedResponse);
	});

	it("should registerStore with the correct parameters", async () => {
		const fakeSessionToken = "session token";
		const fakeData: IRegisterStore = {
			storeId: "fake-store-id",
		};

		(HTTPService.post as jest.Mock).mockResolvedValue(null);
		await registerStore(fakeSessionToken, fakeData);

		expect(HTTPService.post).toHaveBeenCalledWith(
			"store-register",
			fakeData,
			fakeSessionToken
		);
	});
});

describe("isEligibleToChangeStore", () => {
	it("should call get with appropriate parameters", async () => {
		const fakeSessionToken = "session token";

		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: false,
		});
		await isEligibleToChangeStore(fakeSessionToken);

		expect(HTTPService.get).toHaveBeenCalledWith(
			"/user/is-eligible-to-change-store",
			fakeSessionToken
		);
	});

	it("should return true for isEligibleToChangeStore", async () => {
		const fakeSessionToken = "session token";

		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: true,
		});
		const response = await isEligibleToChangeStore(fakeSessionToken);
		expect(response).toEqual(true);
	});

	it("should return false for isEligibleToChangeStore", async () => {
		const fakeSessionToken = "session token";

		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: false,
		});
		const response = await isEligibleToChangeStore(fakeSessionToken);
		expect(response).toEqual(false);
	});
});
