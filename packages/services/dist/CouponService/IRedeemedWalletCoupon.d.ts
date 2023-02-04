import { IAcuvueCoupon } from "./IAcuvueCoupon";
export interface IRedeemedWalletCoupon extends IAcuvueCoupon {
    status: "redeemed";
    redemptionDate: string;
    redemptionStoreName: string;
}
