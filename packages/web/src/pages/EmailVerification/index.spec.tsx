import { render, screen, waitFor } from "@testing-library/react";
import EmailVerification from ".";
import { useEmail } from "../../hooks/useEmail";
import { useSession } from "../../hooks/useSession";
import { useHistory } from "react-router-dom";
import { useXiam } from "../../contexts/XiamContext";
import Text from "../../components/Text";
import { ComponentProps } from "react";
import { useEmailVerification } from "./useEmailVerification";

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

jest.mock("../../components/Layout/MyAcuvueLiteHeader", () => ({
	__esModule: true,
	default: () => <div data-testid="acuvue-lite-header" />,
}));

jest.mock("../../components/Title", () => ({
	__esModule: true,
	default: () => <span data-testid="title" />,
}));

jest.mock("../../components/Footer", () => ({
	__esModule: true,
	default: () => <div data-testid="acuvue-lite-footer" />,
}));

jest.mock("../../hooks/useEmail", () => ({
	useEmail: jest.fn(),
}));

jest.mock("../../hooks/useSession", () => ({
	useSession: jest.fn(),
}));

jest.mock("../../hooks/useTranslation", () => ({ useText: jest.fn() }));

jest.mock("../../contexts/XiamContext", () => ({
	useXiam: jest.fn(),
}));

jest.mock("../../components/Text", () => ({
	__esModule: true,
	default: ({ type, textKey, data }: ComponentProps<typeof Text>) => (
		<>
			{textKey} {type} {JSON.stringify(data)}
		</>
	),
}));

jest.mock("./useEmailVerification", () => ({
	useEmailVerification: jest.fn(),
}));

beforeEach(() => {
	jest.clearAllTimers();

	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});

	(useEmail as jest.Mock).mockReturnValue({
		sendVerificationLink: jest.fn(),
		linkAccount: jest.fn(),
	});

	(useSession as jest.Mock).mockReturnValue({
		startSession: jest.fn(),
	});

	(useXiam as jest.Mock).mockReturnValue({
		getXiamToken: jest.fn(),
	});

	(useEmailVerification as jest.Mock).mockReturnValue({
		canIssueVerificationEmail: jest.fn(),
		sendEmail: jest.fn(),
	});
});

describe("EmailVerification", () => {
	it("should render without errors", () => {
		render(<EmailVerification />);
	});

	it("should render title component", () => {
		render(<EmailVerification />);
		const titleComponent = screen.getByTestId("title");
		expect(titleComponent).toBeInTheDocument();
	});

	it("should render header component", () => {
		render(<EmailVerification />);
		const header = screen.getByTestId("acuvue-lite-header");
		expect(header).toBeInTheDocument();
	});

	it("should render footer component", () => {
		render(<EmailVerification />);
		const footer = screen.getByTestId("acuvue-lite-footer");
		expect(footer).toBeInTheDocument();
	});

	it("should get email from xiam token and render in page", async () => {
		(useXiam as jest.Mock).mockReturnValue({
			getXiamToken: jest.fn().mockReturnValue({
				payload: {
					email: "fakemaila@mail.com",
				},
			}),
		});

		const { container } = render(<EmailVerification />);

		const emailValue = container.querySelector(".body-texts")?.firstChild;
		expect(emailValue).toBeInTheDocument();

		await waitFor(() => {
			expect(emailValue).toHaveTextContent("fakemaila@mail.com");
		});
	});

	it("should call sendEmail once on page load if canIssueVerificationEmail is true", async () => {
		const mockSendEmail = jest.fn();
		(useEmailVerification as jest.Mock).mockReturnValue({
			canIssueVerificationEmail: jest.fn().mockReturnValue(true),
			sendEmail: mockSendEmail,
		});

		render(<EmailVerification />);

		await waitFor(() => expect(mockSendEmail).toHaveBeenCalledTimes(1));
	});

	it("should not call sendEmail on page load if canIssueVerificationEmail is false", async () => {
		const mockSendEmail = jest.fn();
		(useEmailVerification as jest.Mock).mockReturnValue({
			canIssueVerificationEmail: jest.fn().mockReturnValue(false),
			sendEmail: mockSendEmail,
		});

		render(<EmailVerification />);

		await waitFor(() => expect(mockSendEmail).not.toHaveBeenCalled());
	});

	it("should call sendEmail when button is click and canIssueVerificationEmail is true", () => {
		const mockSendEmail = jest.fn();
		(useEmailVerification as jest.Mock).mockReturnValue({
			canIssueVerificationEmail: jest.fn().mockReturnValue(true),
			sendEmail: mockSendEmail,
		});

		render(<EmailVerification />);

		const resendVerificationButton = screen.getByRole("button");
		resendVerificationButton.click();
		expect(mockSendEmail).toHaveBeenCalled();
	});

	it("should not call sendEmail when button is click and canIssueVerificationEmail is false", () => {
		const mockSendEmail = jest.fn();
		(useEmailVerification as jest.Mock).mockReturnValue({
			canIssueVerificationEmail: jest.fn().mockReturnValue(false),
			sendEmail: mockSendEmail,
		});

		render(<EmailVerification />);

		const resendVerificationButton = screen.getByRole("button");
		resendVerificationButton.click();
		expect(mockSendEmail).not.toHaveBeenCalled();
	});

	it("should dismiss the dialog when clicking ok", async () => {
		const mockSendEmail = jest.fn();
		(useEmailVerification as jest.Mock).mockReturnValue({
			canIssueVerificationEmail: jest.fn().mockReturnValue(false),
			sendEmail: mockSendEmail,
		});

		render(<EmailVerification />);

		const resendVerificationButton = screen.getByRole("button");
		resendVerificationButton.click();
		expect(mockSendEmail).not.toHaveBeenCalled();

		const modalText = screen.getByText(
			"emailVerification.cooldownDialog.body"
		);
		expect(modalText).toBeVisible();

		const okButton = screen.getByText(
			"emailVerification.cooldownDialog.okButton"
		);
		await okButton.click();

		await waitFor(() => {
			expect(modalText).not.toBeVisible();
		});
	});

	it("should dismiss the dialog when clicking close", async () => {
		const mockSendEmail = jest.fn();
		(useEmailVerification as jest.Mock).mockReturnValue({
			canIssueVerificationEmail: jest.fn().mockReturnValue(false),
			sendEmail: mockSendEmail,
		});

		render(<EmailVerification />);

		const resendVerificationButton = screen.getByRole("button");
		resendVerificationButton.click();
		expect(mockSendEmail).not.toHaveBeenCalled();

		const modalText = screen.getByText(
			"emailVerification.cooldownDialog.body"
		);
		expect(modalText).toBeVisible();

		const closeButton = screen.getByRole("button", { name: "Close" });
		await closeButton.click();

		await waitFor(() => {
			expect(modalText).not.toBeVisible();
		});
	});

	it("should call linkAccount and startSession after interval", async () => {
		const mockLinkAccount = jest.fn();
		const mockStartSession = jest.fn();
		jest.useFakeTimers();

		(useEmail as jest.Mock).mockReturnValue({
			sendVerificationLink: jest.fn(),
			linkAccount: mockLinkAccount,
		});

		(useSession as jest.Mock).mockReturnValue({
			startSession: mockStartSession,
		});

		render(<EmailVerification />);

		jest.advanceTimersByTime(10000);

		await waitFor(() => {
			expect(mockLinkAccount).toHaveBeenCalled();
			expect(mockStartSession).toHaveBeenCalled();
			expect(useHistory().push).toHaveBeenCalledWith(
				"/registration/profile"
			);
		});

		jest.clearAllTimers();
	});
});
