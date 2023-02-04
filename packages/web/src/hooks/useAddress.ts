import { useAuthentication } from "./useAuthentication";
import {
	IAddressState,
	UpdateUserAddressPayload,
	IUserAddress,
	Nullable,
} from "@myacuvue_thailand_web/services";
import { useService } from "./useService";
import { useCallbackWithLoading } from "./useCallbackWithLoading";

interface IUseAddress {
	getStates: () => Promise<IAddressState[]>;
	saveMailingAddress: (payload: UpdateUserAddressPayload) => Promise<void>;
	getMailingAddress: () => Promise<Nullable<IUserAddress> | undefined>;
	getShippingAddress: () => Promise<Nullable<IUserAddress> | null>;
	saveShippingAddress: (
		address: IUserAddress
	) => Promise<IUserAddress | null>;
}

export const useAddress = (): IUseAddress => {
	const { AddressService } = useService();
	const { sessionToken } = useAuthentication();

	const getStates = useCallbackWithLoading(async () => {
		return AddressService.getStates(sessionToken?.rawValue!);
	}, [sessionToken?.rawValue, AddressService]);

	const saveMailingAddress = useCallbackWithLoading(
		async (payload: UpdateUserAddressPayload) => {
			if (sessionToken) {
				return await AddressService.saveMailingAddress(
					payload,
					sessionToken.rawValue
				);
			}
		},
		[sessionToken, AddressService]
	);

	const getMailingAddress = useCallbackWithLoading(async () => {
		if (sessionToken) {
			return await AddressService.getMailingAddress(
				sessionToken.rawValue
			);
		}
	}, [AddressService, sessionToken]);

	const getShippingAddress = useCallbackWithLoading(async () => {
		return AddressService.getShippingAddress(sessionToken?.rawValue!);
	}, [sessionToken?.rawValue, AddressService]);

	const saveShippingAddress = useCallbackWithLoading(
		async (address: IUserAddress) => {
			return await AddressService.saveShippingAddress(
				address,
				sessionToken?.rawValue!
			);
		},
		[sessionToken?.rawValue, AddressService]
	);

	return {
		getStates,
		saveMailingAddress,
		getMailingAddress,
		getShippingAddress,
		saveShippingAddress,
	};
};
