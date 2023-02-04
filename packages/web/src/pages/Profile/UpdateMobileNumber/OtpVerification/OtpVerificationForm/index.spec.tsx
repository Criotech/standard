import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OtpVerificationForm from ".";
import { ComponentProps } from "react";
import Text from "../../../../../components/Text";
import { Form as AntForm } from "antd";
import OtpTimerCountdown from "../../../../../components/OtpTimerCountdown";
import OtpInput from "../../../../../components/OtpInput";
import { useCountdown } from "../../../../../hooks/useCountdown";
import { useRegistration } from "../../../../../hooks/useRegistration";
import { useConfiguration } from "../../../../../hooks/useConfiguration";
import { InvalidFormSubmissionError } from "@myacuvue_thailand_web/services";
import { useRegisterValidations } from "../../../../../hooks/validations/useRegisterValidations";

jest.mock("antd", () => ({
	Form: ({ children, onFinish }: ComponentProps<typeof AntForm>) => (
		<form
			data-testid="form"
			onSubmit={(e) => {
				e.preventDefault();
				(onFinish as any)();
			}}
		>
			{children}
		</form>
	),
}));

jest.mock("../../../../../components/OtpInput", () => ({
	__esModule: true,
	default: ({
		disabled,
		value,
		onChange,
		alwaysVisibleErrorKey,
	}: ComponentProps<typeof OtpInput>) => (
		<>
			<input
				data-testid="update-profile-otp-input"
				disabled={disabled}
				defaultValue={value}
				onChange={onChange as any}
			/>
			<div data-testid="server-error-key">{alwaysVisibleErrorKey}</div>
		</>
	),
}));

jest.mock("../../../../../hooks/validations/useRegisterValidations", () => ({
	useRegisterValidations: jest.fn(),
}));

jest.mock("../../../../../components/OtpTimerCountdown", () => ({
	__esModule: true,
	default: ({ totalSeconds }: ComponentProps<typeof OtpTimerCountdown>) => (
		<div data-testid="otp-timer-countdown">{totalSeconds}</div>
	),
}));

jest.mock("../../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../../../hooks/useCountdown", () => ({
	useCountdown: jest.fn(),
}));

jest.mock("../../../../../hooks/useRegistration", () => ({
	useRegistration: jest.fn(),
}));

jest.mock("../../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

beforeEach(() => {
	(useCountdown as jest.Mock).mockReturnValue({
		seconds: 0,
		reset: jest.fn(),
	});

	(useRegistration as jest.Mock).mockReturnValue({
		resendOtp: jest.fn(),
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		countryPhoneCode: "61",
	});

	(useRegisterValidations as jest.Mock).mockReturnValue({
		removeZeroPrefix: jest.fn(),
	});
});

describe("OtpVerificationForm", () => {
	it("should render without errors", () => {
		render(
			<OtpVerificationForm
				formData={{ otp: "1234" }}
				onCancel={jest.fn}
				onSubmit={jest.fn}
				setServerErrorKey={jest.fn}
				phone="123456789"
				serverErrorKey={undefined}
				setFormData={jest.fn}
				isVerifyDisabled={false}
			/>
		);
	});

	it("should render otp input", () => {
		render(
			<OtpVerificationForm
				formData={{ otp: "1234" }}
				onCancel={jest.fn}
				onSubmit={jest.fn}
				setServerErrorKey={jest.fn}
				phone="123456789"
				serverErrorKey={undefined}
				setFormData={jest.fn}
				isVerifyDisabled={false}
			/>
		);

		const otpInput = screen.getByTestId("update-profile-otp-input");

		expect(otpInput).toBeInTheDocument();
	});

	it("should render OtpTimerCountdown", () => {
		render(
			<OtpVerificationForm
				formData={{ otp: "1234" }}
				onCancel={jest.fn}
				onSubmit={jest.fn}
				setServerErrorKey={jest.fn}
				phone="123456789"
				serverErrorKey={undefined}
				setFormData={jest.fn}
				isVerifyDisabled={false}
			/>
		);

		const otpTimerCountdown = screen.getByTestId("otp-timer-countdown");

		expect(otpTimerCountdown).toBeInTheDocument();
	});

	it("should trigger setFormData when otp is entered", () => {
		const fakeSetFormData = jest.fn();

		render(
			<OtpVerificationForm
				formData={{ otp: "1234" }}
				onCancel={jest.fn}
				onSubmit={jest.fn}
				setServerErrorKey={jest.fn}
				phone="123456789"
				serverErrorKey={undefined}
				setFormData={fakeSetFormData}
				isVerifyDisabled={false}
			/>
		);

		const otpInput = screen.getByTestId("update-profile-otp-input");

		userEvent.click(otpInput);
		userEvent.keyboard("1");

		expect(otpInput).toBeInTheDocument();
		expect(fakeSetFormData).toHaveBeenCalled();
	});

	it("should receive phone prop correctly", () => {
		const { container } = render(
			<OtpVerificationForm
				formData={{ otp: "1234" }}
				onCancel={jest.fn}
				onSubmit={jest.fn}
				setServerErrorKey={jest.fn}
				phone="123456789"
				serverErrorKey={undefined}
				setFormData={jest.fn}
				isVerifyDisabled={false}
			/>
		);

		const phone = container.querySelector(".phone");

		expect(phone).toBeInTheDocument();
		expect(phone).toHaveTextContent("123456789");
	});

	it("should call otpResend when otpResend button is clicked", () => {
		render(
			<OtpVerificationForm
				formData={{ otp: "1234" }}
				onCancel={jest.fn}
				onSubmit={jest.fn}
				setServerErrorKey={jest.fn}
				phone="123456789"
				serverErrorKey={undefined}
				setFormData={jest.fn}
				isVerifyDisabled={false}
			/>
		);
		const { resendOtp } = useRegistration();

		const otpResendButton = screen.getByText(
			"profilePage.updateMobileNumber.otpVerification.resendOtp"
		);
		otpResendButton.click();
		expect(resendOtp).toHaveBeenCalled();
	});

	it("should enable resend button when countdown has not expired", () => {
		(useCountdown as jest.Mock).mockReturnValue({
			seconds: 20,
			reset: jest.fn(),
		});

		const payloadErrors = {
			otp: {
				"validation.any.invalid": {},
			},
		};

		const error = new InvalidFormSubmissionError(payloadErrors);

		(useRegistration().resendOtp as jest.Mock).mockImplementation(() => {
			throw error;
		});

		render(
			<OtpVerificationForm
				formData={{ otp: "1234" }}
				onCancel={jest.fn}
				onSubmit={jest.fn}
				setServerErrorKey={jest.fn}
				phone="123456789"
				serverErrorKey={undefined}
				setFormData={jest.fn}
				isVerifyDisabled={false}
			/>
		);

		const otpResendButton = screen.getByText(
			"profilePage.updateMobileNumber.otpVerification.resendOtp"
		);

		otpResendButton.click();
		expect(otpResendButton).toBeEnabled();
	});
});
