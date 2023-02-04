import { ComponentProps } from "react";
import { render, screen } from "@testing-library/react";
import { CompleteYourProfileForm } from ".";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { ConfigService } from "@myacuvue_thailand_web/services";
import { CompleteYourProfileWithEmailForm } from "../CompleteYourProfileWithEmailForm";
import { CompleteYourProfileWithNoEmailForm } from "../CompleteYourProfileWithNoEmailForm";

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../CompleteYourProfileWithEmailForm", () => ({
	CompleteYourProfileWithEmailForm: ({
		handleSubmit,
	}: ComponentProps<typeof CompleteYourProfileWithEmailForm>) => (
		<form
			data-testid="complete-your-profile-with-email-form"
			onSubmit={(e) => {
				e.preventDefault();
				(handleSubmit as any)();
			}}
		/>
	),
}));

jest.mock("../CompleteYourProfileWithNoEmailForm", () => ({
	CompleteYourProfileWithNoEmailForm: ({
		handleSubmit,
	}: ComponentProps<typeof CompleteYourProfileWithNoEmailForm>) => (
		<form
			data-testid="complete-your-profile-with-no-email-form"
			onSubmit={(e) => {
				e.preventDefault();
				(handleSubmit as any)();
			}}
		/>
	),
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
	isFormDirty: false,
	isAlreadyRegisteredUser: false,
	userProfile: undefined,
	hasLineNotification: false,
};

describe("CompleteYourProfileForm", () => {
	it("should render without error", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			instance: ConfigService.Instance.AU,
			profileFormType: ConfigService.ProfileForm.WITH_NO_EMAIL,
		});
		render(<CompleteYourProfileForm {...defaultProps} />);
	});

	it("should render CompleteYourProfileWithEmailForm form for TH", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			instance: ConfigService.Instance.TH,
			profileFormType: ConfigService.ProfileForm.WITH_NO_EMAIL,
		});
		render(<CompleteYourProfileForm {...defaultProps} />);
		const completeYourProfileWithNoEmailForm = screen.getByTestId(
			"complete-your-profile-with-no-email-form"
		);
		expect(completeYourProfileWithNoEmailForm).toBeInTheDocument();
	});

	it("should render CompleteYourProfileWithNoEmailForm form for AU", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			instance: ConfigService.Instance.AU,
			profileFormType: ConfigService.ProfileForm.WITH_NO_EMAIL,
		});
		render(<CompleteYourProfileForm {...defaultProps} />);
		const completeYourProfileWithNoEmailForm = screen.getByTestId(
			"complete-your-profile-with-no-email-form"
		);
		expect(completeYourProfileWithNoEmailForm).toBeInTheDocument();
	});

	it("should render CompleteYourProfileWithEmailForm form for IN", () => {
		(useConfiguration as jest.Mock).mockReturnValue({
			instance: ConfigService.Instance.IN,
			profileFormType: ConfigService.ProfileForm.WITH_EMAIL,
		});
		render(<CompleteYourProfileForm {...defaultProps} />);
		const completeYourProfileWithEmailForm = screen.getByTestId(
			"complete-your-profile-with-email-form"
		);
		expect(completeYourProfileWithEmailForm).toBeInTheDocument();
	});
});
