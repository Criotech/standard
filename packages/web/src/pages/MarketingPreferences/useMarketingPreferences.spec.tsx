import { renderHook, act } from "@testing-library/react-hooks";
import { InvalidFormSubmissionError } from "@myacuvue_thailand_web/services";
import { useMarketingPreferences } from "./useMarketingPreferences";
import { useSettings } from "../../hooks/useSettings";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useConfiguration } from "../../hooks/useConfiguration";

jest.mock("../../hooks/useSettings", () => ({
	useSettings: jest.fn(),
}));

jest.mock("../../hooks/useSettings", () => ({
	useSettings: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

jest.mock("../../hooks/useSnackbar", () => ({
	useSnackbar: jest.fn(),
	Status: {
		SUCCESS: "success",
	},
}));

jest.mock("../../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

beforeEach(() => {
	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});

	(useSnackbar as jest.Mock).mockReturnValue({
		useSnackbar: jest.fn().mockReturnValue({
			showSnackbar: jest.fn(),
		}),
	});

	(useSettings as jest.Mock).mockReturnValue({
		getNotificationPreferences: jest.fn().mockResolvedValue({
			marketing: {
				isCallEnabled: false,
				isPushEnabled: true,
				isEmailEnabled: false,
				isSmsEnabled: false,
			},
		}),
		saveNotificationPreferences: jest.fn(),
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		hasLineNotification: true,
	});
});

describe("useMarketingPreferences", () => {
	it("should return formData from getNotificationPreferences", async () => {
		(
			useSettings().getNotificationPreferences as jest.Mock
		).mockResolvedValue({
			marketing: {
				isCallEnabled: false,
				isPushEnabled: true,
				isEmailEnabled: false,
				isSmsEnabled: false,
				isLineEnabled: false,
			},
		});

		const { result, waitForNextUpdate } = renderHook(() =>
			useMarketingPreferences()
		);

		await waitForNextUpdate();

		expect(result.current.formData).toStrictEqual({
			isCallEnabled: false,
			isPushEnabled: false,
			isEmailEnabled: false,
			isSmsEnabled: false,
			isLineEnabled: false,
		});
	});

	it("should return setFormData", async () => {
		const { result, waitForNextUpdate } = renderHook(() =>
			useMarketingPreferences()
		);

		await waitForNextUpdate();

		act(() => {
			result.current.setFormData({
				isCallEnabled: false,
				isPushEnabled: true,
				isEmailEnabled: false,
				isSmsEnabled: false,
				isLineEnabled: false,
			});
		});

		expect(result.current.formData).toStrictEqual({
			isCallEnabled: false,
			isPushEnabled: true,
			isEmailEnabled: false,
			isSmsEnabled: false,
			isLineEnabled: false,
		});
	});

	it("should return onCancel", async () => {
		const { result, waitForNextUpdate } = renderHook(() =>
			useMarketingPreferences()
		);

		act(() => {
			result.current.onCancel();
		});

		await waitForNextUpdate();

		expect(useHistory().push).toHaveBeenCalledWith("/profile");
	});

	it("should return onSubmit", async () => {
		const saveNotificationPreferencesMock = jest.fn();

		(useSettings as jest.Mock).mockReturnValue({
			getNotificationPreferences: jest.fn().mockResolvedValue({
				marketing: {
					isCallEnabled: false,
					isPushEnabled: false,
					isEmailEnabled: true,
					isSmsEnabled: false,
					isLineEnabled: false,
				},
			}),
			saveNotificationPreferences: saveNotificationPreferencesMock,
		});

		const { result, waitForNextUpdate } = renderHook(() =>
			useMarketingPreferences()
		);

		await waitForNextUpdate();

		act(() => {
			result.current.onSubmit();
		});

		expect(saveNotificationPreferencesMock).toHaveBeenCalledWith({
			marketing: {
				callEnabled: false,
				emailEnabled: false,
				smsEnabled: false,
				pushEnabled: false,
				lineEnabled: false,
			},
		});
	});

	it("should return serverErrorKeys", async () => {
		const fakeServerError = new InvalidFormSubmissionError({
			smsEnabled: {
				"profilePage.marketingPreference.updateMarketingPreference": {},
			},
		});

		(
			useSettings().saveNotificationPreferences as jest.Mock
		).mockImplementation(() => {
			throw fakeServerError;
		});

		const { result, waitForNextUpdate } = renderHook(() =>
			useMarketingPreferences()
		);

		act(() => {
			result.current.onSubmit();
		});

		await waitForNextUpdate();

		expect(result.current.serverErrorKeys).toEqual({
			smsEnabled:
				"profilePage.marketingPreference.updateMarketingPreference",
		});
	});
});
