declare function isValidEmailAddress(emailAddress: string): boolean;
declare const EmailValidationService: {
    isValidEmailAddress: typeof isValidEmailAddress;
};
export default EmailValidationService;
