import { renderWithLanguage, screen } from "../../test-utils";
import PointsTermsAndConditions from "./index";
import { useConfiguration } from "../../hooks/useConfiguration";
import { mocked } from "ts-jest/utils";
import { useLegalPolicies } from "../../hooks/useLegalPolicies";
import { act, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom-v5-compat";

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
}));

jest.mock("../../hooks/useLegalPolicies", () => ({
	useLegalPolicies: jest.fn(),
}));

jest.mock("../../components/Layout/Header", () => ({
	__esModule: true,
	default: () => null,
}));

jest.mock("../../components/GlobalNavigationPanel", () => ({
	__esModule: true,
	default: () => null,
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({});

	mocked(useLegalPolicies).mockReturnValue({
		getPointsTermsAndConditions: jest.fn(),
		acceptLegalTerms: jest.fn(),
		getPrivacyPolicy: jest.fn(),
		getTermsAndConditions: jest.fn(),
	});

	mocked(useLegalPolicies().getPointsTermsAndConditions).mockResolvedValue(
		"terms and conditions text"
	);

	mocked(useNavigate).mockReturnValue(jest.fn());
});

it("should display the terms and conditions text", async () => {
	renderWithLanguage(<PointsTermsAndConditions />);

	await waitFor(() => {
		const heading = screen.getByRole("heading");
		expect(heading).toHaveTextContent("Terms & Conditions");

		const termsText = screen.getByText("terms and conditions text");
		expect(termsText).toBeVisible();
	});
});

it("should navigate to /points when clicking the close button", async () => {
	renderWithLanguage(<PointsTermsAndConditions />);

	await waitFor(() => {
		const heading = screen.getByRole("heading");
		expect(heading).toHaveTextContent("Terms & Conditions");

		const closeButton = screen.getByRole("button", { name: "CLOSE" });
		expect(closeButton).toBeVisible();
		expect(closeButton).not.toBeDisabled();
	});

	act(() => {
		const closeButton = screen.getByRole("button", { name: "CLOSE" });
		closeButton.click();
	});

	await waitFor(() => {
		expect(useNavigate()).toHaveBeenCalledWith("/points");
	});
});
