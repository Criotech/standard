import WalletCouponDetails from "./index";
import { render, screen } from "@testing-library/react";
import { useLocation } from "react-router-dom-v5-compat";
import { WalletCoupon } from "@myacuvue_thailand_web/services";
import { ComponentProps } from "react";
import Text from "../../../components/Text";
import DisplayHTML from "../../../components/DisplayHTML";
import { mocked } from "ts-jest/utils";

jest.mock("react-router-dom-v5-compat", () => ({
	useLocation: jest.fn(),
}));

jest.mock("antd", () => ({
	Divider: () => <div data-testid="antd-divider" />,
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../components/Layout/Header", () => ({
	__esModule: true,
	default: () => <div data-testid="header" />,
}));

jest.mock("../../../icons/DeliveryIcon", () => ({
	__esModule: true,
	default: () => <div>home delivery icon</div>,
}));

jest.mock("../../../icons/StoreIcon", () => ({
	__esModule: true,
	default: () => <div>store icon</div>,
}));

jest.mock("../../../components/DisplayHTML", () => ({
	__esModule: true,
	default: ({ unsafeHTML }: ComponentProps<typeof DisplayHTML>) => (
		<div data-testid="display-html">{unsafeHTML}</div>
	),
}));

jest.mock("../../../components/GlobalNavigationPanel", () => ({
	__esModule: true,
	default: () => <div data-testid="global-navigation-panel" />,
}));

const fakeCoupon: WalletCoupon = {
	id: "some-random-string",
	status: "active",
	type: "acuvue",
	subType: "other",
	isEligibleForHomeDelivery: true,
	isEligibleForInStore: true,
	bonusMultiplier: 2,
	imageUrl: "image-url",
	title: "some-random-title",
	points: 1200,
	validPeriod: {
		from: "2021-10-10",
		to: "2021-10-10",
	},
	terms: "some terms and condition",
	absoluteCashDiscount: 10,
};

beforeEach(() => {
	mocked(useLocation).mockReturnValue({
		state: {
			coupon: fakeCoupon,
		},
		hash: "",
		search: "",
		pathname: "",
		key: "",
	});
});

describe("WalletCouponDetails", () => {
	it("should render without errors", () => {
		render(<WalletCouponDetails />);
	});

	it("should render antd divider", async () => {
		render(<WalletCouponDetails />);

		const divider = await screen.findByTestId("antd-divider");
		expect(divider).toBeInTheDocument();
	});

	it("should render header", async () => {
		render(<WalletCouponDetails />);

		const divider = await screen.findByTestId("header");
		expect(divider).toBeInTheDocument();
	});

	it("should render store icon and home icon", async () => {
		render(<WalletCouponDetails />);

		const storeIcon = screen.queryByText("store icon");
		expect(storeIcon).toBeInTheDocument();

		const homeIcon = screen.queryByText("home delivery icon");
		expect(homeIcon).toBeInTheDocument();
	});

	it("should not render store icon and home icon if not eligible", async () => {
		const fakeCoupon: WalletCoupon = {
			id: "some-random-string",
			status: "active",
			type: "acuvue",
			subType: "other",
			isEligibleForHomeDelivery: false,
			isEligibleForInStore: false,
			bonusMultiplier: 2,
			imageUrl: "image-url",
			title: "some-random-title",
			points: 1200,
			validPeriod: {
				from: "2021-10-10",
				to: "2021-10-10",
			},
			terms: "some terms and condition",
			absoluteCashDiscount: 10,
		};

		(useLocation as jest.Mock).mockReturnValue({
			state: {
				coupon: fakeCoupon,
			},
		});

		render(<WalletCouponDetails />);

		const storeIcon = screen.queryByText("store icon");
		expect(storeIcon).not.toBeInTheDocument();

		const homeIcon = screen.queryByText("home delivery icon");
		expect(homeIcon).not.toBeInTheDocument();
	});

	it("should have the coupon location props", async () => {
		render(<WalletCouponDetails />);

		const validPeriod = screen.queryByText(
			"rewardsPage.couponDetails.validPeriod"
		);
		expect(validPeriod).toBeInTheDocument();

		const bonusMultiplier = screen.queryByText(
			"rewardsPage.walletCouponCard.pointReward"
		);
		expect(bonusMultiplier).toBeInTheDocument();

		const eligibleForStore = screen.queryByText(
			"rewardsPage.couponDetails.eligibleForStore"
		);
		expect(eligibleForStore).toBeInTheDocument();
		const eligibleForHome = screen.queryByText(
			"rewardsPage.couponDetails.eligibleForHome"
		);
		expect(eligibleForHome).toBeInTheDocument();

		const termsAndCondition = screen.queryByText(
			"rewardsPage.couponDetails.terms"
		);
		expect(termsAndCondition).toBeInTheDocument();

		const couponImage = screen.getByRole("img");
		expect(couponImage).toHaveAttribute("src", "image-url");
	});

	it("should display coupon terms", async () => {
		render(<WalletCouponDetails />);
		const couponTerms = await screen.findByTestId("display-html");
		expect(couponTerms).toHaveTextContent(fakeCoupon.terms);
	});

	it("should render GlobalNavigationPanel", async () => {
		render(<WalletCouponDetails />);

		const navigationPanel = screen.getByTestId("global-navigation-panel");
		expect(navigationPanel).toBeInTheDocument();
	});
});
