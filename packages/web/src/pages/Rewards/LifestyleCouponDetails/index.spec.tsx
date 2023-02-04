import LifestyleCouponDetails from "./index";
import { act, render, screen } from "@testing-library/react";
import { useLocation, useNavigate } from "react-router-dom-v5-compat";
import { ILifestyleCoupon, IPoints } from "@myacuvue_thailand_web/services";
import { usePoints } from "../../../hooks/usePoints";
import { useLifestyleCartContext } from "../../../hooks/useLifestyleCartContext";
import { ComponentProps } from "react";
import Header from "../../../components/Layout/Header";
import TagLabel from "../../../components/TagLabel";
import DisplayHTML from "../../../components/DisplayHTML";
import Text from "../../../components/Text";
import { mocked } from "ts-jest/utils";

jest.mock("react-router-dom-v5-compat", () => ({
	useLocation: jest.fn(),
	useNavigate: jest.fn(),
}));

jest.mock("antd", () => ({
	Divider: () => <div data-testid="antd-divider" />,
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ type, textKey, data }: ComponentProps<typeof Text>) => (
		<>
			{textKey} {type} {JSON.stringify(data)}
		</>
	),
}));

jest.mock("../../../hooks/usePoints", () => ({
	usePoints: jest.fn(),
}));

jest.mock("../../../hooks/useTranslation");

jest.mock("../../../components/CartButton", () => ({
	__esModule: true,
	default: () => <div data-testid="cart-button" />,
}));

jest.mock("../../../components/Layout/Header", () => ({
	__esModule: true,
	default: ({ titleKey, icon }: ComponentProps<typeof Header>) => (
		<div data-testid="header">
			<div data-testid="header-title">{titleKey}</div>
			<div data-testid="header-icon">{icon}</div>
		</div>
	),
}));

jest.mock("../../../components/DisplayHTML", () => ({
	__esModule: true,
	default: ({ unsafeHTML }: ComponentProps<typeof DisplayHTML>) => (
		<div data-testid="display-html">{unsafeHTML}</div>
	),
}));

jest.mock("../../../hooks/useLifestyleCartContext", () => ({
	useLifestyleCartContext: jest.fn(),
}));

jest.mock("../../../components/TagLabel", () => ({
	__esModule: true,
	default: ({ labelKey }: ComponentProps<typeof TagLabel>) => (
		<div data-testid="tag-level">{labelKey}</div>
	),
}));

jest.mock("./LifestyleCouponErrorModal", () => ({
	__esModule: true,
	default: () => <div data-testid="lifestyle-coupon-error-modal" />,
}));

jest.mock("../../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <div />,
}));

jest.mock("../../../components/GlobalNavigationPanel", () => ({
	__esModule: true,
	default: () => <div data-testid="global-navigation-panel" />,
}));

const DEFAULT_USER_POINTS: IPoints = {
	ladder: "platinum",
	earnedPoints: 5000,
	remainingPointsToPlatinum: 1000,
	dateLimitToPlatinum: "2018-01-01",
	availablePoints: 1220,
	expiringPoints: 100,
	expiringAt: "2018-12-01",
};

const DEFAULT_LIFESTYLE_COUPON: ILifestyleCoupon = {
	type: "lifestyle",
	issuer: "Sizzler",
	tag: "new",
	isPlatinum: false,
	isFeatured: true,
	remainingQuantity: 10,
	id: "7v894576e4n0bn7",
	imageUrl: "image-url",
	title: "Lifestyle Reward",
	points: 0,
	validPeriod: {
		from: "2021-02-01",
		to: "2021-03-01",
	},
	terms: "",
	absoluteCashDiscount: 0,
};

beforeEach(() => {
	mocked(useNavigate).mockReturnValue(jest.fn());

	mocked(usePoints).mockReturnValue({
		getUserPoints: jest.fn().mockResolvedValue({ ...DEFAULT_USER_POINTS }),
	});

	mocked(useLocation).mockReturnValue({
		state: {
			coupon: {
				...DEFAULT_LIFESTYLE_COUPON,
			},
		},
		key: "",
		pathname: "",
		search: "",
		hash: "",
	});

	mocked(useLifestyleCartContext).mockReturnValue({
		cart: {},
		incrementOnCart: jest.fn(),
		decrementOnCart: jest.fn(),
		clearCart: jest.fn(),
		quantityInCart: 0,
		removeFromCart: jest.fn(),
	});
});

describe("LifestyleCouponDetails", () => {
	it("should render without errors", async () => {
		await act(async () => {
			render(<LifestyleCouponDetails />);
		});
	});

	it("should render antd divider", async () => {
		await act(async () => {
			render(<LifestyleCouponDetails />);
		});

		const divider = await screen.findByTestId("antd-divider");
		expect(divider).toBeInTheDocument();
	});

	it("should render header", async () => {
		await act(async () => {
			render(<LifestyleCouponDetails />);
		});

		const header = await screen.findByTestId("header");
		expect(header).toBeInTheDocument();

		const headerTitle = screen.queryByText(
			"rewardsPage.lifestyleCouponDetails.title"
		);
		expect(headerTitle).toBeInTheDocument();

		const cartButton = await screen.findByTestId("cart-button");
		expect(cartButton).toBeInTheDocument();
	});

	it("should render acuvue coupon error modal", async () => {
		await act(async () => {
			render(<LifestyleCouponDetails />);
		});

		const errorModal = await screen.findByTestId(
			"lifestyle-coupon-error-modal"
		);

		expect(errorModal).toBeInTheDocument();
	});

	it("should have the coupon location props", async () => {
		await act(async () => {
			render(<LifestyleCouponDetails />);
		});

		const couponImage = screen.getByAltText("Lifestyle Coupon");
		expect(couponImage).toHaveAttribute("src", "image-url");

		const validPeriod = screen.queryByText(
			/rewardsPage\.couponDetails\.validPeriod/
		);
		expect(validPeriod).toBeInTheDocument();

		const points = screen.queryByText("couponDetails.points");
		expect(points).toBeInTheDocument();

		const terms = screen.queryByText("rewardsPage.couponDetails.terms");
		expect(terms).toBeInTheDocument();

		const viewYourCart = screen.queryByText(
			"rewardsPage.lifestyleCouponDetails.viewYourCart"
		);
		expect(viewYourCart).toBeInTheDocument();
	});

	it("should display coupon terms", async () => {
		(useLocation as jest.Mock).mockReturnValue({
			state: {
				coupon: {
					...DEFAULT_LIFESTYLE_COUPON,
					terms: "fake terms of use",
				},
			},
		});
		await act(async () => {
			render(<LifestyleCouponDetails />);
		});

		const couponTerms = await screen.findByTestId("display-html");
		expect(couponTerms).toHaveTextContent("fake terms of use");
	});

	it("should not render platinum and tag if not available", async () => {
		(useLocation as jest.Mock).mockReturnValue({
			state: {
				coupon: {
					...DEFAULT_LIFESTYLE_COUPON,
					tag: null,
					isPlatinum: false,
				},
			},
		});

		await act(async () => {
			render(<LifestyleCouponDetails />);
		});

		const platinum = screen.queryByText("couponTag.platinum");
		expect(platinum).not.toBeInTheDocument();

		const newTag = screen.queryByText("couponTag.new");
		expect(newTag).not.toBeInTheDocument();
	});

	it("should render platinum and tag if available", async () => {
		(useLocation as jest.Mock).mockReturnValue({
			state: {
				coupon: {
					...DEFAULT_LIFESTYLE_COUPON,
					tag: "new",
					isPlatinum: true,
				},
			},
		});

		await act(async () => {
			render(<LifestyleCouponDetails />);
		});

		const platinum = screen.queryByText("couponTag.platinum");
		expect(platinum).toBeInTheDocument();

		const newTag = screen.queryByText("couponTag.new");
		expect(newTag).toBeInTheDocument();
	});

	it("should navigate to /rewards-cart when view your cart button is clicked", async () => {
		await act(async () => {
			render(<LifestyleCouponDetails />);
		});

		const viewYourCartButton = await screen.findByText(
			"rewardsPage.lifestyleCouponDetails.viewYourCart"
		);
		viewYourCartButton.click();
		expect(useNavigate()).toHaveBeenCalledWith("/rewards-cart");
	});

	it("should render GlobalNavigationPanel", async () => {
		await act(async () => {
			render(<LifestyleCouponDetails />);
		});

		const navigationPanel = screen.getByTestId("global-navigation-panel");
		expect(navigationPanel).toBeInTheDocument();
	});

	it("should call increment when the plus button is clicked", async () => {
		const mockIncrement = jest.fn();
		(useLifestyleCartContext as jest.Mock).mockReturnValue({
			cart: {},
			incrementOnCart: mockIncrement,
			decrementOnCart: jest.fn(),
		});

		await act(async () => {
			render(<LifestyleCouponDetails />);
		});

		const buttons = screen.queryAllByRole("button");

		const plusButton = buttons.find((button) =>
			button.className.includes("plus-button")
		);
		expect(plusButton).toBeDefined();
		plusButton!.click();

		expect(mockIncrement).toHaveBeenCalled();
	});

	it("should display the error modal if plus button is clicked for a platinum coupon but user is not platinum", async () => {
		(useLocation as jest.Mock).mockReturnValue({
			state: {
				coupon: {
					...DEFAULT_LIFESTYLE_COUPON,
					isPlatinum: true,
				},
			},
		});
		(usePoints as jest.Mock).mockReturnValue({
			getUserPoints: jest.fn().mockResolvedValue({
				...DEFAULT_USER_POINTS,
				ladder: "normal",
			}),
		});

		const mockIncrement = jest.fn();
		(useLifestyleCartContext as jest.Mock).mockReturnValue({
			cart: {},
			incrementOnCart: mockIncrement,
			decrementOnCart: jest.fn(),
		});

		await act(async () => {
			render(<LifestyleCouponDetails />);
		});

		const buttons = screen.queryAllByRole("button");

		const plusButton = buttons.find((button) =>
			button.className.includes("plus-button")
		);
		expect(plusButton).toBeDefined();
		plusButton?.click();

		expect(mockIncrement).not.toHaveBeenCalled();

		const errorModal = screen.getByTestId("lifestyle-coupon-error-modal");
		expect(errorModal).toBeVisible();
	});

	it("should display '100+' if the remaining quota exceeds 100", async () => {
		(useLocation as jest.Mock).mockReturnValue({
			state: {
				coupon: {
					...DEFAULT_LIFESTYLE_COUPON,
					remainingQuantity: 101,
				},
			},
		});

		await act(async () => {
			render(<LifestyleCouponDetails />);
		});

		const quota = screen.getByText(/100\+/);
		expect(quota).toBeVisible();
	});
});
