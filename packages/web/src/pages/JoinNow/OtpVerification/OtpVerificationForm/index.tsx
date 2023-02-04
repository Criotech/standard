import { Dispatch, FC, SetStateAction } from "react";
import { ClassService, TranslationKey } from "@myacuvue_thailand_web/services";
import OtpInput from "../../../../components/OtpInput";
import OtpTimerCountdown from "../../../../components/OtpTimerCountdown";
import Text from "../../../../components/Text";
import Button, { ButtonType, ButtonSize } from "../../../../components/Button";
import "./index.scss";
import { usePhone } from "../../../../hooks/usePhone";
import { useDevice } from "../../../../hooks/useDevice";
import { useRegisterValidations } from "../../../../hooks/validations/useRegisterValidations";
import { useHistory } from "react-router-dom";
import { useConfiguration } from "../../../../hooks/useConfiguration";
import TrackedForm from "../../../../components/TrackedForm";
import { useFormError } from "../../../../hooks/useTracking";

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
	seconds: number;
	reset: () => void;
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
	seconds,
	reset,
	setServerErrorKey,
}) => {
	const history = useHistory();
	const { register } = usePhone();
	const { getDeviceId } = useDevice();
	const { isValidPhoneNumber, removeZeroPrefix } = useRegisterValidations();
	const { countryPhoneCode } = useConfiguration();
	const sendFormError = useFormError("otp_verification");

	const classNames = ClassService.createClassName(
		"acuvue-otp-verification-form",
		className
	);

	const onClickResendOtp = async () => {
		const deviceId = getDeviceId();
		const isValidNumber = isValidPhoneNumber(phone);
		const phoneNumber = removeZeroPrefix(phone);

		if (isValidNumber && deviceId) {
			await register({
				phone: phoneNumber,
				deviceId: deviceId,
				deviceType: "web",
			});

			setServerErrorKey(undefined);
			reset();
		} else {
			history.push("/phone-registration");
		}
	};

	return (
		<div className={classNames}>
			<div className="enter-otp">
				<Text textKey="joinNowPage.otpVerification.enterOtp" />
			</div>
			<div className="otp-sent-text">
				<Text textKey="joinNowPage.otpVerification.otpSentTo" />{" "}
				<span className="phone">
					+{countryPhoneCode} {phone}
				</span>
			</div>
			<TrackedForm
				trackingFormName="otp_verification"
				name="acuvue-otp-form"
				onFinish={onSubmit}
				className="mobile-number-registration-form"
			>
				<OtpInput
					alwaysVisibleErrorKey={
						seconds <= 0 ? undefined : serverErrorKey
					}
					onChange={(newValue: string) => {
						setFormData({ ...formData, otp: newValue });
					}}
					value={formData.otp}
					className="otp-input"
					sendFormError={sendFormError}
				/>

				<OtpTimerCountdown
					totalSeconds={seconds}
					expiringInMessageKey="joinNowPage.otpVerification.expiring"
					hasExpiredMessageKey="joinNowPage.otpVerification.hasExpired"
					className="otp-timer-text"
				/>

				<div className="resend-otp">
					<Text textKey="joinNowPage.otpVerification.dontReceiveOtp" />
					<button
						onClick={onClickResendOtp}
						type="button"
						className="resend-otp-button"
					>
						<Text textKey="joinNowPage.otpVerification.resendOtp" />
					</button>
				</div>

				<Button
					className="verify-and-goback-buttons"
					type={ButtonType.PRIMARY}
					size={ButtonSize.MEDIUM}
					htmlType="submit"
					disabled={isVerifyDisabled}
				>
					<Text textKey="joinNowPage.otpVerification.verify" />
				</Button>

				<Button
					className="verify-and-goback-buttons"
					type={ButtonType.OUTLINE}
					size={ButtonSize.MEDIUM}
					htmlType="button"
					onClick={onCancel}
				>
					<Text textKey="joinNowPage.otpVerification.goBack" />
				</Button>
			</TrackedForm>
		</div>
	);
};

export default OtpVerificationForm;
