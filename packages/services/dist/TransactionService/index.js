import { HTTPService } from "../index";
export const getTransactions = async (sessionToken) => {
    const { data } = await HTTPService.get("transactions", sessionToken);
    return data;
};
