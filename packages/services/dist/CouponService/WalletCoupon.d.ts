import { IActiveWalletCoupon } from "./IActiveWalletCoupon";
import { IExpiredWalletCoupon } from "./IExpiredWalletCoupon";
import { IRedeemedWalletCoupon } from "./IRedeemedWalletCoupon";
export declare type WalletCoupon = IActiveWalletCoupon | IRedeemedWalletCoupon | IExpiredWalletCoupon;
