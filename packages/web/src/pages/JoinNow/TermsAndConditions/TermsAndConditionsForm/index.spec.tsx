import TermsAndConditionsForm from ".";

import { renderWithLanguage, screen } from "../../../../test-utils";
import { act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
	ConfigService,
	Gender,
	IGetProfileResponse,
} from "@myacuvue_thailand_web/services";
import { useConfiguration } from "../../../../hooks/useConfiguration";
import { useUserProfile } from "../../../../contexts/UserProfileContext";

jest.mock("../../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

const fakeUser: IGetProfileResponse = {
	myAcuvueId: "fakeId",
	phone: "fakeNumber",
	firstName: "fakeFirstName",
	lastName: "fakeLastName",
	birthMonth: "fakeBirthMonth",
	birthYear: "fakeBirthYear",
	email: "fakeEmail",
	gender: Gender.FEMALE,
	isSpectaclesWearer: false,
	lensesUsage: "NON_USER",
	hasParentalConsent: null,
};

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		instance: ConfigService.Instance.AU,
		termsAndConditionUrl: "https://www.acuvue.com.au/myacuvueterms",
	});

	(useUserProfile as jest.Mock).mockReturnValue({
		userProfile: fakeUser,
	});
});

it("should render OtpVerificationPage without any error", async () => {
	renderWithLanguage(
		<TermsAndConditionsForm
			onSubmit={jest.fn()}
			onGoBackClick={jest.fn()}
			isSubmitDisabled={false}
			formData={{
				"WEB:LITE:TERMS_AND_CONDITIONS": false,
				"WEB:LITE:PRIVACY_POLICY": false,
			}}
			setFormData={jest.fn()}
		/>
	);

	await waitFor(() => {
		expect(
			screen.getByText("I have read and accepted the")
		).toBeInTheDocument();
		const acceptButton = screen.getByRole("button", { name: "ACCEPT" });
		const boBackButton = screen.getByRole("button", { name: "GO BACK" });

		expect(acceptButton).toBeVisible();
		expect(boBackButton).toBeVisible();
	});
});

it("should render the corrent term and condition url", async () => {
	renderWithLanguage(
		<TermsAndConditionsForm
			onSubmit={jest.fn()}
			onGoBackClick={jest.fn()}
			isSubmitDisabled={false}
			formData={{
				"WEB:LITE:TERMS_AND_CONDITIONS": false,
				"WEB:LITE:PRIVACY_POLICY": false,
			}}
			setFormData={jest.fn()}
		/>
	);

	await waitFor(() => {
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute(
			"href",
			"https://www.acuvue.com.au/myacuvueterms"
		);
	});
});

it("should render disabled accept button when checkboxes are not selected", async () => {
	renderWithLanguage(
		<TermsAndConditionsForm
			onSubmit={jest.fn()}
			onGoBackClick={jest.fn()}
			isSubmitDisabled={true}
			formData={{
				"WEB:LITE:TERMS_AND_CONDITIONS": false,
				"WEB:LITE:PRIVACY_POLICY": false,
			}}
			setFormData={jest.fn()}
		/>
	);

	await waitFor(() => {
		const [checkbox1, checkbox2] = screen.getAllByRole("checkbox");
		const acceptButton = screen.getByRole("button", { name: "ACCEPT" });

		expect(checkbox1).toBeVisible();
		expect(checkbox2).toBeVisible();
		expect(checkbox1).not.toBeChecked();
		expect(checkbox2).not.toBeChecked();
		expect(acceptButton).toBeDisabled();
	});
});

it("should render enabled accept button when both checkboxes are selected", async () => {
	renderWithLanguage(
		<TermsAndConditionsForm
			onSubmit={jest.fn()}
			onGoBackClick={jest.fn()}
			isSubmitDisabled={false}
			formData={{
				"WEB:LITE:TERMS_AND_CONDITIONS": true,
				"WEB:LITE:PRIVACY_POLICY": true,
			}}
			setFormData={jest.fn()}
		/>
	);

	act(() => {
		const [checkbox1, checkbox2] = screen.getAllByRole("checkbox");

		userEvent.click(checkbox1);
		userEvent.click(checkbox2);
	});

	await waitFor(() => {
		const [checkbox1, checkbox2] = screen.getAllByRole("checkbox");
		const acceptButton = screen.getByRole("button", { name: "ACCEPT" });

		expect(checkbox1).toBeChecked();
		expect(checkbox2).toBeChecked();
		expect(acceptButton).toBeEnabled();
	});
});

it("should submit form after clicking the accept button", async () => {
	const mockOnSubmit = jest.fn();

	renderWithLanguage(
		<TermsAndConditionsForm
			onSubmit={mockOnSubmit}
			onGoBackClick={jest.fn()}
			isSubmitDisabled={false}
			formData={{
				"WEB:LITE:TERMS_AND_CONDITIONS": true,
				"WEB:LITE:PRIVACY_POLICY": true,
			}}
			setFormData={jest.fn()}
		/>
	);

	act(() => {
		const [checkbox1, checkbox2] = screen.getAllByRole("checkbox");

		userEvent.click(checkbox1);
		userEvent.click(checkbox2);
	});

	await waitFor(() => {
		const [checkbox1, checkbox2] = screen.getAllByRole("checkbox");
		const acceptButton = screen.getByRole("button", { name: "ACCEPT" });

		expect(checkbox1).toBeChecked();
		expect(checkbox2).toBeChecked();
		expect(acceptButton).toBeEnabled();
	});

	act(() => {
		const acceptButton = screen.getByRole("button", { name: "ACCEPT" });

		userEvent.click(acceptButton);
	});

	await waitFor(() => {
		expect(mockOnSubmit).toHaveBeenCalled();
	});
});
