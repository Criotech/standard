import { renderHook } from "@testing-library/react-hooks";
import { useDashboardData } from "./useDashboardData";
import { usePoints } from "../../hooks/usePoints";
import { mocked } from "ts-jest/utils";
import {
	Gender,
	IPoints,
	IProfile,
	Ladder,
	Nullable,
} from "@myacuvue_thailand_web/services";
import { useCoupon } from "../../hooks/useCoupon";
import { useUser } from "../../hooks/useUser";

jest.mock("../../hooks/usePoints", () => ({
	usePoints: jest.fn(),
}));

jest.mock("../../hooks/useCoupon", () => ({
	useCoupon: jest.fn(),
}));

jest.mock("../../hooks/useUser", () => ({
	useUser: jest.fn(),
}));

const defaultUserPoints: IPoints = {
	availablePoints: 0,
	dateLimitToPlatinum: null,
	earnedPoints: 0,
	expiringAt: null,
	expiringPoints: null,
	ladder: "normal" as Ladder,
	remainingPointsToPlatinum: 0,
};

const defaultProfile: Nullable<IProfile> = {
	birthMonth: "",
	firstName: "",
	birthYear: "",
	email: "",
	gender: null,
	isSpectaclesWearer: false,
	lastName: "",
	lensesUsage: null,
	myAcuvueId: "",
	phone: "",
	hasParentalConsent: false,
};

beforeEach(() => {
	mocked(usePoints).mockReturnValue({
		getUserPoints: jest.fn(),
	});
	const { getUserPoints } = usePoints();
	mocked(getUserPoints).mockResolvedValue({
		...defaultUserPoints,
	});

	mocked(useCoupon).mockReturnValue({
		getUserCoupons: jest.fn(),
		getAcuvueCoupons: jest.fn(),
		getLifestyleCoupons: jest.fn(),
		checkoutAcuvueCoupons: jest.fn(),
		checkoutLifestyleCoupons: jest.fn(),
		redeemCoupon: jest.fn(),
	});
	const { getUserCoupons } = useCoupon();
	mocked(getUserCoupons).mockResolvedValue([]);

	mocked(useUser).mockReturnValue({
		getProfile: jest.fn(),
		saveProfile: jest.fn(),
		updateAuthenticationDone: jest.fn(),
		generatePromocode: jest.fn(),
		getPromocode: jest.fn(),
	});
	const { getProfile } = useUser();
	mocked(getProfile).mockResolvedValue({
		...defaultProfile,
	});
});

describe("useDashboardData", () => {
	it("should return correct userPoints", async () => {
		const { getUserPoints } = usePoints();
		mocked(getUserPoints).mockResolvedValue({
			availablePoints: 0,
			dateLimitToPlatinum: null,
			earnedPoints: 0,
			expiringAt: null,
			expiringPoints: null,
			ladder: "normal",
			remainingPointsToPlatinum: 0,
		});

		const { result, waitFor } = renderHook(() => useDashboardData());

		await waitFor(() => {
			expect(result.current.isPointsLoading).toStrictEqual(false);
		});
		expect(result.current.userPoints).toStrictEqual({
			availablePoints: 0,
			dateLimitToPlatinum: null,
			earnedPoints: 0,
			expiringAt: null,
			expiringPoints: null,
			ladder: "normal",
			remainingPointsToPlatinum: 0,
		});
	});

	it("should return correct userCoupons", async () => {
		const { getUserCoupons } = useCoupon();
		mocked(getUserCoupons).mockResolvedValue([
			{
				status: "redeemed",
				type: "acuvue",
				points: 0,
				bonusMultiplier: null,
				imageUrl: "img url",
				title: "title",
				id: "id",
				isEligibleForHomeDelivery: false,
				isEligibleForInStore: false,
				redemptionDate: "2022-08-01",
				subType: "other",
				redemptionStoreName: "store name",
				terms: "terms",
				validPeriod: {
					from: "2022-07-05",
					to: "2022-08-05",
				},
				absoluteCashDiscount: 10,
			},
		]);

		const { result, waitFor } = renderHook(() => useDashboardData());

		await waitFor(() => {
			expect(result.current.isUserCouponsLoading).toStrictEqual(false);
		});
		expect(result.current.userCoupons).toStrictEqual([
			{
				status: "redeemed",
				type: "acuvue",
				points: 0,
				bonusMultiplier: null,
				imageUrl: "img url",
				title: "title",
				id: "id",
				isEligibleForHomeDelivery: false,
				isEligibleForInStore: false,
				redemptionDate: "2022-08-01",
				subType: "other",
				redemptionStoreName: "store name",
				terms: "terms",
				validPeriod: {
					from: "2022-07-05",
					to: "2022-08-05",
				},
				absoluteCashDiscount: 10,
			},
		]);
	});

	it("should return correct userProfile", async () => {
		const { getProfile } = useUser();
		mocked(getProfile).mockResolvedValue({
			firstName: "John",
			lastName: "Doe",
			birthYear: "1990",
			birthMonth: "07",
			email: "john.doe.example@jnj.com",
			gender: Gender.MALE,
			isSpectaclesWearer: false,
			lensesUsage: "NON_USER",
			myAcuvueId: "a-id",
			phone: "99990000",
			hasParentalConsent: false,
		});

		const { result, waitFor } = renderHook(() => useDashboardData());

		await waitFor(() => {
			expect(result.current.isUserProfileLoading).toStrictEqual(false);
		});
		expect(result.current.userProfile).toStrictEqual({
			firstName: "John",
			lastName: "Doe",
			birthYear: "1990",
			birthMonth: "07",
			email: "john.doe.example@jnj.com",
			gender: Gender.MALE,
			isSpectaclesWearer: false,
			lensesUsage: "NON_USER",
			myAcuvueId: "a-id",
			phone: "99990000",
			hasParentalConsent: false,
		});
	});
});
