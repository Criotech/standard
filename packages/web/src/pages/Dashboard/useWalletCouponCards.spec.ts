import { useWalletCouponCards } from "./useWalletCouponCards";
import { WalletCoupon } from "@myacuvue_thailand_web/services";
import { renderHook } from "@testing-library/react-hooks";

describe("useWalletCouponCards", () => {
	it("should be [] if userCoupons is []", async () => {
		const userCoupons: WalletCoupon[] | undefined = [];
		const { result } = renderHook(() => useWalletCouponCards(userCoupons));

		expect(result.current).toStrictEqual([]);
	});

	it("should be [] if userCoupons is undefined", async () => {
		const userCoupons: WalletCoupon[] | undefined = undefined;
		const { result } = renderHook(() => useWalletCouponCards(userCoupons));

		expect(result.current).toStrictEqual([]);
	});

	it("should have cards only related to the user coupons that are active", async () => {
		const userCoupons: WalletCoupon[] | undefined = [
			{
				status: "active",
				type: "acuvue",
				points: 0,
				bonusMultiplier: null,
				imageUrl: "img url 1",
				title: "title 1",
				id: "id 1",
				isEligibleForHomeDelivery: false,
				isEligibleForInStore: false,
				subType: "other",
				terms: "terms 1",
				validPeriod: {
					from: "2022-07-05",
					to: "2022-08-05",
				},
				absoluteCashDiscount: 0,
			},
			{
				status: "redeemed",
				type: "acuvue",
				points: 0,
				bonusMultiplier: null,
				imageUrl: "img url 2",
				title: "title 2",
				id: "id 2",
				isEligibleForHomeDelivery: false,
				isEligibleForInStore: false,
				redemptionDate: "2022-08-01",
				subType: "other",
				redemptionStoreName: "store name 2",
				terms: "terms 2",
				validPeriod: {
					from: "2022-07-05",
					to: "2022-08-05",
				},
				absoluteCashDiscount: 0,
			},
			{
				status: "expired",
				type: "acuvue",
				points: 0,
				bonusMultiplier: null,
				imageUrl: "img url 3",
				title: "title 3",
				id: "id 3",
				isEligibleForHomeDelivery: false,
				isEligibleForInStore: false,
				subType: "other",
				terms: "terms 3",
				validPeriod: {
					from: "2022-05-28",
					to: "2022-06-28",
				},
				expirationDate: "2022-06-29",
				absoluteCashDiscount: 0,
			},
		];
		const { result } = renderHook(() => useWalletCouponCards(userCoupons));

		expect(result.current).toStrictEqual([
			{
				imageUrl: "img url 1",
				title: "title 1",
			},
		]);
	});
});
