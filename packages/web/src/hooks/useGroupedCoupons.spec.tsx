import { ILifestyleCoupon } from "@myacuvue_thailand_web/services";
import { useGroupedCoupons } from "./useGroupedCoupons";

const lifestyleCoupons: ILifestyleCoupon[] = [
	{
		type: "lifestyle",
		issuer: "Sizzler",
		tag: "hot",
		isPlatinum: false,
		isFeatured: true,
		remainingQuantity: 10,
		id: "1",
		imageUrl: "image-url",
		title: "Welcome Coupon",
		points: 0,
		validPeriod: {
			from: "some-date",
			to: "some-date",
		},
		terms: "",
		absoluteCashDiscount: 0,
	},
	{
		type: "lifestyle",
		issuer: "Sizzler",
		tag: "new",
		isPlatinum: false,
		isFeatured: true,
		remainingQuantity: 10,
		id: "2",
		imageUrl: "image-url",
		title: "Welcome Coupon",
		points: 0,
		validPeriod: {
			from: "some-date",
			to: "some-date",
		},
		terms: "",
		absoluteCashDiscount: 0,
	},
	{
		type: "lifestyle",
		issuer: "Sizzler",
		tag: "new",
		isPlatinum: false,
		isFeatured: true,
		remainingQuantity: 10,
		id: "2",
		imageUrl: "image-url",
		title: "Welcome Coupon",
		points: 0,
		validPeriod: {
			from: "some-date",
			to: "some-date",
		},
		terms: "",
		absoluteCashDiscount: 0,
	},
	{
		type: "lifestyle",
		issuer: "Sizzler",
		tag: "new",
		isPlatinum: false,
		isFeatured: true,
		remainingQuantity: 10,
		id: "2",
		imageUrl: "image-url",
		title: "Welcome Coupon",
		points: 0,
		validPeriod: {
			from: "some-date",
			to: "some-date",
		},
		terms: "",
		absoluteCashDiscount: 0,
	},
	{
		type: "lifestyle",
		issuer: "Sizzler",
		tag: "new",
		isPlatinum: false,
		isFeatured: false,
		remainingQuantity: 10,
		id: "5",
		imageUrl: "image-url",
		title: "Welcome Coupon",
		points: 0,
		validPeriod: {
			from: "some-date",
			to: "some-date",
		},
		terms: "",
		absoluteCashDiscount: 0,
	},
];

const groupedCoupons: ILifestyleCoupon[][] = [
	[
		{
			type: "lifestyle",
			issuer: "Sizzler",
			tag: "hot",
			isPlatinum: false,
			isFeatured: true,
			remainingQuantity: 10,
			id: "1",
			imageUrl: "image-url",
			title: "Welcome Coupon",
			points: 0,
			validPeriod: {
				from: "some-date",
				to: "some-date",
			},
			terms: "",
			absoluteCashDiscount: 0,
		},
		{
			type: "lifestyle",
			issuer: "Sizzler",
			tag: "new",
			isPlatinum: false,
			isFeatured: true,
			remainingQuantity: 10,
			id: "2",
			imageUrl: "image-url",
			title: "Welcome Coupon",
			points: 0,
			validPeriod: {
				from: "some-date",
				to: "some-date",
			},
			terms: "",
			absoluteCashDiscount: 0,
		},
	],
	[
		{
			type: "lifestyle",
			issuer: "Sizzler",
			tag: "new",
			isPlatinum: false,
			isFeatured: true,
			remainingQuantity: 10,
			id: "2",
			imageUrl: "image-url",
			title: "Welcome Coupon",
			points: 0,
			validPeriod: {
				from: "some-date",
				to: "some-date",
			},
			terms: "",
			absoluteCashDiscount: 0,
		},
		{
			type: "lifestyle",
			issuer: "Sizzler",
			tag: "new",
			isPlatinum: false,
			isFeatured: true,
			remainingQuantity: 10,
			id: "2",
			imageUrl: "image-url",
			title: "Welcome Coupon",
			points: 0,
			validPeriod: {
				from: "some-date",
				to: "some-date",
			},
			terms: "",
			absoluteCashDiscount: 0,
		},
	],
	[
		{
			type: "lifestyle",
			issuer: "Sizzler",
			tag: "new",
			isPlatinum: false,
			isFeatured: false,
			remainingQuantity: 10,
			id: "5",
			imageUrl: "image-url",
			title: "Welcome Coupon",
			points: 0,
			validPeriod: {
				from: "some-date",
				to: "some-date",
			},
			terms: "",
			absoluteCashDiscount: 0,
		},
	],
];

describe("getGroupedCoupons", () => {
	it("groups array of elements in two's", () => {
		const { getGroupedCoupons } = useGroupedCoupons();
		const groupedArray = getGroupedCoupons(lifestyleCoupons);
		expect(groupedArray).toEqual(groupedCoupons);
	});
});
