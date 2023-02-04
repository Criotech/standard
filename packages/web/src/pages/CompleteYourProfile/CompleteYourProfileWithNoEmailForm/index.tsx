import { FC } from "react";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import { BasicProfile } from "../BasicProfile";
import { OtherProfileDetails } from "../OtherProfileDetails";
import "./index.scss";
import { IUseCompleteYourProfile } from "../useCompleteYourProfile";
import TrackedForm from "../../../components/TrackedForm";

interface IProps
	extends Omit<
		IUseCompleteYourProfile,
		| "isRegistrationPopupOpen"
		| "setIsRegistrationPopupOpen"
		| "userProfileIsLoading"
		| "isFormDirty"
		| "isAlreadyRegisteredUser"
	> {
	email: string;
	phone: string;
}

export const CompleteYourProfileWithNoEmailForm: FC<IProps> = ({
	email,
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
	userProfile,
	hasConsentInCompleteYourProfile,
	hasLineNotification,
}) => {
	return (
		<TrackedForm
			trackingFormName="create_profile"
			name="complete-profile-with-no-email-form"
			onFinish={handleSubmit}
			className="complete-profile-with-no-email-form"
			layout="vertical"
		>
			<BasicProfile
				phone={phone}
				formData={formData}
				errorKeys={errorKeys}
				setFormData={setFormData}
				serverErrorKeys={serverErrorKeys}
			/>

			<div className="complete-profile-detail-item">
				<label className="text-label">
					<Text textKey="completeYourProfileForm.form.emailLabel" />:
				</label>
				<span className="text">{email}</span>
			</div>

			<OtherProfileDetails
				formData={formData}
				setFormData={setFormData}
				errorKeys={errorKeys}
				serverErrorKeys={serverErrorKeys}
				onToggleCallEnabled={toggleCallEnabled}
				onTogglePushEnabled={togglePushEnabled}
				onToggleEmailEnabled={toggleEmailEnabled}
				onToggleSmsEnabled={toggleSmsEnabled}
				onToggleLineEnabled={toggleLineEnabled}
				isPreferencesChecked={isAllPreferencesChecked}
				onToggleAllPreferences={toggleAllPreferences}
				isParentalConsent={isParentalConsentRequired}
				userProfile={userProfile}
				marketingPreferences={marketingPreference}
				hasLineNotification={hasLineNotification}
			/>
			{hasConsentInCompleteYourProfile && (
				<div className="email-confirmation-consent">
					<label>
						<Text textKey="completeYourProfilePage.emailConfirmationConsent" />
					</label>
				</div>
			)}

			<Button
				disabled={hasError}
				htmlType="submit"
				className="submit-button"
			>
				<Text textKey="completeYourProfileForm.button.registerLabel" />
			</Button>
		</TrackedForm>
	);
};
