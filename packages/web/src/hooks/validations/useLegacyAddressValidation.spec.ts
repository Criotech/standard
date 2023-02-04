import { renderHook } from "@testing-library/react-hooks";
import useLegacyAddressValidation from "./useLegacyAddressValidation";
import { useConfiguration } from "../useConfiguration";

jest.mock("../useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		postalCodeLength: 5,
	});
});

describe("validateUnitNo", () => {
	it("should return required error when unit number is empty", () => {
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateUnitNoReturn = result.current.validateUnitNo("");
		expect(validateUnitNoReturn).toBe(
			"addressPage.validation.addressLine2IsRequiredError"
		);
	});

	it("should return validation error when unit number length is 11 characters", () => {
		const fakeUnitNo = "1".repeat(11);
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateUnitNoReturn = result.current.validateUnitNo(fakeUnitNo);
		expect(validateUnitNoReturn).toBe(
			"addressPage.validation.addressLine2ValidationError"
		);
	});

	it("should return undefined when unit number length is 10 characters", () => {
		const fakeUnitNo = "1".repeat(10);
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateUnitNoReturn = result.current.validateUnitNo(fakeUnitNo);
		expect(validateUnitNoReturn).toBe(undefined);
	});

	it("should return undefined for valid unit numbers", () => {
		const fakeUnitNo = "100";
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateUnitNoReturn = result.current.validateUnitNo(fakeUnitNo);
		expect(validateUnitNoReturn).toBe(undefined);
	});
});

describe("validateBuildingOrStreet", () => {
	it("should return required error when buildingOrStreet is empty", () => {
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateBuildingOrStreetReturn =
			result.current.validateBuildingOrStreet("");
		expect(validateBuildingOrStreetReturn).toBe(
			"addressPage.validation.addressLine3IsRequiredError"
		);
	});

	it("should return validation error when buildingOrStreet length is 36 characters", () => {
		const fakeBuildingOrStreet = "1".repeat(36);
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateBuildingOrStreetReturn =
			result.current.validateBuildingOrStreet(fakeBuildingOrStreet);
		expect(validateBuildingOrStreetReturn).toBe(
			"addressPage.validation.addressLine3ValidationError"
		);
	});

	it("should return undefined when buildingOrStreets length is 35 characters", () => {
		const fakeBuildingOrStreets = "1".repeat(35);
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateBuildingOrStreetReturn =
			result.current.validateBuildingOrStreet(fakeBuildingOrStreets);
		expect(validateBuildingOrStreetReturn).toBe(undefined);
	});

	it("should return undefined for valid buildingOrStreets", () => {
		const fakeBuildingOrStreet = "building1";
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateBuildingOrStreetReturn =
			result.current.validateBuildingOrStreet(fakeBuildingOrStreet);
		expect(validateBuildingOrStreetReturn).toBe(undefined);
	});
});

describe("validateSubDistrict", () => {
	it("should return required error when subDistrict is empty", () => {
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateSubDistrictReturn =
			result.current.validateSubDistrict("");
		expect(validateSubDistrictReturn).toBe(
			"addressPage.validation.addressLine1IsRequiredError"
		);
	});

	it("should return validation error when subDistrict length is 36 characters", () => {
		const fakeSubDistrict = "1".repeat(36);
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateSubDistrictReturn =
			result.current.validateSubDistrict(fakeSubDistrict);
		expect(validateSubDistrictReturn).toBe(
			"addressPage.validation.addressLine1ValidationError"
		);
	});

	it("should return undefined when subDistrict length is 35 characters", () => {
		const fakeSubDistrict = "1".repeat(35);
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateSubDistrictReturn =
			result.current.validateSubDistrict(fakeSubDistrict);
		expect(validateSubDistrictReturn).toBe(undefined);
	});

	it("should return undefined for valid subDistricts", () => {
		const fakeSubDistrict = "sub-district-1";
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateSubDistrictReturn =
			result.current.validateSubDistrict(fakeSubDistrict);
		expect(validateSubDistrictReturn).toBe(undefined);
	});
});

describe("validateDistrict", () => {
	it("should return required error when district is empty", () => {
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateDistrictReturn = result.current.validateDistrict("");
		expect(validateDistrictReturn).toBe(
			"addressPage.validation.districtIsRequiredError"
		);
	});

	it("should return validation error when district length is 36 characters", () => {
		const fakeDistrict = "1".repeat(36);
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateDistrictReturn =
			result.current.validateDistrict(fakeDistrict);
		expect(validateDistrictReturn).toBe(
			"addressPage.validation.districtValidationError"
		);
	});

	it("should return undefined when district length is 35 characters", () => {
		const fakeDistrict = "1".repeat(35);
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateDistrictReturn =
			result.current.validateDistrict(fakeDistrict);
		expect(validateDistrictReturn).toBe(undefined);
	});

	it("should return undefined for valid districts", () => {
		const fakeDistrict = "district-1";
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateDistrictReturn =
			result.current.validateDistrict(fakeDistrict);
		expect(validateDistrictReturn).toBe(undefined);
	});
});

describe("validateZipCode", () => {
	it("should return required error when zipCode is empty", () => {
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateZipCodeReturn = result.current.validateZipCode("");
		expect(validateZipCodeReturn).toBe(
			"addressPage.validation.postalCodeIsRequiredError"
		);
	});

	it("should return validation error when zipCode is not composed of only numbers", () => {
		const fakeZipCode = "fakezipcode";
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateZipCodeReturn =
			result.current.validateZipCode(fakeZipCode);
		expect(validateZipCodeReturn).toBe(
			"addressPage.validation.postalCodeValidationError"
		);
	});

	it("should return validation error when zipCode length is 6 digits", () => {
		const fakeZipCode = "1".repeat(6);
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateZipCodeReturn =
			result.current.validateZipCode(fakeZipCode);
		expect(validateZipCodeReturn).toBe(
			"addressPage.validation.postalCodeValidationError"
		);
	});

	it("should return undefined when zipCode length is 5 digits", () => {
		const fakeZipCode = "1".repeat(5);
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateZipCodeReturn =
			result.current.validateZipCode(fakeZipCode);
		expect(validateZipCodeReturn).toBe(undefined);
	});

	it("should return undefined for valid zipCodes", () => {
		const fakeZipCode = "12345";
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateZipCodeReturn =
			result.current.validateZipCode(fakeZipCode);
		expect(validateZipCodeReturn).toBe(undefined);
	});
});

describe("validateProvince", () => {
	it("should return required error when province is empty", () => {
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateProvinceReturn = result.current.validateProvince("");
		expect(validateProvinceReturn).toBe(
			"addressPage.validation.provinceIsRequiredError"
		);
	});

	it("should return undefined for valid province", () => {
		const fakeProvince = "fakeProvince";
		const { result } = renderHook(() => useLegacyAddressValidation());
		const validateProvinceReturn =
			result.current.validateProvince(fakeProvince);
		expect(validateProvinceReturn).toBe(undefined);
	});
});
