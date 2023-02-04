import { TranslationKey } from "@myacuvue_thailand_web/services";
import { useCallback } from "react";
import { useConfiguration } from "../useConfiguration";

const regexForOnlyDigits = /^[0-9]+$/;

const useAddressValidations = () => {
	const { postalCodeLength } = useConfiguration();

	const validateAddressLine1 = useCallback(
		(line1: string): TranslationKey | undefined => {
			if (!line1) {
				return "updateAddress.validation.addressLine1IsRequiredError";
			}
			if (line1.length > 35) {
				return "updateAddress.validation.addressLine1ValidationError";
			}
		},
		[]
	);

	const validateAddressLine2 = useCallback(
		(line2: string): TranslationKey | undefined => {
			if (!line2) {
				return "updateAddress.validation.addressLine2IsRequiredError";
			}
			if (line2.length > 35) {
				return "updateAddress.validation.addressLine2ValidationError";
			}
		},
		[]
	);

	const validateAddressLine3 = useCallback(
		(line3: string): TranslationKey | undefined => {
			if (!line3) {
				return "updateAddress.validation.addressLine3IsRequiredError";
			}
			if (line3.length > 35) {
				return "updateAddress.validation.addressLine3ValidationError";
			}
		},
		[]
	);

	const validateCity = useCallback(
		(city: string): TranslationKey | undefined => {
			if (!city) {
				return "updateAddress.validation.cityRequiredError";
			}
			if (city.length > 35) {
				return "updateAddress.validation.cityValidationError";
			}
		},
		[]
	);

	const validateState = useCallback(
		(state: string): TranslationKey | undefined => {
			if (!state) {
				return "updateAddress.validation.stateIsRequiredError";
			}
		},
		[]
	);

	const validateCountry = useCallback(
		(country: string): TranslationKey | undefined => {
			if (!country) {
				return "updateAddress.validation.countryIsRequiredError";
			}
			if (country.length > 35) {
				return "updateAddress.validation.countryValidationError";
			}
		},
		[]
	);

	const validatePostCode = useCallback(
		(postCode: string): TranslationKey | undefined => {
			if (!postCode) {
				return "updateAddress.validation.postalCodeIsRequiredError";
			}
			if (
				!regexForOnlyDigits.test(postCode) ||
				postCode.length > postalCodeLength
			) {
				return "updateAddress.validation.postalCodeValidationError";
			}
		},
		[postalCodeLength]
	);

	return {
		validateAddressLine1,
		validateAddressLine2,
		validateAddressLine3,
		validateCity,
		validateState,
		validateCountry,
		validatePostCode,
	};
};

export default useAddressValidations;
