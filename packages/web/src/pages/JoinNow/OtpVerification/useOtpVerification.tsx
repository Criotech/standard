import {
	InvalidFormSubmissionError,
	TranslationKey,
} from "@myacuvue_thailand_web/services";
import { Dispatch, SetStateAction, useState } from "react";
import { usePhone } from "../../../hooks/usePhone";
import { useQuery } from "../../../hooks/useQuery";
import { useHistory } from "react-router-dom";
import { IFormData } from "./OtpVerificationForm";
import { useDeviceToken } from "../../../contexts/DeviceTokenContext";
import { useCountdown } from "../../../hooks/useCountdown";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { useRegisterValidations } from "../../../hooks/validations/useRegisterValidations";
import { unstable_batchedUpdates } from "react-dom";

interface IUseOtpVerification {
	formData: IFormData;
	setFormData: Dispatch<SetStateAction<IFormData>>;
	serverErrorKey: TranslationKey | undefined;
	setServerErrorKey: Dispatch<SetStateAction<TranslationKey | undefined>>;
	onSubmit: () => void;
	onGoBack: () => void;
	currentIndex: number;
	isSubmitDisabled: boolean;
	phone: string | null;
	seconds: number;
	reset: () => void;
}

export const useOtpVerification = (): IUseOtpVerification => {
	const history = useHistory();
	const currentIndex = 0;
	const [formData, setFormData] = useState<IFormData>({
		otp: "",
	});
	const { removeZeroPrefix } = useRegisterValidations();
	const [serverErrorKey, setServerErrorKey] = useState<TranslationKey>();
	const { setDeviceToken } = useDeviceToken();
	const { processSessionToken } = useAuthentication();

	const query = useQuery();
	const phone = query.get("phone");

	const { validateWithOtp } = usePhone();
	const { seconds, reset } = useCountdown(phone!, 300);

	const onSubmit = async () => {
		try {
			if (phone && formData.otp) {
				const phoneNumber = removeZeroPrefix(phone);
				const deviceToken = await validateWithOtp({
					otp: formData.otp,
					phone: phoneNumber,
				});
				if (deviceToken) {
					unstable_batchedUpdates(() => {
						setDeviceToken(deviceToken);
						processSessionToken();
					});
				}
			}
		} catch (error) {
			if (error instanceof InvalidFormSubmissionError) {
				setServerErrorKey(error.formFieldErrors[0]?.translationKey);
			}
		}
	};

	const onGoBack = () => {
		history.push("/phone-registration");
	};

	const isSubmitDisabled = formData.otp.length < 4 || seconds < 1;

	return {
		formData,
		setFormData,
		setServerErrorKey,
		currentIndex,
		onSubmit,
		onGoBack,
		isSubmitDisabled,
		phone,
		serverErrorKey,
		seconds,
		reset,
	};
};
