import { getConfig } from "../ConfigService";
import { LegalAgeRange } from "./LegalAgeRange";
import DateService from "../DateService";
const { dateSubtractingYears } = DateService;
const getLegalAgeRange = (birthMonth, birthYear) => {
    const configuration = getConfig();
    if (!birthMonth || !birthYear || !configuration) {
        return LegalAgeRange.UNDEFINED;
    }
    const { legalAge } = configuration;
    const maximumAllowedBirthDateToRegister = dateSubtractingYears(new Date(), legalAge.minorThreshold);
    const maximumAllowedBirthDateToLegalConsent = dateSubtractingYears(new Date(), legalAge.minorThresholdWithGuardian);
    const newDate = new Date(`1900-01-01`);
    newDate.setFullYear(birthYear);
    newDate.setMonth(birthMonth);
    const dateInputTimeStamp = newDate.getTime();
    const maximumAllowedBirthDateTimeStamp = maximumAllowedBirthDateToRegister.getTime();
    const maximumAllowedBirthDateToLegalConsentTimeStamp = maximumAllowedBirthDateToLegalConsent.getTime();
    if (dateInputTimeStamp > maximumAllowedBirthDateTimeStamp) {
        return LegalAgeRange.MINOR_UNABLE_TO_REGISTER;
    }
    else if (dateInputTimeStamp < maximumAllowedBirthDateTimeStamp &&
        dateInputTimeStamp > maximumAllowedBirthDateToLegalConsentTimeStamp) {
        return LegalAgeRange.MINOR_NEEDS_PARENTAL_CONSENT;
    }
    else {
        return LegalAgeRange.ADULT;
    }
};
const LegalAgeService = {
    getLegalAgeRange,
};
export default LegalAgeService;
