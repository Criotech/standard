import OpticalStoreBlock from ".";
import { render, screen, waitFor } from "@testing-library/react";
import { useStore } from "../../../hooks/useStore";
import { ComponentProps, PropsWithChildren } from "react";
import { HttpStatus } from "@myacuvue_thailand_web/services";
import ChangeOpticalStoreDialog from "./RegisterStoreView/ChangeOpticalStoreDialog";
import RegisterStoreConfirmationDialog from "./RegisterStoreView/RegisterStoreConfirmationDialog";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { useOpticalStoreContext } from "./OpticalStoreProvider";

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("./RegisteredStoreView", () => ({
	__esModule: true,
	default: () => <span data-testid="registered-store-view" />,
}));

jest.mock("../../../hooks/useGeometry", () => ({
	computeDistanceInKmBeetween: jest.fn(),
}));

jest.mock("./RegisterStoreView", () => ({
	__esModule: true,
	default: () => {
		return (
			<span data-testid="register-store-view">
				<button data-testid="select-store-pin-button">
					select-store-pin-button
				</button>
			</span>
		);
	},
}));

jest.mock("../../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <span data-testid="loading-block" />,
}));

jest.mock("./OpticalStoreProvider", () => ({
	useOpticalStoreContext: jest.fn(),
	OpticalStoreProvider: ({ children }: PropsWithChildren<{}>) => (
		<div>{children}</div>
	),
}));

jest.mock("../../../hooks/useStore", () => ({
	useStore: jest.fn(),
}));

jest.mock("./RegisterStoreView/RegisterStoreConfirmationDialog", () => ({
	__esModule: true,
	default: ({
		onConfirm,
		address,
	}: ComponentProps<typeof RegisterStoreConfirmationDialog>) => (
		<div data-testid="register-store-confirmation-dialog">
			<div>{address}</div>
			<button
				onClick={onConfirm}
				data-testid="register-store-confirm-button"
			>
				Confirm
			</button>
		</div>
	),
}));

jest.mock("./RegisterStoreView/RegisterStoreSuccessDialog", () => ({
	__esModule: true,
	default: ({
		isOpen,
		onClose,
	}: ComponentProps<typeof ChangeOpticalStoreDialog>) => (
		<span data-testid="register-store-success-dialog">
			<span data-testid="register-store-success-dialog-is-open">
				{isOpen ? "is open" : "not open"}
			</span>

			<span data-testid="register-store-success-dialog-open">
				{isOpen}
			</span>

			<button
				data-testid="register-store-success-dialog-close-btn"
				onClick={onClose}
			>
				close button
			</button>
		</span>
	),
}));

jest.mock("./RegisterStoreView/ChangeOpticalStoreDialog", () => ({
	__esModule: true,
	default: ({
		isOpen,
		onClose,
	}: ComponentProps<typeof ChangeOpticalStoreDialog>) => (
		<span data-testid="change-optical-store-dialog">
			<span data-testid="change-optical-store-dialog-is-open">
				{isOpen ? "is open" : "not open"}
			</span>

			<span data-testid="change-dialog-is-open">{isOpen}</span>

			<button
				data-testid="change-optical-store-dialog-close-btn"
				onClick={onClose}
			>
				close button
			</button>
		</span>
	),
}));

const defaultUseOpticalStoreContext: ReturnType<typeof useOpticalStoreContext> =
	{
		isStoresLoading: true,
		opticalStores: undefined,
		storeCards: [],
		numberOfResults: 0,
		mapCenterCoordinates: {
			latitude: 0,
			longitude: 0,
		},
		zone: "",
		state: "",
		setState: jest.fn(),
		setZone: jest.fn(),
		stateOptions: [],
		zoneOptions: [],
		setFindValue: jest.fn(),
		findValue: "",
		isFindEnabled: false,
		onFilterSubmit: jest.fn(),
		shouldForceDisplayRegisterView: false,
		onChangeStoreClick: jest.fn(),
		isChangeStoreDialogOpen: false,
		setChangeStoreDialogOpen: jest.fn(),
		setShouldForceDisplayRegisterView: jest.fn(),
		onGoToHome: jest.fn(),
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
		...defaultUseOpticalStoreContext,
	});

	(useStore as jest.Mock).mockReturnValue({
		registerStore: jest.fn(),
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		mapDefaultCenter: { latitude: 0, longitude: 0 },
	});
});

describe("OpticalStoreBlock", () => {
	it("should render without errors", () => {
		render(
			<OpticalStoreBlock
				isUserStoreLoading={false}
				refreshUserOpticalStore={jest.fn()}
				userOpticalStore={undefined}
			/>
		);
	});

	it("should render loading block when it is loading", () => {
		(useOpticalStoreContext as jest.Mock).mockReturnValue({
			...defaultUseOpticalStoreContext,
			isStoresLoading: true,
		});

		render(
			<OpticalStoreBlock
				isUserStoreLoading={true}
				refreshUserOpticalStore={jest.fn()}
				userOpticalStore={undefined}
			/>
		);

		const loadingBlock = screen.getByTestId("loading-block");
		expect(loadingBlock).toBeInTheDocument();
	});

	it("should render RegisteredStoreView when userOpticalStore is defined", () => {
		(useOpticalStoreContext as jest.Mock).mockReturnValue({
			...defaultUseOpticalStoreContext,
			isStoresLoading: false,
		});

		render(
			<OpticalStoreBlock
				isUserStoreLoading={false}
				refreshUserOpticalStore={jest.fn()}
				userOpticalStore={{
					id: "213",
					name: "fakeStoreName",
					address: "fakeAddress",
					openingTime: "fakeOpeningTime",
					closingTime: "fakeClosingTime",
					phone: "1234567890",
					isEligibleForHomeDelivery: true,
				}}
			/>
		);

		const registeredStoreView = screen.getByTestId("registered-store-view");
		expect(registeredStoreView).toBeInTheDocument();
	});

	it("should render RegisterStoreView when userOpticalStore is null and opticalStores is defined", () => {
		(useOpticalStoreContext as jest.Mock).mockReturnValue({
			...defaultUseOpticalStoreContext,
			isStoresLoading: false,
			opticalStores: [],
		});

		render(
			<OpticalStoreBlock
				isUserStoreLoading={false}
				refreshUserOpticalStore={jest.fn()}
				userOpticalStore={undefined}
			/>
		);

		const registerStoreView = screen.getByTestId("register-store-view");
		expect(registerStoreView).toBeInTheDocument();
	});

	it("should render RegisterStoreConfirmationDialog when isRegisterConfirmationDialogOpen is true and selectedStore is defined", () => {
		(useOpticalStoreContext as jest.Mock).mockReturnValue({
			...defaultUseOpticalStoreContext,
			isStoresLoading: false,
			opticalStores: [],
			storeCards: [
				{
					number: 1,
					telephone: "11111111111",
					storeName: "fakeStoreName1",
					storeAddress: "fakeAddress1",
					storeId: "id 1",
					latitude: 100,
					longitude: 30,
				},
			],
			isRegisterConfirmationDialogOpen: true,
			selectedStore: {
				storeId: "id",
			},
		});

		render(
			<OpticalStoreBlock
				isUserStoreLoading={false}
				refreshUserOpticalStore={jest.fn()}
				userOpticalStore={undefined}
			/>
		);

		const registerConfirmationDialog = screen.getByTestId(
			"register-store-confirmation-dialog"
		);

		expect(registerConfirmationDialog).toBeInTheDocument();
	});

	it("should call registerStore when confirm button is clicked", async () => {
		(useOpticalStoreContext as jest.Mock).mockReturnValue({
			...defaultUseOpticalStoreContext,
			isStoresLoading: false,
			opticalStores: [],
			storeCards: [
				{
					number: 1,
					telephone: "11111111111",
					storeName: "fakeStoreName1",
					storeAddress: "fakeAddress1",
					storeId: "id 1",
					latitude: 100,
					longitude: 30,
				},
			],
			isRegisterConfirmationDialogOpen: true,
			selectedStore: {
				storeId: "id",
			},
		});

		const mockRegisterStore = jest.fn();
		(useStore as jest.Mock).mockReturnValue({
			registerStore: mockRegisterStore,
		});

		render(
			<OpticalStoreBlock
				isUserStoreLoading={false}
				refreshUserOpticalStore={jest.fn()}
				userOpticalStore={undefined}
			/>
		);

		const registerConfirmationButton = screen.getByTestId(
			"register-store-confirm-button"
		);
		registerConfirmationButton.click();

		await waitFor(() => {
			expect(mockRegisterStore).toHaveBeenCalled();
		});
	});

	it("should open ChangeOpticalStoreDialog when isChangeStoreDialogOpen is true", () => {
		(useOpticalStoreContext as jest.Mock).mockReturnValue({
			...defaultUseOpticalStoreContext,
			isStoresLoading: false,
			opticalStores: [],
			isChangeStoreDialogOpen: true,
		});

		render(
			<OpticalStoreBlock
				isUserStoreLoading={false}
				refreshUserOpticalStore={jest.fn()}
				userOpticalStore={undefined}
			/>
		);

		const changeOpticalStoreDialogIsOpen = screen.getByTestId(
			"change-optical-store-dialog-is-open"
		);
		expect(changeOpticalStoreDialogIsOpen).toBeInTheDocument();
		expect(changeOpticalStoreDialogIsOpen).toHaveTextContent("is open");
	});

	it("should open ChangeOpticalStoreDialog when registerStore return Status.Conflict", () => {
		(useOpticalStoreContext as jest.Mock).mockReturnValue({
			...defaultUseOpticalStoreContext,
			isStoresLoading: false,
			isChangeStoreDialogOpen: true,
			opticalStores: [],
			isRegisterConfirmationDialogOpen: true,
			selectedStore: {
				storeId: "id",
			},
		});

		const fakeServerError = {
			response: { status: HttpStatus.CONFLICT },
		};

		const mockRegisterStore = jest.fn().mockImplementation(() => {
			throw fakeServerError;
		});

		(useStore as jest.Mock).mockReturnValue({
			registerStore: mockRegisterStore,
		});

		render(
			<OpticalStoreBlock
				isUserStoreLoading={false}
				refreshUserOpticalStore={jest.fn()}
				userOpticalStore={undefined}
			/>
		);

		const registerConfirmationButton = screen.getByTestId(
			"register-store-confirm-button"
		);
		registerConfirmationButton.click();

		const changeOpticalStoreDialogIsOpen = screen.getByTestId(
			"change-optical-store-dialog-is-open"
		);
		expect(changeOpticalStoreDialogIsOpen).toBeInTheDocument();
		expect(changeOpticalStoreDialogIsOpen).toHaveTextContent("is open");
	});

	it("should render RegisterStoreSuccessDialog when confirm button is clicked", () => {
		(useOpticalStoreContext as jest.Mock).mockReturnValue({
			...defaultUseOpticalStoreContext,
			isStoresLoading: false,
			opticalStores: [],
			storeCards: [
				{
					number: 1,
					telephone: "11111111111",
					storeName: "fakeStoreName1",
					storeAddress: "fakeAddress1",
					storeId: "id 1",
					latitude: 100,
					longitude: 30,
				},
			],
			isRegisterConfirmationDialogOpen: true,
			selectedStore: {
				storeId: "id",
			},
		});

		render(
			<OpticalStoreBlock
				isUserStoreLoading={false}
				refreshUserOpticalStore={jest.fn()}
				userOpticalStore={undefined}
			/>
		);

		const confirmButton = screen.getByTestId(
			"register-store-success-dialog"
		);
		confirmButton.click();

		const registerSuccessDialog = screen.getByTestId(
			"register-store-success-dialog"
		);

		expect(registerSuccessDialog).toBeInTheDocument();
	});

	it("should render ChangeOpticalStoreDialog", () => {
		(useOpticalStoreContext as jest.Mock).mockReturnValue({
			...defaultUseOpticalStoreContext,
			isStoresLoading: false,
			opticalStores: [],
			storeCards: [],
		});

		render(
			<OpticalStoreBlock
				isUserStoreLoading={false}
				refreshUserOpticalStore={jest.fn()}
				userOpticalStore={undefined}
			/>
		);

		const onSelectStoreButton = screen.getByTestId(
			"change-optical-store-dialog"
		);
		expect(onSelectStoreButton).toBeInTheDocument();
	});

	it("should call setChangeStoreDialogOpen when clicked ChangeOpticalStoreDialog close button", () => {
		const mockSetChangeStoreDialogOpen = jest.fn();
		(useOpticalStoreContext as jest.Mock).mockReturnValue({
			...defaultUseOpticalStoreContext,
			setChangeStoreDialogOpen: mockSetChangeStoreDialogOpen,
			isStoresLoading: false,
			opticalStores: [],
			storeCards: [],
		});

		render(
			<OpticalStoreBlock
				isUserStoreLoading={false}
				userOpticalStore={undefined}
				refreshUserOpticalStore={jest.fn()}
			/>
		);

		const closeButton = screen.getByTestId(
			"change-optical-store-dialog-close-btn"
		);
		closeButton.click();

		expect(mockSetChangeStoreDialogOpen).toHaveBeenCalled();
	});
});
