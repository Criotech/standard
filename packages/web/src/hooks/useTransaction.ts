import { ITransaction } from "@myacuvue_thailand_web/services";
import { useLoading } from "./useLoading";
import { useCallback } from "react";
import { useAuthentication } from "./useAuthentication";
import { useService } from "./useService";

interface IUseTransaction {
	getTransactions: () => Promise<ITransaction[]>;
}

export const useTransaction = (): IUseTransaction => {
	const { TransactionService } = useService();
	const { showLoading, hideLoading } = useLoading();
	const { sessionToken } = useAuthentication();

	const getTransactions = useCallback(async () => {
		showLoading();
		try {
			const response = await TransactionService.getTransactions(
				sessionToken!.rawValue
			);
			return response.transactions;
		} finally {
			hideLoading();
		}
	}, [showLoading, sessionToken, hideLoading, TransactionService]);

	return {
		getTransactions,
	};
};
