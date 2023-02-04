import { useCallback } from "react";
import { useTranslation } from "./useTranslation";
import { useAuthentication } from "./useAuthentication";
import { useLoading } from "./useLoading";
import { useService } from "./useService";

interface IUseLegalPolicies {
	getTermsAndConditions: () => Promise<string>;
	getPrivacyPolicy: () => Promise<string>;
	acceptLegalTerms: () => Promise<void>;
	getPointsTermsAndConditions: () => Promise<string>;
}

export const useLegalPolicies = (): IUseLegalPolicies => {
	const { LegalPoliciesService } = useService();
	const { language } = useTranslation();
	const { showLoading, hideLoading } = useLoading();

	const { deviceToken, sessionToken, processSessionToken } =
		useAuthentication();

	const region: string = "THA";

	const getTermsAndConditions = useCallback(async () => {
		showLoading();
		try {
			return await LegalPoliciesService.getTermsAndConditions(language);
		} finally {
			hideLoading();
		}
	}, [language, LegalPoliciesService, showLoading, hideLoading]);

	const getPrivacyPolicy = useCallback(async () => {
		showLoading();
		try {
			return await LegalPoliciesService.getPrivacyPolicy(language);
		} finally {
			hideLoading();
		}
	}, [language, LegalPoliciesService, showLoading, hideLoading]);

	const acceptLegalTerms = useCallback(async () => {
		try {
			showLoading();
			await LegalPoliciesService.acceptLegalTerms(
				deviceToken?.rawValue as string
			);
			await processSessionToken();
		} finally {
			hideLoading();
		}
	}, [
		deviceToken,
		LegalPoliciesService,
		showLoading,
		hideLoading,
		processSessionToken,
	]);

	const getPointsTermsAndConditions = useCallback(async () => {
		showLoading();
		try {
			return LegalPoliciesService.getPointsTermsAndConditions(
				language,
				region,
				sessionToken?.rawValue!
			);
		} finally {
			hideLoading();
		}
	}, [
		showLoading,
		language,
		sessionToken?.rawValue,
		hideLoading,
		LegalPoliciesService,
	]);

	return {
		getTermsAndConditions,
		getPrivacyPolicy,
		acceptLegalTerms,
		getPointsTermsAndConditions,
	};
};
