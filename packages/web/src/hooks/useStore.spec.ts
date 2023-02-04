import { renderHook, act } from "@testing-library/react-hooks";
import { useStore } from "./useStore";
import {
	IStoreWithCoordinates,
	StoreService,
} from "@myacuvue_thailand_web/services";
import { useLoading } from "./useLoading";
import { useAuthentication } from "./useAuthentication";

jest.mock("@myacuvue_thailand_web/services", () => ({
	StoreService: {
		getMyStore: jest.fn(),
		getStores: jest.fn(),
		registerStore: jest.fn(),
		isEligibleToChangeStore: jest.fn(),
	},
}));

jest.mock("./useLoading", () => ({
	useLoading: jest.fn(),
}));

jest.mock("./useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

beforeEach(() => {
	(useLoading as jest.Mock).mockReturnValue({
		showLoading: jest.fn(),
		hideLoading: jest.fn(),
	});

	(useAuthentication as jest.Mock).mockReturnValue({
		sessionToken: { rawValue: "fake-session-token" },
	});
});

describe("useStore", () => {
	describe("getMyStore", () => {
		const expectedResponse = {
			id: "1",
			name: "fakeName",
			address: "fakeAddress",
			openingTime: "fakeTime",
			closingTime: "fakeTime",
			phone: "1234567890",
			isEligibleForHomeDelivery: true,
		};

		it("should call getMyStore with session token and return IStore data", async () => {
			(StoreService.getMyStore as jest.Mock).mockReturnValue(
				expectedResponse
			);

			const { result } = renderHook(() => useStore());

			const response = await result.current.getUserStore();

			expect(StoreService.getMyStore).toHaveBeenCalledWith(
				"fake-session-token"
			);
			expect(response).toEqual(expectedResponse);
		});

		it("should show and hide loading", async () => {
			const { showLoading, hideLoading } = useLoading();

			const { result } = renderHook(() => useStore());

			await act(async () => {
				await result.current.isEligibleToChangeStore();
			});

			expect(showLoading).toHaveBeenCalled();
			expect(showLoading).toHaveBeenCalledTimes(1);
			expect(hideLoading).toHaveBeenCalled();
			expect(hideLoading).toHaveBeenCalledTimes(1);
		});
	});

	describe("getStores", () => {
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

		it("should call getStores with session token and return list of IStoreWithCoordinates data", async () => {
			(StoreService.getStores as jest.Mock).mockReturnValue(
				expectedResponse
			);

			const { result } = renderHook(() => useStore());

			const response = await result.current.getStores();

			expect(StoreService.getStores).toHaveBeenCalledWith(
				"fake-session-token"
			);
			expect(response).toEqual(expectedResponse);
		});

		it("should show and hide loading", async () => {
			const { showLoading, hideLoading } = useLoading();

			const { result } = renderHook(() => useStore());

			await act(async () => {
				await result.current.getStores();
			});

			expect(showLoading).toHaveBeenCalled();
			expect(showLoading).toHaveBeenCalledTimes(1);
			expect(hideLoading).toHaveBeenCalled();
			expect(hideLoading).toHaveBeenCalledTimes(1);
		});
	});

	describe("registerStore", () => {
		const fakeStoreData = {
			storeId: "fake-store-id",
		};

		it("should call registerStore with session token and store ID", async () => {
			const { result } = renderHook(() => useStore());

			await act(async () => {
				await result.current.registerStore(fakeStoreData);
			});

			expect(StoreService.registerStore).toHaveBeenCalledWith(
				"fake-session-token",
				fakeStoreData
			);
		});

		it("should show and hide loading", async () => {
			const { showLoading, hideLoading } = useLoading();

			const { result } = renderHook(() => useStore());

			await act(async () => {
				await result.current.registerStore(fakeStoreData);
			});

			expect(showLoading).toHaveBeenCalled();
			expect(showLoading).toHaveBeenCalledTimes(1);
			expect(hideLoading).toHaveBeenCalled();
			expect(hideLoading).toHaveBeenCalledTimes(1);
		});
	});

	describe("isEligibleToChangeStore", () => {
		it("should call isEligibleToChangeStore with session token and return IsEligibleToChangeStoreResponse", async () => {
			(StoreService.isEligibleToChangeStore as jest.Mock).mockReturnValue(
				true
			);

			const { result } = renderHook(() => useStore());

			const response = await result.current.isEligibleToChangeStore();

			expect(StoreService.isEligibleToChangeStore).toHaveBeenCalledWith(
				"fake-session-token"
			);
			expect(response).toEqual(true);
		});

		it("should show and hide loading", async () => {
			const { showLoading, hideLoading } = useLoading();

			const { result } = renderHook(() => useStore());

			await act(async () => {
				await result.current.isEligibleToChangeStore();
			});

			expect(showLoading).toHaveBeenCalled();
			expect(showLoading).toHaveBeenCalledTimes(1);
			expect(hideLoading).toHaveBeenCalled();
			expect(hideLoading).toHaveBeenCalledTimes(1);
		});
	});
});
