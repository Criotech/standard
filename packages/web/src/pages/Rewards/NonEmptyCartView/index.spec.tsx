import { act, waitFor, within } from "@testing-library/react";
import NonEmptyCartView from "./index";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { renderWithLanguage, screen } from "../../../test-utils";
import {
	Gender,
	IGetProfileResponse,
	GlobalError,
	ILifestyleCoupon,
	IPoints,
	ProfileCompleteness,
} from "@myacuvue_thailand_web/services";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import { useCoupon } from "../../../hooks/useCoupon";
import { useNavigate } from "react-router-dom-v5-compat";
import { LifestyleCartProvider } from "../../../contexts/LifestyleCartContext";
import { FC } from "react";
import { useLifestyleCartContext } from "../../../hooks/useLifestyleCartContext";
import { useEffectOnce } from "react-use";
import { mocked } from "ts-jest/utils";

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("../../../hooks/useCoupon");

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
}));

const fakePoints: IPoints = {
	ladder: "platinum",
	earnedPoints: 5000,
	remainingPointsToPlatinum: 1000,
	dateLimitToPlatinum: "2018-01-01",
	availablePoints: 1220,
	expiringPoints: 100,
	expiringAt: "2018-12-01",
};

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
	(useConfiguration as jest.Mock).mockReturnValue({});

	mocked(useNavigate).mockReturnValue(jest.fn());

	mocked(useCoupon).mockReturnValue({
		checkoutLifestyleCoupons: jest.fn(),
		redeemCoupon: jest.fn(),
		getUserCoupons: jest.fn(),
		getAcuvueCoupons: jest.fn(),
		getLifestyleCoupons: jest.fn(),
		checkoutAcuvueCoupons: jest.fn(),
	});

	mocked(useUserProfile).mockReturnValue({
		userProfile: fakeUser,
		profileCompleteness: ProfileCompleteness.COMPLETE,
		isLoading: false,
		setEmptyBefore: jest.fn(),
		wasEmptyBefore: false,
		refreshUserProfile: jest.fn(),
	});
});

describe("NonEmptyCartView", () => {
	it("should render CartLifestyleCard with correct content", async () => {
		const fakeCoupons: ILifestyleCoupon[] = [
			{
				type: "lifestyle",
				issuer: "Sizzler1",
				tag: null,
				isPlatinum: true,
				isFeatured: true,
				remainingQuantity: 10,
				id: "some-random-id-1",
				imageUrl:
					"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/people_foods_cats_can_eat_slideshow/thinkstock_rf_photo_of_cat_sitting_at_table.jpg",
				title: "Coupon Title 1",
				points: 100,
				validPeriod: {
					from: "2021-02-01",
					to: "2021-03-01",
				},
				terms: "",
				absoluteCashDiscount: 10,
			},
			{
				type: "lifestyle",
				issuer: "Sizzler2",
				tag: "new",
				isPlatinum: false,
				isFeatured: false,
				remainingQuantity: 10,
				id: "some-random-id-2",
				imageUrl:
					"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/people_foods_cats_can_eat_slideshow/thinkstock_rf_photo_of_cat_sitting_at_table.jpg",
				title: "Coupon Title 2",
				points: 200,
				validPeriod: {
					from: "2021-02-11",
					to: "2021-03-21",
				},
				terms: "",
				absoluteCashDiscount: 10,
			},
		];

		const ComponentThatSeedCartCoupons: FC = () => {
			const { incrementOnCart, clearCart } = useLifestyleCartContext();

			useEffectOnce(() => {
				clearCart();
				incrementOnCart("some-random-id-1");
				incrementOnCart("some-random-id-2");
			});

			return <></>;
		};

		const { container } = renderWithLanguage(
			<LifestyleCartProvider>
				<ComponentThatSeedCartCoupons />
				<NonEmptyCartView
					quantityInCart={5}
					coupons={fakeCoupons}
					points={fakePoints}
					refreshCoupons={() => jest.fn()}
				/>
			</LifestyleCartProvider>
		);
		await waitFor(() => {
			const cartLifestyleCard = container.querySelectorAll(
				".cart-lifestyle-card"
			);
			expect(cartLifestyleCard).toHaveLength(2);

			const coupon1TagLabel = screen.getByText("PLATINUM");
			expect(coupon1TagLabel).toBeVisible();

			const coupon1Title = screen.getByText("Coupon Title 1");
			expect(coupon1Title).toBeVisible();

			const coupon1Issuer = screen.getByText("Sizzler1");
			expect(coupon1Issuer).toBeVisible();

			const coupon1Points = screen.getByText(100);
			expect(coupon1Points).toBeVisible();

			const coupon2TagLabel = screen.getByText("NEW");
			expect(coupon2TagLabel).toBeVisible();

			const coupon2Title = screen.getByText("Coupon Title 2");
			expect(coupon2Title).toBeVisible();

			const coupon2Issuer = screen.getByText("Sizzler2");
			expect(coupon2Issuer).toBeVisible();

			const coupon2Points = screen.getByText(200);
			expect(coupon2Points).toBeVisible();
		});
	});

	it("should render button and fire onClick handlers when clicked", async () => {
		renderWithLanguage(
			<LifestyleCartProvider>
				<NonEmptyCartView
					quantityInCart={5}
					coupons={[]}
					points={fakePoints}
					refreshCoupons={() => jest.fn()}
				/>
			</LifestyleCartProvider>
		);
		const button = await screen.findByText("CONTINUE BROWSING");
		act(() => {
			button.click();
		});
		await waitFor(() => {
			expect(useNavigate()).toHaveBeenCalled();
		});
	});

	it("should register checkoutLifestyleCoupons after clicking checkout button", async () => {
		const fakeCoupons: ILifestyleCoupon[] = [
			{
				type: "lifestyle",
				issuer: "Sizzler1",
				tag: null,
				isPlatinum: true,
				isFeatured: true,
				remainingQuantity: 10,
				id: "some-random-id-1",
				imageUrl:
					"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/people_foods_cats_can_eat_slideshow/thinkstock_rf_photo_of_cat_sitting_at_table.jpg",
				title: "Coupon Title 1",
				points: 100,
				validPeriod: {
					from: "2021-02-01",
					to: "2021-03-01",
				},
				terms: "",
				absoluteCashDiscount: 10,
			},
			{
				type: "lifestyle",
				issuer: "Sizzler2",
				tag: "new",
				isPlatinum: false,
				isFeatured: false,
				remainingQuantity: 10,
				id: "some-random-id-2",
				imageUrl:
					"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/people_foods_cats_can_eat_slideshow/thinkstock_rf_photo_of_cat_sitting_at_table.jpg",
				title: "Coupon Title 2",
				points: 200,
				validPeriod: {
					from: "2021-02-11",
					to: "2021-03-21",
				},
				terms: "",
				absoluteCashDiscount: 10,
			},
		];
		const ComponentThatSeedCartCoupons: FC = () => {
			const { incrementOnCart, clearCart } = useLifestyleCartContext();

			useEffectOnce(() => {
				clearCart();
				incrementOnCart("some-random-id-1");
				incrementOnCart("some-random-id-2");
			});

			return <></>;
		};

		renderWithLanguage(
			<LifestyleCartProvider>
				<ComponentThatSeedCartCoupons />
				<NonEmptyCartView
					quantityInCart={5}
					coupons={fakeCoupons}
					points={fakePoints}
					refreshCoupons={() => jest.fn()}
				/>
			</LifestyleCartProvider>
		);
		const checkout = await screen.findByText("CHECK OUT");
		act(() => {
			checkout.click();
		});

		await waitFor(() => {
			const { checkoutLifestyleCoupons } = useCoupon();

			expect(checkoutLifestyleCoupons).toHaveBeenCalledWith({
				"some-random-id-1": 1,
				"some-random-id-2": 1,
			});
		});
	});

	it("should render the modal when the CHECK OUT button is clicked when the user is guest", async () => {
		const fakeCoupons: ILifestyleCoupon[] = [
			{
				type: "lifestyle",
				issuer: "Sizzler1",
				tag: null,
				isPlatinum: true,
				isFeatured: true,
				remainingQuantity: 10,
				id: "some-random-id-1",
				imageUrl:
					"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/people_foods_cats_can_eat_slideshow/thinkstock_rf_photo_of_cat_sitting_at_table.jpg",
				title: "Coupon Title 1",
				points: 100,
				validPeriod: {
					from: "2021-02-01",
					to: "2021-03-01",
				},
				terms: "",
				absoluteCashDiscount: 10,
			},
			{
				type: "lifestyle",
				issuer: "Sizzler2",
				tag: "new",
				isPlatinum: false,
				isFeatured: false,
				remainingQuantity: 10,
				id: "some-random-id-2",
				imageUrl:
					"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/people_foods_cats_can_eat_slideshow/thinkstock_rf_photo_of_cat_sitting_at_table.jpg",
				title: "Coupon Title 2",
				points: 200,
				validPeriod: {
					from: "2021-02-11",
					to: "2021-03-21",
				},
				terms: "",
				absoluteCashDiscount: 10,
			},
		];

		(useUserProfile as jest.Mock).mockReturnValue({
			userProfile: undefined,
			profileCompleteness: ProfileCompleteness.INCOMPLETE,
		});

		const ComponentThatSeedCartCoupons: FC = () => {
			const { incrementOnCart, clearCart } = useLifestyleCartContext();

			useEffectOnce(() => {
				clearCart();
				incrementOnCart("some-random-id-1");
				incrementOnCart("some-random-id-2");
			});

			return <></>;
		};

		renderWithLanguage(
			<LifestyleCartProvider>
				<ComponentThatSeedCartCoupons />
				<NonEmptyCartView
					quantityInCart={5}
					coupons={fakeCoupons}
					points={fakePoints}
					refreshCoupons={() => jest.fn()}
				/>
			</LifestyleCartProvider>
		);
		const checkout = await screen.findByText("CHECK OUT");
		act(() => {
			checkout.click();
		});

		await waitFor(() => {
			const guestDialog = screen.getByRole("dialog");
			expect(guestDialog).toBeVisible();

			const dialogTitle = within(guestDialog).getByRole("heading", {
				name: "Oops! ...",
			});
			expect(dialogTitle).toBeVisible();

			const dialogMessage = within(guestDialog).getByText(
				"To enjoy coupon code offers, kindly register as a MyACUVUE™ Member. You’ll receive a Welcome coupon upon registration."
			);
			expect(dialogMessage).toBeVisible();

			const registerButton = within(guestDialog).getByRole("button", {
				name: "REGISTER",
			});
			expect(registerButton).toBeVisible();

			const cancelButton = within(guestDialog).getByRole("button", {
				name: "CANCEL",
			});
			expect(cancelButton).toBeVisible();
		});
	});

	it("should render AcuvueCouponErrorModal when there is error in checkoutAcuvueCoupons API call", async () => {
		const fakeCoupons: ILifestyleCoupon[] = [
			{
				type: "lifestyle",
				issuer: "Sizzler1",
				tag: null,
				isPlatinum: true,
				isFeatured: true,
				remainingQuantity: 10,
				id: "some-random-id-1",
				imageUrl:
					"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/people_foods_cats_can_eat_slideshow/thinkstock_rf_photo_of_cat_sitting_at_table.jpg",
				title: "Coupon Title 1",
				points: 100,
				validPeriod: {
					from: "2021-02-01",
					to: "2021-03-01",
				},
				terms: "",
				absoluteCashDiscount: 10,
			},
			{
				type: "lifestyle",
				issuer: "Sizzler2",
				tag: "new",
				isPlatinum: false,
				isFeatured: false,
				remainingQuantity: 10,
				id: "some-random-id-2",
				imageUrl:
					"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/people_foods_cats_can_eat_slideshow/thinkstock_rf_photo_of_cat_sitting_at_table.jpg",
				title: "Coupon Title 2",
				points: 200,
				validPeriod: {
					from: "2021-02-11",
					to: "2021-03-21",
				},
				terms: "",
				absoluteCashDiscount: 10,
			},
		];

		(useCoupon as jest.Mock).mockReturnValue({
			checkoutLifestyleCoupons: jest.fn().mockRejectedValue(
				new GlobalError({
					"error.insufficientPoints": {},
				})
			),
		});

		const ComponentThatSeedCartCoupons: FC = () => {
			const { incrementOnCart, clearCart } = useLifestyleCartContext();

			useEffectOnce(() => {
				clearCart();
				incrementOnCart("some-random-id-1");
				incrementOnCart("some-random-id-2");
			});

			return <></>;
		};

		renderWithLanguage(
			<LifestyleCartProvider>
				<ComponentThatSeedCartCoupons />
				<NonEmptyCartView
					quantityInCart={5}
					coupons={fakeCoupons}
					points={fakePoints}
					refreshCoupons={() => jest.fn()}
				/>
			</LifestyleCartProvider>
		);

		const checkout = await screen.findByText("CHECK OUT");
		act(() => {
			checkout.click();
		});

		await waitFor(() => {
			const errorDialog = screen.getByRole("dialog");
			expect(errorDialog).toBeVisible();

			const dialogTitle = within(errorDialog).getByRole("heading", {
				name: "Oops! ...",
			});
			expect(dialogTitle).toBeVisible();

			const errorMessage = screen.getByText(
				"It seems like you have insufficient points to redeem this reward"
			);
			expect(errorMessage).toBeVisible();

			const okButton = within(errorDialog).getByRole("button", {
				name: "OK",
			});
			expect(okButton).toBeVisible();
		});
	});

	it("should render AcuvueCouponErrorModal when cart[cartCouponId] > remainingQuantity", async () => {
		const fakeCoupons: ILifestyleCoupon[] = [
			{
				type: "lifestyle",
				issuer: "Sizzler1",
				tag: null,
				isPlatinum: true,
				isFeatured: true,
				remainingQuantity: 0,
				id: "some-random-id-1",
				imageUrl:
					"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/people_foods_cats_can_eat_slideshow/thinkstock_rf_photo_of_cat_sitting_at_table.jpg",
				title: "Coupon Title 1",
				points: 100,
				validPeriod: {
					from: "2021-02-01",
					to: "2021-03-01",
				},
				terms: "",
				absoluteCashDiscount: 10,
			},
			{
				type: "lifestyle",
				issuer: "Sizzler2",
				tag: "new",
				isPlatinum: false,
				isFeatured: false,
				remainingQuantity: 0,
				id: "some-random-id-2",
				imageUrl:
					"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/people_foods_cats_can_eat_slideshow/thinkstock_rf_photo_of_cat_sitting_at_table.jpg",
				title: "Coupon Title 2",
				points: 200,
				validPeriod: {
					from: "2021-02-11",
					to: "2021-03-21",
				},
				terms: "",
				absoluteCashDiscount: 10,
			},
		];

		(useCoupon as jest.Mock).mockReturnValue({
			checkoutLifestyleCoupons: jest.fn().mockRejectedValue(
				new GlobalError({
					"error.insufficientPoints": {},
				})
			),
		});

		const ComponentThatSeedCartCoupons: FC = () => {
			const { incrementOnCart, clearCart } = useLifestyleCartContext();

			useEffectOnce(() => {
				clearCart();
				incrementOnCart("some-random-id-1");
				incrementOnCart("some-random-id-2");
			});

			return <></>;
		};

		renderWithLanguage(
			<LifestyleCartProvider>
				<ComponentThatSeedCartCoupons />
				<NonEmptyCartView
					quantityInCart={5}
					coupons={fakeCoupons}
					points={fakePoints}
					refreshCoupons={() => jest.fn()}
				/>
			</LifestyleCartProvider>
		);

		const checkout = await screen.findByText("CHECK OUT");
		act(() => {
			checkout.click();
		});

		await waitFor(() => {
			const errorDialog = screen.getByRole("dialog");
			expect(errorDialog).toBeVisible();

			const dialogTitle = within(errorDialog).getByRole("heading", {
				name: "Oops! ...",
			});
			expect(dialogTitle).toBeVisible();

			const errorMessage = screen.getByText(
				"The reward selected exceeds the remaining quota. Kindly update your cart"
			);
			expect(errorMessage).toBeVisible();

			const okButton = within(errorDialog).getByRole("button", {
				name: "OK",
			});
			expect(okButton).toBeVisible();
		});
	});

	it("should render AcuvueCouponErrorModal when balanceAfterRedemption <= 0", async () => {
		const fakeCoupons: ILifestyleCoupon[] = [
			{
				type: "lifestyle",
				issuer: "Sizzler1",
				tag: null,
				isPlatinum: true,
				isFeatured: true,
				remainingQuantity: 10,
				id: "some-random-id-1",
				imageUrl:
					"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/people_foods_cats_can_eat_slideshow/thinkstock_rf_photo_of_cat_sitting_at_table.jpg",
				title: "Coupon Title 1",
				points: 100,
				validPeriod: {
					from: "2021-02-01",
					to: "2021-03-01",
				},
				terms: "",
				absoluteCashDiscount: 10,
			},
			{
				type: "lifestyle",
				issuer: "Sizzler2",
				tag: "new",
				isPlatinum: false,
				isFeatured: false,
				remainingQuantity: 20,
				id: "some-random-id-2",
				imageUrl:
					"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/people_foods_cats_can_eat_slideshow/thinkstock_rf_photo_of_cat_sitting_at_table.jpg",
				title: "Coupon Title 2",
				points: 200,
				validPeriod: {
					from: "2021-02-11",
					to: "2021-03-21",
				},
				terms: "",
				absoluteCashDiscount: 10,
			},
		];

		const fakePoints: IPoints = {
			ladder: "platinum",
			earnedPoints: 5000,
			remainingPointsToPlatinum: 1000,
			dateLimitToPlatinum: "2018-01-01",
			availablePoints: 0,
			expiringPoints: 100,
			expiringAt: "2018-12-01",
		};

		(useCoupon as jest.Mock).mockReturnValue({
			checkoutLifestyleCoupons: jest.fn().mockRejectedValue(
				new GlobalError({
					"error.insufficientPoints": {},
				})
			),
		});

		const ComponentThatSeedCartCoupons: FC = () => {
			const { incrementOnCart, clearCart } = useLifestyleCartContext();

			useEffectOnce(() => {
				clearCart();
				incrementOnCart("some-random-id-1");
				incrementOnCart("some-random-id-2");
			});

			return <></>;
		};

		renderWithLanguage(
			<LifestyleCartProvider>
				<ComponentThatSeedCartCoupons />
				<NonEmptyCartView
					quantityInCart={5}
					coupons={fakeCoupons}
					points={fakePoints}
					refreshCoupons={() => jest.fn()}
				/>
			</LifestyleCartProvider>
		);

		const checkout = await screen.findByText("CHECK OUT");
		act(() => {
			checkout.click();
		});

		await waitFor(() => {
			const errorDialog = screen.getByRole("dialog");
			expect(errorDialog).toBeVisible();

			const dialogTitle = within(errorDialog).getByRole("heading", {
				name: "Oops! ...",
			});
			expect(dialogTitle).toBeVisible();

			const errorMessage = screen.getByText(
				"It seems like you have insufficient points to redeem this reward"
			);
			expect(errorMessage).toBeVisible();

			const okButton = within(errorDialog).getByRole("button", {
				name: "OK",
			});
			expect(okButton).toBeVisible();
		});
	});
});
