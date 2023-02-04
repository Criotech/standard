import StoreBlock from "./index";
import { render, screen } from "@testing-library/react";
import { useStore } from "../../../hooks/useStore";

jest.mock("./../../../hooks/useStore");

jest.mock("./StoreSelectedView", () => ({
	__esModule: true,
	default: () => <div data-testid="store-selected-view">store-selected</div>,
}));

jest.mock("./NoStoreSelectedView", () => ({
	__esModule: true,
	default: () => (
		<div data-testid="no-store-selected-view">no-store-selected</div>
	),
}));

jest.mock("../../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-block" />,
}));

jest.mock("react-use", () => ({
	useAsync: (callback: any) => ({
		value: callback(),
		loading: false,
	}),
}));

describe("StoreBlock", () => {
	it("should render without errors", () => {
		(useStore as jest.Mock).mockReturnValue({
			getUserStore: () => ({
				id: "1",
				name: "fakeName",
				address: "fakeAddress",
				openingTime: "fakeTime",
				closingTime: "fakeTime",
				phone: "1234567890",
				isEligibleForHomeDelivery: true,
			}),
		});

		render(<StoreBlock />);
	});

	it("should render the StoreSelectedView and not the NoStoreSelectedView when store is available", async () => {
		(useStore as jest.Mock).mockReturnValue({
			getUserStore: () => ({
				id: "1",
				name: "fakeName",
				address: "fakeAddress",
				openingTime: "fakeTime",
				closingTime: "fakeTime",
				phone: "1234567890",
				isEligibleForHomeDelivery: true,
			}),
		});

		render(<StoreBlock />);

		await screen.findByTestId("store-selected-view");

		expect(screen.getByTestId("store-selected-view")).toBeInTheDocument();
		expect(
			screen.queryByTestId("no-store-selected")
		).not.toBeInTheDocument();
	});

	it("should render the NoStoreSelectedView and not the StoreSelectedView when store is not available", async () => {
		(useStore as jest.Mock).mockReturnValue({
			getUserStore: () => {},
		});

		render(<StoreBlock />);

		await screen.findByTestId("no-store-selected-view");

		expect(
			screen.getByTestId("no-store-selected-view")
		).toBeInTheDocument();
		expect(screen.queryByTestId("store-selected")).not.toBeInTheDocument();
	});
});
