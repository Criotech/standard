import { getConfig } from "../ConfigService";
import StringService from "../StringService";
const isValidPhoneNumber = (phoneNumber) => {
    const configuration = getConfig();
    const { isOnlyDigits } = StringService;
    if (!configuration) {
        return false;
    }
    const isNumberStartsWithTest = !!configuration.phoneNumberStartsWith.test(phoneNumber);
    return isOnlyDigits(phoneNumber) && isNumberStartsWithTest;
};
const PhoneValidationService = {
    isValidPhoneNumber,
};
export default PhoneValidationService;
