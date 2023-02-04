import { InvalidFormSubmissionError } from "@myacuvue_thailand_web/services";
import { renderHook, act } from "@testing-library/react-hooks";
import { useDeviceToken } from "../../../contexts/DeviceTokenContext";
import { usePhone } from "../../../hooks/usePhone";
import { useQuery } from "../../../hooks/useQuery";
import { useHistory } from "react-router-dom";
import { useOtpVerification } from "./useOtpVerification";
import { useCountdown } from "../../../hooks/useCountdown";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { useRegisterValidations } from "../../../hooks/validations/useRegisterValidations";

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

jest.mock("../../../hooks/validations/useRegisterValidations", () => ({
	useRegisterValidations: jest.fn(),
}));

jest.mock("../../../hooks/useQuery", () => ({
	useQuery: jest.fn(),
}));

jest.mock("../../../hooks/usePhone", () => ({
	usePhone: jest.fn(),
}));

jest.mock("../../../contexts/DeviceTokenContext", () => ({
	useDeviceToken: jest.fn(),
}));

jest.mock("../../../hooks/useCountdown", () => ({
	useCountdown: jest.fn(),
}));

jest.mock(".../../../hooks/useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

beforeEach(() => {
	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});

	(useQuery as jest.Mock).mockReturnValue(
		new URLSearchParams("?phone=123456789")
	);

	(usePhone as jest.Mock).mockReturnValue({
		validateWithOtp: jest.fn(),
	});

	(useDeviceToken as jest.Mock).mockReturnValue({
		setDeviceToken: jest.fn(),
	});
	(useCountdown as jest.Mock).mockReturnValue({
		processSessionToken: jest.fn(),
	});

	(useAuthentication as jest.Mock).mockReturnValue({
		seconds: 0,
		reset: jest.fn(),
	});

	(useRegisterValidations as jest.Mock).mockReturnValue({
		removeZeroPrefix: jest.fn(),
	});
});

describe("useOtpVerification", () => {
	it("should return formData", async () => {
		const { result } = renderHook(() => useOtpVerification());

		expect(result.current.formData).toStrictEqual({
			otp: "",
		});
	});

	it("should return setFormData", async () => {
		const { result } = renderHook(() => useOtpVerification());

		act(() => {
			result.current.setFormData({
				otp: "1234",
			});
		});

		expect(result.current.formData).toStrictEqual({
			otp: "1234",
		});
	});

	it("should return isSubmitDisabled as true when otp is not entered", async () => {
		const { result } = renderHook(() => useOtpVerification());

		act(() => {
			result.current.setFormData({
				otp: "",
			});
		});

		expect(result.current.isSubmitDisabled).toStrictEqual(true);
	});

	it("should call history.push when calling onGoBack", async () => {
		const { result } = renderHook(() => useOtpVerification());

		act(() => {
			result.current.onGoBack();
		});

		expect(useHistory().push).toHaveBeenCalledWith("/phone-registration");
	});

	it("should call validateWithOtp on submit", async () => {
		const validateWithOtpMock = jest.fn();
		(usePhone as jest.Mock).mockReturnValue({
			validateWithOtp: validateWithOtpMock,
		});

		(useRegisterValidations as jest.Mock).mockReturnValue({
			removeZeroPrefix: jest.fn().mockReturnValue("123456789"),
		});

		const { result } = renderHook(() => useOtpVerification());

		act(() => {
			result.current.setFormData({
				otp: "1234",
			});
		});

		act(() => {
			result.current.onSubmit();
		});

		expect(validateWithOtpMock).toHaveBeenCalledWith({
			otp: "1234",
			phone: "123456789",
		});
	});

	it("should call setDeviceToken if validateWithOtp is successful", async () => {
		(usePhone as jest.Mock).mockReturnValue({
			validateWithOtp: jest
				.fn()
				.mockResolvedValue({ rawValue: "fake-device-token" }),
		});

		const { result, waitFor } = renderHook(() => useOtpVerification());

		const { setDeviceToken } = useDeviceToken();

		act(() => {
			result.current.setFormData({
				otp: "1234",
			});
		});

		act(() => {
			result.current.onSubmit();
		});

		waitFor(() => {
			expect(setDeviceToken).toHaveBeenCalledWith({
				rawValue: "fake-device-token",
			});
		});
	});

	it("should call history.push if validateWithOtp is successful", async () => {
		(usePhone as jest.Mock).mockReturnValue({
			validateWithOtp: jest
				.fn()
				.mockResolvedValue({ rawValue: "fake-device-token" }),
		});

		const { result, waitFor } = renderHook(() => useOtpVerification());

		act(() => {
			result.current.setFormData({
				otp: "1234",
			});
		});

		act(() => {
			result.current.onSubmit();
		});

		waitFor(() => {
			expect(useHistory().push).toHaveBeenCalledWith(
				"/registration/terms-and-conditions"
			);
		});
	});

	it("should return serverErrorKey", async () => {
		const payloadErrors = {
			otp: {
				"validation.any.invalid": {},
			},
		};

		const error = new InvalidFormSubmissionError(payloadErrors);

		(usePhone().validateWithOtp as jest.Mock).mockImplementation(() => {
			throw error;
		});

		const { result } = renderHook(() => useOtpVerification());

		act(() => {
			result.current.setFormData({
				otp: "1234",
			});
		});

		act(() => {
			result.current.onSubmit();
		});

		expect(result.current.serverErrorKey).toStrictEqual(
			"validation.otp.any.invalid"
		);
	});
});
