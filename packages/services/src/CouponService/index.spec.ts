import { HTTPService } from "..";
import { GlobalError } from "../errors/GlobalError";
import { HttpStatus } from "../HTTPService/HttpStatus";
import { WalletCoupon } from "./WalletCoupon";
import { IAcuvueCoupon } from "./IAcuvueCoupon";
import {
	checkoutAcuvueCoupons,
	checkoutLifestyleCoupons,
	getAcuvueCoupons,
	getLifestyleCoupons,
	getUserCoupons,
	redeemCoupon,
} from "./index";
import { ILifestyleCoupon } from "./ILifestyleCoupon";
import { ILifestyleCouponCheckout } from "./ILifestyleCouponCheckout";
import { mocked } from "ts-jest/utils";

jest.mock("..", () => ({
	HTTPService: {
		get: jest.fn(),
		post: jest.fn(),
	},
}));

jest.mock("../ConfigService", () => ({
	getConfig: jest.fn().mockReturnValue({
		countryPhoneCode: "61",
		config: {
			baseUrl: "https://example.com",
		},
		region: "AUS",
	}),
	Instance: {
		TH: "TH",
		AU: "AU",
	},
	ENV: {
		DEV: "DEV",
	},
}));

beforeEach(() => {
	mocked(HTTPService.post).mockResolvedValue({
		data: undefined,
		headers: undefined,
		status: HttpStatus.OK,
	});
});

describe("redeemCoupon", () => {
	it("should checkout an redeem coupon", async () => {
		const fakeSessionToken = "session token";
		const fakeCouponCode = { couponCode: "fakeCoupon", region: "AUS" };
		await redeemCoupon("fakeCoupon", fakeSessionToken);

		expect(HTTPService.post).toHaveBeenCalledWith(
			"redeem-coupon-code",
			fakeCouponCode,
			fakeSessionToken
		);
	});

	it("should throw global error if http response is BAD_REQUEST", async () => {
		const globalError = {
			someError: {},
		};

		mocked(HTTPService.post).mockRejectedValue({
			response: {
				status: HttpStatus.BAD_REQUEST,
				data: {
					globalError: globalError,
				},
			},
			isAxiosError: true,
		});

		const expectedError = new GlobalError(globalError);
		await expect(() =>
			redeemCoupon("fakeCoupon", "fake session token")
		).rejects.toStrictEqual(expectedError);
	});

	it("should rethrow error if any other error happens during post", async () => {
		mocked(HTTPService.post).mockRejectedValue({
			response: {
				status: HttpStatus.NOT_FOUND,
				data: "some random error",
			},
		});

		await expect(() =>
			redeemCoupon("fakeCoupon", "fake session token")
		).rejects.toStrictEqual({
			response: {
				status: HttpStatus.NOT_FOUND,
				data: "some random error",
			},
		});
	});
});

describe("getUserCoupons", () => {
	it("should call get with appropriate parameters", async () => {
		const fakeSessionToken = "session token";
		const expectedResponse: WalletCoupon[] = [];

		mocked(HTTPService.get).mockResolvedValue({
			data: expectedResponse,
			status: HttpStatus.OK,
			headers: undefined,
		});

		await getUserCoupons(fakeSessionToken);

		expect(HTTPService.get).toHaveBeenCalledWith(
			"user/coupons",
			fakeSessionToken
		);
	});

	it("should return a list of wallet coupons", async () => {
		const fakeSessionToken = "session token";
		const expectedResponse: WalletCoupon[] = [
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

		mocked(HTTPService.get).mockResolvedValue({
			data: expectedResponse,
			status: HttpStatus.OK,
			headers: undefined,
		});
		const response = await getUserCoupons(fakeSessionToken);
		expect(response).toEqual(expectedResponse);
	});
});

describe("checkoutAcuvueCoupons", () => {
	it("should checkout an acuvue coupon", async () => {
		const fakeSessionToken = "session token";
		const expectedPayload: ILifestyleCouponCheckout = {
			couponId1: 1,
		};

		await checkoutAcuvueCoupons(expectedPayload, fakeSessionToken);

		expect(HTTPService.post).toHaveBeenCalledWith(
			"coupon-store/acuvue/checkout",
			expectedPayload,
			fakeSessionToken
		);
	});

	it("should throw global error if http response is CONFLICT", async () => {
		const globalError = {
			someError: {},
		};
		mocked(HTTPService.post).mockRejectedValue({
			response: {
				status: HttpStatus.CONFLICT,
				data: {
					globalError: globalError,
				},
			},
			isAxiosError: true,
		});

		const expectedError = new GlobalError(globalError);
		const payload = {
			couponId1: 1,
		};
		await expect(() =>
			checkoutAcuvueCoupons(payload, "fake session token")
		).rejects.toStrictEqual(expectedError);
	});

	it("should rethrow error if any other error happens on post", async () => {
		const someRandomError = {
			someRandomError: {},
		};
		mocked(HTTPService.post).mockRejectedValue(someRandomError);

		const payload = {
			couponId1: 1,
		};
		await expect(() =>
			checkoutAcuvueCoupons(payload, "fake session token")
		).rejects.toStrictEqual(someRandomError);
	});
});

describe("getAcuvueCoupons", () => {
	it("should call get with appropriate parameters", async () => {
		const fakeSessionToken = "session token";
		const expectedResponse: IAcuvueCoupon[] = [];

		mocked(HTTPService.get).mockResolvedValue({
			data: expectedResponse,
			status: HttpStatus.OK,
			headers: undefined,
		});
		await getAcuvueCoupons(fakeSessionToken);

		expect(HTTPService.get).toHaveBeenCalledWith(
			"coupon-store/acuvue?region=AUS",
			fakeSessionToken
		);
	});

	it("should return a list of acuvue coupons", async () => {
		const fakeSessionToken = "session token";
		const expectedResponse: IAcuvueCoupon[] = [
			{
				type: "acuvue",
				subType: "other",
				isEligibleForHomeDelivery: true,
				isEligibleForInStore: true,
				bonusMultiplier: 1.5,
				id: "7v894576e4n0bn7",
				imageUrl: "https://example.acuvue.co.th/img.png",
				title: "Welcome Coupon",
				points: 0,
				validPeriod: {
					from: "2021-02-01",
					to: "2021-03-01",
				},
				terms: "",
				absoluteCashDiscount: 10,
			},
		];

		mocked(HTTPService.get).mockResolvedValue({
			data: expectedResponse,
			status: HttpStatus.OK,
			headers: undefined,
		});
		const response = await getAcuvueCoupons(fakeSessionToken);
		expect(response).toEqual(expectedResponse);
	});
});

describe("getLifestyleCoupons", () => {
	it("should call get with appropriate parameters", async () => {
		const fakeSessionToken = "session token";
		const expectedResponse: ILifestyleCoupon[] = [];

		mocked(HTTPService.get).mockResolvedValue({
			data: expectedResponse,
			status: HttpStatus.OK,
			headers: undefined,
		});
		await getLifestyleCoupons(fakeSessionToken);

		expect(HTTPService.get).toHaveBeenCalledWith(
			"coupon-store/lifestyle?region=AUS",
			fakeSessionToken
		);
	});

	it("should return a list of lifestyle coupons", async () => {
		const fakeSessionToken = "session token";
		const expectedResponse: ILifestyleCoupon[] = [
			{
				type: "lifestyle",
				issuer: "Sizzler",
				tag: "hot",
				isPlatinum: false,
				isFeatured: true,
				remainingQuantity: 10,
				id: "7v894576e4n0bn7",
				imageUrl: "https://example.acuvue.co.th/img.png",
				title: "Welcome Coupon",
				points: 0,
				validPeriod: {
					from: "2021-02-01",
					to: "2021-03-01",
				},
				terms: "",
				absoluteCashDiscount: 10,
			},
		];

		mocked(HTTPService.get).mockResolvedValue({
			data: expectedResponse,
			status: HttpStatus.OK,
			headers: undefined,
		});
		const response = await getLifestyleCoupons(fakeSessionToken);
		expect(response).toEqual(expectedResponse);
	});
});

describe("checkoutLifestyleCoupons", () => {
	it("should checkout lifestyle coupons", async () => {
		const fakeSessionToken = "session token";
		const fakePayload: ILifestyleCouponCheckout = {
			couponId1: 1,
			couponId2: 1,
			couponId3: 2,
		};

		await checkoutLifestyleCoupons(fakePayload, fakeSessionToken);

		expect(HTTPService.post).toHaveBeenCalledWith(
			"coupon-store/lifestyle/checkout",
			fakePayload,
			fakeSessionToken
		);
	});

	it("should throw global error if http response is CONFLICT", async () => {
		const globalError = {
			someError: {},
		};

		mocked(HTTPService.post).mockRejectedValue({
			response: {
				status: HttpStatus.CONFLICT,
				data: {
					globalError: globalError,
				},
			},
			isAxiosError: true,
		});

		const fakePayload: ILifestyleCouponCheckout = {
			couponId1: 1,
			couponId2: 1,
			couponId3: 2,
		};

		const expectedError = new GlobalError(globalError);
		await expect(() =>
			checkoutLifestyleCoupons(fakePayload, "session token")
		).rejects.toStrictEqual(expectedError);
	});

	it("should rethrow error if any other error happens during post", async () => {
		mocked(HTTPService.post).mockRejectedValue({
			response: {
				status: HttpStatus.NOT_FOUND,
				data: "some random error",
			},
		});

		const fakePayload: ILifestyleCouponCheckout = {
			couponId1: 1,
			couponId2: 1,
			couponId3: 2,
		};

		const expectedError = {
			response: {
				status: HttpStatus.NOT_FOUND,
				data: "some random error",
			},
		};
		await expect(() =>
			checkoutLifestyleCoupons(fakePayload, "session token")
		).rejects.toStrictEqual(expectedError);
	});
});
