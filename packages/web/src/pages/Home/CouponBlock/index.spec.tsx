import { act, waitFor, within } from "@testing-library/react";
import CouponBlock from "./index";
import { useConfiguration } from "../../../hooks/useConfiguration";
import userEvent from "@testing-library/user-event";
import { renderWithLanguage, screen } from "../../../test-utils";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import {
	Gender,
	IGetProfileResponse,
	GlobalError,
	ProfileCompleteness,
} from "@myacuvue_thailand_web/services";
import { useCoupon } from "../../../hooks/useCoupon";
import { mocked } from "ts-jest/utils";
import { useNavigate } from "react-router-dom-v5-compat";

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("../../../hooks/useCoupon", () => ({
	useCoupon: jest.fn(),
}));

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
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
	(useConfiguration as jest.Mock).mockReturnValue({});

	mocked(useUserProfile).mockReturnValue({
		userProfile: fakeUser,
		profileCompleteness: ProfileCompleteness.INCOMPLETE,
		isLoading: false,
		refreshUserProfile: jest.fn(),
		wasEmptyBefore: false,
		setEmptyBefore: jest.fn(),
	});

	mocked(useCoupon).mockReturnValue({
		redeemCoupon: jest.fn(),
		getUserCoupons: jest.fn(),
		getAcuvueCoupons: jest.fn(),
		getLifestyleCoupons: jest.fn(),
		checkoutAcuvueCoupons: jest.fn(),
		checkoutLifestyleCoupons: jest.fn(),
	});

	mocked(useNavigate).mockReturnValue(jest.fn());
});

describe("CouponBlock", () => {
	it("should display coupon block title", async () => {
		act(() => {
			renderWithLanguage(<CouponBlock />);
		});

		await waitFor(() => {
			const title = screen.getByText("Get more rewards!");
			expect(title).toBeVisible();
		});
	});

	it("should display coupon block sub title", async () => {
		act(() => {
			renderWithLanguage(<CouponBlock />);
		});

		await waitFor(() => {
			const subTitle = screen.getByText(
				"Enter your discount code here to collect a discount coupon in My Coupon Wallet​"
			);
			expect(subTitle).toBeVisible();
		});
	});

	it("should render apply button", async () => {
		act(() => {
			renderWithLanguage(<CouponBlock />);
		});

		await waitFor(() => {
			const applyButton = screen.getByRole("button");
			expect(applyButton).toBeInTheDocument();
			expect(applyButton).toHaveTextContent("APPLY");
		});
	});

	it("should open guest dialogue when profileCompleteness is incomplete, and navigate to /registration when Register button is clicked", async () => {
		act(() => {
			renderWithLanguage(<CouponBlock />);
		});

		act(() => {
			const discountInput = screen.getByRole("textbox");
			userEvent.click(discountInput);
			userEvent.keyboard("fakeDiscountCode");

			const applyButton = screen.getByRole("button");
			applyButton.click();
		});

		await waitFor(() => {
			const guestDialog = screen.getByRole("dialog");
			expect(guestDialog).toBeVisible();

			const dialogTitle = within(guestDialog).getByRole("heading", {
				name: "Oops! ...",
			});
			expect(dialogTitle).toBeVisible();

			const dialogMessage = within(guestDialog).getByText(
				"To enjoy coupon code offers, kindly register as a MyACUVUE™ member. You'll receive a Welcome Coupon upon registration."
			);
			expect(dialogMessage).toBeVisible();
		});

		act(() => {
			const registerButton = screen.getByRole("button", {
				name: "Register",
			});
			registerButton.click();
		});

		await waitFor(() => {
			expect(useNavigate()).toHaveBeenCalledWith("/registration");
		});
	});

	it("should open success dialogue when profileCompleteness is complete", async () => {
		const mockRedeemCoupon = jest.fn();

		mocked(useUserProfile).mockReturnValue({
			userProfile: fakeUser,
			profileCompleteness: ProfileCompleteness.COMPLETE,
			isLoading: false,
			refreshUserProfile: jest.fn(),
			wasEmptyBefore: false,
			setEmptyBefore: jest.fn(),
		});

		mocked(useCoupon).mockReturnValue({
			redeemCoupon: mockRedeemCoupon,
			getUserCoupons: jest.fn(),
			getAcuvueCoupons: jest.fn(),
			getLifestyleCoupons: jest.fn(),
			checkoutAcuvueCoupons: jest.fn(),
			checkoutLifestyleCoupons: jest.fn(),
		});

		act(() => {
			renderWithLanguage(<CouponBlock />);
		});

		act(() => {
			const discountInput = screen.getByRole("textbox");
			userEvent.click(discountInput);
			userEvent.keyboard("fakeDiscountCode");

			const applyButton = screen.getByRole("button");
			applyButton.click();
		});

		await waitFor(() => {
			const successDialog = screen.getByRole("dialog");
			expect(successDialog).toBeVisible();

			const dialogTitle = within(successDialog).getByRole("heading", {
				name: "Rewards Added",
			});
			expect(dialogTitle).toBeVisible();

			const dialogMessage = within(successDialog).getByText(
				"You may view and redeem your reward from your rewards wallet."
			);
			expect(dialogMessage).toBeVisible();
			expect(mockRedeemCoupon).toHaveBeenCalled();
		});
	});

	it("should open error dialogue when redeemCoupon returns error", async () => {
		mocked(useUserProfile).mockReturnValue({
			userProfile: fakeUser,
			profileCompleteness: ProfileCompleteness.COMPLETE,
			isLoading: false,
			refreshUserProfile: jest.fn(),
			wasEmptyBefore: false,
			setEmptyBefore: jest.fn(),
		});

		mocked(useCoupon).mockReturnValue({
			redeemCoupon: jest.fn().mockRejectedValue(
				new GlobalError({
					"error.insufficientPoints": {},
				})
			),
			getUserCoupons: jest.fn(),
			getAcuvueCoupons: jest.fn(),
			getLifestyleCoupons: jest.fn(),
			checkoutAcuvueCoupons: jest.fn(),
			checkoutLifestyleCoupons: jest.fn(),
		});

		act(() => {
			renderWithLanguage(<CouponBlock />);
		});

		act(() => {
			const discountInput = screen.getByRole("textbox");
			userEvent.click(discountInput);
			userEvent.keyboard("fakeDiscountCode");

			const applyButton = screen.getByRole("button");
			applyButton.click();
		});

		await waitFor(() => {
			const errorDialog = screen.getByRole("dialog");
			expect(errorDialog).toBeVisible();

			const dialogTitle = within(errorDialog).getByRole("heading", {
				name: "Oops! ...",
			});
			expect(dialogTitle).toBeVisible();

			const okButton = within(errorDialog).getAllByRole("button")[1];
			expect(okButton).toBeVisible();
			expect(okButton).toHaveTextContent("OK");
		});
	});
});
