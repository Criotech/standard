import { IStore } from "@myacuvue_thailand_web/services";
import { render, screen, waitFor } from "@testing-library/react";
import { ComponentProps } from "react";
import { useLocation, useNavigate } from "react-router-dom-v5-compat";
import { useStore } from "../../../../hooks/useStore";
import ConfirmStoreSelection from "./index";
import Text from "../../../../components/Text";
import StoreCell from "../../../../components/StoreCell";
import RegisterStoreSuccessModal from "./RegisterStoreSuccessModal";
import { mocked } from "ts-jest/utils";

jest.mock("react-router-dom-v5-compat", () => ({
	useLocation: jest.fn(),
	useNavigate: jest.fn(),
}));

jest.mock("../../../../hooks/useStore", () => ({
	useStore: jest.fn(),
}));

jest.mock("../../../../components/StoreCell", () => ({
	__esModule: true,
	default: ({ store }: ComponentProps<typeof StoreCell>) => (
		<div data-testid="store-cell">
			<p data-testid="test-store-address">{store.address}</p>
			<p data-testid="test-store-openingTime">{store.openingTime}</p>
			<p data-testid="test-store-closingTime">{store.closingTime}</p>
			<p data-testid="test-store-phone">{store.phone}</p>
		</div>
	),
}));

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("./RegisterStoreSuccessModal", () => ({
	__esModule: true,
	default: ({ onOk }: ComponentProps<typeof RegisterStoreSuccessModal>) => (
		<div data-testid="register-store-modal">
			<button data-testid="modal-success-ok" onClick={onOk}>
				OK
			</button>
		</div>
	),
}));

jest.mock("../../../../icons/ShoppingBagIcon", () => ({
	__esModule: true,
	default: () => <div data-testid="shopping-bag-icon" />,
}));

jest.mock("../../../../components/GlobalNavigationPanel", () => ({
	__esModule: true,
	default: () => <div data-testid="global-navigation-panel" />,
}));

jest.mock("../../../../components/Layout/Header", () => ({
	__esModule: true,
	default: () => <div data-testid="header" />,
}));

const fakeStore: IStore = {
	id: "213",
	name: "BetterVision",
	address:
		"Big C, Wongsawang, Plaza Zone Building C, 1st floor, next to escalator",
	openingTime: "10:00am",
	closingTime: "9:00pm",
	phone: "1234567890",
	isEligibleForHomeDelivery: true,
};

beforeEach(() => {
	mocked(useNavigate).mockReturnValue(jest.fn());

	mocked(useLocation).mockReturnValue({
		state: {
			store: fakeStore,
		},
		key: "",
		pathname: "",
		search: "",
		hash: "",
	});

	(useStore as jest.Mock).mockReturnValue({
		registerStore: jest.fn(),
	});
});

describe("ConfirmStoreSelection", () => {
	it("should render without errors", () => {
		render(<ConfirmStoreSelection />);
	});

	it("should render StoreCell and make sure the store prop is passed", async () => {
		render(<ConfirmStoreSelection />);

		const storeCell = await screen.findByTestId("store-cell");
		expect(storeCell).toBeInTheDocument();

		const storeAddress = await screen.findByTestId("test-store-address");
		expect(storeAddress).toBeInTheDocument();

		const storeOpeningTime = await screen.findByTestId(
			"test-store-openingTime"
		);
		expect(storeOpeningTime).toHaveTextContent(fakeStore.openingTime);

		const storeClosingTime = await screen.findByTestId(
			"test-store-closingTime"
		);
		expect(storeClosingTime).toHaveTextContent(fakeStore.closingTime);
	});

	it("should render two action buttons and the OK button from success modal", async () => {
		render(<ConfirmStoreSelection />);

		const buttons = await screen.findAllByRole("button");
		expect(buttons.length).toEqual(3);
	});

	it("should go back on history when clicking go back button", async () => {
		render(<ConfirmStoreSelection />);

		const backButton = await screen.findByText(
			"storePage.yourOpticalStore.confirmStore.goBack"
		);
		backButton.click();

		expect(useNavigate()).toHaveBeenCalledWith(-1);
	});

	it("should register store after clicking register button", async () => {
		render(<ConfirmStoreSelection />);

		const backButton = await screen.findByText(
			"storePage.yourOpticalStore.confirmStore.registerStore"
		);
		backButton.click();

		const { registerStore } = useStore();

		await waitFor(() => {
			expect(registerStore).toHaveBeenCalled();
		});
	});

	it("should render register store success modal", async () => {
		render(<ConfirmStoreSelection />);

		const successModal = await screen.findByTestId("register-store-modal");

		expect(successModal).toBeInTheDocument();
	});

	it("should route to /store/your-optical-store when OK is clicked in success modal", async () => {
		render(<ConfirmStoreSelection />);

		const okButton = screen.getByTestId("modal-success-ok");

		okButton.click();

		expect(useNavigate()).toHaveBeenCalledWith("/store/your-optical-store");
	});

	it("should render GlobalNavigationPanel", async () => {
		render(<ConfirmStoreSelection />);

		const navigationPanel = screen.getByTestId("global-navigation-panel");
		expect(navigationPanel).toBeInTheDocument();
	});

	it("should render header", async () => {
		render(<ConfirmStoreSelection />);

		const header = screen.getByTestId("header");
		expect(header).toBeInTheDocument();
	});
});
