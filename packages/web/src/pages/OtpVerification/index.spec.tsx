import {
	ConfigService,
	InvalidFormSubmissionError,
} from "@myacuvue_thailand_web/services";
import { useLocation, useNavigate } from "react-router-dom-v5-compat";
import OtpVerificationPage from ".";
import { useConfiguration } from "../../hooks/useConfiguration";
import { renderWithLanguage, screen } from "../../test-utils";
import { mocked } from "ts-jest/utils";
import { act, waitFor, within } from "@testing-library/react";
import { useRegistration } from "../../hooks/useRegistration";
import userEvent from "@testing-library/user-event";

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
	useLocation: jest.fn(),
}));

jest.mock("../../hooks/useRegistration", () => ({
	useRegistration: jest.fn(),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		instance: ConfigService.Instance.AU,
	});

	mocked(useNavigate).mockReturnValue(jest.fn());

	(useLocation as jest.Mock).mockReturnValue({
		search: "",
	});

	mocked(useRegistration).mockReturnValue({
		register: jest.fn(),
		resendOtp: jest.fn(),
		validateOtp: jest.fn(),
		registerPhone: jest.fn(),
	});
});

it("should navigate to /phone-registration if the phone is not in the URL query", async () => {
	(useLocation as jest.Mock).mockReturnValue({
		search: "",
	});

	renderWithLanguage(<OtpVerificationPage />);

	await waitFor(() => {
		expect(useNavigate()).toHaveBeenCalledWith("/phone-registration");
	});
});

it("should call validateOtp after filling all 4 digits and clicking on VERIFY button", async () => {
	(useLocation as jest.Mock).mockReturnValue({
		search: "phone=987654321",
	});

	renderWithLanguage(<OtpVerificationPage />);

	await waitFor(() => {
		expect(screen.getByText(/Expiring in \d\d:\d\d min/)).toBeVisible();
		expect(screen.getByText("An OTP has been sent to")).toBeVisible();
		expect(screen.getByText("987654321")).toBeVisible();
		expect(
			screen.getByText(
				/If you do not receive an OTP, connect with us via LINE@ACUVUE/
			)
		).toBeVisible();
	});

	act(() => {
		const digit1 = screen.getByRole("textbox", {
			name: "Please enter verification code. Digit 1",
		});
		userEvent.click(digit1);
		userEvent.keyboard("1");
	});

	await waitFor(() => {
		const digit1 = screen.getByRole("textbox", {
			name: "Please enter verification code. Digit 1",
		});
		expect(digit1).toHaveValue("1");
	});

	act(() => {
		const digit2 = screen.getByRole("textbox", { name: "Digit 2" });
		userEvent.click(digit2);
		userEvent.keyboard("2");
	});

	await waitFor(() => {
		const digit2 = screen.getByRole("textbox", { name: "Digit 2" });
		expect(digit2).toHaveValue("2");
	});

	act(() => {
		const digit3 = screen.getByRole("textbox", { name: "Digit 3" });
		userEvent.click(digit3);
		userEvent.keyboard("3");
	});

	await waitFor(() => {
		const digit3 = screen.getByRole("textbox", { name: "Digit 3" });
		expect(digit3).toHaveValue("3");
	});

	act(() => {
		const digit4 = screen.getByRole("textbox", { name: "Digit 4" });
		userEvent.click(digit4);
		userEvent.keyboard("4");
	});

	await waitFor(() => {
		const digit4 = screen.getByRole("textbox", { name: "Digit 4" });
		expect(digit4).toHaveValue("4");
	});

	act(() => {
		const verifyButton = screen.getByRole("button", { name: "VERIFY" });
		verifyButton.click();
	});

	await waitFor(() => {
		expect(useRegistration().validateOtp).toHaveBeenCalledWith(
			"987654321",
			"1234"
		);
	});
});

it("should display invalid OTP error message when all digits are filled, VERIFY button is clicked, buy the validateOtp call throws exception", async () => {
	const formError = new InvalidFormSubmissionError({
		otp: {
			"validation.any.invalid": {},
		},
	});
	mocked(useRegistration().validateOtp).mockRejectedValue(formError);

	(useLocation as jest.Mock).mockReturnValue({
		search: "phone=987654321",
	});

	renderWithLanguage(<OtpVerificationPage />);

	await waitFor(() => {
		expect(screen.getByText(/Expiring in \d\d:\d\d min/)).toBeVisible();
		expect(screen.getByText("An OTP has been sent to")).toBeVisible();
		expect(screen.getByText("987654321")).toBeVisible();
		expect(
			screen.getByText(
				/If you do not receive an OTP, connect with us via LINE@ACUVUE/
			)
		).toBeVisible();
	});

	act(() => {
		const digit1 = screen.getByRole("textbox", {
			name: "Please enter verification code. Digit 1",
		});
		userEvent.click(digit1);
		userEvent.keyboard("1");
	});

	await waitFor(() => {
		const digit1 = screen.getByRole("textbox", {
			name: "Please enter verification code. Digit 1",
		});
		expect(digit1).toHaveValue("1");
	});

	act(() => {
		const digit2 = screen.getByRole("textbox", { name: "Digit 2" });
		userEvent.click(digit2);
		userEvent.keyboard("2");
	});

	await waitFor(() => {
		const digit2 = screen.getByRole("textbox", { name: "Digit 2" });
		expect(digit2).toHaveValue("2");
	});

	act(() => {
		const digit3 = screen.getByRole("textbox", { name: "Digit 3" });
		userEvent.click(digit3);
		userEvent.keyboard("3");
	});

	await waitFor(() => {
		const digit3 = screen.getByRole("textbox", { name: "Digit 3" });
		expect(digit3).toHaveValue("3");
	});

	act(() => {
		const digit4 = screen.getByRole("textbox", { name: "Digit 4" });
		userEvent.click(digit4);
		userEvent.keyboard("4");
	});

	await waitFor(() => {
		const digit4 = screen.getByRole("textbox", { name: "Digit 4" });
		expect(digit4).toHaveValue("4");
	});

	act(() => {
		const verifyButton = screen.getByRole("button", { name: "VERIFY" });
		verifyButton.click();
	});

	await waitFor(() => {
		expect(useRegistration().validateOtp).toHaveBeenCalledWith(
			"987654321",
			"1234"
		);

		const errorMessage = screen.getByRole("alert");
		expect(errorMessage).toHaveTextContent(
			"You have entered an invalid OTP, please try again."
		);
	});
});

it("should open dialog when Resend button is clicked, and then be able to dismiss the dialog", async () => {
	(useLocation as jest.Mock).mockReturnValue({
		search: "phone=987654321",
	});

	renderWithLanguage(<OtpVerificationPage />);

	await waitFor(() => {
		expect(screen.getByText(/Expiring in \d\d:\d\d min/)).toBeVisible();
		expect(screen.getByText("An OTP has been sent to")).toBeVisible();
		expect(screen.getByText("987654321")).toBeVisible();
		expect(
			screen.getByText(
				/If you do not receive an OTP, connect with us via LINE@ACUVUE/
			)
		).toBeVisible();
	});

	act(() => {
		const resendButton = screen.getByRole("button", {
			name: "Click to resend OTP.",
		});
		resendButton.click();
	});

	await waitFor(() => {
		expect(useRegistration().resendOtp).toHaveBeenCalledWith("987654321");

		const dialog = screen.getByRole("dialog");
		expect(dialog).toBeVisible();
		expect(dialog).toHaveTextContent(
			"OTP has been resent to 987654321, please enter new OTP."
		);
	});

	act(() => {
		const dialog = screen.getByRole("dialog");
		const okButton = within(dialog).getByRole("button", { name: "OK" });
		okButton.click();
	});

	await waitFor(() => {
		expect(screen.queryByRole("dialog")).toStrictEqual(null);
	});
});
