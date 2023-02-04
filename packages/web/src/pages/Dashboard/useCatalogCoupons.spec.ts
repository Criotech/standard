import { renderHook } from "@testing-library/react-hooks";
import { useCatalogCoupons } from "./useCatalogCoupons";
import {
	IAcuvueCoupon,
	ILifestyleCoupon,
} from "@myacuvue_thailand_web/services";

describe("catalogCoupons", () => {
	it("should be [] if acuvueCoupons is [] and lifestyleCoupons is []", async () => {
		const acuvueCoupons: IAcuvueCoupon[] = [];
		const lifestyleCoupons: ILifestyleCoupon[] = [];

		const { result } = renderHook(() =>
			useCatalogCoupons(acuvueCoupons, lifestyleCoupons)
		);

		expect(result.current.catalogCoupons).toStrictEqual([]);
	});

	it("should be an array of both acuvueCoupons and lifestyleCoupons", async () => {
		const acuvueCoupons: IAcuvueCoupon[] = [
			{
				type: "acuvue",
				terms: "terms 1",
				validPeriod: {
					from: "2022-05-01",
					to: "2022-06-01",
				},
				subType: "other",
				isEligibleForInStore: false,
				title: "title 1",
				isEligibleForHomeDelivery: false,
				id: "id 1",
				points: 0,
				imageUrl: "img url 1",
				bonusMultiplier: null,
				absoluteCashDiscount: 10,
			},
		];
		const lifestyleCoupons: ILifestyleCoupon[] = [
			{
				type: "lifestyle",
				points: 10,
				imageUrl: "img url 2",
				title: "title 2",
				id: "id 2",
				validPeriod: {
					from: "2022-08-01",
					to: "2022-09-01",
				},
				terms: "terms 2",
				isFeatured: false,
				isPlatinum: false,
				issuer: "issuer 2",
				tag: null,
				remainingQuantity: 1,
				absoluteCashDiscount: 10,
			},
		];

		const { result } = renderHook(() =>
			useCatalogCoupons(acuvueCoupons, lifestyleCoupons)
		);

		expect(result.current.catalogCoupons).toStrictEqual([
			{
				type: "acuvue",
				terms: "terms 1",
				validPeriod: {
					from: "2022-05-01",
					to: "2022-06-01",
				},
				subType: "other",
				isEligibleForInStore: false,
				title: "title 1",
				isEligibleForHomeDelivery: false,
				id: "id 1",
				points: 0,
				imageUrl: "img url 1",
				bonusMultiplier: null,
				absoluteCashDiscount: 10,
			},
			{
				type: "lifestyle",
				points: 10,
				imageUrl: "img url 2",
				title: "title 2",
				id: "id 2",
				validPeriod: {
					from: "2022-08-01",
					to: "2022-09-01",
				},
				terms: "terms 2",
				isFeatured: false,
				isPlatinum: false,
				issuer: "issuer 2",
				tag: null,
				remainingQuantity: 1,
				absoluteCashDiscount: 10,
			},
		]);
	});
});

describe("leastExpensiveRewardValue", () => {
	it("should be 0 when acuvueCoupons is [] and lifestyleCoupons is []", async () => {
		const acuvueCoupons: IAcuvueCoupon[] = [];
		const lifestyleCoupons: ILifestyleCoupon[] = [];

		const { result } = renderHook(() =>
			useCatalogCoupons(acuvueCoupons, lifestyleCoupons)
		);

		expect(result.current.leastExpensiveRewardValue).toStrictEqual(0);
	});

	it("should be 10 when there is one acuvue coupon costing 10 points and one lifestyle coupon costing 11 points", async () => {
		const acuvueCoupons: IAcuvueCoupon[] = [
			{
				type: "acuvue",
				points: 10,
				terms: "terms 1",
				validPeriod: {
					from: "2022-05-01",
					to: "2022-06-01",
				},
				subType: "other",
				isEligibleForInStore: false,
				title: "title 1",
				isEligibleForHomeDelivery: false,
				id: "id 1",
				imageUrl: "img url 1",
				bonusMultiplier: null,
				absoluteCashDiscount: 10,
			},
		];
		const lifestyleCoupons: ILifestyleCoupon[] = [
			{
				type: "lifestyle",
				points: 11,
				imageUrl: "img url 2",
				title: "title 2",
				id: "id 2",
				validPeriod: {
					from: "2022-08-01",
					to: "2022-09-01",
				},
				terms: "terms 2",
				isFeatured: false,
				isPlatinum: false,
				issuer: "issuer 2",
				tag: null,
				remainingQuantity: 1,
				absoluteCashDiscount: 10,
			},
		];

		const { result } = renderHook(() =>
			useCatalogCoupons(acuvueCoupons, lifestyleCoupons)
		);

		expect(result.current.leastExpensiveRewardValue).toStrictEqual(10);
	});

	it("should be 10 when there is one acuvue coupon costing 11 points and one lifestyle coupon costing 10 points", async () => {
		const acuvueCoupons: IAcuvueCoupon[] = [
			{
				type: "acuvue",
				points: 11,
				terms: "terms 1",
				validPeriod: {
					from: "2022-05-01",
					to: "2022-06-01",
				},
				subType: "other",
				isEligibleForInStore: false,
				title: "title 1",
				isEligibleForHomeDelivery: false,
				id: "id 1",
				imageUrl: "img url 1",
				bonusMultiplier: null,
				absoluteCashDiscount: 10,
			},
		];
		const lifestyleCoupons: ILifestyleCoupon[] = [
			{
				type: "lifestyle",
				points: 10,
				imageUrl: "img url 2",
				title: "title 2",
				id: "id 2",
				validPeriod: {
					from: "2022-08-01",
					to: "2022-09-01",
				},
				terms: "terms 2",
				isFeatured: false,
				isPlatinum: false,
				issuer: "issuer 2",
				tag: null,
				remainingQuantity: 1,
				absoluteCashDiscount: 10,
			},
		];

		const { result } = renderHook(() =>
			useCatalogCoupons(acuvueCoupons, lifestyleCoupons)
		);

		expect(result.current.leastExpensiveRewardValue).toStrictEqual(10);
	});

	it("should be 1 when there is one acuvue coupon with 1 point and no lifestyle coupons", async () => {
		const acuvueCoupons: IAcuvueCoupon[] = [
			{
				type: "acuvue",
				points: 1,
				terms: "terms 1",
				validPeriod: {
					from: "2022-05-01",
					to: "2022-06-01",
				},
				subType: "other",
				isEligibleForInStore: false,
				title: "title 1",
				isEligibleForHomeDelivery: false,
				id: "id 1",
				imageUrl: "img url 1",
				bonusMultiplier: null,
				absoluteCashDiscount: 10,
			},
		];

		const lifestyleCoupons: ILifestyleCoupon[] = [];

		const { result } = renderHook(() =>
			useCatalogCoupons(acuvueCoupons, lifestyleCoupons)
		);
		expect(result.current.leastExpensiveRewardValue).toStrictEqual(1);
	});

	it("should be 2 when there is no acuvue coupons and one lifestyle coupon with 2 points", async () => {
		const acuvueCoupons: IAcuvueCoupon[] = [];
		const lifestyleCoupons: ILifestyleCoupon[] = [
			{
				type: "lifestyle",
				points: 2,
				imageUrl: "img url 2",
				title: "title 2",
				id: "id 2",
				validPeriod: {
					from: "2022-08-01",
					to: "2022-09-01",
				},
				terms: "terms 2",
				isFeatured: false,
				isPlatinum: false,
				issuer: "issuer 2",
				tag: null,
				remainingQuantity: 1,
				absoluteCashDiscount: 10,
			},
		];

		const { result } = renderHook(() =>
			useCatalogCoupons(acuvueCoupons, lifestyleCoupons)
		);

		expect(result.current.leastExpensiveRewardValue).toStrictEqual(2);
	});
});
