import {
	Gender,
	InvalidFormSubmissionError,
	TranslationKey,
	IProfile,
} from "@myacuvue_thailand_web/services";
import { FC, useState, useMemo, useCallback, useEffect } from "react";
import { useAsync } from "react-use";
import Footer from "../../components/Footer";
import MyAcuvueLiteHeader from "../../components/Layout/MyAcuvueLiteHeader";
import LoadingBlock from "../../components/LoadingBlock";
import Title from "../../components/Title";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { useDate } from "../../hooks/useDate";
import { Status, useSnackbar } from "../../hooks/useSnackbar";
import { useUser } from "../../hooks/useUser";
import { useRegisterValidations } from "../../hooks/validations/useRegisterValidations";
import { useHistory } from "react-router-dom";
import EditProfileForm, { IFormData } from "./EditProfileForm";
import "./index.scss";

const genderLabels: Record<Gender, TranslationKey> = {
	[Gender.MALE]: "editProfilePage.form.genderMaleLabel",
	[Gender.FEMALE]: "editProfilePage.form.genderFemaleLabel",
	[Gender.NON_BINARY]: "editProfilePage.form.genderNonBinaryLabel",
};

const EditProfile: FC<{}> = () => {
	const history = useHistory();
	const { refreshUserProfile } = useUserProfile();
	const { getProfile, saveProfile } = useUser();
	const { showSnackbar } = useSnackbar();
	const { shortDateToDisplay, getDateFromString } = useDate();

	const { value, loading } = useAsync(() => getProfile(), []);
	const userProfile = value as IProfile;

	const [formData, setFormData] = useState<IFormData>({
		firstName: "",
		lastName: "",
	});

	useEffect(() => {
		if (userProfile && !loading) {
			setFormData(userProfile);
		}
	}, [userProfile, loading]);

	const { validateFirstName, validateLastName } = useRegisterValidations();

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

	const errorKeys: Partial<Record<keyof IFormData, TranslationKey>> = useMemo(
		() => ({
			firstName: validateFirstName(formData.firstName),
			lastName: validateLastName(formData.lastName),
		}),
		[formData, validateFirstName, validateLastName]
	);

	const hasError = Object.values(errorKeys).filter(Boolean).length > 0;

	const handleSubmit = useCallback(async () => {
		if (!hasError) {
			try {
				await saveProfile({
					firstName: formData.firstName,
					lastName: formData.lastName,
				});
				const snackbarDurationInSeconds = 3;
				showSnackbar(
					Status.SUCCESS,
					"editProfilePage.successMessage",
					{},
					snackbarDurationInSeconds
				);
				refreshUserProfile();
				history.push("/profile");
			} catch (_error) {
				if (_error instanceof InvalidFormSubmissionError) {
					setError(_error);
				}
			}
		}
	}, [
		history,
		formData.firstName,
		formData.lastName,
		refreshUserProfile,
		hasError,
		saveProfile,
		showSnackbar,
	]);

	const onCancel = () => {
		history.push("/profile");
	};

	const dateOfBirthday = useMemo<string>(() => {
		if (userProfile && userProfile.birthMonth && userProfile.birthYear) {
			const yearMonthString = `${userProfile.birthYear}-${userProfile.birthMonth}`;
			const date = getDateFromString(yearMonthString);
			return shortDateToDisplay(date);
		} else {
			return "";
		}
	}, [getDateFromString, shortDateToDisplay, userProfile]);

	return (
		<div className="acuvue-edit-profile">
			<MyAcuvueLiteHeader />
			{}
			{!userProfile && loading ? (
				<LoadingBlock />
			) : (
				<div className="content-wrapper">
					<div className="edit-profile-title">
						<Title
							textKey="editProfilePage.title"
							subKey="editProfilePage.subTitle"
						/>
					</div>
					<EditProfileForm
						formData={formData}
						setFormData={setFormData}
						errorKeys={errorKeys}
						serverErrorKeys={serverErrorKeys}
						onSubmit={handleSubmit}
						dateOfBirthday={dateOfBirthday}
						emailAddress={userProfile?.email}
						gender={genderLabels[userProfile?.gender]}
						onCancel={onCancel}
						isUpdateDisabled={hasError}
					/>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default EditProfile;
