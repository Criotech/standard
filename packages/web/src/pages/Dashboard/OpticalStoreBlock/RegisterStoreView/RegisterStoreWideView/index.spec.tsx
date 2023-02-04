import { render, screen } from "@testing-library/react";
import RegisterStoreWideView from "./index";
import BlockTitle from "../../../BlockTitle";
import { ComponentProps } from "react";
import Text from "../../../../../components/Text";
import { useOpticalStoreContext } from "../../OpticalStoreProvider";

jest.mock("../StoreMapSection", () => ({
	__esModule: true,
	default: () => <div data-testid="store-map-section" />,
}));

jest.mock("../StoreSearchSection", () => ({
	__esModule: true,
	default: () => <div data-testid="store-search-section" />,
}));

jest.mock("../StoreListSection", () => ({
	__esModule: true,
	default: () => <div data-testid="store-list-section" />,
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
	isStoresLoading: false,
	shouldForceDisplayRegisterView: false,
	setChangeStoreDialogOpen: jest.fn(),
	onGoToHome: jest.fn(),
	setShouldForceDisplayRegisterView: jest.fn(),
	onChangeStoreClick: jest.fn(),
	isChangeStoreDialogOpen: false,
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
	(useOpticalStoreContext as jest.Mock).mockReturnValue({
		...defaultOpticalStoreContext,
	});
});

describe("RegisterStoreWideView", () => {
	it("should render without errors", () => {
		render(<RegisterStoreWideView />);
	});

	it("should render StoreMapSection", () => {
		render(<RegisterStoreWideView />);

		const storeMap = screen.getByTestId("store-map-section");
		expect(storeMap).toBeInTheDocument();
	});

	it("should render StoreSearchSection", () => {
		render(<RegisterStoreWideView />);

		const storeSearch = screen.getByTestId("store-search-section");
		expect(storeSearch).toBeInTheDocument();
	});

	it("should render StoreListSection", () => {
		render(<RegisterStoreWideView />);

		const memberList = screen.getByTestId("store-list-section");
		expect(memberList).toBeInTheDocument();
	});

	it("should render number of results correctly", () => {
		(useOpticalStoreContext as jest.Mock).mockReturnValue({
			...defaultOpticalStoreContext,
			numberOfResults: 2,
		});

		render(<RegisterStoreWideView />);

		const numberOfResults = screen.getByText(
			"dashboardPage.opticalStore.numberOfResults",
			{ exact: false }
		);
		expect(numberOfResults).toBeInTheDocument();
		expect(numberOfResults).toHaveTextContent("2");
	});

	it("should render BlockTitle component with correct text key", () => {
		render(<RegisterStoreWideView />);

		const blockTitle = screen.getByTestId("block-title");

		expect(blockTitle).toBeInTheDocument();
		expect(blockTitle).toHaveTextContent(
			"dashboardPage.opticalStore.registerYourPreferredOpticalStore"
		);
	});
});
