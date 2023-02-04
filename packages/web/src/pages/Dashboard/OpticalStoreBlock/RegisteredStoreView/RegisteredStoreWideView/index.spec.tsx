import { render, screen } from "@testing-library/react";
import RegisteredStoreWideView from "./index";
import AddressSection from "../../AddressSection";
import { ComponentProps } from "react";
import StoreName from "../../StoreName";
import ChangeStoreButton from "../ChangeStoreButton";
import ContactSection from "../../ContactSection";
import BlockTitle from "../../../BlockTitle";
import Text from "../../../../../components/Text";
import Button from "../../../../../components/Button";
import { useConfiguration } from "../../../../../hooks/useConfiguration";

jest.mock("../../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../AddressSection", () => ({
	__esModule: true,
	default: ({ address }: ComponentProps<typeof AddressSection>) => (
		<span data-testid="address-section">{address}</span>
	),
}));

jest.mock("../../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../IconWithLink", () => ({
	__esModule: true,
	default: () => <span data-testid="icon-with-link" />,
}));

jest.mock("../../StoreName", () => ({
	__esModule: true,
	default: ({ name }: ComponentProps<typeof StoreName>) => (
		<span data-testid="store-name">{name}</span>
	),
}));

jest.mock("../../ContactSection", () => ({
	__esModule: true,
	default: ({ telephone }: ComponentProps<typeof ContactSection>) => (
		<span data-testid="contact-section">{telephone}</span>
	),
}));

jest.mock("../../../BlockTitle", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof BlockTitle>) => (
		<span data-testid="block-title">{textKey}</span>
	),
}));

jest.mock("../ChangeStoreButton", () => ({
	__esModule: true,
	default: ({ onClick }: ComponentProps<typeof ChangeStoreButton>) => (
		<button onClick={onClick} data-testid="change-store-button">
			change-store-button
		</button>
	),
}));

jest.mock("../../../../../components/Button", () => ({
	ButtonSize: {
		MEDIUM: "acuvue-btn-medium",
		SMALL: "acuvue-btn-small",
	},
	ButtonType: {
		PRIMARY: "acuvue-btn-primary",
		OUTLINE: "acuvue-btn-outline",
		NO_OUTLINE: "acuvue-btn-no-outline",
	},
	__esModule: true,
	default: ({ children, onClick }: ComponentProps<typeof Button>) => (
		<span data-testid="optical-store-goback-button" onClick={onClick}>
			{children}
		</span>
	),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		isChangeStoreAllowed: true,
		hasGoToHomeInRegisteredStore: true,
		canvasPageUrl: "canvasPageUrl.com",
	});
});

describe("RegisteredStoreWideView", () => {
	it("should render without errors", () => {
		render(
			<RegisteredStoreWideView
				storeName=""
				storeAddress=""
				iconsWithLinks={[]}
				telephone=""
				onChangeStoreClick={jest.fn()}
				onGoToHome={jest.fn()}
			/>
		);
	});

	it("should render iconsWithLinks", () => {
		render(
			<RegisteredStoreWideView
				storeName=""
				storeAddress=""
				iconsWithLinks={[
					{
						icon: "fakeIcon1",
						link: "fakeLink1",
						textKey: "notProvided",
					},
					{
						icon: "fakeIcon2",
						link: "fakeLink2",
						textKey: "notProvided",
					},
				]}
				telephone=""
				onChangeStoreClick={jest.fn()}
				onGoToHome={jest.fn()}
			/>
		);

		const iconsWithLinks = screen.getAllByTestId("icon-with-link");
		expect(iconsWithLinks).toHaveLength(2);
	});

	it("should render BlockTitle", () => {
		render(
			<RegisteredStoreWideView
				storeName=""
				storeAddress=""
				iconsWithLinks={[]}
				telephone=""
				onChangeStoreClick={jest.fn()}
				onGoToHome={jest.fn()}
			/>
		);

		const blockTitle = screen.getByTestId("block-title");
		expect(blockTitle).toBeInTheDocument();
		expect(blockTitle).toHaveTextContent(
			"dashboardPage.opticalStore.registeredView.title"
		);
	});

	it("should render StoreName", () => {
		render(
			<RegisteredStoreWideView
				storeName="fakeStoreName"
				storeAddress=""
				iconsWithLinks={[]}
				telephone=""
				onChangeStoreClick={jest.fn()}
				onGoToHome={jest.fn()}
			/>
		);

		const storeName = screen.getByTestId("store-name");
		expect(storeName).toBeInTheDocument();
		expect(storeName).toHaveTextContent("fakeStoreName");
	});

	it("should render AddressSection", () => {
		render(
			<RegisteredStoreWideView
				storeName=""
				storeAddress="fakeStoreAddress"
				iconsWithLinks={[]}
				telephone=""
				onChangeStoreClick={jest.fn()}
				onGoToHome={jest.fn()}
			/>
		);

		const storeAddressSection = screen.getByTestId("address-section");
		expect(storeAddressSection).toBeInTheDocument();
		expect(storeAddressSection).toHaveTextContent("fakeStoreAddress");
	});

	it("should render ContactSection", () => {
		render(
			<RegisteredStoreWideView
				storeName=""
				storeAddress=""
				iconsWithLinks={[]}
				telephone="1234567890"
				onChangeStoreClick={jest.fn()}
				onGoToHome={jest.fn()}
			/>
		);

		const storeContactSection = screen.getByTestId("contact-section");
		expect(storeContactSection).toBeInTheDocument();
		expect(storeContactSection).toHaveTextContent("1234567890");
	});

	it("should render ChangeStoreButton", () => {
		render(
			<RegisteredStoreWideView
				iconsWithLinks={[]}
				storeName="fakeStoreName"
				storeAddress="fakeStoreAddress"
				telephone="+65 6465 0213"
				onChangeStoreClick={jest.fn()}
				onGoToHome={jest.fn()}
			/>
		);

		const changeStoreButton = screen.getByTestId("change-store-button");
		expect(changeStoreButton).toBeInTheDocument();
	});

	it("should call onChangeStoreClick when ChangeStoreButton is clicked", () => {
		const opticalStoreGoBackkMock = jest.fn();
		render(
			<RegisteredStoreWideView
				iconsWithLinks={[]}
				storeName="fakeStoreName"
				storeAddress="fakeStoreAddress"
				telephone="+65 6465 0213"
				onChangeStoreClick={opticalStoreGoBackkMock}
				onGoToHome={jest.fn()}
			/>
		);

		const changeStoreButton = screen.getByTestId("change-store-button");
		changeStoreButton.click();
		expect(opticalStoreGoBackkMock).toHaveBeenCalled();
	});

	it("should render optical-store-goback-button", () => {
		render(
			<RegisteredStoreWideView
				iconsWithLinks={[]}
				storeName="fakeStoreName"
				storeAddress="fakeStoreAddress"
				telephone="+65 6465 0213"
				onChangeStoreClick={jest.fn()}
				onGoToHome={jest.fn()}
			/>
		);

		const opticalStoreGoBack = screen.getByTestId(
			"optical-store-goback-button"
		);
		expect(opticalStoreGoBack).toBeInTheDocument();
	});
});
