import { mocked } from "ts-jest/utils";
import DashboardWithOnlyOpticalStore from ".";
import { render, screen } from "@testing-library/react";
import { useAsync, useAsyncRetry } from "react-use";
import { useStore } from "../../hooks/useStore";
import { useStorage } from "../../hooks/useStorage";
import { useCompleteYourProfile } from "../CompleteYourProfile/useCompleteYourProfile";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { useFeatureSwitch } from "../../hooks/useFeatureSwitch";

jest.mock("../../components/Layout/MyAcuvueLiteHeader", () => ({
	__esModule: true,
	default: () => <div data-testid="my-acuvue-lite-header" />,
}));

jest.mock("../../components/Footer", () => ({
	__esModule: true,
	default: () => <div data-testid="footer" />,
}));

jest.mock("../Dashboard/OpticalStoreBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="optical-store-block" />,
}));

jest.mock("../CompleteYourProfile/RegistrationSuccessDialog", () => ({
	__esModule: true,
	default: () => <div data-testid="registration-success-dialog" />,
}));

jest.mock("react-use", () => ({
	useAsync: jest.fn(),
	useAsyncRetry: jest.fn(),
}));

jest.mock("../../hooks/useStore", () => ({
	useStore: jest.fn(),
}));

jest.mock("../../hooks/useStorage", () => ({
	useStorage: jest.fn(),
}));

jest.mock("../../hooks/useFeatureSwitch", () => ({
	useFeatureSwitch: jest.fn(),
}));

jest.mock("../CompleteYourProfile/useCompleteYourProfile", () => ({
	useCompleteYourProfile: jest.fn(),
}));

jest.mock("../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("../GreetingsBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="greetings-block">Greetings Block</div>,
}));

jest.mock("../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-block">Loading Block</div>,
}));

beforeEach(() => {
	(useAsync as jest.Mock).mockImplementation((callback) => callback());
	(useAsyncRetry as jest.Mock).mockImplementation((callback) => callback());
	mocked(useStore).mockReturnValue({
		getUserStore: jest.fn().mockReturnValue({}),
		getStores: jest.fn().mockReturnValue({}),
		registerStore: jest.fn().mockReturnValue({}),
		isEligibleToChangeStore: jest.fn().mockReturnValue({}),
	});
	mocked(useStorage).mockReturnValue([undefined, jest.fn(), jest.fn()]);
	(useCompleteYourProfile as jest.Mock).mockReturnValue({
		isRegistrationPopupOpen: false,
		setIsRegistrationPopupOpen: jest.fn(),
	});

	(useUserProfile as jest.Mock).mockReturnValue({
		userProfile: { firstName: "fakeFirstName" },
		isLoading: false,
	});

	(useFeatureSwitch as jest.Mock).mockReturnValue(["ENABLED", true]);
});

describe("Dashboard", () => {
	it("should render without error", () => {
		render(<DashboardWithOnlyOpticalStore />);
	});

	it("should have acuvue-dashboard-with-only-optical-store class name", () => {
		const { container } = render(<DashboardWithOnlyOpticalStore />);
		expect(
			container.querySelector(".acuvue-dashboard-with-only-optical-store")
		).toBeInTheDocument();
	});

	it("should render optical store block", () => {
		render(<DashboardWithOnlyOpticalStore />);
		const opticalStoreBlock = screen.getByTestId("optical-store-block");
		expect(opticalStoreBlock).toBeInTheDocument();
	});

	it("should render footer", () => {
		render(<DashboardWithOnlyOpticalStore />);
		const footer = screen.getByTestId("footer");
		expect(footer).toBeInTheDocument();
	});

	it("should render RegistrationSuccessDialog", () => {
		render(<DashboardWithOnlyOpticalStore />);
		const RegistrationSuccessDialog = screen.getByTestId(
			"registration-success-dialog"
		);
		expect(RegistrationSuccessDialog).toBeInTheDocument();
	});

	it("Should call registerStore if joined through QR code", async () => {
		const registerStoreMock = jest.fn();
		const getUserStoreMock = jest.fn();
		(useAsyncRetry as jest.Mock).mockReturnValue({
			value: undefined,
			loading: false,
			retry: jest.fn(),
		});
		(useStore as jest.Mock).mockReturnValue({
			registerStore: registerStoreMock,
			getUserStore: getUserStoreMock,
		});
		(useStorage as jest.Mock).mockReturnValue([
			{ type: "save-store", ecp: "41111112" },
			jest.fn(),
			jest.fn(),
		]);

		render(<DashboardWithOnlyOpticalStore />);

		expect(registerStoreMock).toHaveBeenCalledWith({ storeId: "41111112" });
	});

	it("Should call refreshUserOpticalStore if joined through QR code", async () => {
		const registerStoreMock = jest.fn();
		const getUserStoreMock = jest.fn();
		const refreshUserOpticalStore = jest.fn();
		(useAsyncRetry as jest.Mock).mockReturnValue({
			value: undefined,
			loading: false,
			retry: refreshUserOpticalStore,
		});
		(useStore as jest.Mock).mockReturnValue({
			registerStore: registerStoreMock,
			getUserStore: getUserStoreMock,
		});
		(useStorage as jest.Mock).mockReturnValue([
			{ type: "save-store", ecp: "41111112" },
			jest.fn(),
			jest.fn(),
		]);

		render(<DashboardWithOnlyOpticalStore />);

		await registerStoreMock({ storeId: "41111112" });
		expect(refreshUserOpticalStore).toHaveBeenCalled();
	});

	it("should render greetings block if isUserProfileLoading is false and userProfile is defined", () => {
		(useAsync as jest.Mock).mockReturnValue({
			value: "ENABLED",
			loading: false,
		});
		render(<DashboardWithOnlyOpticalStore />);

		const greetingsBlock = screen.getByTestId("greetings-block");

		expect(greetingsBlock).toBeInTheDocument();
	});

	it("should render loading block when profile is still loading", () => {
		(useUserProfile as jest.Mock).mockReturnValue({
			userProfile: undefined,
			isLoading: true,
		});

		(useAsync as jest.Mock).mockReturnValue({
			value: "ENABLED",
			loading: false,
		});

		render(<DashboardWithOnlyOpticalStore />);

		const greetingsBlock = screen.getByTestId("loading-block");

		expect(greetingsBlock).toBeInTheDocument();
	});
});
