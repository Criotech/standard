import { IBaseCoupon } from "./IBaseCoupon";
export interface ILifestyleCoupon extends IBaseCoupon {
    type: "lifestyle";
    issuer: string;
    tag: "new" | "hot" | null;
    isPlatinum: boolean;
    isFeatured: boolean;
    remainingQuantity: number;
}
