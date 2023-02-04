import { HTTPService, Language } from "../index";

interface ITCPrivacyResponse {
	html: string;
}

const getTermsAndConditions = async (language: string): Promise<string> => {
	const url = "terms-and-conditions?language=" + language;
	const {
		data: { html },
	} = await HTTPService.get<ITCPrivacyResponse>(url);
	return html;
};

const getPrivacyPolicy = async (language: string): Promise<string> => {
	const url = "privacy-policy?language=" + language;
	const {
		data: { html },
	} = await HTTPService.get<ITCPrivacyResponse>(url);
	return html;
};

const acceptLegalTerms = async (deviceToken: string): Promise<void> => {
	const payload = {
		deviceId: "LINE:{{lineid}}",
	};
	await HTTPService.post<void>("accept-legal-terms", payload, deviceToken);
};

const getPointsTermsAndConditions = async (
	language: Language,
	region: string,
	sessionToken: string
): Promise<string> => {
	if (language === Language.TH) {
		const {
			default: { html },
		} = await import("./points-terms-condition-th.json");
		return html;
	} else {
		const {
			default: { html },
		} = await import("./points-terms-condition-en.json");
		return html;
	}
};

const LegalPoliciesService = {
	getTermsAndConditions,
	getPrivacyPolicy,
	acceptLegalTerms,
	getPointsTermsAndConditions,
};

export default LegalPoliciesService;
