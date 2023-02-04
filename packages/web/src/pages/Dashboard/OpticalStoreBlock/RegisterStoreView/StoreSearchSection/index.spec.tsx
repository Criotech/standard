import { render, screen } from "@testing-library/react";
import StoreSearchSection from ".";
import { ComponentProps } from "react";
import FilterStoreForm from "../FilterStoreForm";
import { mocked } from "ts-jest/utils";
import { useOpticalStoreContext } from "../../OpticalStoreProvider";

jest.mock("../FilterStoreForm", () => ({
	__esModule: true,
	default: ({
		stateDefaultOptionKey,
		zoneDefaultOptionKey,
		findLabelKey,
		findPlaceholderKey,
		onStateChange,
		onZoneChange,
		onFindChange,
	}: ComponentProps<typeof FilterStoreForm>) => (
		<div data-testid="filter-store-form">
			<div data-testid="state-default-option-key">
				{stateDefaultOptionKey}
			</div>
			<div data-testid="zone-default-option-key">
				{zoneDefaultOptionKey}
			</div>
			<div data-testid="find-label-key">{findLabelKey}</div>
			<div data-testid="find-placeholder-key">{findPlaceholderKey}</div>
			<button
				onClick={() => onStateChange("fake state change value")}
				data-testid="on-state-change"
			/>
			<button
				onClick={() => onZoneChange("fake zone change value")}
				data-testid="on-zone-change"
			/>
			<button
				onClick={() => onFindChange("fake find change value")}
				data-testid="on-find-change"
			/>
		</div>
	),
}));

jest.mock("../../OpticalStoreProvider", () => ({
	useOpticalStoreContext: jest.fn(),
}));

const defaultMockedUseOpticalStoreContext: ReturnType<
	typeof useOpticalStoreContext
> = {
	storeCards: [],
	zoneOptions: [],
	findValue: "",
	stateOptions: [],
	setZone: jest.fn(),
	setState: jest.fn(),
	isFindEnabled: false,
	onFilterSubmit: jest.fn(),
	setFindValue: jest.fn(),
	onGoToHome: jest.fn(),
	mapCenterCoordinates: {
		latitude: 0,
		longitude: 0,
	},
	numberOfResults: 0,
	isStoresLoading: false,
	opticalStores: [],
	isChangeStoreDialogOpen: false,
	onChangeStoreClick: jest.fn(),
	state: "",
	zone: "",
	setChangeStoreDialogOpen: jest.fn(),
	setShouldForceDisplayRegisterView: jest.fn(),
	shouldForceDisplayRegisterView: false,
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
	mocked(useOpticalStoreContext).mockReturnValue({
		...defaultMockedUseOpticalStoreContext,
	});
});

describe("StoreSearchSection", () => {
	it("should render without errors", () => {
		render(<StoreSearchSection />);
	});

	it("should have FilterStoreForm", async () => {
		render(<StoreSearchSection />);

		const filterStoreForm = await screen.findByTestId("filter-store-form");
		expect(filterStoreForm).toBeInTheDocument();
	});

	it("should have stateDefaultOptionKey", async () => {
		render(<StoreSearchSection />);

		const stateDefaultOptionKey = await screen.findByTestId(
			"state-default-option-key"
		);
		expect(stateDefaultOptionKey).toBeInTheDocument();
		expect(stateDefaultOptionKey).toHaveTextContent(
			"dashboardPage.opticalStore.filterForm.stateDefaultOptionKey"
		);
	});

	it("should have zoneDefaultOptionKey", async () => {
		render(<StoreSearchSection />);

		const zoneDefaultOptionKey = await screen.findByTestId(
			"zone-default-option-key"
		);
		expect(zoneDefaultOptionKey).toBeInTheDocument();
		expect(zoneDefaultOptionKey).toHaveTextContent(
			"dashboardPage.opticalStore.filterForm.zoneDefaultOptionKey"
		);
	});

	it("should have findLabelKey", async () => {
		render(<StoreSearchSection />);

		const findLabelKey = await screen.findByTestId("find-label-key");
		expect(findLabelKey).toBeInTheDocument();
		expect(findLabelKey).toHaveTextContent(
			"dashboardPage.opticalStore.filterForm.findLabelKey"
		);
	});

	it("should have findPlaceholderKey", async () => {
		render(<StoreSearchSection />);

		const findPlaceholderKey = await screen.findByTestId(
			"find-placeholder-key"
		);
		expect(findPlaceholderKey).toBeInTheDocument();
		expect(findPlaceholderKey).toHaveTextContent(
			"dashboardPage.opticalStore.filterForm.findPlaceholderKey"
		);
	});

	it("should call setState and setZone when onStateChange is called on FilterStoreForm", async () => {
		const mockSetState = jest.fn();
		const mockSetZone = jest.fn();

		mocked(useOpticalStoreContext).mockReturnValue({
			...defaultMockedUseOpticalStoreContext,
			setZone: mockSetZone,
			setState: mockSetState,
		});

		render(<StoreSearchSection />);

		const filterStoreForm = screen.getByTestId("filter-store-form");
		const onStateChangeButton = filterStoreForm.querySelector(
			"[data-testid=on-state-change]"
		);
		(onStateChangeButton as HTMLButtonElement).click();

		expect(mockSetState).toHaveBeenCalledWith("fake state change value");
		expect(mockSetZone).toHaveBeenCalledWith("");
	});

	it("should call setZone when onZoneChange is called on FilterStoreForm", async () => {
		const mockSetZone = jest.fn();

		mocked(useOpticalStoreContext).mockReturnValue({
			...defaultMockedUseOpticalStoreContext,
			setZone: mockSetZone,
		});

		render(<StoreSearchSection />);

		const filterStoreForm = screen.getByTestId("filter-store-form");
		const onZoneChangeButton = filterStoreForm.querySelector(
			"[data-testid=on-zone-change]"
		);
		(onZoneChangeButton as HTMLButtonElement).click();

		expect(mockSetZone).toHaveBeenCalledWith("fake zone change value");
	});

	it("should call setFindValue when onFindChange is called on FilterStoreForm", () => {
		const mockSetFindValue = jest.fn();

		mocked(useOpticalStoreContext).mockReturnValue({
			...defaultMockedUseOpticalStoreContext,
			setFindValue: mockSetFindValue,
		});

		render(<StoreSearchSection />);

		const filterStoreForm = screen.getByTestId("filter-store-form");
		const onFindChangeButton = filterStoreForm.querySelector(
			"[data-testid=on-find-change]"
		);
		(onFindChangeButton as HTMLButtonElement).click();

		expect(mockSetFindValue).toHaveBeenCalledWith("fake find change value");
	});
});
