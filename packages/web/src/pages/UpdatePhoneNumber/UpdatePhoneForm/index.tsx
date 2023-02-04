import { FC, useCallback, useMemo, useState } from "react";
import { Form } from "antd";
import thailandFlag from "../../../images/thailand-flag.svg";
import Text from "../../../components/Text";
import {
	InvalidFormSubmissionError,
	TranslationKey,
} from "@myacuvue_thailand_web/services";
import GenericInput from "../../../components/GenericInput";
import Button, { ButtonSize, ButtonType } from "../../../components/Button";
import "./index.scss";
import { useRegistration } from "../../../hooks/useRegistration";
import { useNavigate } from "react-router-dom-v5-compat";
import { useRegisterValidations } from "../../../hooks/validations/useRegisterValidations";

interface IFormData {
	phone: string;
}

interface IProps {
	defaultValue?: IFormData;
}

const CountryCode: FC<{}> = () => (
	<div className="country-code">
		<img src={thailandFlag} width={20} height={20} alt="Thailand Flag" />
		<span>+66</span>
	</div>
);

const UpdatePhoneForm: FC<IProps> = ({ defaultValue }) => {
	const navigate = useNavigate();
	const [error, setError] = useState<InvalidFormSubmissionError>();
	const { isValidPhoneNumber } = useRegisterValidations();
	const { registerPhone } = useRegistration();

	const serverErrorKey = useMemo(() => {
		if (error) {
			return error.formFieldErrors[0]?.translationKey;
		}
	}, [error]);

	const [formData, setFormData] = useState<IFormData>(
		defaultValue || { phone: "" }
	);

	const errorKey = useMemo<TranslationKey | undefined>(() => {
		if (!isValidPhoneNumber(formData.phone)) {
			return "validation.phone.any.invalid";
		}
	}, [formData.phone, isValidPhoneNumber]);

	const handleSubmit = useCallback(() => {
		if (!errorKey) {
			(async () => {
				try {
					await registerPhone(formData.phone);
					navigate(
						`/update-mobile/otp-verification?phone=${formData.phone}`
					);
				} catch (error) {
					if (error instanceof InvalidFormSubmissionError) {
						setError(error);
					}
				}
			})();
		}
	}, [navigate, formData, errorKey, registerPhone, setError]);

	return (
		<Form
			name="phone-form"
			onFinish={handleSubmit}
			className="update-phone-form"
		>
			<GenericInput
				alwaysVisibleErrorKey={serverErrorKey}
				errorKey={errorKey}
				type="text"
				name="phone"
				maxLength={9}
				value={formData.phone}
				onChange={(newValue) => {
					setFormData({ ...formData, phone: newValue });
					setError(undefined);
				}}
				prefix={<CountryCode />}
				placeholder="updatePhoneNumberPage.updatePhoneForm.phoneNumberPlaceholder"
				label="updatePhoneNumberPage.updatePhoneForm.phoneNumber"
			/>
			<Button
				className="next-button"
				type={ButtonType.PRIMARY}
				size={ButtonSize.MEDIUM}
				htmlType="submit"
				disabled={!!errorKey || !!serverErrorKey}
			>
				<Text textKey="updatePhoneNumberPage.verifyMobile" />
			</Button>
		</Form>
	);
};

export default UpdatePhoneForm;
