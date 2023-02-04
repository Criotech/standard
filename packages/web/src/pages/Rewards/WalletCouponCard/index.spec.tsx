import { render, screen } from "@testing-library/react";
import WalletCouponCard from ".";
import { WalletCoupon } from "@myacuvue_thailand_web/services";
import { ComponentProps } from "react";
import Text from "../../../components/Text";
import HorizontalCoupon from "../../../components/HorizontalCoupon";

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../components/HorizontalCoupon", () => ({
	__esModule: true,
	default: ({ title }: ComponentProps<typeof HorizontalCoupon>) => (
		<div data-testid="horizontal-coupon">{title}</div>
	),
}));

const coupon: WalletCoupon = {
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

describe("WalletCouponCard", () => {
	it("should render without errors", () => {
		render(<WalletCouponCard coupon={coupon} />);
	});

	it("should render horizontal coupon with title", () => {
		render(<WalletCouponCard coupon={coupon} />);

		const horizontalCoupon = screen.getByTestId("horizontal-coupon");
		expect(horizontalCoupon).toBeInTheDocument();

		const couponTitle = screen.getByText(coupon.title);
		expect(couponTitle).toBeInTheDocument();
	});

	it("should render redeemed status, redeemed store and not render expired status", () => {
		const coupon: WalletCoupon = {
			id: "some-random-string",
			status: "redeemed",
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
			redemptionDate: "2021-10-10",
			redemptionStoreName: "some-store-name",
			absoluteCashDiscount: 10,
		};

		render(<WalletCouponCard coupon={coupon} />);

		const redeemedCoupon = screen.queryByText(
			/rewardsPage.walletCouponCard.redeemedOn/
		);
		expect(redeemedCoupon).toBeInTheDocument();

		const redemptionDate = screen.queryByText(/some-store-name/);
		expect(redemptionDate).toBeInTheDocument();
		const expiredCoupon = screen.queryByText(
			/rewardsPage.walletCouponCard.expiredOn/
		);
		expect(expiredCoupon).not.toBeInTheDocument();
	});

	it("should render expired status and not render redeemed status", () => {
		const coupon: WalletCoupon = {
			id: "some-random-string",
			status: "expired",
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
			expirationDate: "2021-06-05",
			absoluteCashDiscount: 10,
		};

		render(<WalletCouponCard coupon={coupon} />);

		const expiredCoupon = screen.queryByText(
			/rewardsPage.walletCouponCard.expiredOn/
		);
		expect(expiredCoupon).toBeInTheDocument();

		const redeemedCoupon = screen.queryByText(
			/rewardsPage.walletCouponCard.redeemedOn/
		);
		expect(redeemedCoupon).not.toBeInTheDocument();
	});
});
