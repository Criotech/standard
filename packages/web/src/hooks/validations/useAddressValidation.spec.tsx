import { renderHook, act } from "@testing-library/react-hooks";
import useAddressValidations from "./useAddressValidation";
import { useConfiguration } from "../useConfiguration";

jest.mock("../useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		postalCodeLength: 5,
	});
});

describe("validateAddressLine1", () => {
	it("should return required error when Address line 1 is empty", () => {
		const { result } = renderHook(() => useAddressValidations());
		const validateAddressLine1Return =
			result.current.validateAddressLine1("");
		expect(validateAddressLine1Return).toBe(
			"updateAddress.validation.addressLine1IsRequiredError"
		);
	});

	it("should return validation error when Address line 1 length is greater than 35 characters", () => {
		const fakeUnitNo = "1".repeat(36);
		const { result } = renderHook(() => useAddressValidations());
		const validateAddressLine1Return =
			result.current.validateAddressLine1(fakeUnitNo);
		expect(validateAddressLine1Return).toBe(
			"updateAddress.validation.addressLine1ValidationError"
		);
	});

	it("should return undefined for valid Address line 1", () => {
		const fakeUnitNo = "100";
		const { result } = renderHook(() => useAddressValidations());
		const validateAddressLine1Return =
			result.current.validateAddressLine1(fakeUnitNo);
		expect(validateAddressLine1Return).toBe(undefined);
	});
});

describe("validateAddressLine2", () => {
	it("should return required error when Address line 2 is empty", () => {
		const { result } = renderHook(() => useAddressValidations());
		const validateAddressLine2Return =
			result.current.validateAddressLine2("");
		expect(validateAddressLine2Return).toBe(
			"updateAddress.validation.addressLine2IsRequiredError"
		);
	});

	it("should return validation error when Address line 2 length is 36 characters", () => {
		const fakeAddressLine2 = "1".repeat(36);
		const { result } = renderHook(() => useAddressValidations());
		const validateAddressLine2Return =
			result.current.validateAddressLine2(fakeAddressLine2);
		expect(validateAddressLine2Return).toBe(
			"updateAddress.validation.addressLine2ValidationError"
		);
	});

	it("should return undefined when Address line 2 length is 35 characters", () => {
		const fakeAddressLine2 = "1".repeat(35);
		const { result } = renderHook(() => useAddressValidations());
		const validateAddressLine2Return =
			result.current.validateAddressLine2(fakeAddressLine2);
		expect(validateAddressLine2Return).toBe(undefined);
	});

	it("should return undefined for valid Address line 2", () => {
		const fakeAddressLine2 = "building1";
		const { result } = renderHook(() => useAddressValidations());
		const validateAddressLine2Return =
			result.current.validateAddressLine2(fakeAddressLine2);
		expect(validateAddressLine2Return).toBe(undefined);
	});
});

describe("validateAddressLine3", () => {
	it("should return required error when Address line 3 is empty", () => {
		const { result } = renderHook(() => useAddressValidations());
		const validateAddressLine3Return =
			result.current.validateAddressLine3("");
		expect(validateAddressLine3Return).toBe(
			"updateAddress.validation.addressLine3IsRequiredError"
		);
	});

	it("should return validation error when Address line 3 length is 36 characters", () => {
		const fakeAddressLine3 = "1".repeat(36);
		const { result } = renderHook(() => useAddressValidations());
		const validateAddressLine3Return =
			result.current.validateAddressLine3(fakeAddressLine3);
		expect(validateAddressLine3Return).toBe(
			"updateAddress.validation.addressLine3ValidationError"
		);
	});

	it("should return undefined when Address line 3 length is 35 characters", () => {
		const fakeAddressLine3 = "1".repeat(35);
		const { result } = renderHook(() => useAddressValidations());
		const validateAddressLine3Return =
			result.current.validateAddressLine3(fakeAddressLine3);
		expect(validateAddressLine3Return).toBe(undefined);
	});

	it("should return undefined for valid Address line 3", () => {
		const fakeAddressLine3 = "building1";
		const { result } = renderHook(() => useAddressValidations());
		const validateAddressLine3Return =
			result.current.validateAddressLine3(fakeAddressLine3);
		expect(validateAddressLine3Return).toBe(undefined);
	});
});

describe("validateCity", () => {
	it("should return required error when city is empty", () => {
		const { result } = renderHook(() => useAddressValidations());
		const validateCityReturn = result.current.validateCity("");
		expect(validateCityReturn).toBe(
			"updateAddress.validation.cityRequiredError"
		);
	});

	it("should return validation error when city length is 36 characters", () => {
		const fakeCity = "1".repeat(36);
		const { result } = renderHook(() => useAddressValidations());
		const validateCityReturn = result.current.validateCity(fakeCity);
		expect(validateCityReturn).toBe(
			"updateAddress.validation.cityValidationError"
		);
	});

	it("should return undefined when city length is 35 characters", () => {
		const fakeCity = "1".repeat(35);
		const { result } = renderHook(() => useAddressValidations());
		const validateCityReturn = result.current.validateCity(fakeCity);
		expect(validateCityReturn).toBe(undefined);
	});

	it("should return undefined for valid city", () => {
		const fakeCity = "sub-district-1";
		const { result } = renderHook(() => useAddressValidations());
		const validateCityReturn = result.current.validateCity(fakeCity);
		expect(validateCityReturn).toBe(undefined);
	});
});

describe("validateState", () => {
	it("should return required error when state is empty", () => {
		const { result } = renderHook(() => useAddressValidations());
		const validateStateReturn = result.current.validateState("");
		expect(validateStateReturn).toBe(
			"updateAddress.validation.stateIsRequiredError"
		);
	});

	it("should return undefined when state length is 35 characters", () => {
		const fakeState = "1".repeat(35);
		const { result } = renderHook(() => useAddressValidations());
		const validateStateReturn = result.current.validateState(fakeState);
		expect(validateStateReturn).toBe(undefined);
	});

	it("should return undefined for valid state", () => {
		const fakeState = "state-1";
		const { result } = renderHook(() => useAddressValidations());
		const validateStateReturn = result.current.validateState(fakeState);
		expect(validateStateReturn).toBe(undefined);
	});
});

describe("validateCountry", () => {
	it("should return required error when country is empty", () => {
		const { result } = renderHook(() => useAddressValidations());
		const validateCountryReturn = result.current.validateCountry("");
		expect(validateCountryReturn).toBe(
			"updateAddress.validation.countryIsRequiredError"
		);
	});

	it("should return validation error when country length is 36 characters", () => {
		const fakeCountry = "1".repeat(36);
		const { result } = renderHook(() => useAddressValidations());
		const validateCountryReturn =
			result.current.validateCountry(fakeCountry);
		expect(validateCountryReturn).toBe(
			"updateAddress.validation.countryValidationError"
		);
	});

	it("should return undefined when country length is 35 characters", () => {
		const fakeCountry = "1".repeat(35);
		const { result } = renderHook(() => useAddressValidations());
		const validateCountryReturn =
			result.current.validateCountry(fakeCountry);
		expect(validateCountryReturn).toBe(undefined);
	});

	it("should return undefined for valid country", () => {
		const fakeCountry = "AUS";
		const { result } = renderHook(() => useAddressValidations());
		const validateCountryReturn =
			result.current.validateCountry(fakeCountry);
		expect(validateCountryReturn).toBe(undefined);
	});
});

describe("validatePostCode", () => {
	it("should return required error when postCode is empty", () => {
		const { result } = renderHook(() => useAddressValidations());
		const validatePostCodeReturn = result.current.validatePostCode("");
		expect(validatePostCodeReturn).toBe(
			"updateAddress.validation.postalCodeIsRequiredError"
		);
	});

	it("should return validation error when postCode is not composed of only numbers", () => {
		const fakePostCode = "fakezipcode";
		const { result } = renderHook(() => useAddressValidations());
		const validatePostCodeReturn =
			result.current.validatePostCode(fakePostCode);
		expect(validatePostCodeReturn).toBe(
			"updateAddress.validation.postalCodeValidationError"
		);
	});

	it("should return validation error when postCode length is 6 digits", () => {
		const fakePostCode = "1".repeat(6);
		const { result } = renderHook(() => useAddressValidations());
		const validatePostCodeReturn =
			result.current.validatePostCode(fakePostCode);
		expect(validatePostCodeReturn).toBe(
			"updateAddress.validation.postalCodeValidationError"
		);
	});

	it("should return undefined when postCode length is 5 digits", () => {
		const fakePostCode = "1".repeat(5);
		const { result } = renderHook(() => useAddressValidations());
		const validatePostCodeReturn =
			result.current.validatePostCode(fakePostCode);
		expect(validatePostCodeReturn).toBe(undefined);
	});

	it("should return undefined for valid postCodes", () => {
		const fakePostCode = "12345";
		const { result } = renderHook(() => useAddressValidations());
		const validatePostCodeReturn =
			result.current.validatePostCode(fakePostCode);
		expect(validatePostCodeReturn).toBe(undefined);
	});
});
