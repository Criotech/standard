import { renderHook, act } from "@testing-library/react-hooks";
import { useLegalAge } from "../../hooks/useLegalAge";
import { useRegisterValidations } from "../../hooks/validations/useRegisterValidations";
import { useUser } from "../../hooks/useUser";
import { useSettings } from "../../hooks/useSettings";
import { useToggleAll } from "../../hooks/useToggleAll";
import {
	CompleteYourProfileFormData,
	useCompleteYourProfile,
} from "./useCompleteYourProfile";
import {
	InvalidFormSubmissionError,
	ConfigService,
	Gender,
	ProfileCompleteness,
	Nullable,
	IProfile,
} from "@myacuvue_thailand_web/services";
import { useConfiguration } from "../../hooks/useConfiguration";
import { useStorage } from "../../hooks/useStorage";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { mocked } from "ts-jest/utils";
import { waitFor } from "@testing-library/react";
import { useHistory } from "react-router-dom";

jest.mock("../../hooks/useUser", () => ({
	useUser: jest.fn(),
}));

jest.mock("../../hooks/validations/useRegisterValidations");

jest.mock("../../hooks/useLegalAge", () => ({
	useLegalAge: jest.fn(),
}));

jest.mock("../../hooks/useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("../../hooks/useSettings", () => ({
	useSettings: jest.fn(),
}));

jest.mock("../../hooks/useToggleAll", () => ({
	useToggleAll: jest.fn(),
}));

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../../hooks/useStorage", () => ({
	useStorage: jest.fn(),
}));

jest.mock("../../contexts/UserProfileContext", () => ({
	useUserProfile: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

const defaultUserProfile: Nullable<IProfile> | undefined = {
	myAcuvueId: "",
	email: "",
	hasParentalConsent: null,
	firstName: null,
	lastName: null,
	phone: null,
	birthYear: null,
	birthMonth: null,
	gender: null,
	isSpectaclesWearer: null,
	lensesUsage: null,
};

beforeEach(() => {
	mocked(useToggleAll).mockReturnValue([true, jest.fn()]);

	mocked(useStorage).mockReturnValue([undefined, jest.fn(), jest.fn()]);

	(useConfiguration as jest.Mock).mockReturnValue({
		profileFormType: ConfigService.ProfileForm.WITH_NO_EMAIL,
		hasLineNotification: false,
	});

	mocked(useLegalAge).mockReturnValue({
		getLegalAgeRange: jest.fn(),
	});

	mocked(useUser).mockReturnValue({
		saveProfile: jest.fn(),
		getProfile: jest.fn(),
		updateAuthenticationDone: jest.fn(),
		generatePromocode: jest.fn(),
		getPromocode: jest.fn(),
	});

	mocked(useUserProfile).mockReturnValue({
		profileCompleteness: ProfileCompleteness.INCOMPLETE,
		userProfile: {
			...defaultUserProfile,
		},
		refreshUserProfile: jest.fn(),
		isLoading: false,
		wasEmptyBefore: false,
		setEmptyBefore: jest.fn(),
	});

	mocked(useRegisterValidations).mockReturnValue({
		validateFirstName: jest.fn(),
		validateLastName: jest.fn(),
		validateEmail: jest.fn(),
		validateBirthday: jest.fn(),
		validateGender: jest.fn(),
		validateLensesUsage: jest.fn(),
		validateSpectableWearer: jest.fn(),
		isValidPhoneNumber: jest.fn(),
		removeZeroPrefix: jest.fn(),
	});

	mocked(useSettings).mockReturnValue({
		saveNotificationPreferences: jest.fn(),
		getNotificationPreferences: jest.fn().mockResolvedValue({
			isPreferencesLoading: false,
			notificationPreferences: {
				marketing: {
					callEnabled: false,
					emailEnabled: false,
					pushEnabled: false,
					smsEnabled: false,
				},
			},
		}),
	});

	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});
});

describe("useCompleteYourProfile", () => {
	it("should already load mobile number 918100000001", async () => {
		mocked(useUserProfile).mockReturnValue({
			profileCompleteness: ProfileCompleteness.INCOMPLETE,
			userProfile: {
				...defaultUserProfile,
				phone: "918100000001",
			},
			refreshUserProfile: jest.fn(),
			isLoading: false,
			wasEmptyBefore: false,
			setEmptyBefore: jest.fn(),
		});

		const { result } = renderHook(() => useCompleteYourProfile());

		await waitFor(() => {
			expect(result.current.formData.phone).toStrictEqual("918100000001");
		});
	});

	it("should set isAlreadyRegisteredUser to true if profileCompleteness is COMPLETE", async () => {
		mocked(useUserProfile).mockReturnValue({
			profileCompleteness: ProfileCompleteness.COMPLETE,
			userProfile: {
				...defaultUserProfile,
			},
			refreshUserProfile: jest.fn(),
			isLoading: false,
			wasEmptyBefore: false,
			setEmptyBefore: jest.fn(),
		});

		const { result } = renderHook(() => useCompleteYourProfile());

		await waitFor(() => {
			expect(result.current.isAlreadyRegisteredUser).toStrictEqual(true);
		});
	});

	it("should set isAlreadyRegisteredUser to false if profileCompleteness is INCOMPLETE", async () => {
		mocked(useUserProfile).mockReturnValue({
			profileCompleteness: ProfileCompleteness.INCOMPLETE,
			userProfile: {
				...defaultUserProfile,
			},
			refreshUserProfile: jest.fn(),
			isLoading: false,
			wasEmptyBefore: false,
			setEmptyBefore: jest.fn(),
		});

		const { result } = renderHook(() => useCompleteYourProfile());

		await waitFor(() => {
			expect(result.current.isAlreadyRegisteredUser).toStrictEqual(false);
		});
	});

	it("should accommodate userProfile data into formData", async () => {
		mocked(useUserProfile).mockReturnValue({
			profileCompleteness: ProfileCompleteness.COMPLETE,
			userProfile: {
				myAcuvueId: "my acuvue id",
				birthYear: "1990",
				birthMonth: "01",
				firstName: "firstname",
				gender: Gender.MALE,
				hasParentalConsent: null,
				isSpectaclesWearer: true,
				lastName: "lastname",
				lensesUsage: "ACUVUE_USER",
				phone: "61473839202",
				email: "fakeEmail",
			},
			refreshUserProfile: jest.fn(),
			isLoading: false,
			wasEmptyBefore: false,
			setEmptyBefore: jest.fn(),
		});

		const { result } = renderHook(() => useCompleteYourProfile());

		const expectedFormData: CompleteYourProfileFormData = {
			birthYear: "1990",
			birthMonth: "01",
			firstName: "firstname",
			gender: Gender.MALE,
			hasParentalConsent: undefined,
			isSpectaclesWearer: true,
			lastName: "lastname",
			lensesUsage: "ACUVUE_USER",
			phone: "61473839202",
			email: "fakeEmail",
		};

		await waitFor(() => {
			expect(result.current.formData).toStrictEqual(expectedFormData);
		});
	});

	it("should accommodate notificationPreferences.marketing data into marketingPreference", async () => {
		mocked(useUserProfile).mockReturnValue({
			profileCompleteness: ProfileCompleteness.COMPLETE,
			userProfile: {
				...defaultUserProfile,
			},
			refreshUserProfile: jest.fn(),
			isLoading: false,
			wasEmptyBefore: false,
			setEmptyBefore: jest.fn(),
		});
		mocked(useSettings).mockReturnValue({
			saveNotificationPreferences: jest.fn(),
			getNotificationPreferences: jest.fn().mockResolvedValue({
				isPreferencesLoading: false,
				notificationPreferences: {
					marketing: {
						callEnabled: false,
						emailEnabled: false,
						pushEnabled: false,
						smsEnabled: false,
					},
				},
			}),
		});

		const { result } = renderHook(() => useCompleteYourProfile());

		const expectedMarketingPreferences = {
			isCallEnabled: false,
			isEmailEnabled: false,
			isPushEnabled: false,
			isSmsEnabled: false,
			isLineEnabled: false,
		};

		await waitFor(() => {
			expect(result.current.marketingPreference).toStrictEqual(
				expectedMarketingPreferences
			);
		});
	});

	it("should return toggleSmsEnabled, toggleEmailEnabled, togglePushEnabled, toggleCallEnabled, and isAllPreferencesChecked as true", async () => {
		const { result } = renderHook(() => useCompleteYourProfile());

		expect(result.current.marketingPreference).toStrictEqual({
			isCallEnabled: false,
			isPushEnabled: false,
			isEmailEnabled: false,
			isSmsEnabled: false,
			isLineEnabled: false,
		});

		act(() => {
			result.current.toggleSmsEnabled(true);
			result.current.toggleEmailEnabled(true);
			result.current.togglePushEnabled(true);
			result.current.toggleCallEnabled(true);
			result.current.toggleLineEnabled(true);
		});

		await waitFor(() => {
			expect(result.current.marketingPreference).toStrictEqual({
				isCallEnabled: true,
				isPushEnabled: true,
				isEmailEnabled: true,
				isSmsEnabled: true,
				isLineEnabled: true,
			});
			expect(result.current.isAllPreferencesChecked).toStrictEqual(true);
		});
	});

	it("should make isFormDirty false, if user didn't change profile form data", async () => {
		mocked(useUserProfile).mockReturnValue({
			profileCompleteness: ProfileCompleteness.COMPLETE,
			userProfile: {
				myAcuvueId: "my acuvue id",
				firstName: "John",
				lastName: "Doe",
				phone: "911234567890",
				email: null,
				birthYear: "1999",
				birthMonth: "03",
				gender: Gender.MALE,
				isSpectaclesWearer: true,
				lensesUsage: "ACUVUE_USER",
				hasParentalConsent: null,
			},
			refreshUserProfile: jest.fn(),
			isLoading: false,
			wasEmptyBefore: false,
			setEmptyBefore: jest.fn(),
		});

		mocked(useSettings).mockReturnValue({
			getNotificationPreferences: jest.fn().mockResolvedValue({
				isPreferencesLoading: false,
				notificationPreferences: {
					marketing: {
						callEnabled: false,
						emailEnabled: false,
						pushEnabled: true,
						smsEnabled: false,
					},
				},
			}),
			saveNotificationPreferences: jest.fn(),
		});

		const { result } = renderHook(() => useCompleteYourProfile());

		act(() => {
			result.current.setFormData({
				firstName: "John",
				lastName: "Doe",
				phone: "911234567890",
				email: undefined,
				birthYear: "1999",
				birthMonth: "03",
				gender: Gender.MALE,
				isSpectaclesWearer: true,
				lensesUsage: "ACUVUE_USER",
				hasParentalConsent: undefined,
			});
		});

		act(() => {
			result.current.toggleCallEnabled(false);
			result.current.togglePushEnabled(false);
			result.current.toggleEmailEnabled(true);
			result.current.toggleSmsEnabled(false);
		});

		await waitFor(() => {
			expect(result.current.isFormDirty).toStrictEqual(false);
		});
	});

	it("should make isFormDirty true, if user update formData", async () => {
		mocked(useUserProfile).mockReturnValue({
			profileCompleteness: ProfileCompleteness.COMPLETE,
			userProfile: {
				myAcuvueId: "my acuvue id",
				firstName: "John",
				lastName: "Doe",
				phone: "911234567890",
				email: null,
				birthYear: "1999",
				birthMonth: "03",
				gender: Gender.MALE,
				isSpectaclesWearer: true,
				lensesUsage: "ACUVUE_USER",
				hasParentalConsent: null,
			},
			refreshUserProfile: jest.fn(),
			isLoading: false,
			wasEmptyBefore: false,
			setEmptyBefore: jest.fn(),
		});

		mocked(useSettings).mockReturnValue({
			getNotificationPreferences: jest.fn().mockResolvedValue({
				isPreferencesLoading: false,
				notificationPreferences: {
					marketing: {
						callEnabled: false,
						emailEnabled: false,
						pushEnabled: true,
						smsEnabled: false,
					},
				},
			}),
			saveNotificationPreferences: jest.fn(),
		});

		const { result } = renderHook(() => useCompleteYourProfile());

		act(() => {
			result.current.setFormData({
				firstName: "Jane",
				lastName: "Doe",
			});
		});

		act(() => {
			result.current.toggleCallEnabled(false);
			result.current.togglePushEnabled(false);
			result.current.toggleEmailEnabled(true);
			result.current.toggleSmsEnabled(false);
		});

		await waitFor(() => {
			expect(result.current.isFormDirty).toStrictEqual(true);
		});
	});

	it("should call saveProfile and saveNotificationPreferences on handleSubmit", async () => {
		const mockSaveProfile = jest
			.fn()
			.mockImplementation(() => Promise.resolve());
		const mockSaveNotificationPreferences = jest
			.fn()
			.mockImplementation(() => Promise.resolve());

		mocked(useUser).mockReturnValue({
			saveProfile: mockSaveProfile,
			updateAuthenticationDone: jest.fn(),
			getProfile: jest.fn(),
			generatePromocode: jest.fn(),
			getPromocode: jest.fn(),
		});

		mocked(useSettings).mockReturnValue({
			saveNotificationPreferences: mockSaveNotificationPreferences,
			getNotificationPreferences: jest.fn().mockResolvedValue({
				isPreferencesLoading: false,
				notificationPreferences: {
					marketing: {
						callEnabled: false,
						emailEnabled: false,
						pushEnabled: true,
						smsEnabled: false,
					},
				},
			}),
		});

		const { result } = renderHook(() => useCompleteYourProfile());

		act(() => {
			result.current.handleSubmit();
		});

		await waitFor(() => {
			expect(mockSaveProfile).toHaveBeenCalled();
			expect(mockSaveNotificationPreferences).toHaveBeenCalled();
		});
	});

	it("should call saveNotificationPreferences with lineEnabled on handleSubmit if hasLineNotification is true", async () => {
		const mockedNotificationPreferences = {
			marketing: {
				callEnabled: false,
				emailEnabled: false,
				pushEnabled: false,
				smsEnabled: false,
				lineEnabled: false,
			},
		};
		(useConfiguration as jest.Mock).mockReturnValue({
			profileFormType: ConfigService.ProfileForm.WITH_NO_EMAIL,
			hasLineNotification: true,
		});
		const mockSaveProfile = jest
			.fn()
			.mockImplementation(() => Promise.resolve());
		const mockSaveNotificationPreferences = jest
			.fn()
			.mockImplementation(() => Promise.resolve());

		mocked(useUser).mockReturnValue({
			saveProfile: mockSaveProfile,
			updateAuthenticationDone: jest.fn(),
			getProfile: jest.fn(),
			generatePromocode: jest.fn(),
			getPromocode: jest.fn(),
		});

		mocked(useSettings).mockReturnValue({
			saveNotificationPreferences: mockSaveNotificationPreferences,
			getNotificationPreferences: jest.fn().mockResolvedValue({
				isPreferencesLoading: false,
				notificationPreferences: mockedNotificationPreferences,
			}),
		});

		const { result } = renderHook(() => useCompleteYourProfile());

		act(() => {
			result.current.handleSubmit();
		});

		await waitFor(() => {
			expect(mockSaveProfile).toHaveBeenCalled();
			expect(mockSaveNotificationPreferences).toHaveBeenCalledWith(
				mockedNotificationPreferences
			);
		});
	});

	it("should throw server error if one of the API returns error", async () => {
		const payloadErrors = {
			birthday: {
				"validation.any.invalid": {},
			},
		};

		const error = new InvalidFormSubmissionError(payloadErrors);

		mocked(useUser).mockReturnValue({
			saveProfile: jest.fn().mockImplementation(() => {
				throw error;
			}),
			getProfile: jest.fn(),
			updateAuthenticationDone: jest.fn(),
			generatePromocode: jest.fn(),
			getPromocode: jest.fn(),
		});

		const { result } = renderHook(() => useCompleteYourProfile());

		act(() => {
			result.current.handleSubmit();
		});

		await waitFor(() => {
			expect(result.current.serverErrorKeys).toStrictEqual({
				birthday: "validation.birthday.any.invalid",
			});
		});
	});
});
