import TermsConditionsPrivacyPolicy from ".";
import { useConfiguration } from "../../hooks/useConfiguration";
import { renderWithLanguage, screen } from "../../test-utils";
import { ConfigService } from "@myacuvue_thailand_web/services";
import { mocked } from "ts-jest/utils";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useLegalPolicies } from "../../hooks/useLegalPolicies";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { waitFor } from "@testing-library/dom";
import { act } from "@testing-library/react";
import { useNavigate } from "react-router-dom-v5-compat";

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
}));

jest.mock("../../hooks/useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("../../hooks/useLegalPolicies", () => ({
	useLegalPolicies: jest.fn(),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		instance: ConfigService.Instance.AU,
	});

	(useAuthentication as jest.Mock).mockReturnValue({
		resetAuth: jest.fn(),
		user: undefined,
	});

	(useUserProfile as jest.Mock).mockReturnValue({
		userProfile: undefined,
	});

	mocked(useLegalPolicies).mockReturnValue({
		acceptLegalTerms: jest.fn(),
		getPrivacyPolicy: jest.fn(),
		getTermsAndConditions: jest.fn(),
		getPointsTermsAndConditions: jest.fn(),
	});

	mocked(useNavigate).mockReturnValue(jest.fn());
});

it("should call acceptLegalTerms when ACCEPT button is clicked in privacy policy page", async () => {
	renderWithLanguage(<TermsConditionsPrivacyPolicy />);

	await waitFor(() => {
		const termsTab: HTMLDivElement = screen.getByRole("tab", {
			name: "Terms and conditions",
		});
		expect(termsTab).toHaveAttribute("aria-selected", "true");
	});

	act(() => {
		const nextButton = screen.getByRole("button", { name: "NEXT" });
		nextButton.click();
	});

	await waitFor(() => {
		const termsTab: HTMLDivElement = screen.getByRole("tab", {
			name: "Terms and conditions",
		});
		expect(termsTab).toHaveAttribute("aria-selected", "false");

		const privacyTab: HTMLDivElement = screen.getByRole("tab", {
			name: "Privacy Policy",
		});
		expect(privacyTab).toHaveAttribute("aria-selected", "true");
	});

	act(() => {
		const acceptButton = screen.getByRole("button", { name: "ACCEPT" });
		acceptButton.click();
	});

	await waitFor(() => {
		expect(useLegalPolicies().acceptLegalTerms).toHaveBeenCalled();
	});
});

it("should call resetAuth when DECLINE button is clicked in privacy policy page", async () => {
	renderWithLanguage(<TermsConditionsPrivacyPolicy />);

	await waitFor(() => {
		const termsTab: HTMLDivElement = screen.getByRole("tab", {
			name: "Terms and conditions",
		});
		expect(termsTab).toHaveAttribute("aria-selected", "true");
	});

	act(() => {
		const nextButton = screen.getByRole("button", { name: "NEXT" });
		nextButton.click();
	});

	await waitFor(() => {
		const termsTab: HTMLDivElement = screen.getByRole("tab", {
			name: "Terms and conditions",
		});
		expect(termsTab).toHaveAttribute("aria-selected", "false");

		const privacyTab: HTMLDivElement = screen.getByRole("tab", {
			name: "Privacy Policy",
		});
		expect(privacyTab).toHaveAttribute("aria-selected", "true");
	});

	act(() => {
		const declineButton = screen.getByRole("button", { name: "DECLINE" });
		declineButton.click();
	});

	await waitFor(() => {
		expect(useAuthentication().resetAuth).toHaveBeenCalled();
	});
});

it("should go back to terms and conditions page when already in privacy policy page and the terms and conditions tab is clicked", async () => {
	renderWithLanguage(<TermsConditionsPrivacyPolicy />);

	await waitFor(() => {
		const termsTab: HTMLDivElement = screen.getByRole("tab", {
			name: "Terms and conditions",
		});
		expect(termsTab).toHaveAttribute("aria-selected", "true");
	});

	act(() => {
		const nextButton = screen.getByRole("button", { name: "NEXT" });
		nextButton.click();
	});

	await waitFor(() => {
		const termsTab: HTMLDivElement = screen.getByRole("tab", {
			name: "Terms and conditions",
		});
		expect(termsTab).toHaveAttribute("aria-selected", "false");

		const privacyTab: HTMLDivElement = screen.getByRole("tab", {
			name: "Privacy Policy",
		});
		expect(privacyTab).toHaveAttribute("aria-selected", "true");
	});

	act(() => {
		const termsTab: HTMLDivElement = screen.getByRole("tab", {
			name: "Terms and conditions",
		});
		termsTab.click();
	});

	await waitFor(() => {
		const termsTab: HTMLDivElement = screen.getByRole("tab", {
			name: "Terms and conditions",
		});
		expect(termsTab).toHaveAttribute("aria-selected", "true");

		const privacyTab: HTMLDivElement = screen.getByRole("tab", {
			name: "Privacy Policy",
		});
		expect(privacyTab).toHaveAttribute("aria-selected", "false");
	});
});

it("should navigate to /registration if userProfile exists and contains myAcuvueId and phone", async () => {
	(useUserProfile as jest.Mock).mockReturnValue({
		userProfile: {
			myAcuvueId: "fakeId",
			phone: "fakeNumber",
			firstName: "",
			lastName: "",
			birthMonth: "",
			birthYear: "",
			email: "",
			gender: null,
			isSpectaclesWearer: false,
			lensesUsage: "",
			hasParentalConsent: null,
		},
	});

	renderWithLanguage(<TermsConditionsPrivacyPolicy />);

	await waitFor(() => {
		expect(useNavigate()).toHaveBeenCalledWith("/registration");
	});
});
