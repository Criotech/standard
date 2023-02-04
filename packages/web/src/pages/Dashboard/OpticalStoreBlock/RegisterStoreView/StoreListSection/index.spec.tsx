import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import StoreListSection from ".";
import StoreWithPinCard from "../StoreWithPinCard";
import { useOpticalStoreContext } from "../../OpticalStoreProvider";

jest.mock("../StoreWithPinCard", () => ({
	__esModule: true,
	default: ({
		onSelectStoreClick,
	}: ComponentProps<typeof StoreWithPinCard>) => (
		<div data-testid="store-with-pin-card">
			<button
				data-testid="select-store-button"
				onClick={onSelectStoreClick}
			>
				Select Store
			</button>
		</div>
	),
}));

jest.mock("../../../../../components/ThinDivider", () => ({
	__esModule: true,
	default: () => <div data-testid="thin-divider" />,
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
	(useOpticalStoreContext as jest.Mock).mockReturnValue({
		...defaultOpticalStoreContext,
	});
});

describe("StoreListSection", () => {
	const fakeStoreCards = [
		{
			number: 1,
			storeId: "1",
			storeName: "fakeStoreName1",
			storeAddress: "fakeStoreAddress1",
			telephone: "+65 6465 0213",
			latitude: 100,
			longitude: 50,
		},
		{
			number: 5,
			storeId: "5",
			storeName: "fakeStoreName2",
			storeAddress: "fakeStoreAddress2",
			telephone: "+65 6465 0213",
			latitude: 100,
			longitude: 50,
		},
	];

	it("should render without errors", () => {
		render(<StoreListSection storeCards={[]} />);
	});

	it("should render store with pin card", () => {
		render(<StoreListSection storeCards={fakeStoreCards} />);

		const antSubMenu = screen.getAllByTestId("store-with-pin-card");

		expect(antSubMenu).toHaveLength(2);
	});

	it("should render ThinDivider", () => {
		render(<StoreListSection storeCards={fakeStoreCards} />);
		const thinDivider = screen.getByTestId("thin-divider");
		expect(thinDivider).toBeInTheDocument();
	});

	it("should call onSelectStoreClick on select store clicked", () => {
		const mockHandleStoreSelection = jest.fn();
		(useOpticalStoreContext as jest.Mock).mockReturnValue({
			...defaultOpticalStoreContext,
			handleStoreSelection: mockHandleStoreSelection,
		});

		render(<StoreListSection storeCards={fakeStoreCards} />);

		const firstSelectStoreButton = screen.getAllByRole("button")[0];
		userEvent.click(firstSelectStoreButton);

		expect(mockHandleStoreSelection).toHaveBeenCalled();
	});
});
