import { IBaseCoupon } from "./IBaseCoupon";

export interface IAcuvueCoupon extends IBaseCoupon {
	type: "acuvue";
	subType: "welcome" | "other";
	isEligibleForHomeDelivery: boolean;
	isEligibleForInStore: boolean;
	bonusMultiplier: number | null;
}
