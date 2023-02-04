import { FC, useCallback, useMemo, useState } from "react";
import { Form } from "antd";
import OtpInput from "../../../../components/OtpInput";
import Button, { ButtonSize, ButtonType } from "../../../../components/Button";
import OtpTimerCountdown from "../../../../components/OtpTimerCountdown";
import Text from "../../../../components/Text";
import { useCountdown } from "../../../../hooks/useCountdown";
import {
	InvalidFormSubmissionError,
	TranslationKey,
} from "@myacuvue_thailand_web/services";
import { useService } from "../../../../hooks/useService";
import { useRegistration } from "../../../../hooks/useRegistration";
import { useSessionStorage } from "../../../../hooks/useSessionStorage";
import { OtpResentModal } from "../../../OtpVerification/OtpResentModal";
import { InvalidAttemptsExceededModal } from "../../../OtpVerification/InvalidAttemptsExceededModal";
import { UnexpectedErrorModal } from "../../../OtpVerification/UnexpectedErrorModal";
import { useNavigate } from "react-router-dom-v5-compat";
import { Status, useSnackbar } from "../../../../hooks/useSnackbar";

interface IFormData {
	otp: string;
}

interface IProps {
	phone: string;
}

const OtpVerificationForm: FC<IProps> = ({ phone }) => {
	const navigate = useNavigate();
	const { RegistrationService } = useService();
	const { showSnackbar } = useSnackbar();
	const [formData, setFormData] = useState<IFormData>({ otp: "" });

	const [error, setError] = useState<InvalidFormSubmissionError>();
	const { validateOtp, resendOtp } = useRegistration();
	const [isOtpResentModalOpen, setOtpResentModalOpen] = useState(false);
	const [isUnexpectedErrorModalOpen, setUnexpectedErrorModalOpen] =
		useState(false);
	const phoneOtpCountKey = `otp-count-${phone}`;
	const [numberOfInvalidOtpTries, setNumberOfInvalidOtpTries] =
		useSessionStorage(phoneOtpCountKey, 0);
	const [isOtpAttemptExceedModalOpen, setOtpAttemptExceedModalOpen] =
		useState(false);

	const serverErrorKey = useMemo(() => {
		if (error) {
			return error.formFieldErrors[0]?.translationKey;
		}
	}, [error]);

	const errorKey = useMemo(() => {
		if (!RegistrationService.isValidOtp(formData.otp)) {
			return "updatePhoneNumberPage.validation.requireOtp" as TranslationKey;
		}
	}, [formData, RegistrationService]);

	const { seconds, reset } = useCountdown(phone, 300);
	const hasExpired = seconds <= 0;

	const handleSubmit = useCallback(() => {
		if (!errorKey) {
			(async () => {
				try {
					await validateOtp(phone, formData.otp);
					showSnackbar(
						Status.SUCCESS,
						"updatePhoneNumberPage.otpVerification.changesSaved",
						{},
						3
					);
					navigate("/profile/details");
				} catch (error) {
					if (error instanceof InvalidFormSubmissionError) {
						setError(error);
						setNumberOfInvalidOtpTries(numberOfInvalidOtpTries + 1);
						if (numberOfInvalidOtpTries > 4) {
							setOtpAttemptExceedModalOpen(true);
						}
					}
				}
			})();
		}
	}, [
		navigate,
		formData,
		errorKey,
		validateOtp,
		numberOfInvalidOtpTries,
		phone,
		setNumberOfInvalidOtpTries,
		setError,
		showSnackbar,
	]);

	const onClickResendOtp = useCallback(async () => {
		try {
			await resendOtp(phone);
			setOtpResentModalOpen(true);
			setNumberOfInvalidOtpTries(0);
			reset();
		} catch (error) {
			setUnexpectedErrorModalOpen(true);
		}
	}, [
		resendOtp,
		setOtpResentModalOpen,
		setNumberOfInvalidOtpTries,
		phone,
		reset,
	]);

	return (
		<Form name="otp-form" onFinish={handleSubmit}>
			<OtpInput
				alwaysVisibleErrorKey={serverErrorKey}
				onChange={(newValue) => {
					setFormData({ ...formData, otp: newValue });
					setError(undefined);
				}}
				value={formData.otp}
			/>

			<OtpTimerCountdown
				totalSeconds={seconds}
				expiringInMessageKey="otpTimerCountdown.expiring"
				hasExpiredMessageKey="otpTimerCountdown.hasExpired"
			/>

			<p className="otp-resend">
				<button onClick={onClickResendOtp} type="button">
					<Text textKey="updatePhoneNumberPage.otpVerification.resendOtp" />
				</button>{" "}
				<Text textKey="updatePhoneNumberPage.otpVerification.connectLine" />
			</p>

			<Button
				className="verify-button"
				type={ButtonType.PRIMARY}
				size={ButtonSize.MEDIUM}
				htmlType="submit"
				disabled={!!errorKey || !!serverErrorKey || hasExpired}
			>
				<Text textKey="updatePhoneNumberPage.otpVerification.verify" />
			</Button>

			<OtpResentModal
				isOpen={isOtpResentModalOpen}
				setOpen={setOtpResentModalOpen}
				phone={phone}
			/>

			<InvalidAttemptsExceededModal
				isOpen={isOtpAttemptExceedModalOpen}
				setOpen={setOtpAttemptExceedModalOpen}
			/>

			<UnexpectedErrorModal
				isOpen={isUnexpectedErrorModalOpen}
				setOpen={setUnexpectedErrorModalOpen}
			/>
		</Form>
	);
};

export default OtpVerificationForm;
