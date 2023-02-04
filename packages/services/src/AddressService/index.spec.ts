import {
	GetUserAddressResponse,
	HTTPService,
	HttpStatus,
	UpdateUserAddressPayload,
} from "../index";
import {
	getStates,
	saveMailingAddress,
	getShippingAddress,
	saveShippingAddress,
} from "./index";
import { getMailingAddress } from "./index";
import { IUserAddress } from "./IUserAddress";
import { IAddressState } from "./IAddressState";
import { Region } from "../ConfigService";

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
	Region: {
		AUS: "AUS",
	},
}));

const expectedGetAddressResponse: GetUserAddressResponse = {
	line1: "line1",
	line2: "line2",
	line3: "line3",
	city: "fakecity",
	state: "fakestate",
	postCode: "10011",
	countryCode: Region.AUS,
};

const addressStates: IAddressState[] = [
	{
		id: "01-text",
		names: {
			en: "some-text",
			th: "some-text",
			ja: "some-text",
			hi: "some-text",
		},
	},
];
const fakeSessionToken = "session token";

describe("getStates", () => {
	it("should return list of states", async () => {
		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: addressStates,
		});
		const response = await getStates(fakeSessionToken);
		expect(response).toStrictEqual(addressStates);
	});
});

describe("saveMailingAddress", () => {
	it("should save user mailing address", async () => {
		const fakeSessionToken = "session token";
		const fakeMailingAddress: UpdateUserAddressPayload = {
			line1: "fakeAddressLine1",
			line2: "fakeAddressLine2",
			line3: "fakeAddressLine3",
			city: "fakeCity",
			state: "fakeState",
			postCode: "0000",
			countryCode: Region.AUS,
		};

		const response = await saveMailingAddress(
			fakeMailingAddress,
			fakeSessionToken
		);

		expect(HTTPService.patch).toHaveBeenCalledWith(
			"user/address/MAILING",
			fakeMailingAddress,
			fakeSessionToken
		);
		expect(response).toStrictEqual(undefined);
	});
});

describe("getMailingAddress", () => {
	it("should call get with appropriate parameters", async () => {
		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: expectedGetAddressResponse,
		});
		await getMailingAddress(fakeSessionToken);

		expect(HTTPService.get).toHaveBeenCalledWith(
			"user/address/MAILING",
			fakeSessionToken
		);
	});

	it("should return mailing address object", async () => {
		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: expectedGetAddressResponse,
		});
		const response = await getMailingAddress(fakeSessionToken);
		expect(response).toStrictEqual(expectedGetAddressResponse);
	});

	it("should return undefined if the http response is NOT_FOUND", async () => {
		(HTTPService.get as jest.Mock).mockRejectedValue({
			response: {
				status: HttpStatus.NOT_FOUND,
			},
			isAxiosError: true,
		});

		const response = await getMailingAddress(fakeSessionToken);

		expect(response).toStrictEqual(undefined);
	});

	it("should throw if the http response is any other error", async () => {
		const anyOtherError = {
			response: {
				status: HttpStatus.INTERNAL_SERVER_ERROR,
			},
		};
		(HTTPService.get as jest.Mock).mockRejectedValue(anyOtherError);

		await expect(getMailingAddress(fakeSessionToken)).rejects.toStrictEqual(
			anyOtherError
		);
	});
});

describe("getShippingAddress", () => {
	it("should call http request with appropriate parameters", async () => {
		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: expectedGetAddressResponse,
		});
		await getShippingAddress(fakeSessionToken);

		expect(HTTPService.get).toHaveBeenCalledWith(
			"user/address/SHIPPING",
			fakeSessionToken
		);
	});

	it("should return getShippingAddress", async () => {
		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: expectedGetAddressResponse,
		});
		const response = await getShippingAddress(fakeSessionToken);
		expect(response).toStrictEqual(expectedGetAddressResponse);
	});

	it("should return null if the http response is NOT_FOUND", async () => {
		(HTTPService.get as jest.Mock).mockRejectedValue({
			response: {
				status: HttpStatus.NOT_FOUND,
			},
			isAxiosError: true,
		});

		const response = await getShippingAddress(fakeSessionToken);
		expect(response).toStrictEqual(null);
	});

	it("should throw error if the http response is any other error", async () => {
		const anyOtherError = {
			response: {
				status: HttpStatus.INTERNAL_SERVER_ERROR,
			},
		};
		(HTTPService.get as jest.Mock).mockRejectedValue(anyOtherError);

		await expect(
			getShippingAddress(fakeSessionToken)
		).rejects.toStrictEqual(anyOtherError);
	});
});

describe("saveShippingAddress", () => {
	it("should save shipping address", async () => {
		const fakeSessionToken = "session token";
		const fakeUserAddress: IUserAddress = {
			line1: "addressLine1",
			line2: "addressLine2",
			line3: "addressLine3",
			city: "fake city",
			state: "state id",
			postCode: "12345",
			countryCode: Region.THA,
		};

		const mockedPostResponse = {
			data: fakeUserAddress,
		};
		(HTTPService.patch as jest.Mock).mockResolvedValue(mockedPostResponse);

		const response = await saveShippingAddress(
			fakeUserAddress,
			fakeSessionToken
		);

		expect(HTTPService.patch).toHaveBeenCalledWith(
			"user/address/SHIPPING",
			fakeUserAddress,
			fakeSessionToken
		);
		expect(response).toStrictEqual(fakeUserAddress);
	});
});
