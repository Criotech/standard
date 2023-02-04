import { HTTPService } from "../index";
import { IGetTransactionsResponse } from "./IGetTransactionsResponse";

export const getTransactions = async (
	sessionToken: string
): Promise<IGetTransactionsResponse> => {
	const { data } = await HTTPService.get<IGetTransactionsResponse>(
		"transactions",
		sessionToken
	);
	return data;
};
