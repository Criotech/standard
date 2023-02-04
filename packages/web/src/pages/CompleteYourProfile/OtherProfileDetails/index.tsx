import {
	Gender,
	LensesUsage,
	IGetProfileResponse,
	TranslationKey,
} from "@myacuvue_thailand_web/services";
import { FC, useMemo } from "react";
import GenericSelect from "../../../components/GenericSelect";
import MonthYearInput from "../../../components/MonthYearInput";
import Text from "../../../components/Text";
import RadioGroup from "../../../components/RadioGroup";
import MarketingPreferencesComponent, {
	IMarketingPreferenceFormData,
} from "../../../components/MarketingPreferencesComponent";
import BlockTitle from "../../Dashboard/BlockTitle";
import Checkbox from "../../../components/Checkbox";
import {
	CompleteYourProfileErrorKeys,
	CompleteYourProfileFormData,
	SetCompleteYourProfileFormData,
} from "../useCompleteYourProfile";
import "./index.scss";
import { useFormError } from "../../../hooks/useTracking";
import { useConfiguration } from "../../../hooks/useConfiguration";

interface IProps {
	formData: CompleteYourProfileFormData;
	setFormData: SetCompleteYourProfileFormData;
	errorKeys: CompleteYourProfileErrorKeys;
	serverErrorKeys: CompleteYourProfileErrorKeys;
	onToggleCallEnabled: (value: boolean) => void;
	onTogglePushEnabled: (value: boolean) => void;
	onToggleEmailEnabled: (value: boolean) => void;
	onToggleSmsEnabled: (value: boolean) => void;
	onToggleLineEnabled: (value: boolean) => void;
	isPreferencesChecked: boolean;
	onToggleAllPreferences: (value: boolean) => void;
	isParentalConsent: boolean;
	userProfile: IGetProfileResponse | undefined;
	marketingPreferences: IMarketingPreferenceFormData;
	hasLineNotification: boolean;
}

interface GenderOption {
	value: Gender;
	label: TranslationKey;
}

export const OtherProfileDetails: FC<IProps> = ({
	formData,
	setFormData,
	errorKeys,
	serverErrorKeys,
	onToggleCallEnabled,
	onTogglePushEnabled,
	onToggleEmailEnabled,
	onToggleSmsEnabled,
	onToggleLineEnabled,
	isPreferencesChecked,
	onToggleAllPreferences,
	isParentalConsent,
	userProfile,
	marketingPreferences,
	hasLineNotification,
}) => {
	const currentYear = new Date().getFullYear();
	const month = formData.birthMonth
		? parseInt(formData.birthMonth)
		: undefined;
	const year = formData.birthYear ? parseInt(formData.birthYear) : undefined;
	const sendFormError = useFormError("create_profile");
	const { hasNonBinaryGenderOption } = useConfiguration();

	const genderOptions = useMemo(() => {
		const genderOptionsInternal: GenderOption[] = [
			{
				value: Gender.MALE,
				label: "completeYourProfileForm.form.genderMaleLabel",
			},
			{
				value: Gender.FEMALE,
				label: "completeYourProfileForm.form.genderFemaleLabel",
			},
		];
		if (hasNonBinaryGenderOption) {
			genderOptionsInternal.push({
				value: Gender.NON_BINARY,
				label: "completeYourProfileForm.form.genderNonBinaryLabel",
			});
		}
		return genderOptionsInternal;
	}, [hasNonBinaryGenderOption]);

	return (
		<div className="other-profile-details">
			<MonthYearInput
				minYear={1930}
				maxYear={currentYear}
				month={month}
				setMonth={(newMonth) => {
					setFormData({
						...formData,
						birthMonth: String(newMonth),
					});
				}}
				year={year}
				setYear={(newYear) => {
					setFormData({
						...formData,
						birthYear: String(newYear),
					});
				}}
				disabled={!!userProfile?.birthYear && !!userProfile?.birthMonth}
				label="completeYourProfileForm.form.birthdayLabel"
				errorKey={errorKeys.birth}
				alwaysVisibleErrorKey={serverErrorKeys.birth}
				sendFormError={sendFormError}
			/>

			{isParentalConsent && (
				<Checkbox
					checked={formData.hasParentalConsent}
					className="parental-consent-checkbox"
					onChange={(e) =>
						setFormData({
							...formData,
							hasParentalConsent: e.target.checked,
						})
					}
				>
					<Text textKey="registrationPage.validations.guardianPledgeKey" />
				</Checkbox>
			)}

			<RadioGroup<Gender>
				label="completeYourProfileForm.form.genderLabel"
				errorKey={errorKeys.gender}
				alwaysVisibleErrorKey={serverErrorKeys.gender}
				sendFormError={sendFormError}
				value={formData.gender}
				disabled={!!userProfile?.gender}
				onChange={(newValue) => {
					setFormData({ ...formData, gender: newValue });
				}}
				items={genderOptions}
			/>

			<RadioGroup<Boolean>
				label="completeYourProfileForm.form.wearSpectaclesLabel"
				errorKey={errorKeys.isSpectaclesWearer}
				alwaysVisibleErrorKey={serverErrorKeys?.isSpectaclesWearer}
				sendFormError={sendFormError}
				value={formData.isSpectaclesWearer}
				disabled={
					userProfile?.isSpectaclesWearer !== null &&
					userProfile?.isSpectaclesWearer !== undefined
				}
				onChange={(newValue) => {
					setFormData({
						...formData,
						isSpectaclesWearer: Boolean(newValue),
					});
				}}
				items={[
					{
						value: true,
						label: "completeYourProfileForm.form.wearSpectaclesYesLabel",
					},
					{
						value: false,
						label: "completeYourProfileForm.form.wearSpectaclesNoLabel",
					},
				]}
			/>

			<GenericSelect<LensesUsage>
				errorKey={errorKeys.lensesUsage}
				alwaysVisibleErrorKey={serverErrorKeys.lensesUsage}
				sendFormError={sendFormError}
				disabled={!!userProfile?.lensesUsage}
				value={formData.lensesUsage || ""}
				onChange={(newValue) => {
					setFormData({
						...formData,
						lensesUsage: newValue as LensesUsage,
					});
				}}
				label="completeYourProfileForm.form.myAcuvueBrandLenseLabel"
				placeholder="completeYourProfileForm.form.myAcuvueBrandLensePlaceholder"
				items={[
					{
						value: "NON_USER",
						label: "completeYourProfileForm.form.notWearingContactLens",
					},
					{
						value: "ACUVUE_USER",
						label: "completeYourProfileForm.form.wearingAcuvueContactLens",
					},
					{
						value: "OTHER_BRAND_USER",
						label: "completeYourProfileForm.form.wearingNonAcuvueContactLens",
					},
				]}
			/>

			<div className="marketing-preference">
				<BlockTitle
					textKey="completeYourProfileForm.form.marketingPreference.title"
					className="title"
				/>

				<div className="sub-title">
					<Text textKey="completeYourProfileForm.form.marketingPreference.subTitle" />
				</div>

				<div className="choice-title">
					<Text textKey="completeYourProfileForm.form.marketingPreference.choiceTitle" />
				</div>

				<MarketingPreferencesComponent
					formData={marketingPreferences}
					toggleCallEnabled={onToggleCallEnabled}
					togglePushEnabled={onTogglePushEnabled}
					toggleEmailEnabled={onToggleEmailEnabled}
					toggleSmsEnabled={onToggleSmsEnabled}
					toggleLineEnabled={onToggleLineEnabled}
					toggleAll={onToggleAllPreferences}
					isAllChecked={isPreferencesChecked}
					hasLineNotification={hasLineNotification}
				/>
			</div>
		</div>
	);
};
