import { render, screen } from "@testing-library/react";
import RegisteredStoreSmallView from "./index";
import { IIconWithLink } from "../index";
import StoreName from "../../StoreName";
import { ComponentProps } from "react";
import AddressSection from "../../AddressSection";
import ContactSection from "../../ContactSection";
import BlockTitle from "../../../BlockTitle";
import IconWithLink from "../IconWithLink";
import ChangeStoreButton from "../ChangeStoreButton";
import Text from "../../../../../components/Text";
import Button from "../../../../../components/Button";
import { useConfiguration } from "../../../../../hooks/useConfiguration";

jest.mock("../../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../StoreName", () => ({
	__esModule: true,
	default: ({ name }: ComponentProps<typeof StoreName>) => (
		<span data-testid="store-name">{name}</span>
	),
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

jest.mock("../IconWithLink", () => ({
	__esModule: true,
	default: ({ icon, textKey, link }: ComponentProps<typeof IconWithLink>) => (
		<span data-testid="icon-with-link">
			{icon}
			{textKey}
			{link}
		</span>
	),
}));

jest.mock("../../../../../components/ThinDivider", () => ({
	__esModule: true,
	default: () => <span data-testid="thin-divider" />,
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

const iconWithLinks: IIconWithLink[] = [
	{
		icon: <span />,
		textKey: "dashboardPage.membershipDetails.pointsAvailable",
		link: "#",
	},
	{
		icon: <span />,
		textKey: "dashboardPage.membershipDetails.pointsAvailable",
		link: "#",
	},
];

describe("AddressSection", () => {
	it("should render without erros", () => {
		render(
			<RegisteredStoreSmallView
				iconsWithLinks={iconWithLinks}
				storeName="fakeStoreName"
				storeAddress="fakeStoreAddress"
				telephone="+65 6465 0213"
				onChangeStoreClick={jest.fn()}
				onGoToHome={jest.fn()}
			/>
		);
	});

	it("should render correct title", () => {
		render(
			<RegisteredStoreSmallView
				iconsWithLinks={iconWithLinks}
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
			<RegisteredStoreSmallView
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
			<RegisteredStoreSmallView
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
