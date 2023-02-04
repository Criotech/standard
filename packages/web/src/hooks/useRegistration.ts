import { useCallback } from "react";
import { useTranslation } from "./useTranslation";
import { useLoading } from "./useLoading";
import { useAuthentication } from "./useAuthentication";
import { useService } from "./useService";
import { useNavigate } from "react-router-dom-v5-compat";
import { useDevice } from "./useDevice";
import { useConfiguration } from "./useConfiguration";
import { ConfigService } from "@myacuvue_thailand_web/services";

interface IUseRegistration {
	register: (phone: string) => Promise<void>;
	resendOtp: (phone: string) => Promise<void>;
	validateOtp: (phone: string, otp: string) => Promise<void>;
	registerPhone: (phone: string) => Promise<void>;
}

export const useRegistration = (): IUseRegistration => {
	const navigate = useNavigate();
	const { RegistrationService } = useService();
	const { language } = useTranslation();
	const { showLoading, hideLoading } = useLoading();
	const { setDeviceToken, sessionToken } = useAuthentication();
	const { getDeviceId } = useDevice();
	const { instance, countryPhoneCode, region } = useConfiguration();

	const legacyRegister = useCallback(
		async (phone: string) => {
			showLoading();
			const deviceId = getDeviceId();
			try {
				if (deviceId) {
					await RegistrationService.register(
						phone,
						deviceId,
						language
					);
					navigate(`/otp-verification?phone=${phone}`);
				}
			} finally {
				hideLoading();
			}
		},
		[
			navigate,
			language,
			showLoading,
			hideLoading,
			RegistrationService,
			getDeviceId,
		]
	);

	const newRegister = useCallback(
		async (phone: string) => {
			showLoading();
			const deviceId = getDeviceId();
			try {
				if (deviceId) {
					await RegistrationService.register(
						phone,
						deviceId,
						language
					);
				}
			} finally {
				hideLoading();
			}
		},
		[language, showLoading, hideLoading, RegistrationService, getDeviceId]
	);

	const register = useCallback(
		async (phone: string) => {
			if (instance === ConfigService.Instance.TH) {
				await legacyRegister(phone);
			} else {
				await newRegister(phone);
			}
		},
		[instance, legacyRegister, newRegister]
	);

	const resendOtp = useCallback(
		async (phone: string) => {
			showLoading();
			const deviceId = getDeviceId();
			try {
				if (deviceId) {
					return await RegistrationService.resendOtp(
						phone,
						deviceId,
						language,
						sessionToken?.rawValue
					);
				}
			} finally {
				hideLoading();
			}
		},
		[
			showLoading,
			getDeviceId,
			RegistrationService,
			language,
			sessionToken?.rawValue,
			hideLoading,
		]
	);

	const validateOtp = useCallback(
		async (phone: string, otp: string) => {
			showLoading();
			const deviceId = getDeviceId();
			try {
				if (deviceId) {
					const { deviceToken } =
						await RegistrationService.validateOtp(
							phone,
							deviceId,
							otp,
							language,
							sessionToken?.rawValue
						);
					setDeviceToken(deviceToken);
				}
			} finally {
				hideLoading();
			}
		},
		[
			language,
			showLoading,
			hideLoading,
			setDeviceToken,
			RegistrationService,
			sessionToken?.rawValue,
			getDeviceId,
		]
	);

	const registerPhone = useCallback(
		async (phone: string) => {
			showLoading();
			const deviceId = getDeviceId();

			try {
				if (deviceId) {
					await RegistrationService.registerPhone(
						phone,
						deviceId,
						language,
						countryPhoneCode,
						region,
						sessionToken?.rawValue
					);
				}
			} finally {
				hideLoading();
			}
		},
		[
			language,
			showLoading,
			hideLoading,
			RegistrationService,
			sessionToken?.rawValue,
			getDeviceId,
			countryPhoneCode,
			region,
		]
	);

	return {
		register,
		resendOtp,
		validateOtp,
		registerPhone,
	};
};
