import {
	IAcuvueCoupon,
	ILifestyleCoupon,
} from "@myacuvue_thailand_web/services";
import { useMemo } from "react";

type CatalogCoupon = IAcuvueCoupon | ILifestyleCoupon;

interface IUseCatalogCoupons {
	catalogCoupons: CatalogCoupon[];
	leastExpensiveRewardValue: number;
}

export const useCatalogCoupons = (
	acuvueCoupons: IAcuvueCoupon[],
	lifeStyleCoupons: ILifestyleCoupon[]
): IUseCatalogCoupons => {
	const catalogCoupons = useMemo(() => {
		return [...acuvueCoupons, ...lifeStyleCoupons];
	}, [acuvueCoupons, lifeStyleCoupons]);

	const leastExpensiveRewardValue = useMemo(() => {
		if (catalogCoupons.length === 0) {
			return 0;
		}
		const couponsSortedByValueAscending = catalogCoupons
			.slice()
			.sort((couponA, couponB) => {
				return couponA.points - couponB.points;
			});
		return couponsSortedByValueAscending[0].points;
	}, [catalogCoupons]);

	return {
		catalogCoupons,
		leastExpensiveRewardValue,
	};
};
