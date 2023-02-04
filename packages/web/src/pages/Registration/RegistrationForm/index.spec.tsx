import RegistrationForm from "./index";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { useUser } from "../../../hooks/useUser";
import { useCoupon } from "../../../hooks/useCoupon";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { AuthStatus } from "../../../contexts/AuthContext";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import { useNavigate } from "react-router-dom-v5-compat";
import { renderWithLanguage, screen } from "../../../test-utils";
import { act, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mocked } from "ts-jest/utils";
import { useLegalAge } from "../../../hooks/useLegalAge";
import { LegalAgeRange } from "@myacuvue_thailand_web/services";

jest.mock("../../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../../hooks/useUser", () => ({
	useUser: jest.fn(),
}));

jest.mock("../../../hooks/useCoupon", () => ({
	useCoupon: jest.fn(),
}));

jest.mock("../../../hooks/useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("../../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
}));

jest.mock("../../../hooks/useLegalAge", () => ({
	useLegalAge: jest.fn(),
}));

beforeEach(() => {
	(useConfiguration as jest.Mock).mockReturnValue({
		instance: "yzbn",
	});

	mocked(useUser).mockReturnValue({
		saveProfile: jest.fn(),
		updateAuthenticationDone: jest.fn(),
		generatePromocode: jest.fn(),
		getProfile: jest.fn(),
		getPromocode: jest.fn(),
	});

	mocked(useCoupon).mockReturnValue({
		getUserCoupons: jest.fn(),
		checkoutLifestyleCoupons: jest.fn(),
		getAcuvueCoupons: jest.fn(),
		redeemCoupon: jest.fn(),
		checkoutAcuvueCoupons: jest.fn(),
		getLifestyleCoupons: jest.fn(),
	});

	mocked(useAuthentication).mockReturnValue({
		getUser: jest.fn(),
		resetAuth: jest.fn(),
		user: undefined,
		sessionToken: undefined,
		processSessionToken: jest.fn(),
		setDeviceToken: jest.fn(),
		status: AuthStatus.AUTHENTICATED,
		deviceToken: undefined,
	});

	mocked(useUserProfile).mockReturnValue({
		userProfile: undefined,
		wasEmptyBefore: false,
		setEmptyBefore: jest.fn(),
		refreshUserProfile: jest.fn(),
		isLoading: false,
		profileCompleteness: undefined,
	});

	mocked(useLegalAge).mockReturnValue({
		getLegalAgeRange: jest.fn().mockReturnValue(LegalAgeRange.ADULT),
	});
});

it("should navigate user to '/home' when Skip button is clicked", async () => {
	const mockNavigate = jest.fn();
	mocked(useNavigate).mockReturnValue(mockNavigate);

	act(() => {
		renderWithLanguage(<RegistrationForm />);
	});

	await waitFor(() => {
		const skipButton = screen.getByText("Skip");
		expect(skipButton).toBeVisible();
	});

	act(() => {
		const skipButton = screen.getByText("Skip");
		skipButton.click();
	});

	await waitFor(() => {
		expect(mockNavigate).toHaveBeenCalledWith("/home");
	});
});

it("should have the Register button disabled by default", async () => {
	act(() => {
		renderWithLanguage(<RegistrationForm />);
	});

	await waitFor(() => {
		const registerButton = screen.getByText("Register");
		expect(registerButton).toBeDisabled();
	});
});

it("should save profile, refresh user profile, get user coupons and navigate user to home when form is completed and register button is clicked", async () => {
	const mockGetUserCoupons = useCoupon().getUserCoupons;
	mocked(mockGetUserCoupons).mockResolvedValue([]);

	const mockNavigate = jest.fn();
	mocked(useNavigate).mockReturnValue(mockNavigate);

	act(() => {
		renderWithLanguage(<RegistrationForm />);
	});

	await waitFor(() => {
		const registerButton = screen.getByText("Register");
		expect(registerButton).toBeDisabled();
	});

	const [firstNameField, lastNameField, emailField] = screen.getAllByRole(
		"textbox"
	) as HTMLInputElement[];

	act(() => {
		fireEvent.change(firstNameField, {
			target: { value: "First" },
		});
	});

	await waitFor(() => {
		expect(firstNameField.value).toStrictEqual("First");
	});

	act(() => {
		fireEvent.change(lastNameField, {
			target: { value: "Last" },
		});
	});

	await waitFor(() => {
		expect(lastNameField.value).toStrictEqual("Last");
	});

	act(() => {
		fireEvent.change(emailField, {
			target: { value: "email@example.com" },
		});
	});

	await waitFor(() => {
		expect(emailField.value).toStrictEqual("email@example.com");
	});

	const selects = screen.getAllAntSelects();

	act(() => {
		const monthSelect = selects[0];
		fireEvent.mouseDown(monthSelect);
	});

	await waitFor(() => {
		const elements = document.querySelectorAll(
			".ant-select-dropdown:not(.ant-select-dropdown-hidden)"
		);
		expect(elements.length).toStrictEqual(1);
	});

	act(() => {
		const monthOption = screen.getAntSelectOption("June");
		monthOption.click();
	});

	await waitFor(() => {
		const elements = document.querySelectorAll(
			".ant-select-dropdown:not(.ant-select-dropdown-hidden)"
		);
		expect(elements.length).toStrictEqual(0);
	});

	act(() => {
		const yearSelect = selects[1];
		userEvent.click(yearSelect);
	});

	await waitFor(() => {
		const elements = document.querySelectorAll(
			".ant-select-dropdown:not(.ant-select-dropdown-hidden)"
		);
		expect(elements.length).toStrictEqual(1);
	});

	await act(async () => {
		await userEvent.keyboard("1980{enter}", { delay: 300 });
	});

	await waitFor(() => {
		const elements = document.querySelectorAll(
			".ant-select-dropdown:not(.ant-select-dropdown-hidden)"
		);
		expect(elements.length).toStrictEqual(0);
	});

	const maleGenderOption = screen.getByRole("radio", {
		name: "Male",
	});

	act(() => {
		maleGenderOption.click();
	});

	await waitFor(() => {
		expect(maleGenderOption).toBeChecked();
	});

	act(() => {
		const contactLensesSelect = selects[2];
		userEvent.click(contactLensesSelect);
	});

	await waitFor(() => {
		const elements = document.querySelectorAll(
			".ant-select-dropdown:not(.ant-select-dropdown-hidden)"
		);
		expect(elements.length).toStrictEqual(1);
	});

	act(() => {
		const acuvueBrandOption =
			screen.getAntSelectOption("Yes, Acuvue® Brand");
		acuvueBrandOption.click();
	});

	const registerButton = screen.getByText("Register");
	await waitFor(() => {
		expect(registerButton).toBeEnabled();
	});

	jest.useFakeTimers();

	act(() => {
		registerButton.click();
	});

	await waitFor(() => {
		expect(useUser().saveProfile).toHaveBeenCalledWith({
			birthMonth: "6",
			birthYear: "1980",
			email: "email@example.com",
			firstName: "First",
			gender: "male",
			lastName: "Last",
			lensesUsage: "ACUVUE_USER",
		});

		expect(useAuthentication().getUser).toHaveBeenCalled();

		expect(useUserProfile().refreshUserProfile).toHaveBeenCalled();

		expect(mockGetUserCoupons).toHaveBeenCalledTimes(1);
	});

	const sleepTimePerTrial = 2500;

	jest.advanceTimersByTime(sleepTimePerTrial);

	await waitFor(() => {
		expect(mockGetUserCoupons).toHaveBeenCalledTimes(2);
	});

	jest.advanceTimersByTime(sleepTimePerTrial);

	await waitFor(() => {
		expect(mockGetUserCoupons).toHaveBeenCalledTimes(3);
	});

	jest.advanceTimersByTime(sleepTimePerTrial);

	await waitFor(() => {
		expect(mockGetUserCoupons).toHaveBeenCalledTimes(4);
	});

	jest.advanceTimersByTime(sleepTimePerTrial);

	await waitFor(() => {
		expect(mockNavigate).toHaveBeenCalledWith(`/?couponValue=0`);
	});
});
