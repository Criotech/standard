import { act, waitFor } from "@testing-library/react";
import CartLifestyleCard from "./index";
import { useConfiguration } from "../../hooks/useConfiguration";
import { renderWithLanguage, screen } from "../../test-utils";
import {
	Gender,
	IGetProfileResponse,
	ILifestyleCoupon,
	ProfileCompleteness,
} from "@myacuvue_thailand_web/services";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { useCoupon } from "../../hooks/useCoupon";
import { useNavigate } from "react-router-dom-v5-compat";
import { LifestyleCartProvider } from "../../contexts/LifestyleCartContext";
import { FC } from "react";
import { useLifestyleCartContext } from "../../hooks/useLifestyleCartContext";
import { useEffectOnce } from "react-use";
import { mocked } from "ts-jest/utils";

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("../../hooks/useCoupon");

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

describe("CartLifestyleCard", () => {
	it("should render coupon image, title, points", async () => {
		const fakeCoupon: ILifestyleCoupon = {
			type: "lifestyle",
			issuer: "Sizzler",
			tag: "new",
			isPlatinum: true,
			isFeatured: true,
			remainingQuantity: 10,
			id: "7v894576e4n0bn7",
			imageUrl: "image-url",
			title: "Lifestyle Reward",
			points: 100,
			validPeriod: {
				from: "2021-02-01",
				to: "2021-03-01",
			},
			terms: "",
			absoluteCashDiscount: 10,
		};

		renderWithLanguage(<CartLifestyleCard coupon={fakeCoupon} />);
		await waitFor(() => {
			const couponImage = screen.getAllByRole("img")[0];
			expect(couponImage).toHaveAttribute("src", fakeCoupon.imageUrl);

			const couponTitle = screen.getByText(fakeCoupon.title);
			expect(couponTitle).toBeVisible();

			const points = screen.getByText(fakeCoupon.points);
			expect(points).toBeVisible();
		});
	});

	it("should render platinum and tag if available", async () => {
		const fakeCoupon: ILifestyleCoupon = {
			type: "lifestyle",
			issuer: "Sizzler",
			tag: "new",
			isPlatinum: true,
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
			absoluteCashDiscount: 10,
		};
		renderWithLanguage(<CartLifestyleCard coupon={fakeCoupon} />);
		await waitFor(() => {
			const platinum = screen.getByText("PLATINUM");
			expect(platinum).toBeVisible();

			const newTag = screen.getByText("NEW");
			expect(newTag).toBeVisible();
		});
	});

	it("should call incremental on clicking plus icon", async () => {
		const fakeCoupon: ILifestyleCoupon = {
			type: "lifestyle",
			issuer: "Sizzler",
			tag: "new",
			isPlatinum: true,
			isFeatured: true,
			remainingQuantity: 10,
			id: "some-random-id-1",
			imageUrl: "image-url",
			title: "Lifestyle Reward",
			points: 0,
			validPeriod: {
				from: "2021-02-01",
				to: "2021-03-01",
			},
			terms: "",
			absoluteCashDiscount: 10,
		};

		const ComponentThatSeedCartCoupons: FC = () => {
			const { incrementOnCart, clearCart } = useLifestyleCartContext();

			useEffectOnce(() => {
				clearCart();
				incrementOnCart("some-random-id-1");
			});

			return <></>;
		};

		const { container } = renderWithLanguage(
			<LifestyleCartProvider>
				<ComponentThatSeedCartCoupons />
				<CartLifestyleCard coupon={fakeCoupon} />
			</LifestyleCartProvider>
		);

		act(() => {
			const buttons = screen.queryAllByRole("button");

			const plusButton = buttons.find((button) =>
				button.className.includes("plus-button")
			);

			expect(plusButton).toBeDefined();

			plusButton!.click();
		});

		await waitFor(() => {
			expect(
				container.querySelector(".quantity-value")
			).toHaveTextContent("2");
		});

		act(() => {
			const buttons = screen.queryAllByRole("button");

			const minusButton = buttons.find((button) =>
				button.className.includes("minus-button")
			);

			expect(minusButton).toBeDefined();

			minusButton!.click();
		});

		await waitFor(() => {
			expect(
				container.querySelector(".quantity-value")
			).toHaveTextContent("1");
		});

		act(() => {
			const buttons = screen.queryAllByRole("button");

			const trashButton = buttons.find((button) =>
				button.className.includes("trash-button")
			);

			expect(trashButton).toBeDefined();

			trashButton!.click();
		});

		await waitFor(() => {
			expect(
				container.querySelector(".quantity-value")
			).toHaveTextContent("");
		});
	});
});
