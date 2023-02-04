import { InvalidFormSubmissionError } from "@myacuvue_thailand_web/services";
import { renderHook, act } from "@testing-library/react-hooks";
import { useRegistration } from "../../../../hooks/useRegistration";
import { useQuery } from "../../../../hooks/useQuery";
import { Status, useSnackbar } from "../../../../hooks/useSnackbar";
import { useHistory } from "react-router-dom";
import { useOtpVerification } from "./useOtpVerification";
import { useRegisterValidations } from "../../../../hooks/validations/useRegisterValidations";

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

jest.mock("../../../../hooks/useQuery", () => ({
	useQuery: jest.fn(),
}));

jest.mock("../../../../hooks/useSnackbar", () => ({
	useSnackbar: jest.fn(),
	Status: {
		SUCCESS: "success",
		FAILURE: "failure",
	},
}));

jest.mock("../../../../hooks/useRegistration", () => ({
	useRegistration: jest.fn(),
}));

jest.mock("../../../../hooks/validations/useRegisterValidations", () => ({
	useRegisterValidations: jest.fn(),
}));

beforeEach(() => {
	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});

	(useQuery as jest.Mock).mockReturnValue(
		new URLSearchParams("?phone=123456789")
	);

	(useRegistration as jest.Mock).mockReturnValue({
		validateOtp: jest.fn(),
	});

	(useSnackbar as jest.Mock).mockReturnValue({
		showSnackbar: jest.fn(),
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

		expect(useHistory().push).toHaveBeenCalledWith("/profile");
	});

	it("should call validateWithOtp on submit", async () => {
		const validateWithOtpMock = jest.fn();
		(useRegistration as jest.Mock).mockReturnValue({
			validateOtp: validateWithOtpMock,
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

		expect(validateWithOtpMock).toHaveBeenCalledWith("123456789", "1234");
	});

	it("should call showSnackbar if validateOtp is successful", async () => {
		const validateWithOtpMock = jest.fn();
		(useRegistration as jest.Mock).mockReturnValue({
			validateOtp: jest.fn(),
			validateWithOtpMock,
		});

		const { result, waitFor } = renderHook(() => useOtpVerification());

		const { showSnackbar } = useSnackbar();

		act(() => {
			result.current.setFormData({
				otp: "1234",
			});
		});

		act(() => {
			result.current.onSubmit();
		});
		const snackbarDurationInSeconds = 3;
		waitFor(() => {
			expect(showSnackbar).toHaveBeenCalledWith(
				Status.SUCCESS,
				"updateMobileNumberPage.otpVerification.successMessage",
				{},
				snackbarDurationInSeconds
			);
			expect(useHistory().push).toHaveBeenCalledWith("/profile");
		});
	});

	it("should return serverErrorKey", async () => {
		const payloadErrors = {
			otp: {
				"validation.any.invalid": {},
			},
		};

		const error = new InvalidFormSubmissionError(payloadErrors);

		(useRegistration().validateOtp as jest.Mock).mockImplementation(() => {
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
