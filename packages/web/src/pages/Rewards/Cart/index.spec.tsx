import {
	Gender,
	IGetProfileResponse,
	ProfileCompleteness,
} from "@myacuvue_thailand_web/services";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { ComponentProps } from "react";
import Cart from ".";
import { useCoupon } from "../../../hooks/useCoupon";
import { usePoints } from "../../../hooks/usePoints";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import Text from "../../../components/Text";
import NonEmptyCartView from "../NonEmptyCartView";
import RewardsPoints from "../RewardsPoints";
import Header from "../../../components/Layout/Header";
import { mocked } from "ts-jest/utils";

jest.mock("antd", () => ({
	Divider: () => <div data-testid="divider" />,
}));

jest.mock("../../../hooks/usePoints", () => ({
	usePoints: jest.fn(),
}));

jest.mock("../../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("../../../hooks/useCoupon", () => ({
	useCoupon: jest.fn(),
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../NonEmptyCartView", () => ({
	__esModule: true,
	default: ({ points, coupons }: ComponentProps<typeof NonEmptyCartView>) => (
		<div data-testid="non-empty-cart-view">
			<div data-testid="available-points">{points.availablePoints}</div>
			{coupons.map((coupon: any) => (
				<div key={coupon.id} data-testid="coupon-id">
					{coupon.id}
				</div>
			))}
		</div>
	),
}));

jest.mock("../EmptyCartVIew", () => ({
	__esModule: true,
	default: () => <div data-testid="empty-cart-view" />,
}));

jest.mock("./../RewardsPoints", () => ({
	__esModule: true,
	default: ({ points }: ComponentProps<typeof RewardsPoints>) => (
		<div data-testid="rewards-points">{points?.availablePoints}</div>
	),
}));

jest.mock("../../../components/Layout/Header", () => ({
	__esModule: true,
	default: ({ titleKey, icon }: ComponentProps<typeof Header>) => (
		<div data-testid="header">
			{titleKey}
			{icon}
		</div>
	),
}));

jest.mock("../../../components/CartButton", () => ({
	__esModule: true,
	default: () => <button data-testid="cart-button" />,
}));

jest.mock("../NonEmptyCartView/NonEmptyCartSuccessModal", () => ({
	__esModule: true,
	default: () => <div data-testid="checkout-success-modal" />,
}));

jest.mock("react-router-dom", () => ({
	useHistory: () => ({
		push: jest.fn(),
	}),
}));

jest.mock("../../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-block" />,
}));

jest.mock("../../../components/GlobalNavigationPanel", () => ({
	__esModule: true,
	default: () => <div data-testid="global-navigation-panel" />,
}));

const fakeUser: IGetProfileResponse = {
	myAcuvueId: "fakeId",
	phone: "fakeNumber",
	firstName: "fakeFirstName",
	lastName: "fakeLastName",
	birthMonth: "fakeBirthMonth",
	birthYear: "fakeBirthYear",
	email: "fakeEmail",
	gender: Gender.FEMALE,
	isSpectaclesWearer: false,
	lensesUsage: "NON_USER",
	hasParentalConsent: null,
};

beforeEach(() => {
	mocked(usePoints).mockReturnValue({
		getUserPoints: jest.fn(),
	});
	mocked(usePoints().getUserPoints).mockResolvedValue({
		ladder: "platinum",
		earnedPoints: 5000,
		remainingPointsToPlatinum: 1000,
		dateLimitToPlatinum: "2018-01-01",
		availablePoints: 1220,
		expiringPoints: 100,
		expiringAt: "2018-12-01",
	});

	mocked(useCoupon).mockReturnValue({
		getLifestyleCoupons: jest.fn(),
		checkoutAcuvueCoupons: jest.fn(),
		redeemCoupon: jest.fn(),
		getAcuvueCoupons: jest.fn(),
		checkoutLifestyleCoupons: jest.fn(),
		getUserCoupons: jest.fn(),
	});
	mocked(useCoupon().getLifestyleCoupons).mockResolvedValue([
		{
			type: "lifestyle",
			issuer: "Sizzler2",
			tag: null,
			isPlatinum: true,
			isFeatured: true,
			remainingQuantity: 10,
			id: "7v894576e4n0bn7",
			imageUrl:
				"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/people_foods_cats_can_eat_slideshow/thinkstock_rf_photo_of_cat_sitting_at_table.jpg",
			title: "Welcome Coupon",
			points: 100,
			validPeriod: {
				from: "2021-02-01",
				to: "2021-03-01",
			},
			terms: "",
			absoluteCashDiscount: 0,
		},
	]);

	mocked(useUserProfile).mockReturnValue({
		userProfile: fakeUser,
		profileCompleteness: ProfileCompleteness.COMPLETE,
		wasEmptyBefore: false,
		setEmptyBefore: jest.fn(),
		refreshUserProfile: jest.fn(),
		isLoading: false,
	});
});

describe("Cart", () => {
	it("should render without error", async () => {
		act(() => {
			render(<Cart />);
		});

		cleanup();
	});

	it("should render RewardsPoints with passing down points when the user has profile", async () => {
		act(() => {
			render(<Cart />);
		});

		await waitFor(async () => {
			const rewardsPoints = await screen.findByTestId("rewards-points");
			expect(rewardsPoints).toBeInTheDocument();
		});
	});

	it("should not render RewardsPoints when the user has no profile", async () => {
		mocked(useUserProfile).mockReturnValue({
			userProfile: undefined,
			profileCompleteness: ProfileCompleteness.INCOMPLETE,
			wasEmptyBefore: false,
			setEmptyBefore: jest.fn(),
			refreshUserProfile: jest.fn(),
			isLoading: false,
		});

		act(() => {
			render(<Cart />);
		});

		await waitFor(() => {
			const rewardsPoints = screen.queryByTestId("rewards-points");
			expect(rewardsPoints).not.toBeInTheDocument();
		});
	});

	it("should contain 1 Divider components", async () => {
		act(() => {
			render(<Cart />);
		});

		await waitFor(async () => {
			const divider = await screen.findByTestId("divider");
			expect(divider).toBeInTheDocument();
		});
	});

	it("should render masthead", async () => {
		act(() => {
			render(<Cart />);
		});

		await waitFor(() => {
			const header = screen.getByTestId("header");
			expect(header).toBeInTheDocument();
			expect(header).toHaveTextContent("cart.mastheadTitle");
			const cartButton = screen.getByTestId("cart-button");
			expect(cartButton).toBeInTheDocument();
		});
	});

	it("should render NonEmptyCartView and make sure required props are passed", async () => {
		mocked(usePoints().getUserPoints).mockResolvedValue({
			ladder: "platinum",
			earnedPoints: 5000,
			remainingPointsToPlatinum: 1000,
			dateLimitToPlatinum: "2018-01-01",
			availablePoints: 1220,
			expiringPoints: 100,
			expiringAt: "2018-12-01",
		});

		mocked(useCoupon().getLifestyleCoupons).mockResolvedValue([
			{
				type: "lifestyle",
				issuer: "Sizzler2",
				tag: null,
				isPlatinum: true,
				isFeatured: true,
				remainingQuantity: 10,
				id: "fake-coupon-id",
				imageUrl:
					"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/people_foods_cats_can_eat_slideshow/thinkstock_rf_photo_of_cat_sitting_at_table.jpg",
				title: "Welcome Coupon",
				points: 100,
				validPeriod: {
					from: "2021-02-01",
					to: "2021-03-01",
				},
				terms: "",
				absoluteCashDiscount: 0,
			},
		]);

		act(() => {
			render(<Cart />);
		});

		await waitFor(() => {
			const nonEmptyCartView = screen.getByTestId("non-empty-cart-view");
			expect(nonEmptyCartView).toBeInTheDocument();

			const availablePoints = screen.getByTestId("available-points");
			expect(availablePoints).toBeInTheDocument();

			const couponIds = screen.getAllByTestId("coupon-id");
			expect(couponIds[0]).toHaveTextContent("fake-coupon-id");
		});
	});

	it("should render Empty Cart View", async () => {
		act(() => {
			render(<Cart />);
		});

		await waitFor(() => {
			const emptyCartView = screen.getByTestId("empty-cart-view");
			expect(emptyCartView).toBeInTheDocument();
		});
	});

	it("should render checkout success modal", async () => {
		act(() => {
			render(<Cart />);
		});

		await waitFor(async () => {
			const successModal = await screen.findByTestId(
				"checkout-success-modal"
			);
			expect(successModal).toBeInTheDocument();
		});
	});

	it("should render GlobalNavigationPanel", async () => {
		act(() => {
			render(<Cart />);
		});

		await waitFor(() => {
			const navigationPanel = screen.getByTestId(
				"global-navigation-panel"
			);
			expect(navigationPanel).toBeInTheDocument();
		});
	});
});
