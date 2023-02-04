import {
	Dispatch,
	useMemo,
	SetStateAction,
	useState,
	useEffect,
	useCallback,
} from "react";
import { IFormData } from "./MarketingPreferencesForm";
import {
	INotificationPreferences,
	InvalidFormSubmissionError,
	TranslationKey,
} from "@myacuvue_thailand_web/services";
import { useHistory } from "react-router-dom";
import { useSettings } from "../../hooks/useSettings";
import { useAsync } from "react-use";
import { Status, useSnackbar } from "../../hooks/useSnackbar";
import { useConfiguration } from "../../hooks/useConfiguration";

interface IUseMarketingPreference {
	formData: IFormData;
	setFormData: Dispatch<SetStateAction<IFormData>>;
	errorKeys: Partial<Record<keyof IFormData, TranslationKey>>;
	serverErrorKeys: Partial<Record<keyof IFormData, TranslationKey>>;
	onSubmit: () => void;
	onCancel: () => void;
	hasError: boolean;
	hasLineNotification: boolean;
}

export const useMarketingPreferences = (): IUseMarketingPreference => {
	const history = useHistory();
	const { showSnackbar } = useSnackbar();
	const [formData, setFormData] = useState<IFormData>({
		isCallEnabled: false,
		isPushEnabled: false,
		isEmailEnabled: false,
		isSmsEnabled: false,
		isLineEnabled: false,
	});
	const [error, setError] = useState<InvalidFormSubmissionError>();

	const { getNotificationPreferences, saveNotificationPreferences } =
		useSettings();

	const { hasLineNotification } = useConfiguration();

	const { value: notificationPreferences, loading } = useAsync(
		() => getNotificationPreferences(),
		[getNotificationPreferences]
	);

	useEffect(() => {
		if (notificationPreferences?.marketing && !loading) {
			setFormData({
				isCallEnabled:
					notificationPreferences.marketing.callEnabled ?? false,
				isPushEnabled:
					notificationPreferences.marketing.pushEnabled ?? false,
				isEmailEnabled:
					notificationPreferences.marketing.emailEnabled ?? false,
				isSmsEnabled:
					notificationPreferences.marketing.smsEnabled ?? false,
				isLineEnabled:
					notificationPreferences.marketing.lineEnabled ?? false,
			});
		}
	}, [notificationPreferences?.marketing, setFormData, loading]);

	const errorKeys = useMemo<Partial<Record<keyof IFormData, TranslationKey>>>(
		() => ({}),
		[]
	);

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

	const onSubmit = useCallback(() => {
		const saveUserNotificationPreferences: INotificationPreferences = {
			marketing: {
				callEnabled: formData.isCallEnabled,
				emailEnabled: formData.isEmailEnabled,
				smsEnabled: formData.isSmsEnabled,
				pushEnabled: formData.isPushEnabled,
			},
		};

		if (hasLineNotification && saveUserNotificationPreferences.marketing) {
			saveUserNotificationPreferences.marketing.lineEnabled =
				formData.isLineEnabled;
		}

		try {
			saveNotificationPreferences(saveUserNotificationPreferences);
			showSnackbar(
				Status.SUCCESS,
				"updateMarketingPreferencePage.successMessage"
			);
			history.push("/profile");
		} catch (_error) {
			if (_error instanceof InvalidFormSubmissionError) {
				setError(_error);
			}
		}
	}, [
		saveNotificationPreferences,
		formData,
		showSnackbar,
		history,
		hasLineNotification,
	]);

	const onCancel = () => {
		history.push("/profile");
	};

	return {
		formData,
		setFormData,
		errorKeys,
		hasError,
		serverErrorKeys,
		onSubmit,
		onCancel,
		hasLineNotification,
	};
};
