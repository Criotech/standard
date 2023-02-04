import { render, screen } from "@testing-library/react";
import StoreWithPinCardSmall from "./index";
import { ComponentProps } from "react";
import Text from "../../../../../../components/Text";
import AddressSection from "../../../AddressSection";
import SelectStoreButton from "../../SelectStoreButton";
import StoreName from "../../../StoreName";
import PinIconWithNumber from "../../../../../../components/PinIconWithNumber";
import ContactSection from "../../../ContactSection";

jest.mock("../../../../../../components/PinIconWithNumber", () => ({
	__esModule: true,
	default: ({ number }: ComponentProps<typeof PinIconWithNumber>) => (
		<span data-testid="pin-icon-with-number">{number}</span>
	),
}));

jest.mock("../../../StoreName", () => ({
	__esModule: true,
	default: ({ name }: ComponentProps<typeof StoreName>) => (
		<span data-testid="store-name">{name}</span>
	),
}));

jest.mock("../../../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey, data }: ComponentProps<typeof Text>) => (
		<>
			<span data-testid="text-key">{textKey}</span>
			<span data-testid="text-data">{JSON.stringify(data)}</span>
		</>
	),
}));

jest.mock("../../../AddressSection", () => ({
	__esModule: true,
	default: ({ address }: ComponentProps<typeof AddressSection>) => (
		<span data-testid="address-section">{address}</span>
	),
}));

jest.mock("../../../ContactSection", () => ({
	__esModule: true,
	default: ({ telephone }: ComponentProps<typeof ContactSection>) => (
		<span data-testid="contact-section">{telephone}</span>
	),
}));

jest.mock("../../../RegisterStoreView/SelectStoreButton", () => ({
	__esModule: true,
	default: ({ onClick }: ComponentProps<typeof SelectStoreButton>) => (
		<span data-testid="select-store-button" onClick={onClick} />
	),
}));

describe("AddressSection", () => {
	it("should render without errors", () => {
		render(
			<StoreWithPinCardSmall
				number={0}
				storeName=""
				storeAddress=""
				telephone=""
				onSelectStoreClick={jest.fn()}
			/>
		);
	});

	it("shoulld render correct pin icon with number", () => {
		render(
			<StoreWithPinCardSmall
				number={5}
				storeName=""
				storeAddress=""
				telephone=""
				onSelectStoreClick={jest.fn()}
			/>
		);

		const pinIconWithNumber = screen.getByTestId("pin-icon-with-number");
		expect(pinIconWithNumber).toBeInTheDocument();
		expect(pinIconWithNumber).toHaveTextContent("5");
	});

	it("should render store name with correct store name prop", () => {
		render(
			<StoreWithPinCardSmall
				number={0}
				storeName="fakeStoreName"
				storeAddress=""
				telephone=""
				onSelectStoreClick={jest.fn()}
			/>
		);

		const storeName = screen.getByTestId("store-name");
		expect(storeName).toHaveTextContent("fakeStoreName");
	});

	it("should render store address with correct store address prop", () => {
		render(
			<StoreWithPinCardSmall
				number={0}
				storeName=""
				storeAddress="fakeStoreAddress"
				telephone=""
				onSelectStoreClick={jest.fn()}
			/>
		);

		const storeAddress = screen.getByTestId("address-section");
		expect(storeAddress).toHaveTextContent("fakeStoreAddress");
	});

	it("should render telephone", () => {
		render(
			<StoreWithPinCardSmall
				number={0}
				storeName=""
				storeAddress=""
				telephone="+65 6465 0213"
				onSelectStoreClick={jest.fn()}
			/>
		);

		const telephone = screen.getByTestId("contact-section");
		expect(telephone).toHaveTextContent("+65 6465 0213");
	});

	it("should dispatch correct function when clicking SelectStore button", () => {
		const fakeOnSelectStore = jest.fn();
		render(
			<StoreWithPinCardSmall
				number={0}
				storeName=""
				storeAddress=""
				telephone=""
				onSelectStoreClick={fakeOnSelectStore}
			/>
		);

		const selectStoreButton = screen.getByTestId("select-store-button");
		selectStoreButton.click();
		expect(fakeOnSelectStore).toHaveBeenCalled();
	});

	it("should render correct distance text key", () => {
		render(
			<StoreWithPinCardSmall
				number={0}
				storeName=""
				storeAddress=""
				telephone=""
				distanceInKm={65}
				onSelectStoreClick={jest.fn()}
			/>
		);
		const distance = screen.getByTestId("text-key");

		expect(distance).toHaveTextContent(
			"dashboardPage.opticalStore.distance"
		);
	});

	it("should render correct distance data", () => {
		render(
			<StoreWithPinCardSmall
				number={0}
				storeName=""
				storeAddress=""
				telephone=""
				distanceInKm={65}
				onSelectStoreClick={jest.fn()}
			/>
		);
		const distance = screen.getByTestId("text-data");

		expect(distance).toHaveTextContent(JSON.stringify({ distance: 65 }));
	});

	it("should have highlighted class when isHighlighted is true", () => {
		const { container } = render(
			<StoreWithPinCardSmall
				number={0}
				isHighlighted={true}
				storeName=""
				storeAddress=""
				telephone=""
				onSelectStoreClick={jest.fn()}
			/>
		);

		expect(container.firstChild).toHaveClass("highlighted");
	});

	it("should not have highlighted class when isHighlighted is false", () => {
		const { container } = render(
			<StoreWithPinCardSmall
				number={0}
				isHighlighted={false}
				storeName=""
				storeAddress=""
				telephone=""
				onSelectStoreClick={jest.fn()}
			/>
		);

		expect(container.firstChild).not.toHaveClass("highlighted");
	});
});
