import { Language } from "../index";
declare const LegalPoliciesService: {
    getTermsAndConditions: (language: string) => Promise<string>;
    getPrivacyPolicy: (language: string) => Promise<string>;
    acceptLegalTerms: (deviceToken: string) => Promise<void>;
    getPointsTermsAndConditions: (language: Language, region: string, sessionToken: string) => Promise<string>;
};
export default LegalPoliciesService;
