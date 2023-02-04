import { FC } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import TrackedForm from "../../../components/TrackedForm";
import TrackedGenericInput from "../../../components/TrackedGenericInput";
import { useFormError } from "../../../hooks/useTracking";
import { useUser } from "../../../hooks/useUser";
import { BasicProfile } from "../BasicProfile";
import { OtherProfileDetails } from "../OtherProfileDetails";
import { IUseCompleteYourProfile } from "../useCompleteYourProfile";
import "./index.scss";

interface IProps
	extends Omit<
		IUseCompleteYourProfile,
		| "isRegistrationPopupOpen"
		| "setIsRegistrationPopupOpen"
		| "userProfileIsLoading"
	> {
	email: string;
	phone: string;
	isFormDirty: boolean;
	isAlreadyRegisteredUser: boolean;
}

export const CompleteYourProfileWithEmailForm: FC<IProps> = ({
	phone,
	formData,
	setFormData,
	errorKeys,
	serverErrorKeys,
	handleSubmit,
	toggleCallEnabled,
	togglePushEnabled,
	toggleEmailEnabled,
	toggleSmsEnabled,
	toggleLineEnabled,
	isAllPreferencesChecked,
	toggleAllPreferences,
	isParentalConsentRequired,
	marketingPreference,
	hasError,
	isFormDirty,
	userProfile,
	isAlreadyRegisteredUser,
	hasLineNotification,
}) => {
	const history = useHistory();
	const { updateAuthenticationDone } = useUser();

	const sendFormError = useFormError("create_profile");

	const handleSkip = () => {
		updateAuthenticationDone();
		history.push("/");
	};
	return (
		<TrackedForm
			trackingFormName="create_profile"
			name="complete-profile-with-email-form"
			onFinish={handleSubmit}
			className="complete-profile-with-email-form"
			layout="vertical"
		>
			<BasicProfile
				phone={phone}
				formData={formData}
				errorKeys={errorKeys}
				setFormData={setFormData}
				serverErrorKeys={serverErrorKeys}
			/>

			<div className="input-name">
				<TrackedGenericInput
					errorKey={errorKeys.email}
					alwaysVisibleErrorKey={serverErrorKeys?.email}
					name="email"
					type="text"
					value={formData.email || ""}
					onChange={(newValue) => {
						setFormData({ ...formData, email: newValue });
					}}
					maxLength={35}
					placeholder="completeYourProfileForm.form.emailPlaceholder"
					label="completeYourProfileForm.form.emailLabel"
					sendFormError={sendFormError}
				/>
			</div>

			<OtherProfileDetails
				onToggleAllPreferences={toggleAllPreferences}
				isPreferencesChecked={isAllPreferencesChecked}
				onToggleSmsEnabled={toggleSmsEnabled}
				onToggleEmailEnabled={toggleEmailEnabled}
				onTogglePushEnabled={togglePushEnabled}
				onToggleCallEnabled={toggleCallEnabled}
				onToggleLineEnabled={toggleLineEnabled}
				serverErrorKeys={serverErrorKeys}
				errorKeys={errorKeys}
				setFormData={setFormData}
				marketingPreferences={marketingPreference}
				isParentalConsent={isParentalConsentRequired}
				userProfile={userProfile}
				formData={formData}
				hasLineNotification={hasLineNotification}
			/>
			{isAlreadyRegisteredUser ? (
				isFormDirty ? (
					<Button
						className="submit-button"
						htmlType="submit"
						disabled={hasError}
					>
						<Text textKey="completeYourProfileForm.button.updateLabel" />
					</Button>
				) : (
					<Button className="submit-button" onClick={handleSkip}>
						<Text textKey="completeYourProfileForm.button.skipLabel" />
					</Button>
				)
			) : (
				<Button
					className="submit-button"
					htmlType="submit"
					disabled={hasError}
				>
					<Text textKey="completeYourProfileForm.button.registerLabel" />
				</Button>
			)}
		</TrackedForm>
	);
};
