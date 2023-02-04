import { IAcuvueCoupon } from "./IAcuvueCoupon";
export interface IExpiredWalletCoupon extends IAcuvueCoupon {
    status: "expired";
    expirationDate: string;
}
