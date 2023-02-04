export type IPurchase = {
	id: string;
	storeName: string;
	dateOfPurchase: string;
	feedback: {
		contactLensesScore: number | null;
		storeScore: number | null;
		hasGivenFeedback: boolean;
	};
};
