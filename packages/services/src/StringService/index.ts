const isOnlyDigits = (str: string): boolean => {
	const regexForOnlyDigits = /^[0-9]+$/;
	return regexForOnlyDigits.test(str);
};

const deleteNonDigits = (text: string): string => {
	const NON_DIGIT_CHARACTER_CLASS = /\D/;
	const GLOBAL_FLAG = "g";

	const expressionForNonDigitsGlobally = new RegExp(
		NON_DIGIT_CHARACTER_CLASS,
		GLOBAL_FLAG
	);
	return text.replace(expressionForNonDigitsGlobally, "");
};

const StringService = {
	isOnlyDigits,
	deleteNonDigits,
};

export default StringService;
