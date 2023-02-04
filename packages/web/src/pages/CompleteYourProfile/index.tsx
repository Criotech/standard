import { FC } from "react";
import LoadingBlock from "../../components/LoadingBlock";
import Text from "../../components/Text";
import Title from "../../components/Title";
import MyAcuvueLiteHeader from "../../components/Layout/MyAcuvueLiteHeader";
import BlockTitle from "../Dashboard/BlockTitle";
import { CompleteYourProfileForm } from "./CompleteYourProfileForm";
import "./index.scss";
import { useCompleteYourProfile } from "./useCompleteYourProfile";

const CompleteYourProfile: FC<{}> = () => {
	const {
		userProfile,
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
		isAlreadyRegisteredUser,
		userProfileIsLoading,
		hasConsentInCompleteYourProfile,
		hasLineNotification,
	} = useCompleteYourProfile();

	return (
		<div className="complete-profile">
			<MyAcuvueLiteHeader />

			{!userProfile && userProfileIsLoading && <LoadingBlock />}
			{userProfile && !userProfileIsLoading && (
				<div className="complete-profile-wrapper">
					<div className="complete-profile-header">
						<Title
							textKey="completeYourProfilePage.headerAU"
							subKey="completeYourProfilePage.subHeaderAU"
						/>
					</div>

					<div className="body-wrapper">
						<div className="message">
							<Text textKey="completeYourProfilePage.messaging" />
						</div>

						<BlockTitle
							textKey="completeYourProfilePage.form.title"
							className="form-title"
						/>

						<CompleteYourProfileForm
							email={userProfile.email!}
							phone={userProfile.phone!}
							formData={formData}
							setFormData={setFormData}
							errorKeys={errorKeys}
							serverErrorKeys={serverErrorKeys}
							handleSubmit={handleSubmit}
							toggleCallEnabled={toggleCallEnabled}
							togglePushEnabled={togglePushEnabled}
							toggleEmailEnabled={toggleEmailEnabled}
							toggleSmsEnabled={toggleSmsEnabled}
							toggleLineEnabled={toggleLineEnabled}
							isAllPreferencesChecked={isAllPreferencesChecked}
							toggleAllPreferences={toggleAllPreferences}
							isParentalConsentRequired={
								isParentalConsentRequired
							}
							marketingPreference={marketingPreference}
							hasError={hasError!}
							userProfile={userProfile}
							isFormDirty={isFormDirty}
							isAlreadyRegisteredUser={isAlreadyRegisteredUser}
							hasConsentInCompleteYourProfile={
								hasConsentInCompleteYourProfile
							}
							hasLineNotification={hasLineNotification}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default CompleteYourProfile;
