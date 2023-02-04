import { FC, Dispatch, SetStateAction } from "react";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import Text from "../../../../components/Text";
import "./index.scss";
import Button from "../../../../components/Button";
import TrackedForm from "../../../../components/TrackedForm";
import { useFormError } from "../../../../hooks/useTracking";
import TrackedGenericInput from "../../../../components/TrackedGenericInput";

export interface IFormData {
	phone: string;
}

interface IProps {
	mobileNumberPrefix: React.ReactNode;
	formData: IFormData;
	setFormData: Dispatch<SetStateAction<IFormData>>;
	errorKeys: Partial<Record<keyof IFormData, TranslationKey>>;
	serverErrorKeys: Partial<Record<keyof IFormData, TranslationKey>>;
	onSubmit: () => void;
	isSubmitDisabled?: boolean;
	phoneLength: number;
	setIsPhoneAlreadyExists: Dispatch<SetStateAction<boolean>>;
}

const MobileNumberRegistrationForm: FC<IProps> = ({
	mobileNumberPrefix,
	formData,
	setFormData,
	errorKeys,
	serverErrorKeys,
	onSubmit,
	isSubmitDisabled,
	phoneLength,
	setIsPhoneAlreadyExists,
}) => {
	const CountryCode: FC<{}> = () => (
		<div className="country-code">{mobileNumberPrefix}</div>
	);
	const sendFormError = useFormError("register_phone");

	return (
		<TrackedForm
			trackingFormName="register_phone"
			name="mobile-number-registration-form"
			onFinish={onSubmit}
			className="mobile-number-registration-form"
			layout="vertical"
		>
			<TrackedGenericInput
				alwaysVisibleErrorKey={serverErrorKeys.phone}
				errorKey={errorKeys.phone}
				type="text"
				name="mobile-number"
				maxLength={phoneLength}
				value={formData.phone}
				onChange={(newValue) => {
					setIsPhoneAlreadyExists(false);
					setFormData({ ...formData, phone: newValue });
				}}
				prefix={<CountryCode />}
				placeholder="joinNowPage.mobileNumberRegistration.mobileNumberPlaceholder"
				label="joinNowPage.mobileNumberRegistration.mobileNumberLabel"
				sendFormError={sendFormError}
			/>

			<Button
				className="register-button"
				htmlType="submit"
				disabled={isSubmitDisabled}
			>
				<Text textKey="joinNowPage.mobileNumberRegistration.receiveOtp" />
			</Button>
		</TrackedForm>
	);
};

export default MobileNumberRegistrationForm;
