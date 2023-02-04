import EditProfile from ".";
import { act, render, screen, waitFor } from "@testing-library/react";
import { useUser } from "../../hooks/useUser";
import {
	Gender,
	InvalidFormSubmissionError,
} from "@myacuvue_thailand_web/services";
import { ComponentProps } from "react";
import { Status, useSnackbar } from "../../hooks/useSnackbar";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { useRegisterValidations } from "../../hooks/validations/useRegisterValidations";
import { useHistory } from "react-router-dom";
import { useDate } from "../../hooks/useDate";
import EditProfileForm from "./EditProfileForm";
import { mocked } from "ts-jest/utils";

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

jest.mock("../../hooks/validations/useRegisterValidations");

jest.mock("../../hooks/useUser", () => ({
	useUser: jest.fn(),
}));

jest.mock("../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("../../hooks/useSnackbar", () => ({
	useSnackbar: jest.fn(),
	Status: {
		SUCCESS: "success",
		WARN: "warn",
	},
}));

jest.mock("../../hooks/useDate", () => ({
	useDate: jest.fn(),
}));

jest.mock("../../components/Layout/MyAcuvueLiteHeader", () => ({
	__esModule: true,
	default: () => <div data-testid="myacuvue-lite-header" />,
}));

jest.mock("../../components/Footer", () => ({
	__esModule: true,
	default: () => <div data-testid="myacuvue-lite-footer" />,
}));

jest.mock("../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-block" />,
}));

jest.mock("../../components/Title", () => ({
	__esModule: true,
	default: () => <div data-testid="edit-profile-title" />,
}));

jest.mock("./EditProfileForm", () => ({
	__esModule: true,
	default: ({
		onSubmit,
		onCancel,
		serverErrorKeys,
		errorKeys,
	}: ComponentProps<typeof EditProfileForm>) => (
		<div data-testid="edit-profile-form">
			<span data-testid="server-errors">
				{JSON.stringify(serverErrorKeys)}
			</span>
			<span>{JSON.stringify(errorKeys)}</span>
			<button
				onClick={onSubmit}
				type="button"
				data-testid="submit-button"
			>
				submit
			</button>

			<button
				onClick={onCancel}
				type="button"
				data-testid="cancel-button"
			>
				submit
			</button>
		</div>
	),
}));

const fakeGetProfile = {
	myAcuvueId: "fakeId",
	phone: "fakeNumber",
	birthday: "1995",
	birthMonth: "07",
	email: "fake@mail.com",
	firstName: "fakeName",
	gender: Gender.FEMALE,
	lastName: "fakeLastName",
};

beforeEach(() => {
	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});

	(useUser as jest.Mock).mockReturnValue({
		getProfile: jest.fn().mockResolvedValue(fakeGetProfile),
		saveProfile: jest.fn().mockResolvedValue(null),
	});

	(useRegisterValidations as jest.Mock).mockReturnValue({
		validateFirstName: jest.fn().mockImplementation(() => undefined),
		validateLastName: jest.fn().mockImplementation(() => undefined),
	});

	mocked(useUserProfile).mockReturnValue({
		userProfile: undefined,
		wasEmptyBefore: false,
		setEmptyBefore: jest.fn(),
		refreshUserProfile: jest.fn(),
		isLoading: false,
		profileCompleteness: undefined,
	});

	(useDate as jest.Mock).mockReturnValue({
		shortDateToDisplay: jest.fn(),
		getDateFromString: jest.fn(),
	});

	(useSnackbar as jest.Mock).mockReturnValue({
		showSnackbar: jest.fn(),
	});
});

describe("EditProfile", () => {
	it("should render without error", async () => {
		await act(async () => {
			render(<EditProfile />);
		});
	});

	it("should render myacuvue lite header", async () => {
		await act(async () => {
			render(<EditProfile />);
		});

		const header = screen.getByTestId("myacuvue-lite-header");
		expect(header).toBeInTheDocument();
	});

	it("should render myacuvue lite footer", async () => {
		await act(async () => {
			render(<EditProfile />);
		});

		const header = screen.getByTestId("myacuvue-lite-footer");
		expect(header).toBeInTheDocument();
	});

	it("should render loading block when user profile is not available", async () => {
		act(() => {
			render(<EditProfile />);
		});

		await waitFor(() => {
			const loadingBlock = screen.getByTestId("loading-block");
			expect(loadingBlock).toBeInTheDocument();
		});
	});

	it("should update profile with correct form data when submitting the form with no errors", async () => {
		const fakeUpdateProfile = jest.fn().mockResolvedValue(null);

		(useUser as jest.Mock).mockReturnValue({
			getProfile: jest.fn().mockResolvedValue(fakeGetProfile),
			saveProfile: fakeUpdateProfile,
		});

		await act(async () => {
			render(<EditProfile />);
		});

		const submitButton = screen.getByTestId("submit-button");

		expect(submitButton).toBeInTheDocument();

		await waitFor(() => {
			act(() => {
				submitButton?.click();
			});

			expect(fakeUpdateProfile).toHaveBeenCalled();
		});
	});

	it("should show snackbar after submitting the form with no errors", async () => {
		const fakeUpdateProfile = jest.fn().mockResolvedValue(null);

		const fakeShowSnackbar = jest.fn();
		(useSnackbar as jest.Mock).mockReturnValue({
			showSnackbar: fakeShowSnackbar,
		});

		(useUser as jest.Mock).mockReturnValue({
			getProfile: jest.fn().mockResolvedValue(fakeGetProfile),
			saveProfile: fakeUpdateProfile,
		});

		await act(async () => {
			render(<EditProfile />);
		});

		await waitFor(() => {
			const submitButton = screen.getByTestId("submit-button");
			act(() => {
				submitButton?.click();
			});

			expect(fakeShowSnackbar).toHaveBeenCalledWith(
				Status.SUCCESS,
				"editProfilePage.successMessage",
				{},
				3
			);
		});
	});

	it("should call refreshUserProfile after submitting the form with no errors", async () => {
		const fakeUpdateProfile = jest.fn().mockResolvedValue(null);

		const fakeRefreshUserProfile = jest.fn();

		mocked(useUserProfile).mockReturnValue({
			userProfile: undefined,
			wasEmptyBefore: false,
			setEmptyBefore: jest.fn(),
			refreshUserProfile: fakeRefreshUserProfile,
			isLoading: false,
			profileCompleteness: undefined,
		});

		(useUser as jest.Mock).mockReturnValue({
			getProfile: jest.fn().mockResolvedValue(fakeGetProfile),
			saveProfile: fakeUpdateProfile,
		});

		await act(async () => {
			render(<EditProfile />);
		});

		await waitFor(() => {
			const submitButton = screen.getByTestId("submit-button");
			submitButton.click();
			expect(fakeRefreshUserProfile).toHaveBeenCalled();
		});
	});

	it("should redirect to /profile after submitting the form with no errors", async () => {
		const fakeUpdateProfile = jest.fn().mockResolvedValue(null);

		(useUser as jest.Mock).mockReturnValue({
			getProfile: jest.fn().mockResolvedValue(fakeGetProfile),
			saveProfile: fakeUpdateProfile,
		});

		await act(async () => {
			render(<EditProfile />);
		});

		await waitFor(() => {
			const submitButton = screen.getByTestId("submit-button");
			submitButton.click();
			expect(useHistory().push).toHaveBeenCalledWith("/profile");
		});
	});

	it("should redirect to /profile when cancel button is clicked", async () => {
		await act(async () => {
			render(<EditProfile />);
		});

		await waitFor(() => {
			const submitButton = screen.getByTestId("cancel-button");
			submitButton.click();
			expect(useHistory().push).toHaveBeenCalledWith("/profile");
		});
	});

	it("should set error if update profile call has errors", async () => {
		const payloadErrors = {
			firstName: {
				"validation.any.invalid": {},
			},
		};

		const error = new InvalidFormSubmissionError(payloadErrors);

		const fakeUpdateProfile = jest.fn().mockImplementation(() => {
			throw error;
		});

		(useUser as jest.Mock).mockReturnValue({
			getProfile: jest.fn().mockResolvedValue(fakeGetProfile),
			saveProfile: fakeUpdateProfile,
		});

		await act(async () => {
			render(<EditProfile />);
		});

		await waitFor(() => {
			const submitButton = screen.getByTestId("submit-button");
			submitButton.click();

			const serverErrorInInput = screen.getByTestId("server-errors");

			expect(serverErrorInInput).toHaveTextContent(
				'{"firstName":"validation.firstName.any.invalid"}'
			);
		});
	});
});
