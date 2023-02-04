import { useCallback } from "react";
import { useAuthentication } from "./useAuthentication";
import {
	IDeviceToken,
	IPhoneRegisterRequest,
	IPhoneValidationRequest,
	ListConsentsResponseBody,
	SaveConsentsRequestBody,
} from "@myacuvue_thailand_web/services";
import { useLoading } from "./useLoading";
import { useService } from "./useService";
import { useDeviceToken } from "../contexts/DeviceTokenContext";
import { useConfiguration } from "./useConfiguration";

interface IUsePhone {
	register: (data: IPhoneRegisterRequest) => Promise<void>;
	validateWithOtp: (
		data: IPhoneValidationRequest
	) => Promise<IDeviceToken | null>;
	getConsents: () => Promise<ListConsentsResponseBody>;
	saveConsents: (payload: SaveConsentsRequestBody) => Promise<void>;
	formatPhoneNumber: (phone: string) => string;
}

export const usePhone = (): IUsePhone => {
	const { PhoneService } = useService();
	const { showLoading, hideLoading } = useLoading();
	const { sessionToken } = useAuthentication();
	const { deviceToken } = useDeviceToken();
	const { countryPhoneCode } = useConfiguration();

	const register = useCallback(
		async (data: IPhoneRegisterRequest) => {
			showLoading();
			try {
				await PhoneService.register(data, sessionToken?.rawValue);
			} finally {
				hideLoading();
			}
		},
		[sessionToken, showLoading, hideLoading, PhoneService]
	);

	const validateWithOtp = useCallback(
		async (data: IPhoneValidationRequest) => {
			showLoading();
			try {
				return await PhoneService.validateWithOtp(data);
			} finally {
				hideLoading();
			}
		},
		[showLoading, hideLoading, PhoneService]
	);

	const getConsents = useCallback(async () => {
		showLoading();
		try {
			return await PhoneService.getConsents(deviceToken?.rawValue!);
		} finally {
			hideLoading();
		}
	}, [deviceToken?.rawValue, showLoading, hideLoading, PhoneService]);

	const saveConsents = useCallback(
		async (payload: SaveConsentsRequestBody) => {
			showLoading();
			try {
				await PhoneService.saveConsents(
					deviceToken?.rawValue!,
					payload
				);
			} finally {
				hideLoading();
			}
		},
		[PhoneService, hideLoading, deviceToken?.rawValue, showLoading]
	);

	const formatPhoneNumber = useCallback(
		(phone: string) => {
			const phoneWithoutCountryCode = phone.substring(
				countryPhoneCode.length,
				phone.length
			);
			return `+${countryPhoneCode} ${phoneWithoutCountryCode}`;
		},
		[countryPhoneCode]
	);

	return {
		register,
		validateWithOtp,
		getConsents,
		saveConsents,
		formatPhoneNumber,
	};
};
