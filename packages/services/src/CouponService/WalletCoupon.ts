import { IActiveWalletCoupon } from "./IActiveWalletCoupon";
import { IExpiredWalletCoupon } from "./IExpiredWalletCoupon";
import { IRedeemedWalletCoupon } from "./IRedeemedWalletCoupon";

export type WalletCoupon =
	| IActiveWalletCoupon
	| IRedeemedWalletCoupon
	| IExpiredWalletCoupon;
