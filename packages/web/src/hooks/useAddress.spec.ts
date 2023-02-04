import { useAuthentication } from "./useAuthentication";
import { useCallbackWithLoading } from "./useCallbackWithLoading";
import { mocked } from "ts-jest/utils";
import { useService } from "./useService";
import { useAddress } from "./useAddress";
import {
	IAddressState,
	UpdateUserAddressPayload,
	GetUserAddressResponse,
	IUserAddress,
	Region,
} from "@myacuvue_thailand_web/services";
import { renderHook } from "@testing-library/react-hooks";

jest.mock("./useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("./useService", () => ({
	useService: jest.fn(),
}));

jest.mock("../hooks/useCallbackWithLoading", () => ({
	useCallbackWithLoading: jest.fn(),
}));

const fakeAddressStates: IAddressState[] = [
	{
		id: "01-BANGKOK",
		names: {
			en: "Bangkok",
			th: "กรุงเทพมหานคร",
		},
	},
];

const fakeShippingAddress: IUserAddress = {
	line1: "line1",
	line2: "line2",
	line3: "line3",
	city: "fakeCity",
	state: "fakeState",
	postCode: "fakePostcode",
	countryCode: Region.AUS,
};

const fakeAddressData: UpdateUserAddressPayload = {
	line1: "line1",
	line2: "line2",
	line3: "line3",
	city: "fake-city",
	state: "fake-state",
	postCode: "fake-postcode",
	countryCode: Region.AUS,
};

const fakeMailingAddress: GetUserAddressResponse = {
	city: "fake-city",
	countryCode: Region.AUS,
	line1: "line1",
	line2: "line2",
	line3: "line3",
	postCode: "fake-postcode",
	state: "fake-state",
};

beforeEach(() => {
	(useAuthentication as jest.Mock).mockReturnValue({
		sessionToken: { rawValue: "fake-session-token" },
	});

	(useService as jest.Mock).mockReturnValue({
		AddressService: {
			getStates: jest.fn().mockReturnValue(fakeAddressStates),
			getMailingAddress: jest.fn().mockResolvedValue(fakeMailingAddress),
			saveShippingAddress: jest.fn(),
			saveMailingAddress: jest.fn(),
			getShippingAddress: jest.fn(),
		},
	});

	mocked(useCallbackWithLoading).mockImplementation((callback) => callback);
});

describe("getStates", () => {
	it("should call AddressService.getStates with correct params", async () => {
		const { result } = renderHook(() => useAddress());
		const response = await result.current.getStates();

		const { AddressService } = useService();
		expect(AddressService.getStates).toHaveBeenCalledWith(
			"fake-session-token"
		);
		expect(response).toEqual(fakeAddressStates);
	});
});

describe("saveMailingAddress", () => {
	it("should call AddressService.saveMailingAddress and with the data", async () => {
		const { result } = renderHook(() => useAddress());
		await result.current.saveMailingAddress(fakeAddressData);

		const { AddressService } = useService();
		expect(AddressService.saveMailingAddress).toHaveBeenCalledWith(
			fakeAddressData,
			"fake-session-token"
		);
	});
});

describe("getMailingAddress", () => {
	it("should call AddressService.getMailingAddress and return the data", async () => {
		const { result } = renderHook(() => useAddress());
		const response = await result.current.getMailingAddress();

		const { AddressService } = useService();
		expect(AddressService.getMailingAddress).toHaveBeenCalledWith(
			"fake-session-token"
		);
		expect(response).toStrictEqual(fakeMailingAddress);
	});
});

describe("saveShippingAddress", () => {
	it("should call AddressService.saveShippingAddress with correct params", async () => {
		const { result } = renderHook(() => useAddress());
		await result.current.saveShippingAddress(fakeShippingAddress);

		const { AddressService } = useService();
		expect(AddressService.saveShippingAddress).toHaveBeenCalledWith(
			fakeShippingAddress,
			"fake-session-token"
		);
	});
});

describe("getShippingAddress", () => {
	it("should call AddressService.getShippingAddress with correct params", async () => {
		const { result } = renderHook(() => useAddress());
		await result.current.getShippingAddress();

		const { AddressService } = useService();
		expect(AddressService.getShippingAddress).toHaveBeenCalledWith(
			"fake-session-token"
		);
	});
});
