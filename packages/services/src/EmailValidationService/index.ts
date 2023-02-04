function isValidEmailAddress(emailAddress: string): boolean {
	const emailRegularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegularExpression.test(emailAddress);
}

const EmailValidationService = {
	isValidEmailAddress,
};

export default EmailValidationService;
