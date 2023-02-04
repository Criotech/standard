import { act, renderHook } from "@testing-library/react-hooks";
import {
	OpticalStoreProvider,
	useOpticalStoreContext,
} from "./OpticalStoreProvider";
import { ComponentProps } from "react";
import { useStore } from "../../../hooks/useStore";
import { useGeolocation } from "../../../hooks/useGeolocation";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { useService } from "../../../hooks/useService";
import { computeDistanceInKmBeetween } from "../../../hooks/useGeometry";
import { useFeatureSwitch } from "../../../hooks/useFeatureSwitch";

jest.mock("../../../hooks/useService", () => ({
	useService: jest.fn(),
}));

jest.mock("../../../hooks/useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../../hooks/useGeolocation", () => ({
	useGeolocation: jest.fn(),
}));

jest.mock("../../../hooks/useGeometry", () => ({
	computeDistanceInKmBeetween: jest.fn(),
}));

jest.mock("../../../hooks/useStore", () => ({
	useStore: jest.fn(),
}));

jest.mock("../../../hooks/useFeatureSwitch", () => ({
	useFeatureSwitch: jest.fn(),
}));

beforeEach(() => {
	(useStore as jest.Mock).mockReturnValue({
		getStores: jest.fn().mockResolvedValue(undefined),
		isEligibleToChangeStore: jest.fn(),
	});

	(useGeolocation as jest.Mock).mockReturnValue({
		userCoordinates: {
			latitude: 10.11,
			longitude: -0.999,
		},
	});

	(useAuthentication as jest.Mock).mockReturnValue({
		resetAuth: jest.fn(),
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		canvasPageUrl: "myacuvue.test.com",
		mapDefaultCenter: {
			latitude: 20,
			longitude: 30,
		},
	});

	(useService as jest.Mock).mockReturnValue({
		WindowService: {
			redirect: jest.fn(),
		},
	});

	(useStore as jest.Mock).mockReturnValue({
		getStores: jest.fn().mockResolvedValue(undefined),
		isEligibleToChangeStore: jest.fn(),
	});

	(useFeatureSwitch as jest.Mock).mockReturnValue(["ENABLED", true]);
});

const defaultWrapper = ({
	children,
}: ComponentProps<typeof OpticalStoreProvider>) => (
	<OpticalStoreProvider>{children}</OpticalStoreProvider>
);

describe("useOpticalStoreContext", () => {
	it("should have correct default values when there is no provider", async () => {
		const { result } = renderHook(() => useOpticalStoreContext());
		expect(result.current).toStrictEqual(undefined);
	});

	it("should return stores from getStores hook", async () => {
		(useStore().getStores as jest.Mock).mockResolvedValue([
			{
				id: "213",
				name: "fakeStoreName2",
				address: "fakeAddress2",
				openingTime: "fakeOpeningTime2",
				closingTime: "fakeClosingTime2",
				phone: "12345678902",
				isEligibleForHomeDelivery: true,
			},
		]);

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		await waitForNextUpdate();

		expect(result.current.opticalStores).toStrictEqual([
			{
				id: "213",
				name: "fakeStoreName2",
				address: "fakeAddress2",
				openingTime: "fakeOpeningTime2",
				closingTime: "fakeClosingTime2",
				phone: "12345678902",
				isEligibleForHomeDelivery: true,
			},
		]);
	});

	it("should return mapCenterCoordinates from useGeolocation hook when userCoordinates is defined", async () => {
		(useGeolocation as jest.Mock).mockReturnValue({
			userCoordinates: {
				latitude: 10.11,
				longitude: -0.999,
			},
		});

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);
		await waitForNextUpdate();

		expect(result.current.mapCenterCoordinates).toStrictEqual({
			latitude: 10.11,
			longitude: -0.999,
		});
	});

	it("should return mapCenterCoordinates from defaultMapCoordinate when userCoordinates is undefined", async () => {
		(useGeolocation as jest.Mock).mockReturnValue({
			userCoordinates: undefined,
		});
		(useConfiguration as jest.Mock).mockReturnValue({
			canvasPageUrl: "myacuvue.test.com",
			mapDefaultCenter: {
				latitude: 2,
				longitude: -3,
			},
		});

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);
		await waitForNextUpdate();

		expect(result.current.mapCenterCoordinates).toStrictEqual({
			latitude: 2,
			longitude: -3,
		});
	});

	it("should start isStoresLoading, then stop isStoresLoading after first update", async () => {
		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		expect(result.current.isStoresLoading).toStrictEqual(true);

		await waitForNextUpdate();

		expect(result.current.isStoresLoading).toStrictEqual(false);
	});

	it("should return storeCards", async () => {
		(computeDistanceInKmBeetween as jest.Mock).mockReturnValue(10);
		(useStore().getStores as jest.Mock).mockResolvedValue([
			{
				id: "id 1",
				name: "fakeStoreName1",
				address: "fakeAddress1",
				openingTime: "fakeOpeningTime1",
				closingTime: "fakeClosingTime1",
				phone: "11111111111",
				isEligibleForHomeDelivery: false,
				latitude: 100,
				longitude: 30,
				distanceInKm: 10,
			},
			{
				id: "id 2",
				name: "fakeStoreName2",
				address: "fakeAddress2",
				openingTime: "fakeOpeningTime2",
				closingTime: "fakeClosingTime2",
				phone: "22222222222",
				isEligibleForHomeDelivery: true,
				latitude: 100,
				longitude: 30,
				distanceInKm: 10,
			},
		]);

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);
		await waitForNextUpdate();

		expect(result.current.storeCards).toStrictEqual([
			{
				number: 1,
				telephone: "11111111111",
				storeName: "fakeStoreName1",
				storeAddress: "fakeAddress1",
				storeId: "id 1",
				latitude: 100,
				longitude: 30,
				distanceInKm: 10,
			},
			{
				number: 2,
				telephone: "22222222222",
				storeName: "fakeStoreName2",
				storeAddress: "fakeAddress2",
				storeId: "id 2",
				latitude: 100,
				longitude: 30,
				distanceInKm: 10,
			},
		]);
	});

	it("should return isFindEnabled", async () => {
		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		await waitForNextUpdate();

		expect(result.current.isFindEnabled).toStrictEqual(true);
	});

	it("should return numberOfResults", async () => {
		(useStore().getStores as jest.Mock).mockResolvedValue([
			{
				id: "id 1",
				name: "fakeStoreName1",
				address: "fakeAddress1",
				openingTime: "fakeOpeningTime1",
				closingTime: "fakeClosingTime1",
				phone: "11111111111",
				isEligibleForHomeDelivery: false,
			},
			{
				id: "id 2",
				name: "fakeStoreName2",
				address: "fakeAddress2",
				openingTime: "fakeOpeningTime2",
				closingTime: "fakeClosingTime2",
				phone: "22222222222",
				isEligibleForHomeDelivery: true,
			},
		]);

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);
		await waitForNextUpdate();

		expect(result.current.numberOfResults).toStrictEqual(2);
	});

	it("should return store stateOptions", async () => {
		(useStore().getStores as jest.Mock).mockResolvedValue([
			{
				id: "id 1",
				name: "fakeStoreName1",
				address: "fakeAddress1",
				openingTime: "fakeOpeningTime1",
				closingTime: "fakeClosingTime1",
				phone: "11111111111",
				isEligibleForHomeDelivery: false,
				district: "fakeDistrict",
				zone: "fakeZone",
			},
			{
				id: "id 2",
				name: "fakeStoreName2",
				address: "fakeAddress2",
				openingTime: "fakeOpeningTime2",
				closingTime: "fakeClosingTime2",
				phone: "22222222222",
				isEligibleForHomeDelivery: true,
				district: "fakeDistrict1",
				zone: "fakeZone",
			},
		]);

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);
		await waitForNextUpdate();

		expect(result.current.stateOptions.length).toStrictEqual(2);
		expect(result.current.stateOptions).toStrictEqual([
			"fakeDistrict",
			"fakeDistrict1",
		]);
	});

	it("should return store zoneOptions", async () => {
		(useStore().getStores as jest.Mock).mockResolvedValue([
			{
				id: "id 1",
				name: "fakeStoreName1",
				address: "fakeAddress1",
				openingTime: "fakeOpeningTime1",
				closingTime: "fakeClosingTime1",
				phone: "11111111111",
				isEligibleForHomeDelivery: false,
				district: "fakeDistrict",
				zone: "fakeZone",
			},
			{
				id: "id 2",
				name: "fakeStoreName2",
				address: "fakeAddress2",
				openingTime: "fakeOpeningTime2",
				closingTime: "fakeClosingTime2",
				phone: "22222222222",
				isEligibleForHomeDelivery: true,
				district: "fakeDistrict1",
				zone: "fakeZone1",
			},
		]);

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);
		await waitForNextUpdate();

		expect(result.current.zoneOptions.length).toStrictEqual(0);
		expect(result.current.zoneOptions).toStrictEqual([]);
	});

	it("should return setState", async () => {
		(useStore().getStores as jest.Mock).mockResolvedValue([
			{
				id: "id 1",
				name: "fakeStoreName1",
				address: "fakeAddress1",
				openingTime: "fakeOpeningTime1",
				closingTime: "fakeClosingTime1",
				phone: "11111111111",
				isEligibleForHomeDelivery: false,
				district: "fakeDistrict",
				zone: "fakeZone",
			},
			{
				id: "id 2",
				name: "fakeStoreName2",
				address: "fakeAddress2",
				openingTime: "fakeOpeningTime2",
				closingTime: "fakeClosingTime2",
				phone: "22222222222",
				isEligibleForHomeDelivery: true,
				district: "fakeDistrict1",
				zone: "fakeZone1",
			},
		]);

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		act(() => {
			result.current.setState("fakeDistrict1");
		});

		await waitForNextUpdate();

		expect(result.current.state).toStrictEqual("fakeDistrict1");
	});

	it("should return setZone", async () => {
		(useStore().getStores as jest.Mock).mockResolvedValue([
			{
				id: "id 1",
				name: "fakeStoreName1",
				address: "fakeAddress1",
				openingTime: "fakeOpeningTime1",
				closingTime: "fakeClosingTime1",
				phone: "11111111111",
				isEligibleForHomeDelivery: false,
				district: "fakeDistrict",
				zone: "fakeZone",
			},
			{
				id: "id 2",
				name: "fakeStoreName2",
				address: "fakeAddress2",
				openingTime: "fakeOpeningTime2",
				closingTime: "fakeClosingTime2",
				phone: "22222222222",
				isEligibleForHomeDelivery: true,
				district: "fakeDistrict1",
				zone: "fakeZone1",
			},
		]);

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		act(() => {
			result.current.setState("fakeDistrict1");
			result.current.setZone("fakeZone1");
		});

		await waitForNextUpdate();

		expect(result.current.zone).toStrictEqual("fakeZone1");
	});

	it("should return setFindValue", async () => {
		(useStore().getStores as jest.Mock).mockResolvedValue([
			{
				id: "id 1",
				name: "fakeStoreName1",
				address: "fakeAddress1",
				openingTime: "fakeOpeningTime1",
				closingTime: "fakeClosingTime1",
				phone: "11111111111",
				isEligibleForHomeDelivery: false,
				district: "fakeDistrict",
				zone: "fakeZone",
			},
			{
				id: "id 2",
				name: "fakeStoreName2",
				address: "fakeAddress2",
				openingTime: "fakeOpeningTime2",
				closingTime: "fakeClosingTime2",
				phone: "22222222222",
				isEligibleForHomeDelivery: true,
				district: "fakeDistrict1",
				zone: "fakeZone1",
			},
		]);

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		act(() => {
			result.current.setState("fakeDistrict1");
			result.current.setZone("fakeZone1");
			result.current.setFindValue("fakeAddress");
		});

		await waitForNextUpdate();

		expect(result.current.findValue).toStrictEqual("fakeAddress");
	});

	it("should return onFilterSubmit", async () => {
		(computeDistanceInKmBeetween as jest.Mock).mockReturnValue(10);
		(useStore().getStores as jest.Mock).mockResolvedValue([
			{
				id: "id 1",
				name: "fakeStoreName1",
				address: "fakeAddress1",
				openingTime: "fakeOpeningTime1",
				closingTime: "fakeClosingTime1",
				phone: "11111111111",
				isEligibleForHomeDelivery: false,
				district: "fakeDistrict1",
				zone: "fakeZone1",
				latitude: 100,
				longitude: 30,
				distanceInKm: 10,
			},
			{
				id: "id 2",
				name: "fakeStoreName2",
				address: "fakeAddress2",
				openingTime: "fakeOpeningTime2",
				closingTime: "fakeClosingTime2",
				phone: "22222222222",
				isEligibleForHomeDelivery: true,
				district: "fakeDistrict2",
				zone: "fakeZone2",
				latitude: 100,
				longitude: 30,
				distanceInKm: 10,
			},
		]);

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		act(() => {
			result.current.setState("fakeDistrict1");
			result.current.setZone("fakeZone1");
			result.current.setFindValue("fakeAddress");
		});

		await waitForNextUpdate();

		act(() => {
			result.current.onFilterSubmit();
		});

		expect(result.current.storeCards.length).toStrictEqual(1);
		expect(result.current.storeCards).toStrictEqual([
			{
				number: 1,
				telephone: "11111111111",
				storeName: "fakeStoreName1",
				storeAddress: "fakeAddress1",
				storeId: "id 1",
				latitude: 100,
				longitude: 30,
				distanceInKm: 10,
			},
		]);
	});

	it("should return all storeCards when all filter are empty", async () => {
		(computeDistanceInKmBeetween as jest.Mock).mockReturnValue(10);
		(useStore().getStores as jest.Mock).mockResolvedValue([
			{
				id: "id 1",
				name: "fakeStoreName1",
				address: "fakeAddress1",
				openingTime: "fakeOpeningTime1",
				closingTime: "fakeClosingTime1",
				phone: "11111111111",
				isEligibleForHomeDelivery: false,
				district: "fakeDistrict1",
				zone: "fakeZone1",
				latitude: 100,
				longitude: 30,
				distanceInKm: 10,
			},
			{
				id: "id 2",
				name: "fakeStoreName2",
				address: "fakeAddress2",
				openingTime: "fakeOpeningTime2",
				closingTime: "fakeClosingTime2",
				phone: "22222222222",
				isEligibleForHomeDelivery: true,
				district: "fakeDistrict2",
				zone: "fakeZone2",
				latitude: 100,
				longitude: 30,
				distanceInKm: 10,
			},
		]);
		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		act(() => {
			result.current.setState("");
			result.current.setZone("");
		});

		await waitForNextUpdate();

		act(() => {
			result.current.onFilterSubmit();
		});

		expect(result.current.storeCards.length).toStrictEqual(2);
	});

	it("should return all 1 storeCards when only state filter is selected", async () => {
		(computeDistanceInKmBeetween as jest.Mock).mockReturnValue(10);
		(useStore().getStores as jest.Mock).mockResolvedValue([
			{
				id: "id 1",
				name: "fakeStoreName1",
				address: "fakeAddress1",
				openingTime: "fakeOpeningTime1",
				closingTime: "fakeClosingTime1",
				phone: "11111111111",
				isEligibleForHomeDelivery: false,
				district: "fakeDistrict1",
				zone: "fakeZone1",
				latitude: 100,
				longitude: 30,
				distanceInKm: 10,
			},
			{
				id: "id 2",
				name: "fakeStoreName2",
				address: "fakeAddress2",
				openingTime: "fakeOpeningTime2",
				closingTime: "fakeClosingTime2",
				phone: "22222222222",
				isEligibleForHomeDelivery: true,
				district: "fakeDistrict2",
				zone: "fakeZone2",
				latitude: 100,
				longitude: 30,
				distanceInKm: 10,
			},
		]);

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		act(() => {
			result.current.setState("fakeDistrict1");
			result.current.setZone("");
		});

		await waitForNextUpdate();

		act(() => {
			result.current.onFilterSubmit();
		});

		expect(result.current.storeCards.length).toStrictEqual(1);
	});

	it("should return all 1 storeCards when only zone filter is selected", async () => {
		(computeDistanceInKmBeetween as jest.Mock).mockReturnValue(10);
		(useStore().getStores as jest.Mock).mockResolvedValue([
			{
				id: "id 1",
				name: "fakeStoreName1",
				address: "fakeAddress1",
				openingTime: "fakeOpeningTime1",
				closingTime: "fakeClosingTime1",
				phone: "11111111111",
				isEligibleForHomeDelivery: false,
				district: "fakeDistrict1",
				zone: "fakeZone1",
				latitude: 100,
				longitude: 30,
				distanceInKm: 10,
			},
			{
				id: "id 2",
				name: "fakeStoreName2",
				address: "fakeAddress2",
				openingTime: "fakeOpeningTime2",
				closingTime: "fakeClosingTime2",
				phone: "22222222222",
				isEligibleForHomeDelivery: true,
				district: "fakeDistrict2",
				zone: "fakeZone2",
				latitude: 100,
				longitude: 30,
				distanceInKm: 10,
			},
		]);

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		act(() => {
			result.current.setZone("fakeZone2");
		});

		await waitForNextUpdate();

		act(() => {
			result.current.onFilterSubmit();
		});

		expect(result.current.storeCards.length).toStrictEqual(1);
	});

	// ----------------------------------------------------

	it("should return shouldForceDisplayRegisterView", async () => {
		(useStore().getStores as jest.Mock).mockResolvedValue([]);

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		await waitForNextUpdate();

		expect(result.current.shouldForceDisplayRegisterView).toStrictEqual(
			false
		);
	});

	it("should return shouldForceDisplayRegisterView as true when isEligibleToChangeStore is true", async () => {
		(useStore().isEligibleToChangeStore as jest.Mock).mockResolvedValue(
			true
		);

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		act(() => {
			result.current.onChangeStoreClick();
		});

		await waitForNextUpdate();

		expect(result.current.shouldForceDisplayRegisterView).toStrictEqual(
			true
		);
	});

	it("should return isChangeStoreDialogOpen as true when isEligibleToChangeStore is false", async () => {
		(useStore().isEligibleToChangeStore as jest.Mock).mockResolvedValue(
			false
		);

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		act(() => {
			result.current.onChangeStoreClick();
		});

		await waitForNextUpdate();

		expect(result.current.isChangeStoreDialogOpen).toStrictEqual(true);
	});

	it("should return setChangeStoreDialogOpen", async () => {
		(useStore().isEligibleToChangeStore as jest.Mock).mockResolvedValue(
			false
		);

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		act(() => {
			result.current.setChangeStoreDialogOpen(true);
		});

		await waitForNextUpdate();

		expect(result.current.isChangeStoreDialogOpen).toStrictEqual(true);
	});

	it("should return setShouldForceDisplayRegisterView", async () => {
		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		act(() => {
			result.current.setShouldForceDisplayRegisterView(true);
		});

		await waitForNextUpdate();

		expect(result.current.shouldForceDisplayRegisterView).toStrictEqual(
			true
		);
	});

	it("should return filter by storeName when no userCoordinate", async () => {
		(useGeolocation as jest.Mock).mockReturnValue({
			userCoordinates: undefined,
		});

		(useStore().getStores as jest.Mock).mockResolvedValue([
			{
				id: "id 1",
				name: "BfakeStoreName1",
				address: "fakeAddress1",
				openingTime: "fakeOpeningTime1",
				closingTime: "fakeClosingTime1",
				phone: "11111111111",
				isEligibleForHomeDelivery: false,
				district: "fakeDistrict1",
				zone: "fakeZone1",
				latitude: 100,
				longitude: 30,
				distanceInKm: 10,
			},
			{
				id: "id 2",
				name: "AfakeStoreName2",
				address: "fakeAddress2",
				openingTime: "fakeOpeningTime2",
				closingTime: "fakeClosingTime2",
				phone: "22222222222",
				isEligibleForHomeDelivery: true,
				district: "fakeDistrict2",
				zone: "fakeZone2",
				latitude: 100,
				longitude: 30,
				distanceInKm: 10,
			},
		]);

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		await waitForNextUpdate();

		expect(result.current.storeCards.length).toStrictEqual(2);
		expect(result.current.storeCards).toStrictEqual([
			{
				number: 1,
				telephone: "22222222222",
				storeName: "AfakeStoreName2",
				storeAddress: "fakeAddress2",
				storeId: "id 2",
				latitude: 100,
				longitude: 30,
				distanceInKm: undefined,
			},
			{
				number: 2,
				telephone: "11111111111",
				storeName: "BfakeStoreName1",
				storeAddress: "fakeAddress1",
				storeId: "id 1",
				latitude: 100,
				longitude: 30,
				distanceInKm: undefined,
			},
		]);
	});

	it("should call resetAuth and redirect to canvasPageUrl when onGoToHome is invoked", async () => {
		const mockResetAuth = jest.fn();
		const mockRedirect = jest.fn();
		(useAuthentication as jest.Mock).mockReturnValue({
			resetAuth: mockResetAuth,
		});

		(useService as jest.Mock).mockReturnValue({
			WindowService: {
				redirect: mockRedirect,
			},
		});

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		act(() => {
			result.current.onGoToHome();
		});

		await waitForNextUpdate();

		expect(mockResetAuth).toHaveBeenCalled();
		expect(mockResetAuth).toHaveBeenCalled();
	});

	it("should have highlightedStoreId changed when setHighlightedStoreId is called", async () => {
		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		act(() => {
			result.current.setHighlightedStoreId("some store id");
		});

		await waitForNextUpdate();

		expect(result.current.highlightedStoreId).toStrictEqual(
			"some store id"
		);
	});

	it("should have selectedStore changed and isRegisterConfirmationDialogOpen true when handleStoreSelection is called", async () => {
		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		act(() => {
			result.current.handleStoreSelection({
				storeId: "id",
				latitude: 0,
				longitude: 0,
				distanceInKm: undefined,
				number: 0,
				telephone: "",
				storeName: "",
				storeAddress: "",
			});
		});

		await waitForNextUpdate();

		expect(result.current.selectedStore).toStrictEqual({
			storeId: "id",
			latitude: 0,
			longitude: 0,
			distanceInKm: undefined,
			number: 0,
			telephone: "",
			storeName: "",
			storeAddress: "",
		});
		expect(result.current.isRegisterConfirmationDialogOpen).toStrictEqual(
			true
		);
	});

	it("should render without errors", async () => {
		(useStore().getStores as jest.Mock).mockResolvedValue([
			{
				id: "id 1",
				name: "fakeStoreName",
				address: "fakeAddress",
				openingTime: "fakeOpeningTime",
				closingTime: "fakeClosingTime",
				phone: "11111111111",
				isEligibleForHomeDelivery: false,
				district: "fakeDistrict1",
				zone: "fakeZone",
				latitude: 100,
				longitude: 30,
				distanceInKm: 10,
			},
		]);

		const { result, waitForNextUpdate } = renderHook(
			() => useOpticalStoreContext(),
			{ wrapper: defaultWrapper }
		);

		await waitForNextUpdate();

		expect(result.current.storeCards.length).toStrictEqual(1);
		expect(result.current.storeCards).toStrictEqual([
			{
				number: 1,
				telephone: "11111111111",
				storeName: "fakeStoreName",
				storeAddress: "fakeAddress",
				storeId: "id 1",
				latitude: 100,
				longitude: 30,
				distanceInKm: undefined,
			},
		]);
	});
});
