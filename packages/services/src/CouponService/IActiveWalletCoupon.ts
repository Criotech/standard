import { IAcuvueCoupon } from "./IAcuvueCoupon";

export interface IActiveWalletCoupon extends IAcuvueCoupon {
	status: "active";
}
