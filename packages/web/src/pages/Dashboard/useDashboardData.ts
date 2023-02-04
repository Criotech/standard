import {
	IGetProfileResponse,
	IAcuvueCoupon,
	ILifestyleCoupon,
	IPoints,
	WalletCoupon,
} from "@myacuvue_thailand_web/services";
import { useAsync } from "react-use";
import { usePoints } from "../../hooks/usePoints";
import { useCoupon } from "../../hooks/useCoupon";
import { useUser } from "../../hooks/useUser";

interface IUseDashboardData {
	userPoints: IPoints | undefined;
	userCoupons: WalletCoupon[] | undefined;
	userProfile: IGetProfileResponse | undefined;
	acuvueCoupons: IAcuvueCoupon[] | undefined;
	lifeStyleCoupons: ILifestyleCoupon[] | undefined;
	isPointsLoading: boolean;
	isUserCouponsLoading: boolean;
	isUserProfileLoading: boolean;
}

export const useDashboardData = (): IUseDashboardData => {
	const { getUserPoints } = usePoints();
	const { getUserCoupons, getAcuvueCoupons, getLifestyleCoupons } =
		useCoupon();
	const { getProfile } = useUser();

	const { value, loading: isDataLoading } = useAsync(
		() =>
			Promise.all([
				getUserPoints(),
				getUserCoupons(),
				getProfile(),
				getAcuvueCoupons(),
				getLifestyleCoupons(),
			]),
		[]
	);

	const [
		userPoints,
		userCoupons,
		userProfile,
		acuvueCoupons,
		lifeStyleCoupons,
	] = value || [];

	return {
		userPoints,
		userCoupons,
		userProfile,
		acuvueCoupons,
		lifeStyleCoupons,
		isPointsLoading: isDataLoading,
		isUserCouponsLoading: isDataLoading,
		isUserProfileLoading: isDataLoading,
	};
};
