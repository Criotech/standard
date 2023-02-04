import { ComponentProps } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { CompleteYourProfileWithEmailForm } from ".";
import { BasicProfile } from "../BasicProfile";
import { OtherProfileDetails } from "../OtherProfileDetails";
import Text from "../../../components/Text";
import TrackedGenericInput from "../../../components/TrackedGenericInput";
import userEvent from "@testing-library/user-event";
import { useHistory } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import TrackedForm from "../../../components/TrackedForm";

jest.mock("../../../components/TrackedForm", () => ({
	__esModule: true,
	default: ({
		children,
		onFinish,
		trackingFormName,
	}: ComponentProps<typeof TrackedForm>) => (
		<form
			data-testid="complete-your-profile-with-email-form"
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

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

jest.mock("../../../hooks/useUser", () => ({
	useUser: jest.fn(),
}));

jest.mock("../../../components/TrackedGenericInput", () => ({
	__esModule: true,
	default: ({
		alwaysVisibleErrorKey,
		onChange,
	}: ComponentProps<typeof TrackedGenericInput>) => (
		<div>
			<div data-testid="generic-input-server-error">
				{alwaysVisibleErrorKey}
			</div>
			<input
				type="text"
				data-testid="generic-input"
				onChange={onChange as any}
			/>
		</div>
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
	isFormDirty: false,
	isAlreadyRegisteredUser: false,
	userProfile: undefined,
	hasLineNotification: false,
};

beforeEach(() => {
	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});

	(useUser as jest.Mock).mockReturnValue({
		updateAuthenticationDone: jest.fn(),
	});
});

describe("CompleteYourProfileWithEmailForm", () => {
	it("should render without error", () => {
		render(<CompleteYourProfileWithEmailForm {...defaultProps} />);
	});

	it("should render tracking form name", () => {
		render(<CompleteYourProfileWithEmailForm {...defaultProps} />);

		const trackingFormName = screen.getByTestId("tracking-form-name");

		expect(trackingFormName).toBeInTheDocument();
		expect(trackingFormName).toHaveTextContent("create_profile");
	});

	it("should render a TrackedGenericInput components", async () => {
		render(<CompleteYourProfileWithEmailForm {...defaultProps} />);
		const trackedGenericInput = await screen.findAllByTestId(
			"generic-input"
		);
		expect(trackedGenericInput).toHaveLength(1);
	});

	it("should render BasicProfile component", () => {
		render(<CompleteYourProfileWithEmailForm {...defaultProps} />);
		const basicProfileComponent = screen.getByTestId(
			"basic-profile-component"
		);
		expect(basicProfileComponent).toBeInTheDocument();
	});

	it("should render OtherProfileDetails component", () => {
		render(<CompleteYourProfileWithEmailForm {...defaultProps} />);
		const otherProfileDetailsComponent = screen.getByTestId(
			"other-profile-details"
		);
		expect(otherProfileDetailsComponent).toBeInTheDocument();
	});

	it("should call setFormData on user input in email TrackedGenericInput", () => {
		const fakeSetFormData = jest.fn();
		render(
			<CompleteYourProfileWithEmailForm
				{...defaultProps}
				setFormData={fakeSetFormData}
			/>
		);

		const trackedGenericInput = screen.getAllByTestId("generic-input")[0];
		userEvent.click(trackedGenericInput);
		userEvent.keyboard("John@gmail.com");
		expect(fakeSetFormData).toHaveBeenCalled();
	});

	it("should render CompleteYourProfileWithEmailForm form", () => {
		render(<CompleteYourProfileWithEmailForm {...defaultProps} />);
		const completeYourProfileWithEmailFormElement = screen.getByTestId(
			"complete-your-profile-with-email-form"
		);
		expect(completeYourProfileWithEmailFormElement).toBeInTheDocument();
	});

	it("should render REGISTER button", () => {
		render(
			<CompleteYourProfileWithEmailForm
				{...defaultProps}
				isAlreadyRegisteredUser={false}
				isFormDirty={false}
			/>
		);
		const registerButton = screen.getByText(
			"completeYourProfileForm.button.registerLabel"
		);
		expect(registerButton).toBeInTheDocument();
	});

	it("should render UPDATE button", () => {
		render(
			<CompleteYourProfileWithEmailForm
				{...defaultProps}
				isAlreadyRegisteredUser={true}
				isFormDirty={true}
			/>
		);
		const updateButton = screen.getByText(
			"completeYourProfileForm.button.updateLabel"
		);
		expect(updateButton).toBeInTheDocument();
	});

	it("should render SKIP button", () => {
		render(
			<CompleteYourProfileWithEmailForm
				{...defaultProps}
				isAlreadyRegisteredUser={true}
				isFormDirty={false}
			/>
		);
		const skipButton = screen.getByText(
			"completeYourProfileForm.button.skipLabel"
		);
		expect(skipButton).toBeInTheDocument();
	});

	it("should redirect to store page after clicking skip button", async () => {
		render(
			<CompleteYourProfileWithEmailForm
				{...defaultProps}
				isAlreadyRegisteredUser={true}
				isFormDirty={false}
			/>
		);

		const skipButton = screen.getByText(
			"completeYourProfileForm.button.skipLabel"
		);
		userEvent.click(skipButton);
		await waitFor(() => {
			expect(useHistory().push).toHaveBeenCalledWith("/");
		});
	});
});
