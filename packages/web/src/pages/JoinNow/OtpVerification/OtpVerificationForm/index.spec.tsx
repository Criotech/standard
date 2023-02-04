import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OtpVerificationForm from ".";
import { ComponentProps } from "react";
import Text from "../../../../components/Text";
import OtpTimerCountdown from "../../../../components/OtpTimerCountdown";
import OtpInput from "../../../../components/OtpInput";
import { useRegisterValidations } from "../../../../hooks/validations/useRegisterValidations";
import { usePhone } from "../../../../hooks/usePhone";
import { useDevice } from "../../../../hooks/useDevice";
import { useHistory } from "react-router-dom";
import { useConfiguration } from "../../../../hooks/useConfiguration";
import TrackedForm from "../../../../components/TrackedForm";

jest.mock("../../../../components/TrackedForm", () => ({
	__esModule: true,
	default: ({
		children,
		onFinish,
		trackingFormName,
	}: ComponentProps<typeof TrackedForm>) => (
		<form
			data-testid="form"
			onSubmit={(e) => {
				e.preventDefault();
				(onFinish as any)();
			}}
		>
			<span data-testid="tracking-form-name">{trackingFormName}</span>
			{children}
		</form>
	),
}));

jest.mock("../../../../components/OtpInput", () => ({
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

			<div data-testid="otp-input-server-error">
				{alwaysVisibleErrorKey}
			</div>
		</>
	),
}));

jest.mock("../../../../components/OtpTimerCountdown", () => ({
	__esModule: true,
	default: ({ totalSeconds }: ComponentProps<typeof OtpTimerCountdown>) => (
		<div data-testid="otp-timer-countdown">{totalSeconds}</div>
	),
}));

jest.mock("../../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../../../hooks/usePhone", () => ({
	usePhone: jest.fn(),
}));

jest.mock("../../../../hooks/useDevice", () => ({
	useDevice: jest.fn(),
}));

jest.mock("../../../../hooks/validations/useRegisterValidations", () => ({
	useRegisterValidations: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

jest.mock("../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

beforeEach(() => {
	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});

	(useRegisterValidations as jest.Mock).mockReturnValue({
		isValidPhoneNumber: jest.fn().mockReturnValue(true),
		removeZeroPrefix: jest.fn(),
	});

	(usePhone as jest.Mock).mockReturnValue({
		register: jest.fn(),
	});

	(useDevice as jest.Mock).mockReturnValue({
		getDeviceId: jest.fn().mockReturnValue("fake-device-id"),
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		countryPhoneCode: "61",
		phoneNumberLength: 9,
	});
});

describe("OtpVerificationForm", () => {
	it("should render without errors", () => {
		render(
			<OtpVerificationForm
				formData={{ otp: "1234" }}
				onCancel={jest.fn}
				onSubmit={jest.fn}
				phone="123456789"
				setServerErrorKey={jest.fn()}
				serverErrorKey={undefined}
				setFormData={jest.fn}
				isVerifyDisabled={false}
				seconds={0}
				reset={jest.fn}
			/>
		);
	});

	it("should render otp input", () => {
		render(
			<OtpVerificationForm
				formData={{ otp: "1234" }}
				onCancel={jest.fn}
				onSubmit={jest.fn}
				phone="123456789"
				setServerErrorKey={jest.fn()}
				serverErrorKey={undefined}
				setFormData={jest.fn}
				isVerifyDisabled={false}
				seconds={0}
				reset={jest.fn}
			/>
		);

		const otpInput = screen.getByTestId("otp-input");

		expect(otpInput).toBeInTheDocument();
	});

	it("should render OtpTimerCountdown", () => {
		render(
			<OtpVerificationForm
				formData={{ otp: "1234" }}
				onCancel={jest.fn}
				onSubmit={jest.fn}
				phone="123456789"
				setServerErrorKey={jest.fn()}
				serverErrorKey={undefined}
				setFormData={jest.fn}
				isVerifyDisabled={false}
				seconds={0}
				reset={jest.fn}
			/>
		);

		const otpTimerCountdown = screen.getByTestId("otp-timer-countdown");

		expect(otpTimerCountdown).toBeInTheDocument();
	});

	it("should render tracking form name", () => {
		render(
			<OtpVerificationForm
				formData={{ otp: "1234" }}
				onCancel={jest.fn}
				onSubmit={jest.fn}
				phone="123456789"
				setServerErrorKey={jest.fn()}
				serverErrorKey={undefined}
				setFormData={jest.fn}
				isVerifyDisabled={false}
				seconds={0}
				reset={jest.fn}
			/>
		);

		const trackingFormName = screen.getByTestId("tracking-form-name");

		expect(trackingFormName).toBeInTheDocument();
		expect(trackingFormName).toHaveTextContent("otp_verification");
	});

	it("should render sever error when countdown is greater than 0", () => {
		render(
			<OtpVerificationForm
				formData={{ otp: "1234" }}
				onCancel={jest.fn}
				onSubmit={jest.fn}
				phone="123456789"
				setServerErrorKey={jest.fn()}
				serverErrorKey={"validation.otp.any.invalid"}
				setFormData={jest.fn}
				isVerifyDisabled={false}
				seconds={20}
				reset={jest.fn}
			/>
		);

		const serverErrorKey = screen.getByTestId("otp-input-server-error");

		expect(serverErrorKey).toBeInTheDocument();
		expect(serverErrorKey).toHaveTextContent("validation.otp.any.invalid");
	});

	it("should trigger setFormData when otp is entered", () => {
		const fakeSetFormData = jest.fn();

		render(
			<OtpVerificationForm
				formData={{ otp: "1234" }}
				onCancel={jest.fn}
				onSubmit={jest.fn}
				phone="123456789"
				setServerErrorKey={jest.fn()}
				serverErrorKey={undefined}
				setFormData={fakeSetFormData}
				isVerifyDisabled={false}
				seconds={0}
				reset={jest.fn}
			/>
		);

		const otpInput = screen.getByTestId("otp-input");

		userEvent.click(otpInput);
		userEvent.keyboard("1");

		expect(otpInput).toBeInTheDocument();
		expect(fakeSetFormData).toHaveBeenCalled();
	});

	it("should render resend button", () => {
		render(
			<OtpVerificationForm
				formData={{ otp: "1234" }}
				onCancel={jest.fn}
				onSubmit={jest.fn}
				phone="123456789"
				setServerErrorKey={jest.fn()}
				serverErrorKey={undefined}
				setFormData={jest.fn}
				isVerifyDisabled={false}
				seconds={0}
				reset={jest.fn}
			/>
		);

		const resendButton = screen.getAllByRole("button")[0];
		expect(resendButton).toBeInTheDocument();
	});

	it("should trigger otp reset when resend button is clicked", async () => {
		const fakeCountdownReset = jest.fn();

		render(
			<OtpVerificationForm
				formData={{ otp: "1234" }}
				onCancel={jest.fn}
				onSubmit={jest.fn}
				phone="123456789"
				setServerErrorKey={jest.fn()}
				serverErrorKey={undefined}
				setFormData={jest.fn}
				isVerifyDisabled={false}
				seconds={0}
				reset={fakeCountdownReset}
			/>
		);

		const resendButton = screen.getAllByRole("button")[0];

		userEvent.click(resendButton);

		await waitFor(() => {
			expect(fakeCountdownReset).toHaveBeenCalled();
		});
	});

	it("should call register when resend button is clicked", async () => {
		const fakeRegiserMock = jest.fn();

		(usePhone as jest.Mock).mockReturnValue({
			register: fakeRegiserMock,
		});

		render(
			<OtpVerificationForm
				formData={{ otp: "1234" }}
				onCancel={jest.fn}
				onSubmit={jest.fn}
				phone="123456789"
				setServerErrorKey={jest.fn()}
				serverErrorKey={undefined}
				setFormData={jest.fn}
				isVerifyDisabled={false}
				seconds={0}
				reset={jest.fn}
			/>
		);

		const resendButton = screen.getAllByRole("button")[0];

		userEvent.click(resendButton);

		await waitFor(() => {
			expect(fakeRegiserMock).toHaveBeenCalled();
		});
	});

	it("should call history.push when phone is invalid and no deviceId", async () => {
		const fakeRegiserMock = jest.fn();

		(usePhone as jest.Mock).mockReturnValue({
			register: fakeRegiserMock,
		});

		(useRegisterValidations as jest.Mock).mockReturnValue({
			isValidPhoneNumber: jest.fn().mockReturnValue(false),
			removeZeroPrefix: jest.fn(),
		});

		(useDevice as jest.Mock).mockReturnValue({
			getDeviceId: jest.fn().mockReturnValue(undefined),
		});

		render(
			<OtpVerificationForm
				formData={{ otp: "1234" }}
				onCancel={jest.fn}
				onSubmit={jest.fn}
				phone="123456789"
				setServerErrorKey={jest.fn()}
				serverErrorKey={undefined}
				setFormData={jest.fn}
				isVerifyDisabled={false}
				seconds={0}
				reset={jest.fn}
			/>
		);

		const resendButton = screen.getAllByRole("button")[0];

		userEvent.click(resendButton);

		await waitFor(() => {
			expect(fakeRegiserMock).not.toHaveBeenCalled();
			expect(useHistory().push).toHaveBeenCalledWith(
				"/phone-registration"
			);
		});
	});

	it("should receive phone prop correctly", () => {
		const { container } = render(
			<OtpVerificationForm
				formData={{ otp: "1234" }}
				onCancel={jest.fn}
				onSubmit={jest.fn}
				phone="123456789"
				setServerErrorKey={jest.fn()}
				serverErrorKey={undefined}
				setFormData={jest.fn}
				isVerifyDisabled={false}
				seconds={0}
				reset={jest.fn}
			/>
		);

		const phone = container.querySelector(".phone");

		expect(phone).toBeInTheDocument();
		expect(phone).toHaveTextContent("123456789");
	});
});
