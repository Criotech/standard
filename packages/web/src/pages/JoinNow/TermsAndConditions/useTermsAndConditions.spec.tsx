import { renderHook, act } from "@testing-library/react-hooks";
import { useHistory } from "react-router-dom";
import { useTermsAndConditions } from "./useTermsAndConditions";
import { useDeviceToken } from "../../../contexts/DeviceTokenContext";
import { usePhone } from "../../../hooks/usePhone";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { Status, useSnackbar } from "../../../hooks/useSnackbar";
import { GlobalError } from "@myacuvue_thailand_web/services";

jest.mock("react-router-dom", () => ({
	useHistory: jest.fn(),
}));

jest.mock("../../../contexts/DeviceTokenContext", () => ({
	useDeviceToken: jest.fn(),
}));

jest.mock("../../../hooks/usePhone", () => ({
	usePhone: jest.fn(),
}));

jest.mock("../../../hooks/useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("../../../hooks/useSnackbar", () => ({
	useSnackbar: jest.fn(),
	Status: {
		SUCCESS: "success",
		WARN: "warn",
	},
}));

beforeEach(() => {
	(useHistory as jest.Mock).mockReturnValue({
		push: jest.fn(),
	});

	(useDeviceToken as jest.Mock).mockReturnValue({
		deleteDeviceToken: jest.fn(),
	});

	(usePhone as jest.Mock).mockReturnValue({
		getConsents: jest.fn().mockResolvedValue([
			{
				type: "WEB:LITE:PRIVACY_POLICY",
				accepted: false,
			},
			{
				type: "WEB:LITE:TERMS_AND_CONDITIONS",
				accepted: false,
			},
		]),
	});

	(useAuthentication as jest.Mock).mockReturnValue({
		processSessionToken: jest.fn(),
	});

	(useSnackbar as jest.Mock).mockReturnValue({
		showSnackbar: jest.fn(),
	});
});

describe("useTermsAndConditions", () => {
	it("should return formData", async () => {
		const { result, waitFor } = renderHook(() => useTermsAndConditions());

		await waitFor(() => {
			expect(result.current.formData).toStrictEqual({
				"WEB:LITE:PRIVACY_POLICY": false,
				"WEB:LITE:TERMS_AND_CONDITIONS": false,
			});
		});
	});

	it("should set formData from getConsents API", async () => {
		(usePhone as jest.Mock).mockReturnValue({
			getConsents: jest.fn().mockResolvedValue([
				{
					type: "WEB:LITE:PRIVACY_POLICY",
					accepted: true,
				},
				{
					type: "WEB:LITE:TERMS_AND_CONDITIONS",
					accepted: false,
				},
			]),
			saveConsent: jest.fn(),
		});

		const { result, waitFor } = renderHook(() => useTermsAndConditions());

		await waitFor(() => {
			expect(result.current.formData).toStrictEqual({
				"WEB:LITE:PRIVACY_POLICY": true,
				"WEB:LITE:TERMS_AND_CONDITIONS": false,
			});
		});
	});

	it("should return setFormData", async () => {
		const { result, waitForNextUpdate } = renderHook(() =>
			useTermsAndConditions()
		);

		await waitForNextUpdate();

		act(() => {
			result.current.setFormData({
				"WEB:LITE:PRIVACY_POLICY": false,
				"WEB:LITE:TERMS_AND_CONDITIONS": true,
			});
		});

		expect(result.current.formData).toStrictEqual({
			"WEB:LITE:PRIVACY_POLICY": false,
			"WEB:LITE:TERMS_AND_CONDITIONS": true,
		});
	});

	it("should return isSubmitDisabled as true when both checkboxes are not checked", async () => {
		const { result, waitForNextUpdate } = renderHook(() =>
			useTermsAndConditions()
		);

		await waitForNextUpdate();

		act(() => {
			result.current.setFormData({
				"WEB:LITE:PRIVACY_POLICY": false,
				"WEB:LITE:TERMS_AND_CONDITIONS": false,
			});
		});

		expect(result.current.isSubmitDisabled).toStrictEqual(true);
	});

	it("should call deleteDeviceToken and history.push when calling onGoBack", async () => {
		const mockDeleteDeviceToken = jest.fn();
		(useDeviceToken as jest.Mock).mockReturnValue({
			deleteDeviceToken: mockDeleteDeviceToken,
		});

		const { result, waitForNextUpdate } = renderHook(() =>
			useTermsAndConditions()
		);

		await waitForNextUpdate();

		act(() => {
			result.current.onGoBack();
		});

		expect(mockDeleteDeviceToken).toHaveBeenCalled();
		expect(useHistory().push).toHaveBeenCalledWith("/phone-registration");
	});

	it("should call saveConsents on submit", async () => {
		const saveConsentsMock = jest.fn();
		(usePhone as jest.Mock).mockReturnValue({
			getConsents: jest.fn().mockResolvedValue([
				{
					type: "WEB:LITE:PRIVACY_POLICY",
					accepted: true,
				},
				{
					type: "WEB:LITE:TERMS_AND_CONDITIONS",
					accepted: false,
				},
			]),
			saveConsents: saveConsentsMock,
		});
		const { result, waitForNextUpdate } = renderHook(() =>
			useTermsAndConditions()
		);

		await waitForNextUpdate();

		act(() => {
			result.current.setFormData({
				"WEB:LITE:PRIVACY_POLICY": true,
				"WEB:LITE:TERMS_AND_CONDITIONS": true,
			});
		});

		act(() => {
			result.current.onSubmit();
		});

		expect(saveConsentsMock).toHaveBeenCalledWith([
			"WEB:LITE:PRIVACY_POLICY",
			"WEB:LITE:TERMS_AND_CONDITIONS",
		]);
	});

	it("should call showSnackbar when saveConsents failed on submit", async () => {
		const mockedShowSnackbar = jest.fn();

		(usePhone as jest.Mock).mockReturnValue({
			getConsents: jest.fn().mockResolvedValue([
				{
					type: "WEB:LITE:PRIVACY_POLICY",
					accepted: false,
				},
				{
					type: "WEB:LITE:TERMS_AND_CONDITIONS",
					accepted: false,
				},
			]),
			saveConsents: jest.fn().mockRejectedValue(
				new GlobalError({
					"error.user.activationTimeout": {},
				})
			),
		});

		(useSnackbar as jest.Mock).mockReturnValue({
			showSnackbar: mockedShowSnackbar,
		});

		const { result, waitForNextUpdate } = renderHook(() =>
			useTermsAndConditions()
		);

		await waitForNextUpdate();

		act(() => {
			result.current.setFormData({
				"WEB:LITE:PRIVACY_POLICY": true,
				"WEB:LITE:TERMS_AND_CONDITIONS": true,
			});
		});

		await act(async () => {
			result.current.onSubmit();
		});

		expect(mockedShowSnackbar).toHaveBeenCalledWith(
			Status.WARN,
			"error.user.activationTimeout",
			{},
			3
		);
	});
});
