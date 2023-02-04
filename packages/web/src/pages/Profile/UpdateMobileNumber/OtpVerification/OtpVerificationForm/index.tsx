import { Dispatch, FC, SetStateAction } from "react";
import { Form } from "antd";
import {
	ClassService,
	InvalidFormSubmissionError,
	TranslationKey,
} from "@myacuvue_thailand_web/services";
import OtpInput from "../../../../../components/OtpInput";
import OtpTimerCountdown from "../../../../../components/OtpTimerCountdown";
import Text from "../../../../../components/Text";
import Button, {
	ButtonType,
	ButtonSize,
} from "../../../../../components/Button";
import "./index.scss";
import { useCountdown } from "../../../../../hooks/useCountdown";
import { useRegistration } from "../../../../../hooks/useRegistration";
import { useConfiguration } from "../../../../../hooks/useConfiguration";
import { useRegisterValidations } from "../../../../../hooks/validations/useRegisterValidations";

export interface IFormData {
	otp: string;
}

interface IProps {
	formData: IFormData;
	setFormData: Dispatch<SetStateAction<IFormData>>;
	setServerErrorKey: Dispatch<SetStateAction<TranslationKey | undefined>>;
	serverErrorKey: TranslationKey | undefined;
	phone: string;
	onSubmit: () => void;
	onCancel: () => void;
	isVerifyDisabled?: boolean;
	className?: string;
}

const OtpVerificationForm: FC<IProps> = ({
	formData,
	setFormData,
	serverErrorKey,
	phone,
	onSubmit,
	onCancel,
	isVerifyDisabled,
	className,
	setServerErrorKey,
}) => {
	const { resendOtp } = useRegistration();
	const { removeZeroPrefix } = useRegisterValidations();

	let timeInSeconds = 300;
	const { seconds, reset } = useCountdown(phone, timeInSeconds);

	const onClickResendOtp = async () => {
		try {
			const phoneNumber = removeZeroPrefix(phone);
			await resendOtp(phoneNumber);
			reset();
			setServerErrorKey(undefined);
		} catch (error) {
			if (error instanceof InvalidFormSubmissionError) {
				setServerErrorKey(error.formFieldErrors[0]?.translationKey);
			}
		}
	};

	const classNames = ClassService.createClassName(
		"acuvue-update-profile-otp-verification-form",
		className
	);

	const { countryPhoneCode } = useConfiguration();

	return (
		<div className={classNames}>
			<div className="update-profile-enter-otp">
				<Text textKey="profilePage.updateMobileNumber.otpVerification.enterOtp" />
			</div>

			<div className="update-profile-otp-sent-text">
				<Text textKey="profilePage.updateMobileNumber.otpVerification.otpSentTo" />{" "}
				<span className="phone">{`+${countryPhoneCode} ${phone}`}</span>
			</div>

			<Form name="acuvue-otp-form" onFinish={onSubmit}>
				<OtpInput
					className="update-profile-otp-input"
					alwaysVisibleErrorKey={
						seconds <= 0 ? undefined : serverErrorKey
					}
					value={formData.otp}
					onChange={(newValue: string) => {
						setFormData({ ...formData, otp: newValue });
					}}
				/>

				<OtpTimerCountdown
					expiringInMessageKey="profilePage.updateMobileNumber.otpVerification.expiring"
					totalSeconds={seconds}
					className="update-profile-otp-timer-text"
					hasExpiredMessageKey="profilePage.updateMobileNumber.otpVerification.hasExpired"
				/>

				<div className="update-profile-resend-otp">
					<Text textKey="profilePage.updateMobileNumber.otpVerification.dontReceiveOtp" />
					<button
						type="button"
						className="update-profile-resend-otp-button"
						onClick={onClickResendOtp}
					>
						<Text textKey="profilePage.updateMobileNumber.otpVerification.resendOtp" />
					</button>
				</div>

				<Button
					size={ButtonSize.MEDIUM}
					htmlType="submit"
					type={ButtonType.PRIMARY}
					disabled={isVerifyDisabled || seconds <= 0}
					className="update-profile-verify-and-goback-buttons"
				>
					<Text textKey="profilePage.updateMobileNumber.otpVerification.verify" />
				</Button>

				<Button
					onClick={onCancel}
					className="update-profile-verify-and-goback-buttons"
					size={ButtonSize.MEDIUM}
					type={ButtonType.OUTLINE}
					htmlType="button"
				>
					<Text textKey="profilePage.updateMobileNumber.otpVerification.goBack" />
				</Button>
			</Form>
		</div>
	);
};

export default OtpVerificationForm;
