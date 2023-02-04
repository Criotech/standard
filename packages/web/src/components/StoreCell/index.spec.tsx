import { render, screen } from "@testing-library/react";
import { IStore } from "@myacuvue_thailand_web/services";
import StoreCell from ".";
import { ComponentProps } from "react";
import Text from "../Text";

const store: IStore = {
	id: "213",
	name: "fakeStoreName",
	address: "fakeAddress",
	openingTime: "fakeOpeningTime",
	closingTime: "fakeClosingTime",
	phone: "1234567890",
	isEligibleForHomeDelivery: true,
};

jest.mock("../Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../icons/DeliveryIcon", () => ({
	__esModule: true,
	default: () => <div data-testid="home-delivery-icon" />,
}));

describe("StoreCell", () => {
	it("should render without errors", () => {
		render(<StoreCell store={store} />);
	});

	it("should render store name, address, timings, phone, home delivery message and icon", () => {
		render(<StoreCell store={store} />);
		const storeName = screen.getByText("fakeStoreName");
		expect(storeName).toBeInTheDocument();

		const storeAddress = screen.getByText("fakeAddress");
		expect(storeAddress).toBeInTheDocument();

		const storeOpeningDays = screen.getByText(
			"storePage.storeCell.openingDays"
		);
		expect(storeOpeningDays).toBeInTheDocument();

		const storeTelephone = screen.getByText(store.phone.toString());
		expect(storeTelephone).toBeInTheDocument();

		const eligibleForDelivery = screen.getByText(
			"storePage.storeCell.eligibleForDelivery"
		);
		expect(eligibleForDelivery).toBeInTheDocument();

		const homeDeliveryIcon = screen.getByTestId("home-delivery-icon");
		expect(homeDeliveryIcon).toBeInTheDocument();
	});

	it("should not render home delivery icon and home delivery message when isEligibleForHomeDelivery is false", () => {
		const store: IStore = {
			id: "213",
			name: "fakeStoreName",
			address: "fakeAddress",
			openingTime: "fakeOpeningTime",
			closingTime: "fakeClosingTime",
			phone: "1234567890",
			isEligibleForHomeDelivery: false,
		};
		render(<StoreCell store={store} />);

		const eligibleForDelivery = screen.queryByText(
			"storePage.storeCell.eligibleForDelivery"
		);
		expect(eligibleForDelivery).not.toBeInTheDocument();

		const homeDeliveryImage = screen.queryByText("home-delivery-image");
		expect(homeDeliveryImage).not.toBeInTheDocument();
	});
});
