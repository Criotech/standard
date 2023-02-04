import { getConfig } from "../ConfigService";
import { HttpStatus } from "../HTTPService/HttpStatus";
import {
	GetUserAddressResponse,
	HTTPService,
	UpdateUserAddressPayload,
} from "../index";
import { IUserAddress } from "./IUserAddress";
import { IAddressState } from "./IAddressState";
import axios from "axios";

const { isAxiosError } = axios;

const configuration = getConfig();

export const getStates = async (
	sessionToken: string
): Promise<IAddressState[]> => {
	const { data } = await HTTPService.get<IAddressState[]>(
		`states?region=${configuration?.region}`,
		sessionToken
	);

	return data;
};

export const saveMailingAddress = async (
	payload: UpdateUserAddressPayload,
	sessionToken: string
): Promise<void> => {
	const mailingAddressPayload = {
		...payload,
		countryCode: configuration?.region,
	};
	await HTTPService.patch(
		"user/address/MAILING",
		mailingAddressPayload,
		sessionToken
	);
};

export const getMailingAddress = async (
	sessionToken: string
): Promise<GetUserAddressResponse | undefined> => {
	try {
		const { data } = await HTTPService.get<GetUserAddressResponse>(
			"user/address/MAILING",
			sessionToken
		);
		return data;
	} catch (error) {
		if (
			isAxiosError(error) &&
			error.response?.status === HttpStatus.NOT_FOUND
		) {
			return undefined;
		}
		throw error;
	}
};

export const getShippingAddress = async (
	sessionToken: string
): Promise<IUserAddress | null> => {
	try {
		const { data } = await HTTPService.get<IUserAddress>(
			"user/address/SHIPPING",
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

export const saveShippingAddress = async (
	payload: IUserAddress,
	sessionToken: string
): Promise<IUserAddress | null> => {
	const { data } = await HTTPService.patch<IUserAddress>(
		"user/address/SHIPPING",
		payload,
		sessionToken
	);
	return data;
};
