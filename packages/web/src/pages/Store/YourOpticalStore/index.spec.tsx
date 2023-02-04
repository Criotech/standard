import YourOpticalStore from "./index";
import { render, screen, waitFor } from "@testing-library/react";
import { useStore } from "../../../hooks/useStore";
import { IStore, IStoreWithCoordinates } from "@myacuvue_thailand_web/services";
import { act } from "react-dom/test-utils";

jest.mock("../../../hooks/useStore");

jest.mock("./SelectYourStoreView", () => ({
	__esModule: true,
	default: () => <div data-testid="select-your-store-view" />,
}));

jest.mock("./YourOpticalStoreView", () => ({
	__esModule: true,
	default: () => <div data-testid="your-optical-store-view" />,
}));

const fakeStores: IStoreWithCoordinates[] = [
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

const fakeUserStore: IStore = {
	id: "213",
	name: "fakeStoreName",
	address: "fakeAddress",
	openingTime: "fakeOpeningTime",
	closingTime: "fakeClosingTime",
	phone: "1234567890",
	isEligibleForHomeDelivery: true,
};

describe("YourOpticalStore", () => {
	beforeEach(() => {
		(useStore as jest.Mock).mockReturnValue({
			getStores: jest.fn().mockResolvedValue(fakeStores),
			getUserStore: jest.fn().mockResolvedValue(fakeUserStore),
		});
	});
	it("should render without errors", async () => {
		await act(async () => {
			render(<YourOpticalStore />);
		});
	});

	it("should call getUserStore", async () => {
		await act(async () => {
			render(<YourOpticalStore />);
		});

		const { getUserStore } = useStore();

		await waitFor(() => expect(getUserStore).toHaveBeenCalled());
	});

	describe("scenario: user store is not registered", () => {
		beforeEach(() => {
			(useStore as jest.Mock).mockReturnValue({
				getStores: jest.fn().mockResolvedValue(fakeStores),
				getUserStore: jest.fn().mockResolvedValue(null),
			});
		});

		it("should render SelectYourStoreView", async () => {
			await act(async () => {
				render(<YourOpticalStore />);
			});

			const selectYourStoreView = await screen.findByTestId(
				"select-your-store-view"
			);
			expect(selectYourStoreView).toBeInTheDocument();
		});

		it("should not render YourOpticalStoreView", async () => {
			await act(async () => {
				render(<YourOpticalStore />);
			});

			const yourOpticalStoreView = screen.queryByTestId(
				"your-optical-store-view"
			);
			expect(yourOpticalStoreView).not.toBeInTheDocument();
		});

		it("should call getStores", async () => {
			await act(async () => {
				render(<YourOpticalStore />);
			});

			const { getStores } = useStore();
			await waitFor(() => expect(getStores).toHaveBeenCalled());
		});
	});

	describe("scenario: user store is registered", () => {
		it("should render YourOpticalStoreView", async () => {
			await act(async () => {
				render(<YourOpticalStore />);
			});

			const yourOpticalStoreView = await screen.findByTestId(
				"your-optical-store-view"
			);
			expect(yourOpticalStoreView).toBeInTheDocument();
		});
	});
});
