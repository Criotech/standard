import { renderHook, act } from "@testing-library/react-hooks";
import { useCoupon } from "./useCoupon";
import { useAuthentication } from "./useAuthentication";
import { useLoading } from "./useLoading";
import {
	CouponService,
	WalletCoupon,
	IAcuvueCoupon,
	ILifestyleCoupon,
	ILifestyleCouponCheckout,
} from "@myacuvue_thailand_web/services";

jest.mock("./useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("./useLoading", () => ({
	useLoading: jest.fn(),
}));

jest.mock("@myacuvue_thailand_web/services", () => ({
	CouponService: {
		getUserCoupons: jest.fn(),
		getAcuvueCoupons: jest.fn(),
		getLifestyleCoupons: jest.fn(),
		checkoutAcuvueCoupons: jest.fn(),
		checkoutLifestyleCoupons: jest.fn(),
		redeemCoupon: jest.fn(),
	},
}));

const expectedWalletCoupons: WalletCoupon[] = [
	{
		id: "some-random-string",
		status: "active",
		type: "acuvue",
		subType: "other",
		isEligibleForHomeDelivery: true,
		isEligibleForInStore: true,
		bonusMultiplier: null,
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

const expectedAcuvueCoupons: IAcuvueCoupon[] = [
	{
		id: "7v894576e4n0bn7",
		type: "acuvue",
		subType: "other",
		isEligibleForHomeDelivery: true,
		isEligibleForInStore: true,
		bonusMultiplier: 1.5,
		imageUrl: "https://example.acuvue.co.th/img.png",
		title: "Welcome Coupon",
		points: 0,
		validPeriod: {
			from: "2021-02-01",
			to: "2021-03-01",
		},
		terms: "",
		absoluteCashDiscount: 0,
	},
];

beforeEach(() => {
	(useAuthentication as jest.Mock).mockReturnValue({
		sessionToken: { rawValue: "fake-session-token" },
	});
	(useLoading as jest.Mock).mockReturnValue({
		showLoading: jest.fn(),
		hideLoading: jest.fn(),
	});
});

describe("getUserCoupons", () => {
	it("should call service's getUserCoupons with correct parameters", async () => {
		(CouponService.getUserCoupons as jest.Mock).mockReturnValue(
			expectedWalletCoupons
		);

		const { result } = renderHook(() => useCoupon());

		await act(async () => {
			await result.current.getUserCoupons();
		});

		expect(CouponService.getUserCoupons).toHaveBeenCalledWith(
			"fake-session-token"
		);
	});

	it("should return expected walletCoupons", async () => {
		(CouponService.getUserCoupons as jest.Mock).mockReturnValue(
			expectedWalletCoupons
		);

		const { result } = renderHook(() => useCoupon());

		const response = await result.current.getUserCoupons();

		expect(response).toEqual(expectedWalletCoupons);
	});

	it("should show and hide loading", async () => {
		const { showLoading, hideLoading } = useLoading();

		const { result } = renderHook(() => useCoupon());

		await act(async () => {
			await result.current.getUserCoupons();
		});

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});

describe("getAcuvueCoupons", () => {
	it("should call service's getAcuvueCoupons with correct parameters", async () => {
		(CouponService.getAcuvueCoupons as jest.Mock).mockReturnValue(
			expectedAcuvueCoupons
		);

		const { result } = renderHook(() => useCoupon());

		await act(async () => {
			await result.current.getAcuvueCoupons();
		});

		expect(CouponService.getAcuvueCoupons).toHaveBeenCalledWith(
			"fake-session-token"
		);
	});

	it("should return expected Acuvue Coupons", async () => {
		(CouponService.getAcuvueCoupons as jest.Mock).mockReturnValue(
			expectedAcuvueCoupons
		);

		const { result } = renderHook(() => useCoupon());

		const response = await result.current.getAcuvueCoupons();

		expect(response).toEqual(expectedAcuvueCoupons);
	});

	it("should show and hide loading", async () => {
		const { showLoading, hideLoading } = useLoading();

		const { result } = renderHook(() => useCoupon());

		await act(async () => {
			await result.current.getAcuvueCoupons();
		});

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});

describe("getLifestyleCoupons", () => {
	it("should call service's getLifestyleCoupons with correct parameters", async () => {
		const { result } = renderHook(() => useCoupon());

		await act(async () => {
			await result.current.getLifestyleCoupons();
		});

		expect(CouponService.getLifestyleCoupons).toHaveBeenCalledWith(
			"fake-session-token"
		);
	});

	it("should return expected Lifestyle Coupons", async () => {
		const expectedLifestyleCoupons: ILifestyleCoupon[] = [
			{
				type: "lifestyle",
				issuer: "Sizzler",
				tag: "hot",
				isPlatinum: false,
				isFeatured: true,
				id: "7v894576e4n0bn7",
				imageUrl: "https://example.acuvue.co.th/img.png",
				title: "Welcome Coupon",
				points: 0,
				validPeriod: {
					from: "2021-02-01",
					to: "2021-03-01",
				},
				terms: "",
				remainingQuantity: 1,
				absoluteCashDiscount: 0,
			},
		];

		(CouponService.getLifestyleCoupons as jest.Mock).mockReturnValue(
			expectedLifestyleCoupons
		);

		const { result } = renderHook(() => useCoupon());

		const response = await result.current.getLifestyleCoupons();

		expect(response).toEqual(expectedLifestyleCoupons);
	});

	it("should show and hide loading", async () => {
		const { showLoading, hideLoading } = useLoading();

		const { result } = renderHook(() => useCoupon());

		await act(async () => {
			await result.current.getLifestyleCoupons();
		});

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});

describe("checkoutAcuvueCoupons", () => {
	it("should call service's checkoutAcuvueCoupons with correct parameters", async () => {
		const fakePayload: ILifestyleCouponCheckout = {
			couponId1: 1,
		};
		const { result } = renderHook(() => useCoupon());

		await act(async () => {
			await result.current.checkoutAcuvueCoupons(fakePayload);
		});

		expect(CouponService.checkoutAcuvueCoupons).toHaveBeenCalledWith(
			fakePayload,
			"fake-session-token"
		);
	});

	it("should show and hide loading", async () => {
		const fakePayload: ILifestyleCouponCheckout = {
			couponId1: 1,
		};
		const { showLoading, hideLoading } = useLoading();

		const { result } = renderHook(() => useCoupon());

		await act(async () => {
			await result.current.checkoutAcuvueCoupons(fakePayload);
		});

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});

describe("checkoutLifestyleCoupons", () => {
	it("should call service's checkoutLifestyleCoupons with correct parameters", async () => {
		const fakePayload: ILifestyleCouponCheckout = {
			couponId1: 1,
			couponId2: 1,
			couponId3: 2,
		};
		const { result } = renderHook(() => useCoupon());

		await act(async () => {
			await result.current.checkoutLifestyleCoupons(fakePayload);
		});

		expect(CouponService.checkoutLifestyleCoupons).toHaveBeenCalledWith(
			fakePayload,
			"fake-session-token"
		);
	});

	it("should show and hide loading", async () => {
		const fakePayload: ILifestyleCouponCheckout = {
			couponId1: 1,
			couponId2: 1,
			couponId3: 2,
		};
		const { showLoading, hideLoading } = useLoading();

		const { result } = renderHook(() => useCoupon());

		await act(async () => {
			await result.current.checkoutLifestyleCoupons(fakePayload);
		});

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});

describe("redeemCoupon", () => {
	it("should call service's redeemCoupon with correct parameters", async () => {
		const fakeCouponCode: string = "coupon123";
		const { result } = renderHook(() => useCoupon());

		await act(async () => {
			await result.current.redeemCoupon(fakeCouponCode);
		});

		expect(CouponService.redeemCoupon).toHaveBeenCalledWith(
			fakeCouponCode,
			"fake-session-token"
		);
	});

	it("should show and hide loading", async () => {
		const fakeCouponCode: string = "coupon123";
		const { showLoading, hideLoading } = useLoading();

		const { result } = renderHook(() => useCoupon());

		await act(async () => {
			await result.current.redeemCoupon(fakeCouponCode);
		});

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});
