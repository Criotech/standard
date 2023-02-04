import { HttpStatus } from "../HTTPService/HttpStatus";
import { HTTPService } from "../index";
import { IRegisterStore } from "./IRegisterStore";
import { IsEligibleToChangeStoreResponse } from "./IsEligibleToChangeStoreResponse";
import { IStore } from "./IStore";
import { IStoreWithCoordinates } from "./IStoreWithCoordinates";
import { getConfig } from "../ConfigService";
import axios from "axios";

const { isAxiosError } = axios;

const getMyStore = async (sessionToken: string): Promise<IStore | null> => {
	try {
		const { data } = await HTTPService.get<IStore>(
			"my-store",
			sessionToken
		);
		return data;
	} catch (error) {
		if (
			isAxiosError(error) &&
			error.response?.status === HttpStatus.NOT_FOUND
		) {
			return null;
		}
		throw error;
	}
};

const getStores = async (
	sessionToken: string
): Promise<IStoreWithCoordinates[]> => {
	const config = getConfig();
	const {
		data: { stores },
	} = await HTTPService.get<{ stores: IStoreWithCoordinates[] }>(
		`stores?region=${config?.region}`,
		sessionToken
	);
	return stores;
};

const registerStore = async (
	sessionToken: string,
	data: IRegisterStore
): Promise<void> => {
	await HTTPService.post("store-register", data, sessionToken);
};

const isEligibleToChangeStore = async (
	sessionToken: string
): Promise<IsEligibleToChangeStoreResponse> => {
	const { data: isEligible } =
		await HTTPService.get<IsEligibleToChangeStoreResponse>(
			"/user/is-eligible-to-change-store",
			sessionToken
		);

	return isEligible;
};

const StoreService = {
	getMyStore,
	getStores,
	registerStore,
	isEligibleToChangeStore,
};

export default StoreService;
