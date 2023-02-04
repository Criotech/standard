import WalletCouponList from ".";
import { act, render, waitFor } from "@testing-library/react";
import { useCoupon } from "../../../../hooks/useCoupon";
import { WalletCoupon } from "@myacuvue_thailand_web/services";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom-v5-compat";
import { ComponentProps } from "react";
import { mocked } from "ts-jest/utils";

const fakeWalletCoupons: WalletCoupon[] = [
	{
		id: "some-random-string-1",
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
	},
	{
		id: "some-random-string-2",
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
	},
	{
		id: "some-random-string-3",
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
	},
];

jest.mock("../../../../hooks/useCoupon");

jest.mock("./../../WalletCouponCard", () => ({
	__esModule: true,
	default: () => <div data-testid="wallet-coupon-card" />,
}));

jest.mock("react-router-dom", () => ({
	Link: ({ children, to }: ComponentProps<typeof Link>) => (
		<>
			<div data-testid="link">{children}</div>
			<div data-testid="link-to-pathname">{(to as any).pathname}</div>
		</>
	),
}));

jest.mock("react-router-dom-v5-compat", () => ({
	useLocation: jest.fn(),
}));

beforeEach(() => {
	mocked(useLocation).mockReturnValue({
		pathname: "",
		key: "",
		state: undefined,
		hash: "",
		search: "",
	});

	mocked(useCoupon).mockReturnValue({
		getUserCoupons: jest.fn().mockResolvedValue(fakeWalletCoupons),
		getAcuvueCoupons: jest.fn(),
		checkoutAcuvueCoupons: jest.fn(),
		checkoutLifestyleCoupons: jest.fn(),
		getLifestyleCoupons: jest.fn(),
		redeemCoupon: jest.fn(),
	});
});

describe("WalletCouponList", () => {
	it("should call getUserCoupons", async () => {
		await act(async () => {
			render(<WalletCouponList />);
		});

		const { getUserCoupons } = useCoupon();
		await waitFor(() => {
			expect(getUserCoupons).toHaveBeenCalled();
		});
	});
});
