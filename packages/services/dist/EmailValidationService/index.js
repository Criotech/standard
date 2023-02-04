function isValidEmailAddress(emailAddress) {
    const emailRegularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegularExpression.test(emailAddress);
}
const EmailValidationService = {
    isValidEmailAddress,
};
export default EmailValidationService;
