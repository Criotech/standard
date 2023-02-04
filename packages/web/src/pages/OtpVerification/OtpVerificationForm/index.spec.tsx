import OtpVerficationForm from ".";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRegistration } from "../../../hooks/useRegistration";
import { PayloadErrors } from "@myacuvue_thailand_web/services/dist/errors/InvalidFormSubmissionError";
import { InvalidFormSubmissionError } from "@myacuvue_thailand_web/services";
import { useCountdown } from "../../../hooks/useCountdown";
import { useService } from "../../../hooks/useService";
import { ComponentProps } from "react";
import Text from "../../../components/Text";
import { Form as AntForm } from "antd";
import OtpInput from "../../../components/OtpInput";
import OtpTimerCountdown from "../../../components/OtpTimerCountdown";
import { InvalidAttemptsExceededModal } from "../InvalidAttemptsExceededModal";
import { UnexpectedErrorModal } from "../UnexpectedErrorModal";
import { OtpResentModal } from "../OtpResentModal";

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

jest.mock("../../../components/OtpInput", () => ({
	__esModule: true,
	default: ({
		disabled,
		value,
		onChange,
		alwaysVisibleErrorKey,
	}: ComponentProps<typeof OtpInput>) => (
		<>
			<input
				data-testid="otp-input"
				disabled={disabled}
				defaultValue={value}
				onChange={onChange as any}
			/>
			<div data-testid="server-error-key">{alwaysVisibleErrorKey}</div>
		</>
	),
}));

jest.mock("../../../components/OtpTimerCountdown", () => ({
	__esModule: true,
	default: ({ totalSeconds }: ComponentProps<typeof OtpTimerCountdown>) => (
		<div data-testid="otp-timer-countdown">{totalSeconds}</div>
	),
}));

jest.mock("../InvalidAttemptsExceededModal", () => ({
	InvalidAttemptsExceededModal: ({
		isOpen,
	}: ComponentProps<typeof InvalidAttemptsExceededModal>) => (
		<div data-testid="invalid-attempts-exceeded-modal">{isOpen}</div>
	),
}));

jest.mock("../UnexpectedErrorModal", () => ({
	UnexpectedErrorModal: ({
		isOpen,
	}: ComponentProps<typeof UnexpectedErrorModal>) => (
		<div data-testid="unexpected-error-modal">{isOpen}</div>
	),
}));

jest.mock("../OtpResentModal", () => ({
	OtpResentModal: ({ isOpen }: ComponentProps<typeof OtpResentModal>) => (
		<div data-testid="otp-resent-modal">{isOpen ? "opened" : "closed"}</div>
	),
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../hooks/useRegistration", () => ({
	useRegistration: jest.fn(),
}));

jest.mock("../../../hooks/useCountdown", () => ({
	useCountdown: jest.fn(),
}));

jest.mock("../../../hooks/useService", () => ({
	useService: jest.fn(),
}));

const fakePhone = "988948883";
const fakeSeconds = "289";

describe("OtpVerficationForm", () => {
	beforeEach(() => {
		(useService as jest.Mock).mockReturnValue({
			RegistrationService: {
				isValidOtp: jest.fn().mockReturnValue(true),
			},
			ClassService: {
				createClassName: jest.fn(),
			},
		});

		(useRegistration as jest.Mock).mockReturnValue({
			resendOtp: jest.fn(),
			validateOtp: jest.fn(),
		});

		(useCountdown as jest.Mock).mockReturnValue({
			reset: jest.fn(),
			seconds: fakeSeconds,
		});
	});

	it("should render without error", () => {
		render(<OtpVerficationForm phone={fakePhone} />);
	});

	it("should render otp form", () => {
		render(<OtpVerficationForm phone={fakePhone} />);

		const otpForm = screen.getByTestId("form");
		expect(otpForm).toBeInTheDocument();
	});

	it("should render OtpResentModal", () => {
		render(<OtpVerficationForm phone={fakePhone} />);

		const otpResentModal = screen.getByTestId("otp-resent-modal");
		expect(otpResentModal).toBeInTheDocument();
	});

	it("should render UnexpectedErrorModal", () => {
		render(<OtpVerficationForm phone={fakePhone} />);

		const unexpectedErrorModal = screen.getByTestId(
			"unexpected-error-modal"
		);
		expect(unexpectedErrorModal).toBeInTheDocument();
	});

	it("should render InvalidAttemptsExceededModal", () => {
		render(<OtpVerficationForm phone={fakePhone} />);

		const invalidAttemptsExceededModal = screen.getByTestId(
			"invalid-attempts-exceeded-modal"
		);
		expect(invalidAttemptsExceededModal).toBeInTheDocument();
	});

	it("should render OtpInput", () => {
		render(<OtpVerficationForm phone={fakePhone} />);

		const otpInput = screen.getByTestId("otp-input");
		expect(otpInput).toBeInTheDocument();
	});

	it("should render OtpTimerCountdown", () => {
		render(<OtpVerficationForm phone={fakePhone} />);

		const otpTimerCountdown = screen.getByTestId("otp-timer-countdown");
		expect(otpTimerCountdown).toBeInTheDocument();
		expect(otpTimerCountdown).toHaveTextContent(fakeSeconds);
	});

	it("should render resend otp button", () => {
		render(<OtpVerficationForm phone={fakePhone} />);

		const otpResendButton = screen.getByText(
			"otpVerificationPage.resendOtp"
		);
		expect(otpResendButton).toBeInTheDocument();
	});

	it("should render otp verify submit button", () => {
		render(<OtpVerficationForm phone={fakePhone} />);

		const otpVerifyButton = screen.getByText("otpVerificationPage.verify");
		expect(otpVerifyButton).toBeInTheDocument();
		expect(otpVerifyButton).toHaveAttribute("type", "submit");
	});

	it("should disable submit button if otp is invalid", () => {
		(useService as jest.Mock).mockReturnValue({
			RegistrationService: {
				isValidOtp: jest.fn().mockReturnValue(false),
			},
			ClassService: {
				createClassName: jest.fn(),
			},
		});

		render(<OtpVerficationForm phone={fakePhone} />);

		const otpVerifyButton = screen.getByText("otpVerificationPage.verify");
		expect(otpVerifyButton).toBeDisabled();
	});

	it("should call otpResend when otpResend button is clicked", async () => {
		render(<OtpVerficationForm phone={fakePhone} />);

		const { resendOtp } = useRegistration();

		act(() => {
			const otpResendButton = screen.getByText(
				"otpVerificationPage.resendOtp"
			);
			otpResendButton.click();
		});

		await waitFor(() => {
			expect(resendOtp).toBeCalledWith(fakePhone);
		});
	});

	it("should call validateOtp when submit button is clicked", () => {
		render(<OtpVerficationForm phone={fakePhone} />);

		const { validateOtp } = useRegistration();

		const verifyButton = screen.getByText("otpVerificationPage.verify");
		verifyButton.click();
		expect(validateOtp).toHaveBeenCalled();
	});

	it("should update formData when otp input is updated", async () => {
		render(<OtpVerficationForm phone="123456789" />);

		act(() => {
			const otpInput = screen.getByTestId("otp-input");
			userEvent.click(otpInput);
			userEvent.keyboard("1");
		});

		await waitFor(() => {
			let updatedText = screen.getByTestId("otp-input");
			expect(updatedText).toHaveValue("1");
		});
	});

	it("should display serverErrorKeys if any", async () => {
		const payloadErrors = {
			phone: {
				"validation.any.invalid": {},
			},
		} as PayloadErrors;

		const error = new InvalidFormSubmissionError(payloadErrors);

		const expectedFormFieldErrors = [
			{
				fieldName: "phone",
				translationKey: "validation.phone.any.invalid",
				translationData: {},
			},
		];

		(useService as jest.Mock).mockReturnValue({
			RegistrationService: {
				isValidOtp: jest.fn().mockReturnValue(true),
			},
			ClassService: {
				createClassName: jest.fn(),
			},
		});

		(useRegistration().validateOtp as jest.Mock).mockRejectedValue(error);

		render(<OtpVerficationForm phone="123456789" />);

		const verifyButton = screen.getByText("otpVerificationPage.verify");
		expect(verifyButton).toBeDefined();
		act(() => {
			userEvent.click(verifyButton!);
		});

		await waitFor(() => {
			expect(error.formFieldErrors).toStrictEqual(
				expectedFormFieldErrors
			);
		});
	});

	it("should open otp-resent-modal when otpResend button is clicked", async () => {
		render(<OtpVerficationForm phone={fakePhone} />);

		act(() => {
			const otpResendButton = screen.getByText(
				"otpVerificationPage.resendOtp"
			);
			otpResendButton.click();
		});

		await waitFor(() => {
			let updatedText = screen.getByTestId("otp-resent-modal");
			expect(updatedText).toHaveTextContent("opened");
		});
	});
});
