import { FC } from "react";
import { CompleteYourProfileWithEmailForm } from "../CompleteYourProfileWithEmailForm";
import "./index.scss";
import { ConfigService } from "@myacuvue_thailand_web/services";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { CompleteYourProfileWithNoEmailForm } from "../CompleteYourProfileWithNoEmailForm";
import { IUseCompleteYourProfile } from "../useCompleteYourProfile";

interface IProps
	extends Omit<
		IUseCompleteYourProfile,
		| "isRegistrationPopupOpen"
		| "setIsRegistrationPopupOpen"
		| "userProfileIsLoading"
	> {
	phone: string;
	email: string;
	isFormDirty: boolean;
	isAlreadyRegisteredUser: boolean;
}

const profileFormTypesMap: Record<ConfigService.ProfileForm, FC<IProps>> = {
	[ConfigService.ProfileForm.WITH_EMAIL]: CompleteYourProfileWithEmailForm,
	[ConfigService.ProfileForm.WITH_NO_EMAIL]:
		CompleteYourProfileWithNoEmailForm,
};

export const CompleteYourProfileForm: FC<IProps> = (props) => {
	const { profileFormType } = useConfiguration();
	const CompleteYourPRofileFormByInstance =
		profileFormTypesMap[profileFormType];
	return <CompleteYourPRofileFormByInstance {...props} />;
};
