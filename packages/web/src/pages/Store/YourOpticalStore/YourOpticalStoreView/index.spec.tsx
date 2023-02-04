import { render, screen } from "@testing-library/react";
import { IStore } from "@myacuvue_thailand_web/services";
import YourOpticalStoreView from ".";
import { ComponentProps } from "react";
import Text from "../../../../components/Text";

const store: IStore = {
	id: "1",
	name: "fakeStoreName",
	address: "fakeAddress",
	openingTime: "fakeOpeningTime",
	closingTime: "fakeClosingTime",
	phone: "1234567890",
	isEligibleForHomeDelivery: true,
};

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../../icons/DeliveryIcon", () => ({
	__esModule: true,
	default: () => <div data-testid="delivery-store-icon">Delivery icon</div>,
}));

describe("YourOpticalStoreView", () => {
	it("should render without errors", () => {
		render(<YourOpticalStoreView store={store} />);
	});

	it("should render optical-store icon", () => {
		render(<YourOpticalStoreView store={store} />);
		const opticalStoreIcon = screen.getByRole("img");
		expect(opticalStoreIcon).toBeInTheDocument();
		expect(opticalStoreIcon).toHaveAttribute(
			"src",
			"optical-store-icon.svg"
		);
	});

	it("should render delivery component icon", () => {
		render(<YourOpticalStoreView store={store} />);
		const opticalStoreIcon = screen.getByTestId("delivery-store-icon");
		expect(opticalStoreIcon).toHaveTextContent("Delivery icon");
	});

	it("should have the 'yourOpticalStore title' text in the screen", () => {
		render(<YourOpticalStoreView store={store} />);
		const yourOpticalStore = screen.getByText(
			"storePage.opticalStore.yourOpticalStore"
		);
		expect(yourOpticalStore).toBeInTheDocument();
	});

	it("should have the 'eligibleForDelivery' text in the screen", () => {
		render(<YourOpticalStoreView store={store} />);
		const eligibleForDelivery = screen.getByText(
			"storePage.storeCell.eligibleForDelivery"
		);
		expect(eligibleForDelivery).toBeInTheDocument();
	});

	it("should not render delivery message when isEligibleForHomeDelivery is false", () => {
		const store: IStore = {
			id: "1",
			name: "fakeStoreName",
			address: "fakeAddress",
			openingTime: "fakeOpeningTime",
			closingTime: "fakeClosingTime",
			phone: "1234567890",
			isEligibleForHomeDelivery: false,
		};
		render(<YourOpticalStoreView store={store} />);
		const eligibleForDelivery = screen.queryByText(
			"storePage.storeCell.eligibleForDelivery"
		);
		expect(eligibleForDelivery).not.toBeInTheDocument();
	});
});
