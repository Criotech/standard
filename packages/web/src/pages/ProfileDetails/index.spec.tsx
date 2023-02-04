import { act, render, screen, waitFor } from "@testing-library/react";
import ProfileDetails from "./index";
import { Gender } from "@myacuvue_thailand_web/services";
import { useNavigate } from "react-router-dom-v5-compat";
import { ComponentProps } from "react";
import Text from "../../components/Text";
import Header from "../../components/Layout/Header";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { mocked } from "ts-jest/utils";
import { useAddress } from "../../hooks/useAddress";

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
}));

jest.mock("../../components/Text", () => ({
	__esModule: true,
	default: ({ textKey }: ComponentProps<typeof Text>) => textKey,
}));

jest.mock("../../components/LoadingBlock", () => ({
	__esModule: true,
	default: () => <div data-testid="loading-block" />,
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

jest.mock("../../hooks/useAddress", () => ({
	useAddress: jest.fn(),
}));

jest.mock("../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

beforeEach(() => {
	mocked(useNavigate).mockReturnValue(jest.fn());

	mocked(useUserProfile).mockReturnValue({
		userProfile: undefined,
		wasEmptyBefore: false,
		setEmptyBefore: jest.fn(),
		refreshUserProfile: jest.fn(),
		isLoading: false,
		profileCompleteness: undefined,
	});

	mocked(useAddress).mockReturnValue({
		getMailingAddress: jest.fn(),
		saveMailingAddress: jest.fn(),
		saveShippingAddress: jest.fn(),
		getShippingAddress: jest.fn().mockResolvedValue(null),
		getStates: jest.fn().mockResolvedValue([]),
	});
});

describe("ProfileDetails", () => {
	it("should render user's information correctly when the user profile is present", async () => {
		mocked(useUserProfile).mockReturnValue({
			userProfile: {
				firstName: "fakeName",
				lastName: "fakeLastname",
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
			render(<ProfileDetails />);
		});

		await waitFor(() => {
			const firstName = screen.getByText("fakeName");
			expect(firstName).toBeVisible();

			const lastName = screen.getByText("fakeLastname");
			expect(lastName).toBeVisible();

			const gender = screen.getByText(
				"profileAndSettingsPage.profileDetails.genderFemaleLabel"
			);
			expect(gender).toBeVisible();

			const birthday = screen.getByText("03/2022");
			expect(birthday).toBeVisible();

			const email = screen.getByText("fakeEmail");
			expect(email).toBeVisible();

			const phoneNumber = screen.getByText("+66958463489");
			expect(phoneNumber).toBeVisible();
		});
	});

	it("should render a LoadingBlock when screen is loading", async () => {
		mocked(useUserProfile).mockReturnValue({
			userProfile: {
				firstName: "fakeName",
				lastName: "fakeLastname",
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
			isLoading: true,
			profileCompleteness: undefined,
		});

		act(() => {
			render(<ProfileDetails />);
		});

		await waitFor(() => {
			const loadingBlock = screen.getByTestId("loading-block");
			expect(loadingBlock).toBeInTheDocument();
		});
	});

	it("should navigate to /profile/edit when clicking 1st edit button and address is defined", async () => {
		mocked(useUserProfile).mockReturnValue({
			userProfile: {
				firstName: "fakeName",
				lastName: "fakeLastname",
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
			render(<ProfileDetails />);
		});

		await waitFor(() => {
			const editButton = screen.getAllByText(
				"profileAndSettingsPage.editProfileDetails.edit"
			)[0];
			editButton.click();
		});

		expect(useNavigate()).toHaveBeenCalledWith("/profile/edit");
	});

	it("should navigate to /profile/default-address/edit when clicking 2nd edit button and address is defined", async () => {
		mocked(useAddress).mockReturnValue({
			getMailingAddress: jest.fn(),
			saveMailingAddress: jest.fn(),
			saveShippingAddress: jest.fn(),
			getShippingAddress: jest.fn().mockResolvedValue({
				state: "state id",
			}),
			getStates: jest.fn().mockResolvedValue([
				{
					id: "state id",
					names: {
						en: "state name",
					},
				},
			]),
		});

		mocked(useUserProfile).mockReturnValue({
			userProfile: {
				firstName: "fakeName",
				lastName: "fakeLastname",
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
			render(<ProfileDetails />);
		});

		await waitFor(() => {
			const editButton = screen.getAllByText(
				"profileAndSettingsPage.editProfileDetails.edit"
			)[1];
			editButton.click();
		});

		expect(useNavigate()).toHaveBeenCalledWith(
			"/profile/default-address/edit"
		);
	});

	it("should navigate to /update-mobile when clicking 3rd edit button and address is defined", async () => {
		mocked(useAddress).mockReturnValue({
			getMailingAddress: jest.fn(),
			saveMailingAddress: jest.fn(),
			saveShippingAddress: jest.fn(),
			getShippingAddress: jest.fn().mockResolvedValue({
				state: "state id",
			}),
			getStates: jest.fn().mockResolvedValue([
				{
					id: "state id",
					names: {
						en: "state name",
					},
				},
			]),
		});

		mocked(useUserProfile).mockReturnValue({
			userProfile: {
				firstName: "fakeName",
				lastName: "fakeLastname",
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
			render(<ProfileDetails />);
		});

		await waitFor(() => {
			const editButton = screen.getAllByText(
				"profileAndSettingsPage.editProfileDetails.edit"
			)[2];
			editButton.click();
		});

		expect(useNavigate()).toHaveBeenCalledWith("/update-mobile");
	});

	it("should navigate to /profile/default-address/add when clicking 'add new address' button and address is not defined", async () => {
		mocked(useAddress).mockReturnValue({
			getMailingAddress: jest.fn(),
			saveMailingAddress: jest.fn(),
			saveShippingAddress: jest.fn(),
			getShippingAddress: jest.fn().mockResolvedValue(null),
			getStates: jest.fn().mockResolvedValue([]),
		});

		mocked(useUserProfile).mockReturnValue({
			userProfile: {
				firstName: "fakeName",
				lastName: "fakeLastname",
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
			render(<ProfileDetails />);
		});

		await waitFor(() => {
			const addAddressButton = screen.getByText(
				"profileAndSettingsPage.profileDetails.addNewAddress"
			);
			addAddressButton.click();
		});

		expect(useNavigate()).toHaveBeenCalledWith(
			"/profile/default-address/add"
		);
	});
});
