import {
	Gender,
	InvalidFormSubmissionError,
	IProfileRegistrationPayload,
	TranslationKey,
} from "@myacuvue_thailand_web/services";
import { Form } from "antd";
import { FC, useCallback, useMemo, useState } from "react";
import Button from "../../components/Button";
import GenericInput from "../../components/GenericInput";
import { Status, useSnackbar } from "../../hooks/useSnackbar";
import Text from "../../components/Text";
import { useLegacyUser } from "../../hooks/useLegacyUser";
import { useRegisterValidations } from "../../hooks/validations/useRegisterValidations";
import { useNavigate } from "react-router-dom-v5-compat";
import "./index.scss";
import GlobalNavigationPanel from "../../components/GlobalNavigationPanel";
import Header from "../../components/Layout/Header";
import { useUserProfile } from "../../contexts/UserProfileContext";

interface IFormData {
	firstName: string;
	lastName: string;
	email: string;
}

const EditProfileLegacy: FC<{}> = () => {
	const navigate = useNavigate();
	const { validateEmail, validateFirstName, validateLastName } =
		useRegisterValidations();

	const genderLabels: Record<Gender, TranslationKey> = {
		[Gender.MALE]: "editProfileLegacyPage.form.genderMaleLabel",
		[Gender.FEMALE]: "editProfileLegacyPage.form.genderFemaleLabel",
		[Gender.NON_BINARY]: "editProfileLegacyPage.form.genderNonBinaryLabel",
	};
	const { refreshUserProfile, userProfile } = useUserProfile();

	let formattedBirthday = "";
	if (userProfile) {
		formattedBirthday = `${userProfile.birthMonth}/${userProfile.birthYear}`;
	}

	let genderKey = undefined;
	if (userProfile?.gender) {
		genderKey = genderLabels[userProfile.gender];
	}

	const { updateProfile } = useLegacyUser();
	const { showSnackbar } = useSnackbar();

	const [formData, setFormData] = useState<IFormData>({
		firstName: userProfile?.firstName ?? "",
		lastName: userProfile?.lastName ?? "",
		email: userProfile?.email ?? "",
	});

	const errorKeys: Partial<Record<keyof IFormData, TranslationKey>> = useMemo(
		() => ({
			firstName: validateFirstName(formData.firstName),
			lastName: validateLastName(formData.lastName),
			email: validateEmail(formData.email),
		}),
		[formData, validateEmail, validateFirstName, validateLastName]
	);

	const [error, setError] = useState<InvalidFormSubmissionError>();

	const serverErrorKeys: Partial<Record<keyof IFormData, TranslationKey>> =
		useMemo(() => {
			if (error) {
				return error.formFieldErrors.reduce(
					(final, item) => ({
						...final,
						[item.fieldName]: item.translationKey,
					}),
					{}
				);
			}
			return {};
		}, [error]);

	const hasError = Object.values(errorKeys).filter(Boolean).length > 0;

	const handleSubmit = useCallback(async () => {
		if (!hasError) {
			try {
				await updateProfile({
					firstName: formData.firstName,
					lastName: formData.lastName,
					email: formData.email,
				} as IProfileRegistrationPayload);
				const snackbarDurationInSeconds = 3;
				showSnackbar(
					Status.SUCCESS,
					"editProfile.changesSaved",
					{},
					snackbarDurationInSeconds
				);
				refreshUserProfile();
				navigate("/profile/details");
			} catch (_error) {
				if (_error instanceof InvalidFormSubmissionError) {
					setError(_error);
				}
			}
		}
	}, [
		navigate,
		formData,
		hasError,
		updateProfile,
		setError,
		showSnackbar,
		refreshUserProfile,
	]);

	return (
		<div className="edit-profile-legacy">
			<Header titleKey="profileAndSettingsPage.editProfileDetails.title" />
			<main>
				<h1>
					<Text textKey="profileAndSettingsPage.editProfileDetails.title" />
				</h1>
				<Form
					name="edit-profile-form"
					onFinish={handleSubmit}
					layout="vertical"
					className="edit-profile-form-legacy"
				>
					<GenericInput
						errorKey={errorKeys.firstName}
						alwaysVisibleErrorKey={serverErrorKeys.firstName}
						type="text"
						name="firstName"
						value={formData.firstName}
						onChange={(newFirstNameValue) => {
							setFormData({
								...formData,
								firstName: newFirstNameValue,
							});
						}}
						maxLength={35}
						label="editProfileLegacyPage.form.firstNameLabel"
						placeholder="editProfileLegacyPage.form.firstNamePlaceholder"
					/>

					<GenericInput
						errorKey={errorKeys.lastName}
						alwaysVisibleErrorKey={serverErrorKeys.lastName}
						type="text"
						name="lastName"
						value={formData.lastName}
						onChange={(newLastNameValue) => {
							setFormData({
								...formData,
								lastName: newLastNameValue,
							});
						}}
						maxLength={35}
						label="editProfileLegacyPage.form.lastNameLabel"
						placeholder="editProfileLegacyPage.form.lastNamePlaceholder"
					/>

					<div>
						<label>
							<Text textKey="editProfileLegacyPage.form.genderLabel" />
						</label>
						<p>{genderKey && <Text textKey={genderKey} />}</p>
					</div>

					<div>
						<label>
							<Text textKey="editProfileLegacyPage.form.birthdayLabel" />
						</label>
						<p>{formattedBirthday}</p>
					</div>

					<GenericInput
						errorKey={errorKeys.email}
						alwaysVisibleErrorKey={serverErrorKeys.email}
						type="text"
						name="email"
						value={formData.email}
						onChange={(newValue) => {
							setFormData({ ...formData, email: newValue });
						}}
						placeholder="editProfileLegacyPage.form.emailPlaceholder"
						label="editProfileLegacyPage.form.emailLabel"
					/>

					<div className="save-profile-btn-container">
						<Button
							className="save-profile-btn"
							disabled={hasError}
						>
							<Text textKey="editProfile.saveChanges" />
						</Button>
					</div>
				</Form>
			</main>
			<GlobalNavigationPanel />
		</div>
	);
};

export default EditProfileLegacy;
