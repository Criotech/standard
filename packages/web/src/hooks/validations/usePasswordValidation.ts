import { TranslationKey } from "@myacuvue_thailand_web/services";
import { useState, useEffect } from "react";

interface IUsePasswordValidation {
	passwordCriteriasValidations: {
		hasLowercaseLetter: boolean;
		hasUppercaseLetter: boolean;
		hasNumber: boolean;
		hasMinimumLength: boolean;
	};
	validateNewPasswordConfirmation: (
		newPasswordConfirmation: string
	) => TranslationKey | undefined;
}

export const usePasswordValidation = (
	password: string
): IUsePasswordValidation => {
	const [passwordCriteriasValidations, setPasswordCriteriasValidations] =
		useState({
			hasLowercaseLetter: false,
			hasUppercaseLetter: false,
			hasNumber: false,
			hasMinimumLength: false,
		});

	useEffect(() => {
		const capitalCaseRegex = /[A-Z]/;
		const lowerCaseRegex = /[a-z]/;
		const numberRegex = /[0-9]/;

		setPasswordCriteriasValidations((prev) => ({
			...prev,
			hasLowercaseLetter: lowerCaseRegex.test(password),
			hasUppercaseLetter: capitalCaseRegex.test(password),
			hasNumber: numberRegex.test(password),
			hasMinimumLength: password.length >= 8,
		}));
	}, [password]);

	const validateNewPasswordConfirmation = (
		newPasswordConfirmation: string
	): TranslationKey | undefined => {
		if (newPasswordConfirmation !== password) {
			return "updatePasswordPage.updatePasswordForm.validations.confirmPassword";
		}
	};

	return { passwordCriteriasValidations, validateNewPasswordConfirmation };
};
