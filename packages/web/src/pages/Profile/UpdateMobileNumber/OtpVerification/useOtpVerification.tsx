import {
	InvalidFormSubmissionError,
	TranslationKey,
} from "@myacuvue_thailand_web/services";
import { Dispatch, SetStateAction, useState } from "react";
import { useRegistration } from "../../../../hooks/useRegistration";
import { useQuery } from "../../../../hooks/useQuery";
import { Status, useSnackbar } from "../../../../hooks/useSnackbar";
import { useHistory } from "react-router-dom";
import { IFormData } from "./OtpVerificationForm";
import { useRegisterValidations } from "../../../../hooks/validations/useRegisterValidations";

interface IUseOtpVerification {
	formData: IFormData;
	setFormData: Dispatch<SetStateAction<IFormData>>;
	setServerErrorKey: Dispatch<SetStateAction<TranslationKey | undefined>>;
	serverErrorKey: TranslationKey | undefined;
	onSubmit: () => void;
	onGoBack: () => void;
	isSubmitDisabled: boolean;
	phone: string | null;
}

export const useOtpVerification = (): IUseOtpVerification => {
	const history = useHistory();
	const [formData, setFormData] = useState<IFormData>({
		otp: "",
	});
	const { showSnackbar } = useSnackbar();
	const [serverErrorKey, setServerErrorKey] = useState<TranslationKey>();

	const query = useQuery();
	const phone = query.get("phone");
	const { removeZeroPrefix } = useRegisterValidations();

	const { validateOtp } = useRegistration();

	const onSubmit = async () => {
		try {
			if (phone && formData.otp) {
				const phoneNumber = removeZeroPrefix(phone);

				await validateOtp(phoneNumber, formData.otp);
				const snackbarDurationInSeconds = 3;
				history.push("/profile");
				showSnackbar(
					Status.SUCCESS,
					"updateMobileNumberPage.otpVerification.successMessage",
					{},
					snackbarDurationInSeconds
				);
			}
		} catch (error) {
			if (error instanceof InvalidFormSubmissionError) {
				setServerErrorKey(error.formFieldErrors[0]?.translationKey);
			}
		}
	};

	const onGoBack = () => {
		history.push("/profile");
	};

	const isSubmitDisabled = formData.otp.length < 4;

	return {
		formData,
		setFormData,
		onSubmit,
		onGoBack,
		isSubmitDisabled,
		phone,
		serverErrorKey,
		setServerErrorKey,
	};
};
