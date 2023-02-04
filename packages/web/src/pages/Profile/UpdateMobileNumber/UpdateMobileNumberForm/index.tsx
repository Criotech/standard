import { FC, Dispatch, SetStateAction } from "react";
import { TranslationKey } from "@myacuvue_thailand_web/services";

import Text from "../../../../components/Text";
import "./index.scss";
import Button, { ButtonType } from "../../../../components/Button";
import TrackedForm from "../../../../components/TrackedForm";
import { useFormError } from "../../../../hooks/useTracking";
import TrackedGenericInput from "../../../../components/TrackedGenericInput";

export interface IFormData {
	phone: string;
}

interface IProps {
	formData: IFormData;
	phoneNumberPrefix: React.ReactNode;
	serverErrorKeys: Partial<Record<keyof IFormData, TranslationKey>>;
	isSubmitDisabled?: boolean;
	setFormData: Dispatch<SetStateAction<IFormData>>;
	errorKeys: Partial<Record<keyof IFormData, TranslationKey>>;
	phoneLength: number;
	onSubmit: () => void;
	onCancel: () => void;
}

const UpdateMobileNumberForm: FC<IProps> = ({
	phoneNumberPrefix,
	onSubmit,
	isSubmitDisabled,
	formData,
	errorKeys,
	setFormData,
	phoneLength,
	serverErrorKeys,
	onCancel,
}) => {
	const sendFormError = useFormError("update_phone");

	return (
		<TrackedForm
			trackingFormName="update_phone"
			onFinish={onSubmit}
			className="update-mobile-number-form"
			name="update-mobile-number-form"
			layout="vertical"
		>
			<TrackedGenericInput
				errorKey={errorKeys.phone}
				alwaysVisibleErrorKey={serverErrorKeys.phone}
				type="text"
				name="phone-number"
				value={formData.phone}
				maxLength={phoneLength}
				onChange={(newValue) => {
					setFormData({ ...formData, phone: newValue });
				}}
				prefix={<div className="country-code">{phoneNumberPrefix}</div>}
				placeholder="updateProfile.updateProfileForm.mobileNumberPlaceholder"
				label="updateProfile.updateProfileForm.mobileNumberLabel"
				sendFormError={sendFormError}
			/>

			<Button
				className="receive-button"
				htmlType="submit"
				disabled={isSubmitDisabled}
			>
				<Text textKey="updateProfile.updateProfileForm.receiveOtp" />
			</Button>

			<Button
				className="cancel-button"
				htmlType="button"
				type={ButtonType.OUTLINE}
				onClick={onCancel}
			>
				<Text textKey="updateProfile.updateProfileForm.cancel" />
			</Button>
		</TrackedForm>
	);
};

export default UpdateMobileNumberForm;
