import { TranslationKey } from "@myacuvue_thailand_web/services";
import { useCallback } from "react";
import { useConfiguration } from "../useConfiguration";

const regexForOnlyDigits = /^[0-9]+$/;

const useLegacyAddressValidation = () => {
	const { postalCodeLength } = useConfiguration();

	const validateUnitNo = useCallback(
		(unitNo: string): TranslationKey | undefined => {
			if (!unitNo) {
				return "addressPage.validation.addressLine2IsRequiredError";
			}
			if (unitNo.length > 10) {
				return "addressPage.validation.addressLine2ValidationError";
			}
		},
		[]
	);

	const validateBuildingOrStreet = useCallback(
		(buildingOrStreet: string): TranslationKey | undefined => {
			if (!buildingOrStreet) {
				return "addressPage.validation.addressLine3IsRequiredError";
			}
			if (buildingOrStreet.length > 35) {
				return "addressPage.validation.addressLine3ValidationError";
			}
		},
		[]
	);

	const validateSubDistrict = useCallback(
		(subDistrict: string): TranslationKey | undefined => {
			if (!subDistrict) {
				return "addressPage.validation.addressLine1IsRequiredError";
			}
			if (subDistrict.length > 35) {
				return "addressPage.validation.addressLine1ValidationError";
			}
		},
		[]
	);

	const validateDistrict = useCallback(
		(district: string): TranslationKey | undefined => {
			if (!district) {
				return "addressPage.validation.districtIsRequiredError";
			}
			if (district.length > 35) {
				return "addressPage.validation.districtValidationError";
			}
		},
		[]
	);

	const validateZipCode = useCallback(
		(zipCode: string): TranslationKey | undefined => {
			if (!zipCode) {
				return "addressPage.validation.postalCodeIsRequiredError";
			}
			if (
				!regexForOnlyDigits.test(zipCode) ||
				zipCode.length > postalCodeLength
			) {
				return "addressPage.validation.postalCodeValidationError";
			}
		},
		[postalCodeLength]
	);

	const validateProvince = useCallback(
		(province: string): TranslationKey | undefined => {
			if (!province) {
				return "addressPage.validation.provinceIsRequiredError";
			}
		},
		[]
	);

	return {
		validateUnitNo,
		validateBuildingOrStreet,
		validateSubDistrict,
		validateDistrict,
		validateZipCode,
		validateProvince,
	};
};

export default useLegacyAddressValidation;
