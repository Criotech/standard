import { render, screen } from "@testing-library/react";
import StoreSelectedView from "../StoreSelectedView";

jest.mock("../../../../hooks/useText", () => ({ useText: jest.fn() }));

const store = {
	id: "1",
	name: "BetterVision",
	address: "fakeAddress",
	openingTime: "10:00",
	closingTime: "17:30",
	phone: "1234567890",
	isEligibleForHomeDelivery: true,
};

describe("StoreSelectedView", () => {
	it("should render without errors", () => {
		render(<StoreSelectedView store={store} />);
	});

	it("should render store image", () => {
		render(<StoreSelectedView store={store} />);
		const storeImage = screen.getByRole("img");
		expect(storeImage).toBeInTheDocument();
	});

	it("should render name and address values", () => {
		render(<StoreSelectedView store={store} />);

		const storeName = screen.getByText("BetterVision");
		expect(storeName).toBeInTheDocument();
		expect(storeName).toHaveClass("store-name");

		const storeAddress = screen.getByText("fakeAddress");
		expect(storeAddress).toBeInTheDocument();
	});
});
