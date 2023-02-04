import { renderHook } from "@testing-library/react-hooks";
import { useXiam, XiamProvider } from "./XiamContext";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { ComponentProps } from "react";
import { JsonWebTokenService } from "@myacuvue_thailand_web/services";
import { act } from "react-dom/test-utils";
import { useStorage } from "../hooks/useStorage";
import { useSnackbar } from "../hooks/useSnackbar";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

jest.mock("@myacuvue_thailand_web/services", () => ({
	AzureConfigurationService: {
		getConfig: jest.fn().mockReturnValue({
			clientId: "client id",
			policies: {
				registration: {
					name: "",
					authority: "registration-authority",
				},
				login: {
					name: "",
					authority: "login-authority",
				},
				updatePassword: {
					name: "",
					authority: "update-password-authority",
				},
			},
			authorityDomain: "",
			redirectUri: "",
		}),
	},
	JsonWebTokenService: {
		parse: jest.fn(),
	},
}));

jest.mock("@azure/msal-browser");

jest.mock("../hooks/useStorage", () => ({
	useStorage: jest.fn(),
}));

jest.mock("@azure/msal-react", () => ({
	MsalProvider: ({ children }: ComponentProps<typeof MsalProvider>) => (
		<div>{children}</div>
	),
	useMsal: jest.fn(),
}));

jest.mock("../hooks/useSnackbar", () => ({
	useSnackbar: jest.fn(),
	Status: {
		SUCCESS: "success",
		WARN: "warn",
	},
}));

beforeEach(() => {
	(useMsal as jest.Mock).mockReturnValue({
		instance: {
			loginPopup: jest.fn(),
			logout: jest.fn(),
			addEventCallback: jest.fn(),
			loginRedirect: jest.fn(),
		},
		accounts: [],
	});

	(useStorage as jest.Mock).mockReturnValue([
		undefined,
		jest.fn(),
		jest.fn(),
	]);

	(useSnackbar as jest.Mock).mockReturnValue({
		showSnackbar: jest.fn(),
	});
});

it("should have the correct default values when there is no provider", async () => {
	const { result } = renderHook(() => useXiam());
	expect(result.current).toStrictEqual(undefined);
});

it("should call instance.loginPopup with correct authority when registrationPopup is called", async () => {
	const { parse } = JsonWebTokenService;
	(parse as jest.Mock).mockReturnValue({});
	const mockLoginPopup = jest.fn(() =>
		Promise.resolve({
			idToken: "",
		})
	);
	(useMsal as jest.Mock).mockReturnValue({
		instance: {
			loginRedirect: mockLoginPopup,
			logout: jest.fn(),
			addEventCallback: jest.fn(),
		},
		accounts: [],
	});

	const { result } = renderHook(() => useXiam(), {
		wrapper: ({ children }: ComponentProps<typeof XiamProvider>) => (
			<XiamProvider>{children}</XiamProvider>
		),
	});
	await result.current.registrationPopup();

	expect(mockLoginPopup).toHaveBeenCalledWith(
		expect.objectContaining({ authority: "registration-authority" })
	);
});

it("should call instance.loginPopup with correct authority when loginPopup is called and isForgotPassword is false", async () => {
	const { parse } = JsonWebTokenService;
	(parse as jest.Mock).mockReturnValue({
		payload: {
			_isForgotPassword: false,
		},
	});
	const mockLoginPopup = jest.fn(() =>
		Promise.resolve({
			idToken: "",
		})
	);
	(useMsal as jest.Mock).mockReturnValue({
		instance: {
			loginPopup: mockLoginPopup,
			logout: jest.fn(),
			addEventCallback: jest.fn(),
			loginRedirect: jest.fn(),
		},
		accounts: [],
	});

	const { result } = renderHook(() => useXiam(), {
		wrapper: ({ children }: ComponentProps<typeof XiamProvider>) => (
			<XiamProvider>{children}</XiamProvider>
		),
	});
	await result.current.loginPopup();

	expect(mockLoginPopup).toHaveBeenCalledWith(
		expect.objectContaining({ authority: "login-authority" })
	);
});

it("should call instance.loginPopup with correct authority when loginPopup is called and isForgotPassword is true", async () => {
	const { parse } = JsonWebTokenService;
	(parse as jest.Mock).mockReturnValue({
		payload: {
			isForgotPassword: true,
		},
	});
	const mockLoginPopup = jest.fn(() =>
		Promise.resolve({
			idToken: "",
		})
	);
	(useMsal as jest.Mock).mockReturnValue({
		instance: {
			loginPopup: mockLoginPopup,
			logout: jest.fn(),
			addEventCallback: jest.fn(),
			loginRedirect: jest.fn(),
		},
		accounts: [],
	});

	const { result } = renderHook(() => useXiam(), {
		wrapper: ({ children }: ComponentProps<typeof XiamProvider>) => (
			<XiamProvider>{children}</XiamProvider>
		),
	});

	await act(async () => {
		await result.current.loginPopup();
	});

	expect(mockLoginPopup).toHaveBeenCalledWith(
		expect.objectContaining({ authority: "login-authority" })
	);
	expect(result.current.isForgotPassword).toStrictEqual(true);
});

it("should call instance.logout when logout is called", async () => {
	const mockLogoutPopup = jest.fn(() => Promise.resolve());
	(useMsal as jest.Mock).mockReturnValue({
		instance: {
			loginPopup: jest.fn(),
			logout: mockLogoutPopup,
			addEventCallback: jest.fn(),
			loginRedirect: jest.fn(),
		},
		accounts: [],
	});

	const { result } = renderHook(() => useXiam(), {
		wrapper: ({ children }: ComponentProps<typeof XiamProvider>) => (
			<XiamProvider>{children}</XiamProvider>
		),
	});
	await act(async () => {
		await result.current.logout();
	});

	expect(mockLogoutPopup).toHaveBeenCalled();
});

it("should call instance.loginPopup with correct authority and show snackbar when updatePassword is called", async () => {
	const mockLoginPopup = jest.fn().mockResolvedValue({
		idToken: "",
	});
	const { parse } = JsonWebTokenService;
	(parse as jest.Mock).mockReturnValue({});
	(useMsal as jest.Mock).mockReturnValue({
		instance: {
			loginPopup: mockLoginPopup,
			logout: jest.fn(),
			addEventCallback: jest.fn(),
			loginRedirect: jest.fn(),
		},
		accounts: [],
	});

	const mockShowSnackbar = jest.fn();
	(useSnackbar as jest.Mock).mockReturnValue({
		showSnackbar: mockShowSnackbar,
	});

	const { result } = renderHook(() => useXiam(), {
		wrapper: ({ children }: ComponentProps<typeof XiamProvider>) => (
			<XiamProvider>{children}</XiamProvider>
		),
	});

	await result.current.updatePassword();

	expect(mockLoginPopup).toHaveBeenCalledWith(
		expect.objectContaining({ authority: "update-password-authority" })
	);
	expect(mockShowSnackbar).toHaveBeenCalled();
});

it("should return undefined when calling getXiamToken with empty accounts", async () => {
	(useMsal as jest.Mock).mockReturnValue({
		instance: {
			loginPopup: jest.fn(),
			logout: jest.fn(),
			addEventCallback: jest.fn(),
			loginRedirect: jest.fn(),
			handleRedirectPromise: jest.fn(),
			isForgotPassword: Boolean,
		},
		accounts: [],
	});

	const { result } = renderHook(() => useXiam(), {
		wrapper: ({ children }: ComponentProps<typeof XiamProvider>) => (
			<XiamProvider>{children}</XiamProvider>
		),
	});
	const response = await result.current.getXiamToken();
	expect(response).toStrictEqual(undefined);
});

it("should return parsed token when calling getXiamToken with some account present", async () => {
	const { parse } = JsonWebTokenService;
	(parse as jest.Mock).mockReturnValue({
		rawValue: "some raw value here for the token",
	});

	const mockAcquireTokenSilent = jest.fn();
	mockAcquireTokenSilent.mockResolvedValue({
		idToken: "some id token",
	});
	(useMsal as jest.Mock).mockReturnValue({
		instance: {
			loginPopup: jest.fn(),
			logout: jest.fn(),
			addEventCallback: jest.fn(),
			acquireTokenSilent: mockAcquireTokenSilent,
			loginRedirect: jest.fn(),
			handleRedirectPromise: jest.fn(),
		},
		accounts: [
			{
				fakeKey: "some value inside account 1",
			},
		],
	});

	const { result } = renderHook(() => useXiam(), {
		wrapper: ({ children }: ComponentProps<typeof XiamProvider>) => (
			<XiamProvider>{children}</XiamProvider>
		),
	});
	const response = await result.current.getXiamToken();
	expect(mockAcquireTokenSilent).toHaveBeenCalledWith({
		scopes: ["client id"],
		account: {
			fakeKey: "some value inside account 1",
		},
	});
	expect(response).toStrictEqual({
		rawValue: "some raw value here for the token",
	});
});

it("should call instance.logout when calling getXiamToken and InteractionRequiredAuthError is thrown", async () => {
	const { parse } = JsonWebTokenService;
	(parse as jest.Mock).mockReturnValue({
		rawValue: "some raw value here for the token",
	});

	const mockAcquireTokenSilent = jest.fn();
	mockAcquireTokenSilent.mockRejectedValue(
		new InteractionRequiredAuthError()
	);
	(useMsal as jest.Mock).mockReturnValue({
		instance: {
			loginPopup: jest.fn(),
			logout: jest.fn(),
			addEventCallback: jest.fn(),
			acquireTokenSilent: mockAcquireTokenSilent,
			loginRedirect: jest.fn(),
			handleRedirectPromise: jest.fn(),
		},
		accounts: [
			{
				fakeKey: "some value inside account 1",
			},
		],
	});

	const { result } = renderHook(() => useXiam(), {
		wrapper: ({ children }: ComponentProps<typeof XiamProvider>) => (
			<XiamProvider>{children}</XiamProvider>
		),
	});

	await act(async () => {
		await result.current.getXiamToken();
	});

	expect(useMsal().instance.logout).toHaveBeenCalled();
});

it("should rethrow when calling getXiamToken and an error different than InteractionRequiredAuthError is thrown", async () => {
	const { parse } = JsonWebTokenService;
	(parse as jest.Mock).mockReturnValue({
		rawValue: "some raw value here for the token",
	});

	const mockAcquireTokenSilent = jest.fn();
	const errorDifferentThanInteractionRequired = new Error();
	mockAcquireTokenSilent.mockRejectedValue(
		errorDifferentThanInteractionRequired
	);
	(useMsal as jest.Mock).mockReturnValue({
		instance: {
			loginPopup: jest.fn(),
			logout: jest.fn(),
			addEventCallback: jest.fn(),
			acquireTokenSilent: mockAcquireTokenSilent,
			loginRedirect: jest.fn(),
			handleRedirectPromise: jest.fn(),
		},
		accounts: [
			{
				fakeKey: "some value inside account 1",
			},
		],
	});

	const { result } = renderHook(() => useXiam(), {
		wrapper: ({ children }: ComponentProps<typeof XiamProvider>) => (
			<XiamProvider>{children}</XiamProvider>
		),
	});

	await expect(async () => {
		await result.current.getXiamToken();
	}).rejects.toStrictEqual(errorDifferentThanInteractionRequired);
});
