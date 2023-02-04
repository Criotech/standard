import EditProfileLegacy from ".";
import {
	act,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { useLegacyUser } from "../../hooks/useLegacyUser";
import { Gender } from "@myacuvue_thailand_web/services";
import { ComponentProps } from "react";
import { Status, useSnackbar } from "../../hooks/useSnackbar";
import { useRegisterValidations } from "../../hooks/validations/useRegisterValidations";
import { useNavigate } from "react-router-dom-v5-compat";
import Text from "../../components/Text";
import Header from "../../components/Layout/Header";
import GenericInput from "../../components/GenericInput";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { mocked } from "ts-jest/utils";

jest.mock("../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
}));

jest.mock("../../hooks/validations/useRegisterValidations");

jest.mock("../../hooks/useLegacyUser", () => ({
	useLegacyUser: jest.fn(),
}));

jest.mock("../../components/GenericInput", () => ({
	__esModule: true,
	default: ({
		alwaysVisibleErrorKey,
		onChange,
		value,
	}: ComponentProps<typeof GenericInput>) => (
		<span data-testid="generic-input">
			<input
				data-testid="text-input"
				value={value}
				onChange={(newValue) => {
					onChange(newValue.target.value);
				}}
				type="text"
			/>
			{alwaysVisibleErrorKey}
		</span>
	),
}));

jest.mock("../../hooks/useSnackbar", () => ({
	useSnackbar: jest.fn(),
	Status: {
		SUCCESS: "success",
		WARN: "warn",
	},
}));

jest.mock("../../components/Layout/Header", () => ({
	__esModule: true,
	default: ({ titleKey }: ComponentProps<typeof Header>) => (
		<div data-testid="header">{titleKey}</div>
	),
}));

jest.mock("../../components/GlobalNavigationPanel", () => ({
	__esModule: true,
	default: () => <div data-testid="global-navigation-panel" />,
}));

jest.mock("../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

beforeEach(() => {
	mocked(useNavigate).mockReturnValue(jest.fn());

	mocked(useRegisterValidations).mockReturnValue({
		validateEmail: jest.fn(),
		validateFirstName: jest.fn(),
		validateLastName: jest.fn(),
		validateGender: jest.fn(),
		removeZeroPrefix: jest.fn(),
		validateBirthday: jest.fn(),
		isValidPhoneNumber: jest.fn(),
		validateLensesUsage: jest.fn(),
		validateSpectableWearer: jest.fn(),
	});

	mocked(useLegacyUser).mockReturnValue({
		user: {
			id: "fakeId",
			phone: "fakeNumber",
			profile: {
				birthday: "fakeBirthday",
				email: "fake@mail.com",
				firstName: "fakeName",
				gender: Gender.FEMALE,
				lastName: "fakeLastName",
			},
		},
		updateProfile: jest.fn(),
		getConsents: jest.fn(),
		saveConsents: jest.fn(),
	});

	mocked(useSnackbar).mockReturnValue({
		showSnackbar: jest.fn(),
	});

	mocked(useUserProfile).mockReturnValue({
		userProfile: undefined,
		wasEmptyBefore: false,
		setEmptyBefore: jest.fn(),
		refreshUserProfile: jest.fn(),
		isLoading: false,
		profileCompleteness: undefined,
	});
});

describe("EditProfileLegacy", () => {
	it("should render 3 text inputs", async () => {
		act(() => {
			render(<EditProfileLegacy />);
		});

		await waitFor(() => {
			const textInputs = screen.getAllByTestId("text-input");
			expect(textInputs).toHaveLength(3);
		});
	});

	it("should render header", async () => {
		act(() => {
			render(<EditProfileLegacy />);
		});

		await waitFor(() => {
			const header = screen.getByTestId("header");
			expect(header).toBeVisible();
			expect(header).toHaveTextContent(
				"profileAndSettingsPage.editProfileDetails.title"
			);
		});
	});

	it("should render GlobalNavigationPanel", async () => {
		act(() => {
			render(<EditProfileLegacy />);
		});

		await waitFor(() => {
			const navigationPanel = screen.getByTestId(
				"global-navigation-panel"
			);
			expect(navigationPanel).toBeVisible();
		});
	});

	it("should update profile with correct form data when submitting the form with no errors", async () => {
		const fakeUpdateProfile = jest.fn();

		(useLegacyUser as jest.Mock).mockReturnValue({
			user: {
				id: "fakeId",
				phone: "fakeNumber",
				profile: {
					birthday: "fakeBirthday",
					email: "fake@mail.com",
					firstName: "fakeName",
					gender: Gender.FEMALE,
					lastName: "fakeLastName",
				},
			},
			updateProfile: fakeUpdateProfile,
		});

		mocked(useUserProfile).mockReturnValue({
			userProfile: {
				firstName: "fakeFirstName",
				lastName: "fakeLastName",
				phone: "66958463489",
				gender: Gender.FEMALE,
				email: "fakeEmail",
				lensesUsage: null,
				hasParentalConsent: false,
				birthYear: "2022",
				birthMonth: "03",
				isSpectaclesWearer: false,
				myAcuvueId: "user id",
			},
			wasEmptyBefore: false,
			setEmptyBefore: jest.fn(),
			refreshUserProfile: jest.fn(),
			isLoading: false,
			profileCompleteness: undefined,
		});

		act(() => {
			render(<EditProfileLegacy />);
		});

		act(() => {
			const submitButton = screen.getByRole("button");
			fireEvent.submit(submitButton);
		});

		await waitFor(() => {
			expect(fakeUpdateProfile).toHaveBeenCalledWith({
				firstName: "fakeFirstName",
				lastName: "fakeLastName",
				email: "fakeEmail",
			});
		});
	});

	it("should show snackbar after submitting the form with no errors", async () => {
		const fakeShowSnackbar = jest.fn();
		(useSnackbar as jest.Mock).mockReturnValue({
			showSnackbar: fakeShowSnackbar,
		});

		act(() => {
			render(<EditProfileLegacy />);
		});

		act(() => {
			const submitButton = screen.getByRole("button");
			fireEvent.submit(submitButton);
		});

		await waitFor(() => {
			expect(fakeShowSnackbar).toHaveBeenCalledWith(
				Status.SUCCESS,
				"editProfile.changesSaved",
				{},
				3
			);
		});
	});

	it("should call refreshUserProfile after submitting the form with no errors", async () => {
		const mockRefreshUserProfile = jest.fn();
		mocked(useUserProfile).mockReturnValue({
			userProfile: {
				firstName: "fakeFirstName",
				lastName: "fakeLastName",
				phone: "66958463489",
				gender: Gender.FEMALE,
				email: "fakeEmail",
				lensesUsage: null,
				hasParentalConsent: false,
				birthYear: "2022",
				birthMonth: "03",
				isSpectaclesWearer: false,
				myAcuvueId: "user id",
			},
			wasEmptyBefore: false,
			setEmptyBefore: jest.fn(),
			refreshUserProfile: mockRefreshUserProfile,
			isLoading: false,
			profileCompleteness: undefined,
		});

		act(() => {
			render(<EditProfileLegacy />);
		});

		act(() => {
			const submitButton = screen.getByRole("button");
			fireEvent.submit(submitButton);
		});

		await waitFor(() => {
			expect(mockRefreshUserProfile).toHaveBeenCalled();
		});
	});

	it("should redirect to /profile/details after submitting the form with no errors", async () => {
		act(() => {
			render(<EditProfileLegacy />);
		});

		act(() => {
			const submitButton = screen.getByRole("button");
			fireEvent.submit(submitButton);
		});

		await waitFor(() => {
			expect(useNavigate()).toHaveBeenCalledWith("/profile/details");
		});
	});

	it("should set error if update profile call has errors", () => {
		const fakeUpdateProfile = jest.fn().mockRejectedValue({
			formFieldErrors: [{ fakeFieldName: "fakeFieldErrorValue" }],
		});
		(useLegacyUser as jest.Mock).mockReturnValue({
			user: {
				id: "fakeId",
				phone: "fakeNumber",
				profile: {
					birthday: "fakeBirthday",
					email: "fake@mail.com",
					firstName: "fakeName",
					gender: Gender.FEMALE,
					lastName: "fakeLastName",
				},
			},
			updateProfile: fakeUpdateProfile,
		});
		const error = {
			formFieldErrors: [
				{
					fieldName: "firstName",
					translationKey: "notProvided",
				},
			],
		};
		const setError = jest.fn();

		act(() => {
			render(<EditProfileLegacy />);
		});

		act(() => {
			const submitButton = screen.getByRole("button");
			fireEvent.submit(submitButton);
		});

		waitFor(() =>
			expect(setError).toHaveBeenCalledWith({
				formFieldErrors: [
					{
						fieldName: "firstName",
						translationKey: "notProvided",
					},
				],
			})
		);
		const firstNameInput = screen.getAllByTestId("generic-input")[0];
		waitFor(() => expect(firstNameInput).toHaveTextContent("notProvided"));
	});

	it("should set form data with latest value when form input value changes", async () => {
		await act(async () => {
			render(<EditProfileLegacy />);
		});

		act(() => {
			const firstNameInput = screen.getAllByTestId("text-input")[0];
			fireEvent.change(firstNameInput, {
				target: { value: "fakeFirstNameEdited" },
			});
		});

		act(() => {
			const submitButton = screen.getByRole("button");
			fireEvent.submit(submitButton);
		});

		await waitFor(() => {
			const firstNameInput = screen.getAllByTestId("text-input")[0];
			expect(firstNameInput).toHaveValue("fakeFirstNameEdited");
		});
	});
});
