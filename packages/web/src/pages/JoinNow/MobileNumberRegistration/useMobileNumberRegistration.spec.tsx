import { renderHook, act } from "@testing-library/react-hooks";
import { useMobileNumberRegistration } from "./useMobileNumberRegistration";
import { useRegisterValidations } from "../../../hooks/validations/useRegisterValidations";
import { useConfiguration } from "../../../hooks/useConfiguration";
import {
	ConfigService,
	HttpStatus,
	InvalidFormSubmissionError,
} from "@myacuvue_thailand_web/services";
import { usePhone } from "../../../hooks/usePhone";
import { useRegistration } from "../../../hooks/useRegistration";
import { useDevice } from "../../../hooks/useDevice";

jest.mock("../../../hooks/validations/useRegisterValidations", () => ({
	useRegisterValidations: jest.fn(),
}));

jest.mock("./../../../hooks/usePhone", () => ({
	usePhone: jest.fn(),
}));

jest.mock("../../../hooks/useDevice", () => ({
	useDevice: jest.fn(),
}));

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../../hooks/useRegistration", () => ({
	useRegistration: jest.fn(),
}));

jest.mock("../../EmailVerification/useEmailVerification", () => ({
	useEmailVerification: jest.fn(),
}));

beforeEach(() => {
	(useRegisterValidations as jest.Mock).mockReturnValue({
		isValidPhoneNumber: jest.fn().mockReturnValue(true),
		removeZeroPrefix: jest.fn(),
	});

	(usePhone as jest.Mock).mockReturnValue({
		register: jest.fn(),
	});

	(useDevice as jest.Mock).mockReturnValue({
		getDeviceId: jest.fn().mockRejectedValue(true),
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		instance: ConfigService.Instance.AU,
	});

	(useRegistration as jest.Mock).mockReturnValue({
		registerPhone: jest.fn(),
	});
});

describe("useMobileNumberRegistration", () => {
	it("should return formData", async () => {
		const { result } = renderHook(() => useMobileNumberRegistration());

		expect(result.current.formData).toStrictEqual({ phone: "" });
	});

	it("should return setFormData", async () => {
		const { result } = renderHook(() => useMobileNumberRegistration());

		act(() => {
			result.current.setFormData({ phone: "1111111" });
		});

		expect(result.current.formData).toStrictEqual({ phone: "1111111" });
	});

	it("should return undefined for mobile errorKey if phone number is valid", async () => {
		(
			useRegisterValidations().isValidPhoneNumber as jest.Mock
		).mockReturnValue(true);

		const { result } = renderHook(() => useMobileNumberRegistration());

		expect(result.current.errorKeys).toStrictEqual({ phone: undefined });
	});

	it("should return errorKeys if phone number is invalid", async () => {
		(
			useRegisterValidations().isValidPhoneNumber as jest.Mock
		).mockReturnValue(false);

		const { result } = renderHook(() => useMobileNumberRegistration());

		expect(result.current.errorKeys).toStrictEqual({
			phone: "joinNowPage.mobileNumberRegistration.errorMessage.invalidMobileNumber",
		});
	});

	it("should return hasError as true if phone number is invalid", async () => {
		(
			useRegisterValidations().isValidPhoneNumber as jest.Mock
		).mockReturnValue(false);

		const { result } = renderHook(() => useMobileNumberRegistration());

		expect(result.current.hasError).toStrictEqual(true);
	});

	it("should return hasError as false if phone number is valid", async () => {
		(
			useRegisterValidations().isValidPhoneNumber as jest.Mock
		).mockReturnValue(true);

		const { result } = renderHook(() => useMobileNumberRegistration());

		expect(result.current.hasError).toStrictEqual(false);
	});

	it("should call register when onSubmit is called", async () => {
		(
			useRegisterValidations().isValidPhoneNumber as jest.Mock
		).mockReturnValue(true);

		(useDevice as jest.Mock).mockReturnValue({
			getDeviceId: jest.fn().mockResolvedValue("fakeDeviceId"),
		});

		const { register } = usePhone();

		const { result } = renderHook(() => useMobileNumberRegistration());

		act(() => {
			result.current.onSubmit();
		});

		expect(register).toHaveBeenCalled();
	});

	it("should return errorKeys if phone number already exist", async () => {
		const fakeServerError = {
			response: {
				status: HttpStatus.CONFLICT,
				data: {
					globalError: {},
				},
			},
			isAxiosError: true,
		};

		(useDevice as jest.Mock).mockReturnValue({
			getDeviceId: jest.fn().mockResolvedValue("fakeDeviceId"),
		});

		(usePhone().register as jest.Mock).mockImplementation(() => {
			throw fakeServerError;
		});

		const { result } = renderHook(() => useMobileNumberRegistration());

		act(() => {
			result.current.onSubmit();
		});

		(
			useRegisterValidations().isValidPhoneNumber as jest.Mock
		).mockReturnValue(true);

		expect(result.current.errorKeys).toStrictEqual({
			phone: "joinNowPage.mobileNumberRegistration.errorMessage.alreadyExists",
		});
	});

	it("should return serverErrorKeys", async () => {
		const payloadErrors = {
			phone: {
				"validation.any.invalid": {},
			},
		};

		const error = new InvalidFormSubmissionError(payloadErrors);

		(useDevice as jest.Mock).mockReturnValue({
			getDeviceId: jest.fn().mockResolvedValue("fakeDeviceId"),
		});

		(usePhone().register as jest.Mock).mockImplementation(() => {
			throw error;
		});

		const { result } = renderHook(() => useMobileNumberRegistration());

		act(() => {
			result.current.onSubmit();
		});

		expect(result.current.serverErrorKeys).toStrictEqual({
			phone: "validation.phone.any.invalid",
		});
	});
});

it("should call registerPhone when onUpdatePhone is called", () => {
	(useRegisterValidations().isValidPhoneNumber as jest.Mock).mockReturnValue(
		true
	);

	(useDevice as jest.Mock).mockReturnValue({
		getDeviceId: jest.fn().mockResolvedValue("fakeDeviceId"),
	});

	const { registerPhone } = useRegistration();

	const { result } = renderHook(() => useMobileNumberRegistration());

	act(() => {
		result.current.onUpdatePhone();
	});

	expect(registerPhone).toHaveBeenCalled();
});

it("should return errorKeys if phone number already exist after onUpdatePhone call", async () => {
	const fakeServerError = {
		response: {
			status: HttpStatus.CONFLICT,
			data: {
				globalError: {},
			},
		},
	};

	(useDevice as jest.Mock).mockReturnValue({
		getDeviceId: jest.fn().mockResolvedValue("fakeDeviceId"),
	});

	(useRegistration().registerPhone as jest.Mock).mockImplementation(() => {
		throw fakeServerError;
	});

	const { result } = renderHook(() => useMobileNumberRegistration());

	act(() => {
		result.current.onUpdatePhone();
	});

	(useRegisterValidations().isValidPhoneNumber as jest.Mock).mockReturnValue(
		true
	);

	expect(result.current.errorKeys).toStrictEqual({
		phone: "joinNowPage.mobileNumberRegistration.errorMessage.alreadyExists",
	});
});

it("should return serverErrorKeys after onUpdatePhone call", async () => {
	const payloadErrors = {
		phone: {
			"validation.any.invalid": {},
		},
	};

	const error = new InvalidFormSubmissionError(payloadErrors);

	(useDevice as jest.Mock).mockReturnValue({
		getDeviceId: jest.fn().mockResolvedValue("fakeDeviceId"),
	});

	(useRegistration().registerPhone as jest.Mock).mockImplementation(() => {
		throw error;
	});

	const { result } = renderHook(() => useMobileNumberRegistration());

	act(() => {
		result.current.onUpdatePhone();
	});

	expect(result.current.serverErrorKeys).toStrictEqual({
		phone: "validation.phone.any.invalid",
	});
});
