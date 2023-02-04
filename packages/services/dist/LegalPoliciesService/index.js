import { HTTPService, Language } from "../index";
const getTermsAndConditions = async (language) => {
    const url = "terms-and-conditions?language=" + language;
    const { data: { html }, } = await HTTPService.get(url);
    return html;
};
const getPrivacyPolicy = async (language) => {
    const url = "privacy-policy?language=" + language;
    const { data: { html }, } = await HTTPService.get(url);
    return html;
};
const acceptLegalTerms = async (deviceToken) => {
    const payload = {
        deviceId: "LINE:{{lineid}}",
    };
    await HTTPService.post("accept-legal-terms", payload, deviceToken);
};
const getPointsTermsAndConditions = async (language, region, sessionToken) => {
    if (language === Language.TH) {
        const { default: { html }, } = await import("./points-terms-condition-th.json");
        return html;
    }
    else {
        const { default: { html }, } = await import("./points-terms-condition-en.json");
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
