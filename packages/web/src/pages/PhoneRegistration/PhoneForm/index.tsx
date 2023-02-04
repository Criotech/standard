import { FC, useCallback, useMemo, useState } from "react";
import { Form } from "antd";
import thailandFlag from "../../../images/thailand-flag.svg";
import Text from "../../../components/Text";
import { InvalidFormSubmissionError } from "@myacuvue_thailand_web/services";
import GenericInput from "../../../components/GenericInput";
import Button, { ButtonSize, ButtonType } from "../../../components/Button";
import { useRegistration } from "../../../hooks/useRegistration";
import "./index.scss";
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
		+66
	</div>
);

const PhoneForm: FC<IProps> = ({ defaultValue }) => {
	const { register } = useRegistration();
	const { isValidPhoneNumber } = useRegisterValidations();
	const [error, setError] = useState<InvalidFormSubmissionError>();

	const serverErrorKey = useMemo(() => {
		if (error) {
			return error.formFieldErrors[0]?.translationKey;
		}
	}, [error]);

	const [formData, setFormData] = useState<IFormData>(
		defaultValue || { phone: "" }
	);

	const errorKey = useMemo(() => {
		if (!isValidPhoneNumber(formData.phone)) {
			return "validation.phone.any.invalid";
		}
	}, [isValidPhoneNumber, formData.phone]);

	const handleSubmit = useCallback(() => {
		if (!errorKey) {
			(async () => {
				try {
					await register(formData.phone);
				} catch (_error) {
					if (_error instanceof InvalidFormSubmissionError) {
						setError(_error);
					}
				}
			})();
		}
	}, [formData, errorKey, register, setError]);

	return (
		<Form name="phone-form" onFinish={handleSubmit} className="phone-form">
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
				placeholder="phoneRegistrationPage.phoneForm.phoneNumberPlaceholder"
				label="phoneRegistrationPage.phoneForm.phoneNumber"
			/>
			<Button
				style={{ width: "100%" }}
				className="register-button"
				type={ButtonType.PRIMARY}
				size={ButtonSize.MEDIUM}
				htmlType="submit"
				disabled={!!errorKey || !!serverErrorKey}
			>
				<Text textKey="phoneRegistrationPage.phoneForm.next" />
			</Button>
		</Form>
	);
};

export default PhoneForm;
