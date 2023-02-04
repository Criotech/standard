import { IFeedback, IPurchase } from "@myacuvue_thailand_web/services";
import { useService } from "./useService";
import { useAuthentication } from "./useAuthentication";
import { useCallbackWithLoading } from "./useCallbackWithLoading";

interface IUseFeedback {
	savePurchaseFeedback: (
		purchaseId: string,
		data: IFeedback
	) => Promise<void>;
	getLatestPurchase: () => Promise<IPurchase | undefined>;
}

export const useFeedback = (): IUseFeedback => {
	const { FeedbackService } = useService();
	const { sessionToken } = useAuthentication();

	const savePurchaseFeedback = useCallbackWithLoading(
		async (purchaseId: string, data: IFeedback) => {
			await FeedbackService.savePurchaseFeedback(
				purchaseId,
				data,
				sessionToken?.rawValue!
			);
		},
		[FeedbackService, sessionToken?.rawValue]
	);

	const getLatestPurchase = useCallbackWithLoading(async () => {
		return await FeedbackService.getLatestPurchase(sessionToken?.rawValue!);
	}, [sessionToken?.rawValue]);

	return {
		savePurchaseFeedback,
		getLatestPurchase,
	};
};
