import { HttpStatus } from "../HTTPService/HttpStatus";
import { HTTPService } from "../index";
import { getConfig } from "../ConfigService";
import axios from "axios";
const { isAxiosError } = axios;
const getMyStore = async (sessionToken) => {
    try {
        const { data } = await HTTPService.get("my-store", sessionToken);
        return data;
    }
    catch (error) {
        if (isAxiosError(error) &&
            error.response?.status === HttpStatus.NOT_FOUND) {
            return null;
        }
        throw error;
    }
};
const getStores = async (sessionToken) => {
    const config = getConfig();
    const { data: { stores }, } = await HTTPService.get(`stores?region=${config?.region}`, sessionToken);
    return stores;
};
const registerStore = async (sessionToken, data) => {
    await HTTPService.post("store-register", data, sessionToken);
};
const isEligibleToChangeStore = async (sessionToken) => {
    const { data: isEligible } = await HTTPService.get("/user/is-eligible-to-change-store", sessionToken);
    return isEligible;
};
const StoreService = {
    getMyStore,
    getStores,
    registerStore,
    isEligibleToChangeStore,
};
export default StoreService;
