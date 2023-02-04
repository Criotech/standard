import { render, screen } from "@testing-library/react";
import RegisterStoreViewSmall from ".";
import { ComponentProps } from "react";
import StoreListSection from "../StoreListSection";
import Text from "../../../../../components/Text";
import BlockTitle from "../../../BlockTitle";
import { useOpticalStoreContext } from "../../OpticalStoreProvider";

jest.mock("../StoreSearchSection", () => ({
	__esModule: true,
	default: () => <div data-testid="store-search-section" />,
}));

jest.mock("../StoreMapSection", () => ({
	__esModule: true,
	default: () => <div data-testid="store-map-section" />,
}));

jest.mock("../StoreListSection", () => ({
	__esModule: true,
	default: ({ storeCards }: ComponentProps<typeof StoreListSection>) => (
		<div data-testid="store-list-section">{JSON.stringify(storeCards)}</div>
	),
}));

jest.mock("../../../BlockTitle", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof BlockTitle>) => (
		<div data-testid="block-title">{textKey}</div>
	),
}));

jest.mock("../../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey, data }: ComponentProps<typeof Text>) => (
		<span data-testid="text">{JSON.stringify(data) + textKey}</span>
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
	isChangeStoreDialogOpen: false,
	onChangeStoreClick: jest.fn(),
	setShouldForceDisplayRegisterView: jest.fn(),
	onGoToHome: jest.fn(),
	setChangeStoreDialogOpen: jest.fn(),
	isStoresLoading: false,
	shouldForceDisplayRegisterView: false,
	setHighlightedStoreId: jest.fn(),
	highlightedStoreId: undefined,
	selectedStore: undefined,
	isRegisterConfirmationDialogOpen: false,
	handleStoreSelection: jest.fn(),
	setRegisterConfirmationDialogOpen: jest.fn(),
	displayAllMapPinsInSameColorStatus: undefined,
	sortAlphabeticallyStoresZonesStatus: undefined,
};

beforeEach(() => {
	(useOpticalStoreContext as jest.Mock).mockReturnValue({
		...defaultOpticalStoreContext,
	});
});

describe("RegisterStoreViewSmall", () => {
	it("should render without errors", () => {
		render(<RegisterStoreViewSmall />);
	});

	it("should render BlockTitle component with correct text key", () => {
		render(<RegisterStoreViewSmall />);

		const blockTitle = screen.getByTestId("block-title");

		expect(blockTitle).toBeInTheDocument();
		expect(blockTitle).toHaveTextContent(
			"dashboardPage.opticalStore.registerYourPreferredOpticalStore"
		);
	});

	it("should render StoreSearchSection component", () => {
		render(<RegisterStoreViewSmall />);

		const storeSearchSection = screen.getByTestId("store-search-section");

		expect(storeSearchSection).toBeInTheDocument();
	});

	it("should render StoreMapSection component", () => {
		render(<RegisterStoreViewSmall />);

		const storeMapSection = screen.getByTestId("store-map-section");

		expect(storeMapSection).toBeInTheDocument();
	});

	it("should render StoreListSection component", () => {
		render(<RegisterStoreViewSmall />);

		const storeListSection = screen.getByTestId("store-list-section");

		expect(storeListSection).toBeInTheDocument();
	});

	it("should receive correct number of results", () => {
		(useOpticalStoreContext as jest.Mock).mockReturnValue({
			...defaultOpticalStoreContext,
			numberOfResults: 2,
		});

		render(<RegisterStoreViewSmall />);

		const numberOfResults = screen.getByText(
			"dashboardPage.opticalStore.numberOfResults",
			{ exact: false }
		);
		expect(numberOfResults).toBeInTheDocument();
		expect(numberOfResults).toHaveTextContent("2");
	});

	it("should render register store description", () => {
		const { container } = render(<RegisterStoreViewSmall />);

		const numberOfResults = container.getElementsByClassName(
			"register-store-description"
		)[0];

		expect(numberOfResults).toBeInTheDocument();
		expect(numberOfResults).toHaveTextContent(
			"dashboardPage.opticalStore.registerPreferredStoreDescription"
		);
	});

	it("should receive correct store cards prop", () => {
		const fakeStoreCard = {
			number: 0,
			storeId: "0",
			storeAddress: "fakeStoreAddress",
			storeName: "fakeStoreName",
			telephone: "fakePhoneNumber",
			latitude: 100,
			longitude: 50,
		};

		(useOpticalStoreContext as jest.Mock).mockReturnValue({
			...defaultOpticalStoreContext,
			storeCards: [fakeStoreCard],
		});

		render(<RegisterStoreViewSmall />);

		const storeCards = screen.getByTestId("store-list-section");
		expect(storeCards).toHaveTextContent(JSON.stringify(fakeStoreCard));
	});
});
