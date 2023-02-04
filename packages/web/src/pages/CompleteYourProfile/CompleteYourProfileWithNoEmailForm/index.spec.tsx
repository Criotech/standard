import { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import { CompleteYourProfileWithNoEmailForm } from ".";
import { BasicProfile } from "../BasicProfile";
import { OtherProfileDetails } from "../OtherProfileDetails";
import Text from "../../../components/Text";
import TrackedForm from "../../../components/TrackedForm";

jest.mock("../../../components/TrackedForm", () => ({
	__esModule: true,
	default: ({
		children,
		onFinish,
		trackingFormName,
	}: ComponentProps<typeof TrackedForm>) => (
		<form
			data-testid="complete-profile-with-no-email-form"
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

jest.mock("../BasicProfile", () => ({
	BasicProfile: ({
		formData,
		setFormData,
	}: ComponentProps<typeof BasicProfile>) => (
		<div data-testid="basic-profile-component">
			<div data-testid="basic-profile-form-data">
				{JSON.stringify(formData)}
			</div>
			<input
				data-testid="basic-profile-input"
				onChange={setFormData as any}
			/>
		</div>
	),
}));

jest.mock("../OtherProfileDetails", () => ({
	OtherProfileDetails: ({
		formData,
		setFormData,
	}: ComponentProps<typeof OtherProfileDetails>) => (
		<div data-testid="other-profile-details">
			<div data-testid="other-profile-details-form-data">
				{JSON.stringify(formData)}
			</div>
			<input
				data-testid="other-profile-details-input"
				onChange={setFormData as any}
			/>
		</div>
	),
}));

jest.mock("../../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

const defaultProps = {
	email: "",
	phone: "",
	formData: { firstName: "", lastName: "" },
	setFormData: jest.fn(),
	errorKeys: {},
	serverErrorKeys: {},
	handleSubmit: jest.fn(),
	toggleCallEnabled: jest.fn(),
	togglePushEnabled: jest.fn(),
	toggleEmailEnabled: jest.fn(),
	toggleSmsEnabled: jest.fn(),
	toggleLineEnabled: jest.fn(),
	isAllPreferencesChecked: false,
	toggleAllPreferences: jest.fn(),
	birthMonth: 4,
	setBirthMonth: jest.fn(),
	birthYear: 1960,
	setBirthYear: jest.fn(),
	validateBirthday: jest.fn(),
	isParentalConsentRequired: true,
	marketingPreference: {
		isCallEnabled: false,
		isPushEnabled: true,
		isEmailEnabled: false,
		isSmsEnabled: false,
		isLineEnabled: false,
	},
	hasError: false,
	userProfileIsLoading: false,
	userProfile: undefined,
	hasConsentInCompleteYourProfile: true,
	hasLineNotification: false,
};

describe("CompleteYourProfileWithNoEmailForm", () => {
	it("should render without error", () => {
		render(<CompleteYourProfileWithNoEmailForm {...defaultProps} />);
	});

	it("should render tracking form name", () => {
		render(<CompleteYourProfileWithNoEmailForm {...defaultProps} />);

		const trackingFormName = screen.getByTestId("tracking-form-name");

		expect(trackingFormName).toBeInTheDocument();
		expect(trackingFormName).toHaveTextContent("create_profile");
	});

	it("should render BasicProfile component", () => {
		render(<CompleteYourProfileWithNoEmailForm {...defaultProps} />);
		const basicProfileComponent = screen.getByTestId(
			"basic-profile-component"
		);
		expect(basicProfileComponent).toBeInTheDocument();
	});

	it("should render OtherProfileDetails component", () => {
		render(<CompleteYourProfileWithNoEmailForm {...defaultProps} />);
		const otherProfileDetailsComponent = screen.getByTestId(
			"other-profile-details"
		);
		expect(otherProfileDetailsComponent).toBeInTheDocument();
	});

	it("should render CompleteYourProfileForm form", () => {
		render(<CompleteYourProfileWithNoEmailForm {...defaultProps} />);
		const completeYourProfileWithNoEmailForm = screen.getByTestId(
			"complete-profile-with-no-email-form"
		);
		expect(completeYourProfileWithNoEmailForm).toBeInTheDocument();
	});

	it("should render REGISTER button", () => {
		render(<CompleteYourProfileWithNoEmailForm {...defaultProps} />);
		const registerButton = screen.getByText(
			"completeYourProfileForm.button.registerLabel"
		);
		expect(registerButton).toBeInTheDocument();
	});

	it("should render consent of email confirmation if consent is configured to be displayed", () => {
		render(<CompleteYourProfileWithNoEmailForm {...defaultProps} />);
		const emailConsentText = screen.getByText(
			"completeYourProfilePage.emailConfirmationConsent"
		);
		expect(emailConsentText).toBeInTheDocument();
	});

	it("should not render consent of email confirmation consent is configured to not be displayed", () => {
		render(
			<CompleteYourProfileWithNoEmailForm
				{...{
					...defaultProps,
					hasConsentInCompleteYourProfile: false,
				}}
			/>
		);
		const emailConsentText = screen.queryByText(
			"completeYourProfilePage.emailConfirmationConsent"
		);
		expect(emailConsentText).not.toBeInTheDocument();
	});
});
