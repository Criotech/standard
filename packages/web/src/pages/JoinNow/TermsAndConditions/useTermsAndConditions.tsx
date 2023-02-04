import {
	ListConsentsResponseBody,
	SaveConsentsRequestBody,
	GlobalError,
} from "@myacuvue_thailand_web/services";
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useAsync } from "react-use";
import { usePhone } from "../../../hooks/usePhone";
import { useHistory } from "react-router-dom";
import { IFormData } from "./TermsAndConditionsForm";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { useDeviceToken } from "../../../contexts/DeviceTokenContext";
import { Status, useSnackbar } from "../../../hooks/useSnackbar";

interface IUseTermsAndConditions {
	formData: Partial<IFormData>;
	setFormData: Dispatch<SetStateAction<Partial<IFormData>>>;
	onSubmit: () => void;
	onGoBack: () => void;
	currentIndex: number;
	isSubmitDisabled: boolean;
}

export const useTermsAndConditions = (): IUseTermsAndConditions => {
	const history = useHistory();
	const currentIndex = 1;
	const [formData, setFormData] = useState<Partial<IFormData>>({});
	const { showSnackbar } = useSnackbar();

	const { getConsents, saveConsents } = usePhone();

	const { processSessionToken } = useAuthentication();

	const { deleteDeviceToken } = useDeviceToken();

	const { value: consents, loading } = useAsync(
		() => getConsents(),
		[getConsents]
	);

	const getPendingConsents = useCallback(
		(_consents: ListConsentsResponseBody) => {
			return _consents.filter((consent) => !consent.accepted);
		},
		[]
	);

	const getIsConsentAccepted = useCallback(
		(
			_consents: ListConsentsResponseBody,
			consentType: ListConsentsResponseBody[0]["type"]
		) => {
			return (
				_consents.find((consent) => consent.type === consentType)
					?.accepted || false
			);
		},
		[]
	);

	const updateFormWithConsents = useCallback(
		(_consents: ListConsentsResponseBody) => {
			const _formData: Partial<IFormData> = {};
			_consents.forEach((consent) => {
				_formData[consent.type] = getIsConsentAccepted(
					_consents,
					consent.type
				);
			});
			setFormData(_formData);
		},
		[getIsConsentAccepted]
	);

	useEffect(() => {
		if (!loading && consents) {
			const pendingConsents = getPendingConsents(consents);

			if (pendingConsents.length > 0) {
				updateFormWithConsents(consents);
			} else {
				processSessionToken();
			}
		}
	}, [
		consents,
		loading,
		getPendingConsents,
		updateFormWithConsents,
		processSessionToken,
	]);

	const isSubmitDisabled = useMemo(() => {
		const availableConsentTypes: (
			| "WEB:LITE:TERMS_AND_CONDITIONS"
			| "WEB:LITE:PRIVACY_POLICY"
		)[] = [];

		Object.keys(formData).forEach((consentType) => {
			availableConsentTypes.push(
				consentType as
					| "WEB:LITE:TERMS_AND_CONDITIONS"
					| "WEB:LITE:PRIVACY_POLICY"
			);
		});
		return availableConsentTypes.reduce((acc, consentType) => {
			acc =
				!formData[
					consentType as
						| "WEB:LITE:PRIVACY_POLICY"
						| "WEB:LITE:TERMS_AND_CONDITIONS"
				] || acc;
			return acc;
		}, false);
	}, [formData]);

	const onSubmit = useCallback(async () => {
		if (!isSubmitDisabled) {
			const selectedConsents = Object.keys(formData).filter((key) => {
				return (
					formData["WEB:LITE:PRIVACY_POLICY"] ||
					formData["WEB:LITE:TERMS_AND_CONDITIONS"]
				);
			}) as SaveConsentsRequestBody;

			try {
				await saveConsents(selectedConsents);
			} catch (error) {
				if (error && error instanceof GlobalError) {
					const snackbarDurationInSeconds = 3;
					showSnackbar(
						Status.WARN,
						error.globalErrorData.translationKey,
						{},
						snackbarDurationInSeconds
					);
				}
			}
			processSessionToken();
		}
	}, [
		formData,
		isSubmitDisabled,
		processSessionToken,
		saveConsents,
		showSnackbar,
	]);

	const onGoBack = () => {
		deleteDeviceToken();
		history.push("/phone-registration");
	};

	return {
		formData,
		setFormData,
		currentIndex,
		onSubmit,
		onGoBack,
		isSubmitDisabled,
	};
};
