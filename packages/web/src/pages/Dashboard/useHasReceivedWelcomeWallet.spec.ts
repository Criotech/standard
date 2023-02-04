import { useHasReceivedWelcomeWallet } from "./useHasReceivedWelcomeWallet";
import { WalletCoupon } from "@myacuvue_thailand_web/services";
import { renderHook } from "@testing-library/react-hooks";

describe("useHasReceivedWelcomeWallet", () => {
	it("should be false when userCoupons is []", async () => {
		const userCoupons: WalletCoupon[] | undefined = [];
		const { result } = renderHook(() =>
			useHasReceivedWelcomeWallet(userCoupons)
		);

		expect(result.current).toStrictEqual(false);
	});

	it("should be false when userCoupons is undefined", async () => {
		const userCoupons: WalletCoupon[] | undefined = undefined;
		const { result } = renderHook(() =>
			useHasReceivedWelcomeWallet(userCoupons)
		);

		expect(result.current).toStrictEqual(false);
	});

	it("should be false when there is no userCoupons with subtype welcome", async () => {
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
		];
		const { result } = renderHook(() =>
			useHasReceivedWelcomeWallet(userCoupons)
		);

		expect(result.current).toStrictEqual(false);
	});

	it("should be true when there is at least one userCoupon with subtype welcome", async () => {
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
				subType: "welcome",
				terms: "terms 1",
				validPeriod: {
					from: "2022-07-05",
					to: "2022-08-05",
				},
				absoluteCashDiscount: 0,
			},
		];
		const { result } = renderHook(() =>
			useHasReceivedWelcomeWallet(userCoupons)
		);

		expect(result.current).toStrictEqual(true);
	});
});
