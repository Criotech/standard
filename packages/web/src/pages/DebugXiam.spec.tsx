import { render, screen } from "@testing-library/react";
import DebugXiam from "./DebugXiam";
import { useXiam } from "../contexts/XiamContext";
import userEvent from "@testing-library/user-event";
import { usePhone } from "../hooks/usePhone";
import { useEmail } from "../hooks/useEmail";
import { useSession } from "../hooks/useSession";
import { useDeviceToken } from "../contexts/DeviceTokenContext";
import { useAuthentication } from "../hooks/useAuthentication";

jest.mock("../contexts/XiamContext", () => ({
	useXiam: jest.fn(),
}));

jest.mock("../hooks/usePhone", () => ({
	usePhone: jest.fn(),
}));

jest.mock("../hooks/useEmail", () => ({
	useEmail: jest.fn(),
}));

jest.mock("../hooks/useSession", () => ({
	useSession: jest.fn(),
}));

jest.mock("../contexts/DeviceTokenContext", () => ({
	useDeviceToken: jest.fn(),
}));

jest.mock("../hooks/useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

const mockConsoleLog = jest.spyOn(console, "log");
beforeAll(() => {
	mockConsoleLog.mockImplementation(() => {});
});
afterAll(() => {
	mockConsoleLog.mockRestore();
});

beforeEach(() => {
	(useXiam as jest.Mock).mockReturnValue({
		registrationPopup: jest.fn(),
		loginPopup: jest.fn(),
		updatePassword: jest.fn(),
		logout: jest.fn(),
		getXiamToken: jest.fn(),
	});

	(usePhone as jest.Mock).mockReturnValue({
		register: jest.fn(),
		validateWithOtp: jest.fn(),
		saveConsents: jest.fn(),
	});

	(useEmail as jest.Mock).mockReturnValue({
		sendVerificationLink: jest.fn(),
		linkAccount: jest.fn(),
	});

	(useSession as jest.Mock).mockReturnValue({
		startSession: jest.fn(),
	});

	(useDeviceToken as jest.Mock).mockReturnValue({
		setDeviceToken: jest.fn(),
	});

	(useAuthentication as jest.Mock).mockReturnValue({
		resetAuth: jest.fn(),
		processSessionToken: jest.fn(),
		status: "",
	});
});

describe("DebugXiam", () => {
	it("should render without errors", () => {
		render(<DebugXiam />);
	});

	it("should not error when operating the buttons, for coverage purposes", () => {
		render(<DebugXiam />);
		const registrationButton0 = screen.getAllByText(
			"Open RegistrationPopup Popup"
		)[0];
		const loginButton = screen.getByText("Open Login Popup");
		const getXiamTokenButton = screen.getByText("Get xiam token");
		const updatePasswordButton = screen.getByText("Update Password");
		const logoutButton = screen.getByText("Logout");

		const callRegister = screen.getByText("Call Register");
		const callValidateOTP = screen.getByText("Call Validate OTP");
		const callSaveConsents = screen.getByText("Call Save Consents");
		const registrationButton1 = screen.getAllByText(
			"Open RegistrationPopup Popup"
		)[1];
		const callSendVerificationLink = screen.getByText(
			"Call Send Verification Link"
		);
		const callLinkAccount = screen.getByText("Call Link Account");
		const callStartSession = screen.getByText("Call Start Session");
		const callResetEverything = screen.getByText("Reset EVERYTHING");

		userEvent.click(registrationButton0);
		userEvent.click(loginButton);
		userEvent.click(getXiamTokenButton);
		userEvent.click(updatePasswordButton);
		userEvent.click(logoutButton);

		userEvent.click(callRegister);
		userEvent.click(callValidateOTP);
		userEvent.click(callSaveConsents);
		userEvent.click(registrationButton1);
		userEvent.click(callSendVerificationLink);
		userEvent.click(callLinkAccount);
		userEvent.click(callStartSession);
		userEvent.click(callResetEverything);
	});
});
