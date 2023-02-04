import { render, screen } from "@testing-library/react";
import RegisteredStoreView from ".";
import { useWideScreen } from "../../../../hooks/useWideScreen";
import { ComponentProps } from "react";
import RegisteredStoreWideView from "./RegisteredStoreWideView";
import { useConfiguration } from "../../../../hooks/useConfiguration";
import { ConfigService } from "@myacuvue_thailand_web/services";

jest.mock("../../../../hooks/useWideScreen", () => ({
	useWideScreen: jest.fn(),
}));

jest.mock("../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../../../icons/LensesCaseInCircleIcon", () => ({
	__esModule: true,
	default: () => <div data-testid="lenses-case-in-circle-icon" />,
	IconSize: {
		LARGE: "large",
	},
}));

const createFakeInnerView = (dataTestid: string) => {
	return ({
		iconsWithLinks,
		storeName,
		storeAddress,
	}: ComponentProps<typeof RegisteredStoreWideView>) => (
		<div data-testid={dataTestid}>
			<div>{storeAddress}</div>
			<div>{storeName}</div>
			<div data-testid="icons-with-link">
				{iconsWithLinks.map((icon, index) => (
					<div key={index}>
						{icon.icon}
						{icon.link}
						{icon.textKey}
					</div>
				))}
			</div>
		</div>
	);
};

jest.mock("./RegisteredStoreSmallView", () => ({
	__esModule: true,
	default: createFakeInnerView("registered-store-small-view"),
}));

jest.mock("./RegisteredStoreWideView", () => ({
	__esModule: true,
	default: createFakeInnerView("registered-store-wide-view"),
}));

beforeEach(() => {
	(useWideScreen as jest.Mock).mockReturnValue({
		isWideScreen: false,
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		opticalStoreAdviceCards: [],
	});
});

describe("RegisteredStoreView", () => {
	it("should render without erros", () => {
		render(
			<RegisteredStoreView
				storeName=""
				storeAddress=""
				telephone=""
				onChangeStoreClick={jest.fn()}
				onGoToHome={jest.fn()}
			/>
		);
	});

	it("should render small view when in small screen", () => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: false,
		});

		render(
			<RegisteredStoreView
				storeName=""
				storeAddress=""
				telephone=""
				onChangeStoreClick={jest.fn()}
				onGoToHome={jest.fn()}
			/>
		);
		const registeredStoreSmallView = screen.getByTestId(
			"registered-store-small-view"
		);
		expect(registeredStoreSmallView).toBeInTheDocument();
	});

	it("should render wide view when in wide screen", () => {
		(useWideScreen as jest.Mock).mockReturnValue({
			isWideScreen: true,
		});

		render(
			<RegisteredStoreView
				storeName=""
				storeAddress=""
				telephone=""
				onChangeStoreClick={jest.fn()}
				onGoToHome={jest.fn()}
			/>
		);
		const registeredStoreWideView = screen.getByTestId(
			"registered-store-wide-view"
		);
		expect(registeredStoreWideView).toBeInTheDocument();
	});

	it("should receive correct store name and address props", () => {
		render(
			<RegisteredStoreView
				storeName="fake-store-name"
				storeAddress="fake-store-address"
				telephone="+65 6465 0213"
				onChangeStoreClick={jest.fn()}
				onGoToHome={jest.fn()}
			/>
		);

		const storeName = screen.getByText("fake-store-name");
		const storeAddress = screen.getByText("fake-store-address");

		expect(storeName).toBeInTheDocument();
		expect(storeAddress).toBeInTheDocument();
	});

	it("should receive correct icon with link prop", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			opticalStoreAdviceCards: [
				{
					iconType:
						ConfigService.OpticalStoreIconType
							.LENSES_CASE_IN_CIRCLE,
					link: "https://some-link",
					textKey: "dashboardPage.opticalStore.address",
				},
			],
		});

		render(
			<RegisteredStoreView
				storeName=""
				storeAddress=""
				telephone=""
				onChangeStoreClick={jest.fn()}
				onGoToHome={jest.fn()}
			/>
		);

		const iconWithLink = screen.getByTestId("icons-with-link");
		expect(iconWithLink).toBeInTheDocument();
		expect(iconWithLink).toHaveTextContent("https://some-link");
		expect(iconWithLink).toHaveTextContent(
			"dashboardPage.opticalStore.address"
		);

		const lensesCaseIcon = screen.getByTestId("lenses-case-in-circle-icon");
		expect(lensesCaseIcon).toBeInTheDocument();
	});
});
