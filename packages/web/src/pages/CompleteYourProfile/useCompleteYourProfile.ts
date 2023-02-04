import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useAsync, useEffectOnce } from "react-use";
import {
	ConfigService,
	Gender,
	IGetProfileResponse,
	INotificationPreferences,
	InvalidFormSubmissionError,
	LegalAgeRange,
	LensesUsage,
	ProfileCompleteness,
	TranslationKey,
	UpdateProfilePayload,
} from "@myacuvue_thailand_web/services";
import { IMarketingPreferenceFormData } from "../../components/MarketingPreferencesComponent";
import { useLegalAge } from "../../hooks/useLegalAge";
import { useToggleAll } from "../../hooks/useToggleAll";
import { useSettings } from "../../hooks/useSettings";
import { useRegisterValidations } from "../../hooks/validations/useRegisterValidations";
import { useUser } from "../../hooks/useUser";
import { useConfiguration } from "../../hooks/useConfiguration";
import { useHistory } from "react-router-dom";
import { useStorage } from "../../hooks/useStorage";
import { useUserProfile } from "../../contexts/UserProfileContext";
// @ts-ignore
import { shallowEqualObjects } from "shallow-equal";

export interface ICompleteProfileFormData {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	birthMonth: string;
	birthYear: string;
	gender: Gender;
	isSpectaclesWearer: boolean;
	lensesUsage: LensesUsage;
	hasParentalConsent: boolean;
}

export type CompleteYourProfileFormData = Partial<ICompleteProfileFormData>;
export type SetCompleteYourProfileFormData = Dispatch<
	SetStateAction<CompleteYourProfileFormData>
>;
type ExcludeBirthMonthYear<T> = Exclude<T, "birthMonth" | "birthYear">;
type IncludeBirth<T> = T | "birth";

type ErrorKeysKey = IncludeBirth<
	ExcludeBirthMonthYear<keyof ICompleteProfileFormData>
>;
export type CompleteYourProfileErrorKeys = Partial<
	Record<ErrorKeysKey, TranslationKey>
>;

export interface IUseCompleteYourProfile {
	formData: CompleteYourProfileFormData;
	marketingPreference: IMarketingPreferenceFormData;
	isAllPreferencesChecked: boolean;
	hasError: boolean;
	errorKeys: Partial<Record<keyof ICompleteProfileFormData, TranslationKey>>;
	serverErrorKeys: Partial<
		Record<keyof ICompleteProfileFormData, TranslationKey>
	>;
	setFormData: SetCompleteYourProfileFormData;
	toggleCallEnabled: (value: boolean) => void;
	togglePushEnabled: (value: boolean) => void;
	toggleEmailEnabled: (value: boolean) => void;
	toggleSmsEnabled: (value: boolean) => void;
	toggleLineEnabled: (value: boolean) => void;
	toggleAllPreferences: (value: boolean) => void;
	handleSubmit: () => void;

	userProfile: IGetProfileResponse | undefined;
	userProfileIsLoading: boolean;
	isParentalConsentRequired: boolean;
	isAlreadyRegisteredUser: boolean;
	isFormDirty: boolean;

	isRegistrationPopupOpen?: boolean;
	setIsRegistrationPopupOpen?: Dispatch<SetStateAction<boolean>>;
	hasConsentInCompleteYourProfile?: boolean;
	hasLineNotification: boolean;
}

export const useCompleteYourProfile = (): IUseCompleteYourProfile => {
	const history = useHistory();
	const [formData, setFormData] = useState<CompleteYourProfileFormData>({});
	const [marketingPreference, setMarketingPreference] =
		useState<IMarketingPreferenceFormData>({
			isCallEnabled: false,
			isPushEnabled: false,
			isEmailEnabled: false,
			isSmsEnabled: false,
			isLineEnabled: false,
		});
	const [error, setError] = useState<InvalidFormSubmissionError>();

	const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] =
		useStorage<boolean>("show-registration-dialog", false);

	const {
		profileFormType,
		hasConsentInCompleteYourProfile,
		hasLineNotification,
	} = useConfiguration();
	const { getLegalAgeRange } = useLegalAge();
	const { saveProfile, updateAuthenticationDone } = useUser();

	const {
		profileCompleteness,
		isLoading: userProfileIsLoading,
		userProfile,
		refreshUserProfile,
		setEmptyBefore: setWasProfileEmptyBefore,
	} = useUserProfile();

	const {
		validateFirstName,
		validateLastName,
		validateBirthday,
		validateLensesUsage,
		validateSpectableWearer,
		validateGender,
		validateEmail,
	} = useRegisterValidations();

	const { saveNotificationPreferences, getNotificationPreferences } =
		useSettings();

	const { loading: isPreferencesLoading, value: notificationPreferences } =
		useAsync(() => getNotificationPreferences(), []);

	const legalAgeRange = useMemo(() => {
		const birthMonth = formData.birthMonth
			? parseInt(formData.birthMonth)
			: undefined;
		const birthYear = formData.birthYear
			? parseInt(formData.birthYear)
			: undefined;
		return getLegalAgeRange(birthMonth, birthYear);
	}, [formData.birthMonth, formData.birthYear, getLegalAgeRange]);

	const isParentalConsentRequired =
		legalAgeRange === LegalAgeRange.MINOR_NEEDS_PARENTAL_CONSENT;

	const isAlreadyRegisteredUser = useMemo(() => {
		return profileCompleteness === ProfileCompleteness.COMPLETE;
	}, [profileCompleteness]);

	const isFormDirty = useMemo(() => {
		let isUserInfoDirty = false;
		let isNotificationPreferenceDirty = false;

		const profile = {
			birthMonth: userProfile?.birthMonth,
			birthYear: userProfile?.birthYear,
			email: userProfile?.email || undefined,
			firstName: userProfile?.firstName,
			gender: userProfile?.gender,
			isSpectaclesWearer: userProfile?.isSpectaclesWearer,
			lensesUsage: userProfile?.lensesUsage,
			phone: userProfile?.phone,
			lastName: userProfile?.lastName,
			hasParentalConsent:
				typeof userProfile?.hasParentalConsent === "boolean"
					? userProfile?.hasParentalConsent
					: undefined,
		};

		if (userProfile) {
			const isProfileFormChanged = !shallowEqualObjects(
				formData,
				profile
			);
			if (isProfileFormChanged) {
				isUserInfoDirty = true;
			}
		}

		if (notificationPreferences && notificationPreferences.marketing) {
			const {
				callEnabled,
				emailEnabled,
				pushEnabled,
				smsEnabled,
				lineEnabled,
			} = notificationPreferences.marketing;
			const {
				isCallEnabled,
				isEmailEnabled,
				isPushEnabled,
				isSmsEnabled,
				isLineEnabled,
			} = marketingPreference;
			if (
				callEnabled !== isCallEnabled ||
				emailEnabled !== isEmailEnabled ||
				pushEnabled !== isPushEnabled ||
				smsEnabled !== isSmsEnabled ||
				lineEnabled !== isLineEnabled
			) {
				isNotificationPreferenceDirty = true;
			}
		}
		return isUserInfoDirty || isNotificationPreferenceDirty;
	}, [formData, userProfile, marketingPreference, notificationPreferences]);

	useEffect(() => {
		if (!userProfileIsLoading && userProfile) {
			const newFormData: CompleteYourProfileFormData = {
				firstName: userProfile.firstName ?? undefined,
				lastName: userProfile.lastName ?? undefined,
				phone: userProfile.phone ?? undefined,
				email: userProfile.email ?? undefined,
				birthMonth: userProfile.birthMonth ?? undefined,
				birthYear: userProfile.birthYear ?? undefined,
				gender: userProfile.gender ?? undefined,
				isSpectaclesWearer: userProfile.isSpectaclesWearer ?? undefined,
				lensesUsage: userProfile.lensesUsage ?? undefined,
				hasParentalConsent: undefined,
			};
			setFormData(newFormData);
		}
	}, [userProfile, userProfileIsLoading]);

	useEffectOnce(() => {
		setWasProfileEmptyBefore(false);
	});

	useEffect(() => {
		if (
			!isPreferencesLoading &&
			notificationPreferences &&
			notificationPreferences.marketing
		) {
			const {
				callEnabled,
				pushEnabled,
				emailEnabled,
				smsEnabled,
				lineEnabled,
			} = notificationPreferences.marketing;
			setMarketingPreference({
				isCallEnabled: !!callEnabled,
				isEmailEnabled: !!emailEnabled,
				isPushEnabled: !!pushEnabled,
				isSmsEnabled: !!smsEnabled,
				isLineEnabled: !!lineEnabled,
			});
		}
	}, [notificationPreferences, isPreferencesLoading]);

	const toggleCallEnabled = useCallback(
		(value: boolean) => {
			setMarketingPreference((currentFormData) => {
				return { ...currentFormData, isCallEnabled: value };
			});
		},
		[setMarketingPreference]
	);

	const togglePushEnabled = useCallback(
		(value: boolean) => {
			setMarketingPreference((currentFormData) => {
				return { ...currentFormData, isPushEnabled: value };
			});
		},
		[setMarketingPreference]
	);

	const toggleEmailEnabled = useCallback(
		(value: boolean) => {
			setMarketingPreference((currentFormData) => {
				return { ...currentFormData, isEmailEnabled: value };
			});
		},
		[setMarketingPreference]
	);

	const toggleSmsEnabled = useCallback(
		(value: boolean) => {
			setMarketingPreference((currentFormData) => {
				return { ...currentFormData, isSmsEnabled: value };
			});
		},
		[setMarketingPreference]
	);

	const toggleLineEnabled = useCallback(
		(value: boolean) => {
			setMarketingPreference((currentFormData) => {
				return { ...currentFormData, isLineEnabled: value };
			});
		},
		[setMarketingPreference]
	);

	const completePreferences = useMemo(() => {
		const completePreferencesInternal = [
			{
				checked: marketingPreference.isCallEnabled,
				toggle: toggleCallEnabled,
			},
			{
				checked: marketingPreference.isPushEnabled,
				toggle: togglePushEnabled,
			},
			{
				checked: marketingPreference.isEmailEnabled,
				toggle: toggleEmailEnabled,
			},
			{
				checked: marketingPreference.isSmsEnabled,
				toggle: toggleSmsEnabled,
			},
		];

		if (hasLineNotification) {
			completePreferencesInternal.push({
				checked: marketingPreference.isLineEnabled,
				toggle: toggleLineEnabled,
			});
		}

		return completePreferencesInternal;
	}, [
		marketingPreference,
		hasLineNotification,
		toggleCallEnabled,
		togglePushEnabled,
		toggleEmailEnabled,
		toggleSmsEnabled,
		toggleLineEnabled,
	]);

	const [isAllPreferencesChecked, toggleAllPreferences] =
		useToggleAll(completePreferences);

	const errorKeys: CompleteYourProfileErrorKeys = useMemo(() => {
		const birthMonth = formData.birthMonth
			? parseInt(formData.birthMonth)
			: undefined;

		const birthYear = formData.birthYear
			? parseInt(formData.birthYear)
			: undefined;

		const _errorKeys: CompleteYourProfileErrorKeys = {
			firstName: validateFirstName(formData.firstName),
			lastName: validateLastName(formData.lastName),
			email: !!formData.email ? validateEmail(formData.email) : undefined,
			birth: validateBirthday(birthMonth, birthYear),
			gender: validateGender(formData.gender),
			isSpectaclesWearer: validateSpectableWearer(
				formData.isSpectaclesWearer
			),
			lensesUsage: validateLensesUsage(formData.lensesUsage),
		};
		return _errorKeys;
	}, [
		formData.birthMonth,
		formData.birthYear,
		formData.firstName,
		formData.lastName,
		formData.email,
		formData.gender,
		formData.isSpectaclesWearer,
		formData.lensesUsage,
		validateFirstName,
		validateLastName,
		validateEmail,
		validateBirthday,
		validateGender,
		validateSpectableWearer,
		validateLensesUsage,
	]);

	const serverErrorKeys: CompleteYourProfileErrorKeys = useMemo(() => {
		if (error) {
			return error?.formFieldErrors?.reduce(
				(final, item) => ({
					...final,
					[item.fieldName]: item.translationKey,
				}),
				{}
			);
		}
		return {};
	}, [error]);

	const hasError = useMemo(() => {
		if (isParentalConsentRequired && !formData.hasParentalConsent) {
			return true;
		}

		return Object.values(errorKeys).filter(Boolean).length > 0;
	}, [errorKeys, formData.hasParentalConsent, isParentalConsentRequired]);

	const handleSubmit = useCallback(async () => {
		try {
			if (!hasError) {
				const saveProfileFormData: UpdateProfilePayload = {
					firstName: formData.firstName,
					lastName: formData.lastName,
					birthMonth: formData.birthMonth,
					birthYear: formData.birthYear,
					gender: formData.gender,
					isSpectaclesWearer: formData.isSpectaclesWearer,
					lensesUsage: formData.lensesUsage,
					hasParentalConsent: formData.hasParentalConsent,
				};

				if (
					profileFormType === ConfigService.ProfileForm.WITH_EMAIL &&
					!!formData.email
				) {
					saveProfileFormData.email = formData.email;
				}

				const saveUserNotificationPreferences: INotificationPreferences =
					{
						marketing: {
							callEnabled: marketingPreference.isCallEnabled,
							emailEnabled: marketingPreference.isEmailEnabled,
							smsEnabled: marketingPreference.isSmsEnabled,
							pushEnabled: marketingPreference.isPushEnabled,
						},
					};

				if (
					hasLineNotification &&
					saveUserNotificationPreferences.marketing
				) {
					saveUserNotificationPreferences.marketing.lineEnabled =
						marketingPreference.isLineEnabled;
				}

				await Promise.all([
					saveProfile(saveProfileFormData),
					saveNotificationPreferences(
						saveUserNotificationPreferences
					),
				]);
				if (!isAlreadyRegisteredUser) {
					setIsRegistrationPopupOpen(true);
					setWasProfileEmptyBefore(true);
				}
				await refreshUserProfile();
				await updateAuthenticationDone();
				history.push("/");
			}
		} catch (_error) {
			if (_error instanceof InvalidFormSubmissionError) {
				setError(_error);
			}
		}
	}, [
		formData,
		marketingPreference,
		profileFormType,
		hasError,
		isAlreadyRegisteredUser,
		hasLineNotification,
		saveProfile,
		saveNotificationPreferences,
		setIsRegistrationPopupOpen,
		refreshUserProfile,
		updateAuthenticationDone,
		setWasProfileEmptyBefore,
		history,
	]);

	return {
		formData,
		marketingPreference,
		isAllPreferencesChecked,
		hasError,
		errorKeys,
		serverErrorKeys,
		setFormData,
		toggleCallEnabled,
		togglePushEnabled,
		toggleEmailEnabled,
		toggleSmsEnabled,
		toggleLineEnabled,
		toggleAllPreferences,
		handleSubmit,
		userProfile,
		userProfileIsLoading,
		isParentalConsentRequired,
		isAlreadyRegisteredUser,
		isFormDirty,
		isRegistrationPopupOpen,
		setIsRegistrationPopupOpen,
		hasConsentInCompleteYourProfile,
		hasLineNotification,
	};
};
