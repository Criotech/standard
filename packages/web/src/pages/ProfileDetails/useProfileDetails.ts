import { useAddress } from "../../hooks/useAddress";
import { useAsync } from "react-use";
import { IAddressState, IUserAddress } from "@myacuvue_thailand_web/services";
import { useMemo } from "react";

interface IUseProfileDetails {
	address: IUserAddress;
	isLoading: boolean;
	stateName: string | null;
}

export const useProfileDetails = (): IUseProfileDetails => {
	const { getShippingAddress, getStates } = useAddress();
	const { value, loading } = useAsync(
		() => Promise.all([getShippingAddress(), getStates()]),
		[getShippingAddress, getStates]
	);
	const [address, states] = (value as [IUserAddress, IAddressState[]]) || [];

	const stateName = useMemo<string | null>(() => {
		if (address && states) {
			return states.filter((state) => state.id === address.state)[0].names
				.en;
		}
		return null;
	}, [address, states]);

	return { address, isLoading: loading, stateName };
};
