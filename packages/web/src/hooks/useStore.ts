import { useCallback } from "react";
import { useAuthentication } from "./useAuthentication";
import {
	IRegisterStore,
	IStore,
	IStoreWithCoordinates,
	IsEligibleToChangeStoreResponse,
} from "@myacuvue_thailand_web/services";
import { useLoading } from "./useLoading";
import { useService } from "./useService";

interface IUseStore {
	getUserStore: () => Promise<IStore | null>;
	getStores: () => Promise<IStoreWithCoordinates[]>;
	registerStore: (data: IRegisterStore) => Promise<void>;
	isEligibleToChangeStore: () => Promise<IsEligibleToChangeStoreResponse>;
}
export const useStore = (): IUseStore => {
	const { StoreService } = useService();
	const { showLoading, hideLoading } = useLoading();
	const { sessionToken } = useAuthentication();

	const getUserStore = useCallback(async () => {
		showLoading();
		try {
			return await StoreService.getMyStore(
				sessionToken?.rawValue as string
			);
		} finally {
			hideLoading();
		}
	}, [sessionToken?.rawValue, showLoading, hideLoading, StoreService]);

	const getStores = useCallback(async () => {
		showLoading();
		try {
			return await StoreService.getStores(sessionToken?.rawValue!);
		} finally {
			hideLoading();
		}
	}, [sessionToken?.rawValue, showLoading, hideLoading, StoreService]);

	const registerStore = useCallback(
		async (data: IRegisterStore) => {
			showLoading();
			try {
				await StoreService.registerStore(sessionToken?.rawValue!, data);
			} finally {
				hideLoading();
			}
		},
		[sessionToken?.rawValue, showLoading, hideLoading, StoreService]
	);

	const isEligibleToChangeStore = useCallback(async () => {
		showLoading();
		try {
			return await StoreService.isEligibleToChangeStore(
				sessionToken?.rawValue!
			);
		} finally {
			hideLoading();
		}
	}, [sessionToken?.rawValue, showLoading, hideLoading, StoreService]);

	return {
		getUserStore,
		getStores,
		registerStore,
		isEligibleToChangeStore,
	};
};
