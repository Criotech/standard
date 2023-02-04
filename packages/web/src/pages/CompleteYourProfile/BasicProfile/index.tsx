import { FC, useMemo } from "react";
import Text from "../../../components/Text";
import {
	CompleteYourProfileErrorKeys,
	CompleteYourProfileFormData,
	SetCompleteYourProfileFormData,
} from "../useCompleteYourProfile";
import { usePhone } from "../../../hooks/usePhone";
import "./index.scss";
import { useFormError } from "../../../hooks/useTracking";
import TrackedGenericInput from "../../../components/TrackedGenericInput";

interface IProps {
	phone: string;
	formData: CompleteYourProfileFormData;
	setFormData: SetCompleteYourProfileFormData;
	errorKeys: CompleteYourProfileErrorKeys;
	serverErrorKeys: CompleteYourProfileErrorKeys;
}

export const BasicProfile: FC<IProps> = ({
	phone,
	formData,
	setFormData,
	errorKeys,
	serverErrorKeys,
}) => {
	const { formatPhoneNumber } = usePhone();
	const sendFormError = useFormError("create_profile");

	const formattedPhoneNumber = useMemo(() => {
		return formatPhoneNumber(phone);
	}, [formatPhoneNumber, phone]);

	return (
		<div className="basic-profile">
			<div className="name-wrapper">
				<div className="input-name">
					<TrackedGenericInput
						errorKey={errorKeys.firstName}
						alwaysVisibleErrorKey={serverErrorKeys?.firstName}
						name="firstName"
						type="text"
						value={formData.firstName || ""}
						onChange={(newValue) => {
							setFormData({ ...formData, firstName: newValue });
						}}
						maxLength={35}
						placeholder="completeYourProfileForm.form.firstNamePlaceholder"
						label="completeYourProfileForm.form.firstNameLabel"
						sendFormError={sendFormError}
					/>
				</div>
				<div className="input-name">
					<TrackedGenericInput
						errorKey={errorKeys.lastName}
						alwaysVisibleErrorKey={serverErrorKeys?.lastName}
						name="lastName"
						type="text"
						value={formData.lastName || ""}
						onChange={(newValue) => {
							setFormData({ ...formData, lastName: newValue });
						}}
						maxLength={35}
						placeholder="completeYourProfileForm.form.lastNamePlaceholder"
						label="completeYourProfileForm.form.lastNameLabel"
						sendFormError={sendFormError}
					/>
				</div>
			</div>

			<div className="complete-profile-detail-item">
				<label className="text-label">
					<Text textKey="completeYourProfileForm.form.mobileNumberLabel" />
					:
				</label>
				<span className="text">{formattedPhoneNumber}</span>
			</div>
		</div>
	);
};
