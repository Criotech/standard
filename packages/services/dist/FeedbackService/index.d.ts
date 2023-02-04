import { IFeedback } from "./IFeedback";
import { IPurchase } from "./IPurchase";
declare const FeedbackService: {
    savePurchaseFeedback: (purchaseId: string, payload: IFeedback, sessionToken: string) => Promise<void>;
    getLatestPurchase: (sessionToken: string) => Promise<IPurchase | undefined>;
};
export default FeedbackService;
