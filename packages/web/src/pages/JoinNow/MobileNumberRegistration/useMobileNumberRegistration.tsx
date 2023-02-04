import {
	Dispatch,
	useMemo,
	SetStateAction,
	useState,
	useCallback,
} from "react";
import { IFormData } from "./MobileNumberRegistrationForm";
import {
	HttpStatus,
	InvalidFormSubmissionError,
	TranslationKey,
} from "@myacuvue_thailand_web/services";
import { useRegisterValidations } from "../../../hooks/validations/useRegisterValidations";
import { usePhone } from "../../../hooks/usePhone";
import { useDevice } from "../../../hooks/useDevice";
import { useHistory } from "react-router-dom";
import { useRegistration } from "../../../hooks/useRegistration";
import axios from "axios";

const { isAxiosError } = axios;

interface IUseMobileNumberRegistration {
	formData: IFormData;
	setFormData: Dispatch<SetStateAction<IFormData>>;
	errorKeys: Partial<Record<keyof IFormData, TranslationKey>>;
	serverErrorKeys: Partial<Record<keyof IFormData, TranslationKey>>;
	onSubmit: () => void;
	hasError: boolean;
	currentIndex: number;
	onUpdatePhone: () => void;
	setIsPhoneAlreadyExists: Dispatch<SetStateAction<boolean>>;
}

export const useMobileNumberRegistration = (): IUseMobileNumberRegistration => {
	const history = useHistory();
	const { isValidPhoneNumber, removeZeroPrefix } = useRegisterValidations();

	const [currentIndex] = useState(0);
	const { register } = usePhone();
	const { getDeviceId } = useDevice();
	const [error, setError] = useState<InvalidFormSubmissionError>();
	const [isPhoneAlreadyExists, setIsPhoneAlreadyExists] = useState(false);
	const [formData, setFormData] = useState<IFormData>({
		phone: "",
	});
	const { registerPhone } = useRegistration();

	const errorKeys = useMemo<
		Partial<Record<keyof IFormData, TranslationKey>>
	>(() => {
		if (!isValidPhoneNumber(formData.phone)) {
			return {
				phone: "joinNowPage.mobileNumberRegistration.errorMessage.invalidMobileNumber",
			};
		} else if (isPhoneAlreadyExists) {
			return {
				phone: "joinNowPage.mobileNumberRegistration.errorMessage.alreadyExists",
			};
		}
		return { phone: undefined };
	}, [formData.phone, isPhoneAlreadyExists, isValidPhoneNumber]);

	const hasError = Object.values(errorKeys).filter(Boolean).length > 0;

	const serverErrorKeys: Partial<Record<keyof IFormData, TranslationKey>> =
		useMemo(() => {
			if (error) {
				return error.formFieldErrors.reduce(
					(final, item) => ({
						...final,
						[item.fieldName]: item.translationKey,
					}),
					{}
				);
			}
			return {};
		}, [error]);

	const deleteVerificationEmailIssuedAt = useCallback(() => {
		localStorage.removeItem("myacuvue:email-verification-issued-at");
	}, []);

	const onSubmit = useCallback(async () => {
		const deviceId = getDeviceId();
		const isValidNumber = isValidPhoneNumber(formData.phone);
		const phoneNumber = removeZeroPrefix(formData.phone);

		if (isValidNumber && deviceId) {
			try {
				await register({
					phone: phoneNumber,
					deviceId: deviceId,
					deviceType: "web",
				});
				const otpTimerCountDownKey = `myacuvue:timer-otp:${formData.phone}`;
				if (sessionStorage.getItem(otpTimerCountDownKey)) {
					sessionStorage.removeItem(otpTimerCountDownKey);
				}
				setIsPhoneAlreadyExists(false);
				deleteVerificationEmailIssuedAt();
				history.push(`/registration/otp?phone=${formData.phone}`);
			} catch (_error) {
				if (
					isAxiosError(_error) &&
					_error.response?.status === HttpStatus.CONFLICT &&
					_error.response.data.globalError
				) {
					setIsPhoneAlreadyExists(true);
				} else if (_error instanceof InvalidFormSubmissionError) {
					setError(_error);
				}
			}
		}
	}, [
		history,
		getDeviceId,
		isValidPhoneNumber,
		formData.phone,
		removeZeroPrefix,
		register,
		deleteVerificationEmailIssuedAt,
	]);

	const onUpdatePhone = useCallback(async () => {
		const deviceId = getDeviceId();
		const isValidNumber = isValidPhoneNumber(formData.phone);
		const phoneNumber = removeZeroPrefix(formData.phone);
		if (isValidNumber && deviceId) {
			try {
				await registerPhone(phoneNumber);
				history.push(`/profile/otp?phone=${formData.phone}`);
				setIsPhoneAlreadyExists(false);
			} catch (e: any) {
				if (e.response && e.response.status === HttpStatus.CONFLICT) {
					if (e.response.data.globalError) {
						setIsPhoneAlreadyExists(true);
					}
				} else if (e instanceof InvalidFormSubmissionError) {
					setError(e);
				}
			}
		}
	}, [
		history,
		getDeviceId,
		isValidPhoneNumber,
		formData.phone,
		removeZeroPrefix,
		registerPhone,
	]);

	return {
		formData,
		setFormData,
		errorKeys,
		hasError,
		currentIndex,
		serverErrorKeys,
		onSubmit,
		onUpdatePhone,
		setIsPhoneAlreadyExists,
	};
};
