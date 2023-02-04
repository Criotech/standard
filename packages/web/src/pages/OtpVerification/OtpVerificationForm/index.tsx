import { FC, useCallback, useMemo, useState } from "react";
import { Form } from "antd";
import OtpInput from "../../../components/OtpInput";
import Button, { ButtonSize, ButtonType } from "../../../components/Button";
import OtpTimerCountdown from "../../../components/OtpTimerCountdown";
import { useSessionStorage } from "../../../hooks/useSessionStorage";
import { InvalidAttemptsExceededModal } from "../InvalidAttemptsExceededModal";
import { UnexpectedErrorModal } from "../UnexpectedErrorModal";
import { OtpResentModal } from "../OtpResentModal";
import { useRegistration } from "../../../hooks/useRegistration";
import Text from "../../../components/Text";
import { useCountdown } from "../../../hooks/useCountdown";
import {
	InvalidFormSubmissionError,
	TranslationKey,
} from "@myacuvue_thailand_web/services";
import { useService } from "../../../hooks/useService";

interface IFormData {
	otp: string;
}

interface IProps {
	phone: string;
}

const OtpVerificationForm: FC<IProps> = ({ phone }) => {
	const { RegistrationService } = useService();
	const [formData, setFormData] = useState<IFormData>({ otp: "" });

	const [error, setError] = useState<InvalidFormSubmissionError>();

	const serverErrorKey = useMemo(() => {
		if (error) {
			return error.formFieldErrors[0]?.translationKey;
		}
	}, [error]);

	const errorKey = useMemo(() => {
		if (!RegistrationService.isValidOtp(formData.otp)) {
			return "otpVerificationPage.validation.requireOtp" as TranslationKey;
		}
	}, [formData, RegistrationService]);

	const { validateOtp, resendOtp } = useRegistration();

	const [isOtpResentModalOpen, setOtpResentModalOpen] = useState(false);
	const [isUnexpectedErrorModalOpen, setUnexpectedErrorModalOpen] =
		useState(false);

	const [isOtpAttemptExceedModalOpen, setOtpAttemptExceedModalOpen] =
		useState(false);

	const { seconds, reset } = useCountdown(phone, 300);
	const hasExpired = seconds <= 0;

	const phoneOtpCountKey = `otp-count-${phone}`;
	const [numberOfInvalidOtpTries, setNumberOfInvalidOtpTries] =
		useSessionStorage(phoneOtpCountKey, 0);

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

	const handleSubmit = useCallback(() => {
		if (!errorKey) {
			(async () => {
				try {
					await validateOtp(phone, formData.otp);
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
		formData,
		errorKey,
		validateOtp,
		numberOfInvalidOtpTries,
		phone,
		setNumberOfInvalidOtpTries,
		setError,
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
					<Text textKey="otpVerificationPage.resendOtp" />
				</button>{" "}
				<Text textKey="otpVerificationPage.connectLine" />
			</p>

			<Button
				className="verify-button"
				type={ButtonType.PRIMARY}
				size={ButtonSize.MEDIUM}
				htmlType="submit"
				disabled={!!errorKey || !!serverErrorKey || hasExpired}
			>
				<Text textKey="otpVerificationPage.verify" />
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
