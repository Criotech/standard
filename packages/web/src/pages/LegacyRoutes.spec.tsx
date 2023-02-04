import { waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom-v5-compat";
import { AuthStatus } from "../contexts/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";
import { useConfiguration } from "../hooks/useConfiguration";
import { renderWithLanguage, screen } from "../test-utils";
import LegacyRoutes from "./LegacyRoutes";

jest.mock("../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../hooks/useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("./PhoneRegistration", () => ({
	__esModule: true,
	default: () => <div>Fake Phone Registration Page</div>,
}));

jest.mock("./OtpVerification", () => ({
	__esModule: true,
	default: () => <div>Fake OTP Verification Page</div>,
}));

jest.mock("./TermsConditionsPrivacyPolicy", () => ({
	__esModule: true,
	default: () => <div>Fake Terms and Conditions Page</div>,
}));

jest.mock("./Private", () => ({
	__esModule: true,
	default: () => <div>Fake Private Component</div>,
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({});

	(useAuthentication as jest.Mock).mockReturnValue({
		status: AuthStatus.LOADING,
	});
});

describe("when status is PENDING_OTP", () => {
	beforeEach(() => {
		(useAuthentication as jest.Mock).mockReturnValue({
			status: AuthStatus.PENDING_OTP,
		});
	});

	it("should render phone registration page when URL is /phone-registration", async () => {
		renderWithLanguage(
			<MemoryRouter initialEntries={["/phone-registration"]}>
				<LegacyRoutes />
			</MemoryRouter>
		);

		await waitFor(() => {
			const textRepresentingPage = screen.getByText(
				"Fake Phone Registration Page"
			);
			expect(textRepresentingPage).toBeVisible();
		});
	});

	it("should render otp verification page when URL is /otp-verification", async () => {
		renderWithLanguage(
			<MemoryRouter initialEntries={["/otp-verification"]}>
				<LegacyRoutes />
			</MemoryRouter>
		);

		await waitFor(() => {
			const textRepresentingPage = screen.getByText(
				"Fake OTP Verification Page"
			);
			expect(textRepresentingPage).toBeVisible();
		});
	});

	it("should navigate to phone registration page when URL is anything else", async () => {
		renderWithLanguage(
			<MemoryRouter initialEntries={["/some-url-not-configured"]}>
				<LegacyRoutes />
			</MemoryRouter>
		);

		await waitFor(() => {
			const textRepresentingPage = screen.getByText(
				"Fake Phone Registration Page"
			);
			expect(textRepresentingPage).toBeVisible();
		});
	});
});

describe("when status is PENDING_TC", () => {
	beforeEach(() => {
		(useAuthentication as jest.Mock).mockReturnValue({
			status: AuthStatus.PENDING_TC,
		});
	});

	it("should render terms and conditions page when URL is /terms-conditions-privacy-policy", async () => {
		renderWithLanguage(
			<MemoryRouter initialEntries={["/terms-conditions-privacy-policy"]}>
				<LegacyRoutes />
			</MemoryRouter>
		);

		await waitFor(() => {
			const textRepresentingPage = screen.getByText(
				"Fake Terms and Conditions Page"
			);
			expect(textRepresentingPage).toBeVisible();
		});
	});

	it("should navigate to terms and conditions page when URL is anything else", async () => {
		renderWithLanguage(
			<MemoryRouter initialEntries={["/some-url-not-configured"]}>
				<LegacyRoutes />
			</MemoryRouter>
		);

		await waitFor(() => {
			const textRepresentingPage = screen.getByText(
				"Fake Terms and Conditions Page"
			);
			expect(textRepresentingPage).toBeVisible();
		});
	});
});

describe("when status is AUTHENTICATED", () => {
	beforeEach(() => {
		(useAuthentication as jest.Mock).mockReturnValue({
			status: AuthStatus.AUTHENTICATED,
		});
	});

	it("should render Private component regardless of the URL", async () => {
		renderWithLanguage(
			<MemoryRouter initialEntries={["/any-url"]}>
				<LegacyRoutes />
			</MemoryRouter>
		);

		await waitFor(() => {
			const textRepresentingPage = screen.getByText(
				"Fake Private Component"
			);
			expect(textRepresentingPage).toBeVisible();
		});
	});
});
