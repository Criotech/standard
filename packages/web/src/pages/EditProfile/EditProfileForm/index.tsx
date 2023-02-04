import { FC, Dispatch, SetStateAction } from "react";
import { TranslationKey } from "@myacuvue_thailand_web/services";
import { Form } from "antd";
import "./index.scss";
import GenericInput from "../../../components/GenericInput";
import Button, { ButtonSize, ButtonType } from "../../../components/Button";
import Text from "../../../components/Text";
import QuestionMarkIcon from "../../../icons/QuestionMarkIcon";
import { useConfiguration } from "../../../hooks/useConfiguration";

export interface IFormData {
	firstName: string;
	lastName: string;
}

interface IProps {
	formData: IFormData;
	setFormData: Dispatch<SetStateAction<IFormData>>;
	errorKeys: Partial<Record<keyof IFormData, TranslationKey>>;
	serverErrorKeys: Partial<Record<keyof IFormData, TranslationKey>>;
	onSubmit: () => void;
	onCancel: () => void;
	isUpdateDisabled?: boolean;
	gender: TranslationKey;
	emailAddress: string;
	dateOfBirthday: string;
	className?: string;
}

const EditProfileForm: FC<IProps> = ({
	formData,
	setFormData,
	errorKeys,
	serverErrorKeys,
	onSubmit,
	isUpdateDisabled,
	gender,
	emailAddress,
	dateOfBirthday,
	onCancel,
}) => {
	const { supportEmailAddress } = useConfiguration();

	return (
		<Form
			name="edit-profile-form"
			onFinish={onSubmit}
			className="edit-profile-form"
			layout="vertical"
		>
			<div className="input-items-wrapper">
				<div className="input-wrapper">
					<GenericInput
						alwaysVisibleErrorKey={serverErrorKeys.firstName}
						errorKey={errorKeys.firstName}
						type="text"
						name="firstName"
						value={formData.firstName}
						onChange={(newValue) => {
							setFormData({ ...formData, firstName: newValue });
						}}
						placeholder="editProfilePage.form.firstNamePlaceholder"
						label="editProfilePage.form.firstNameLabel"
					/>
				</div>
				<div className="input-wrapper">
					<GenericInput
						alwaysVisibleErrorKey={serverErrorKeys.lastName}
						errorKey={errorKeys.lastName}
						type="text"
						name="lastName"
						value={formData.lastName}
						onChange={(newValue) => {
							setFormData({ ...formData, lastName: newValue });
						}}
						placeholder="editProfilePage.form.lastNamePlaceholder"
						label="editProfilePage.form.lastNameLabel"
					/>
				</div>
			</div>
			<div className="profile-detail-item">
				<label className="text-label">
					<Text textKey="editProfilePage.form.emailLabel" />:
				</label>
				<span className="text">{emailAddress}</span>
			</div>

			<div className="profile-detail-item">
				<label className="text-label">
					<Text textKey="editProfilePage.form.birthdayLabel" />:
				</label>
				<span className="text">{dateOfBirthday}</span>
			</div>

			<div className="profile-detail-item">
				<label className="text-label">
					<Text textKey="editProfilePage.form.genderLabel" />:
				</label>
				<span className="text">
					<Text textKey={gender} />
				</span>
			</div>

			<div className="member-support-text-wrapper">
				<QuestionMarkIcon color="#6C7680" />
				<span className="member-support-text">
					<Text textKey="editProfilePage.supportText.lineOne" />{" "}
					<a
						href={`mailto:${supportEmailAddress}`}
						className="member-support-email"
					>
						<Text textKey="editProfilePage.supportText.lineTwo" />
					</a>
				</span>
			</div>

			<Button
				className="update-button"
				type={ButtonType.PRIMARY}
				size={ButtonSize.MEDIUM}
				htmlType="submit"
				disabled={isUpdateDisabled}
			>
				<Text textKey="editProfilePage.form.update" />
			</Button>

			<Button
				className="cancel-button"
				type={ButtonType.OUTLINE}
				size={ButtonSize.MEDIUM}
				htmlType="button"
				onClick={onCancel}
			>
				<Text textKey="editProfilePage.form.cancel" />
			</Button>
		</Form>
	);
};

export default EditProfileForm;
