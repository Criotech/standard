import { render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import StoreMapSection from ".";
import { useService } from "../../../../../hooks/useService";
import { useWideScreen } from "../../../../../hooks/useWideScreen";
import Map from "../../../../../components/Map";
import MapBluePin from "../../../../../components/Map/MapBluePin";
import MapTooltip from "../../../../../components/Map/MapTooltip";
import { useOpticalStoreContext } from "../../OpticalStoreProvider";

jest.mock("@react-google-maps/api", () => {
	const React = require("react");

	return {
		MarkerClusterer: class extends React.PureComponent {
			render() {
				return this.props.children();
			}
		},
	};
});

jest.mock("../../../../../hooks/useService", () => ({
	useService: jest.fn(),
}));

jest.mock("../../../../../hooks/useWideScreen", () => ({
	useWideScreen: jest.fn(),
}));

jest.mock("../../../../../components/Map", () => ({
	__esModule: true,
	default: ({
		children,
		height,
		width,
		center,
	}: ComponentProps<typeof Map>) => (
		<div data-testid="map">
			{children}
			<span data-testid="map-height">{height}</span>
			<span data-testid="map-width">{width}</span>
			<span data-testid="map-center-latitude">{center?.latitude}</span>
			<span data-testid="map-center-longitude">{center?.longitude}</span>
		</div>
	),
}));

jest.mock("../../../../../components/Map/MapBluePin", () => ({
	__esModule: true,
	default: ({ onClick }: ComponentProps<typeof MapBluePin>) => (
		<div data-testid="map-blue-pin" onClick={onClick as any} />
	),
}));

jest.mock("../../../../../components/Map/MapTooltip", () => ({
	__esModule: true,
	default: ({ onCloseClick }: ComponentProps<typeof MapTooltip>) => (
		<div data-testid="map-tool-tip" onClick={onCloseClick} />
	),
}));

jest.mock("../../OpticalStoreProvider", () => ({
	useOpticalStoreContext: jest.fn(),
}));

const defaultOpticalStoreContext: ReturnType<typeof useOpticalStoreContext> = {
	storeCards: [],
	numberOfResults: 0,
	mapCenterCoordinates: {
		latitude: 0,
		longitude: 0,
	},
	zone: "",
	state: "",
	stateOptions: [],
	zoneOptions: [],
	findValue: "",
	isFindEnabled: false,
	onFilterSubmit: jest.fn(),
	setState: jest.fn(),
	setZone: jest.fn(),
	setFindValue: jest.fn(),
	opticalStores: [],
	isStoresLoading: false,
	onChangeStoreClick: jest.fn(),
	shouldForceDisplayRegisterView: false,
	isChangeStoreDialogOpen: false,
	setChangeStoreDialogOpen: jest.fn(),
	onGoToHome: jest.fn(),
	setShouldForceDisplayRegisterView: jest.fn(),
	highlightedStoreId: undefined,
	setHighlightedStoreId: jest.fn(),
	selectedStore: undefined,
	isRegisterConfirmationDialogOpen: false,
	handleStoreSelection: jest.fn(),
	setRegisterConfirmationDialogOpen: jest.fn(),
	displayAllMapPinsInSameColorStatus: undefined,
	sortAlphabeticallyStoresZonesStatus: undefined,
};

beforeEach(() => {
	(useService as jest.Mock).mockReturnValue({
		ClassService: {
			createClassName: jest.fn(),
		},
	});

	(useWideScreen as jest.Mock).mockReturnValue({ isWideScreen: false });

	(useOpticalStoreContext as jest.Mock).mockReturnValue({
		...defaultOpticalStoreContext,
	});
});

describe("StoreListSection", () => {
	it("should render without errors", () => {
		render(<StoreMapSection />);
	});

	it("should render map", () => {
		render(<StoreMapSection />);

		const map = screen.getByTestId("map");

		expect(map).toBeInTheDocument();
	});

	it("should render map blue pin when stores are available", () => {
		(useOpticalStoreContext as jest.Mock).mockReturnValue({
			...defaultOpticalStoreContext,
			storeCards: [
				{
					number: 1,
					storeId: "1",
					storeName: "fakeStoreName",
					storeAddress: "fakeStoreAddress",
					telephone: "fakePhone",
					latitude: 100,
					longitude: 30,
				},
			],
		});

		render(<StoreMapSection />);

		const mapBluePin = screen.getAllByTestId("map-blue-pin");

		expect(mapBluePin.length).toStrictEqual(1);
	});

	it("should call setHighlightedStoreId when clicked on map blue pin", () => {
		const fakeSetHighlightedStoreId = jest.fn();

		(useOpticalStoreContext as jest.Mock).mockReturnValue({
			...defaultOpticalStoreContext,
			storeCards: [
				{
					number: 1,
					storeId: "store id",
					storeName: "fakeStoreName",
					storeAddress: "fakeStoreAddress",
					telephone: "fakePhone",
					latitude: 100,
					longitude: 30,
				},
			],
			setHighlightedStoreId: fakeSetHighlightedStoreId,
		});

		render(<StoreMapSection />);

		const mapBluePin = screen.getAllByTestId("map-blue-pin")[0];
		mapBluePin.click();

		expect(fakeSetHighlightedStoreId).toHaveBeenCalledWith("store id");
	});

	it("should pass mapSmall props when in small view", () => {
		render(<StoreMapSection />);

		const mapHeight = screen.getByTestId("map-height");
		const mapWidth = screen.getByTestId("map-width");

		expect(mapHeight).toHaveTextContent("312px");
		expect(mapWidth).toHaveTextContent(`${window.innerWidth - 64}px`);
	});

	it("should pass mapSmall props when in wide view", () => {
		(useWideScreen as jest.Mock).mockReturnValue({ isWideScreen: true });

		render(<StoreMapSection />);

		const mapHeight = screen.getByTestId("map-height");
		const mapWidth = screen.getByTestId("map-width");

		expect(mapHeight).toHaveTextContent("603px");
		expect(mapWidth).toHaveTextContent("603px");
	});

	it("should call setHighlightedStoreId with undefined when close button is clicked in map tooltip", () => {
		const fakeSetHighlightedStoreId = jest.fn();
		(useOpticalStoreContext as jest.Mock).mockReturnValue({
			...defaultOpticalStoreContext,
			storeCards: [
				{
					number: 1,
					storeId: "1",
					storeName: "fakeStoreName",
					storeAddress: "fakeStoreAddress",
					telephone: "fakePhone",
					latitude: 100,
					longitude: 30,
				},
			],
			setHighlightedStoreId: fakeSetHighlightedStoreId,
		});

		(useWideScreen as jest.Mock).mockReturnValue({ isWideScreen: true });

		render(<StoreMapSection />);

		const closeMapToolTipButton = screen.getByTestId("map-tool-tip");

		closeMapToolTipButton.click();

		expect(fakeSetHighlightedStoreId).toHaveBeenCalledWith(undefined);
	});

	it("should pass the mapCenterCoordinates to Map component", () => {
		(useOpticalStoreContext as jest.Mock).mockReturnValue({
			...defaultOpticalStoreContext,
			mapCenterCoordinates: {
				latitude: 1,
				longitude: 2,
			},
		});

		render(<StoreMapSection />);

		const latitude = screen.getByTestId("map-center-latitude");
		expect(latitude).toHaveTextContent("1");

		const longitude = screen.getByTestId("map-center-longitude");
		expect(longitude).toHaveTextContent("2");
	});
});
