export interface IBaseCoupon {
    id: string;
    imageUrl: string;
    title: string;
    points: number;
    validPeriod: {
        from: string;
        to: string;
    };
    terms: string;
    absoluteCashDiscount: number;
}
