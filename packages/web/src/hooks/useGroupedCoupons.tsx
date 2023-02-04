import { ILifestyleCoupon } from "@myacuvue_thailand_web/services";

interface IUseGroupedCoupons {
	getGroupedCoupons: (
		couponsArray: ILifestyleCoupon[]
	) => ILifestyleCoupon[][];
}

export const useGroupedCoupons = (): IUseGroupedCoupons => {
	const getGroupedCoupons = (couponsArray: ILifestyleCoupon[]) => {
		const groupedCoupons: ILifestyleCoupon[][] = [];
		couponsArray.forEach((coupon, index) => {
			if (index % 2 === 0) {
				groupedCoupons.push([couponsArray[index]]);
			} else {
				groupedCoupons[groupedCoupons.length - 1].push(
					couponsArray[index]
				);
			}
		});

		return groupedCoupons;
	};

	return {
		getGroupedCoupons,
	};
};
