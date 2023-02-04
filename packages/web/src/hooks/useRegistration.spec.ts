import { renderHook, act } from "@testing-library/react-hooks";
import { useRegistration } from "./useRegistration";
import { useAuthentication } from "./useAuthentication";
import { useLoading } from "./useLoading";
import { useTranslation } from "./useTranslation";
import { useService } from "./useService";
import { useDevice } from "./useDevice";
import { useConfiguration } from "./useConfiguration";
import { ConfigService } from "@myacuvue_thailand_web/services";
import { useNavigate } from "react-router-dom-v5-compat";
import { mocked } from "ts-jest/utils";
import { waitFor } from "@testing-library/dom";

jest.mock("./useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("./useTranslation", () => ({
	useTranslation: jest.fn(),
}));

jest.mock("./useLoading", () => ({
	useLoading: jest.fn(),
}));

jest.mock("./useService", () => ({
	useService: jest.fn(),
}));

jest.mock("./useDevice", () => ({
	useDevice: jest.fn(),
}));

jest.mock("./useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("react-router-dom-v5-compat", () => ({
	useNavigate: jest.fn(),
}));

beforeEach(() => {
	mocked(useNavigate).mockReturnValue(jest.fn());

	(useAuthentication as jest.Mock).mockReturnValue({
		sessionToken: { rawValue: "fake-session-token" },
		setDeviceToken: jest.fn(),
	});

	(useTranslation as jest.Mock).mockReturnValue({
		language: "en",
	});

	(useLoading as jest.Mock).mockReturnValue({
		showLoading: jest.fn(),
		hideLoading: jest.fn(),
	});

	(useService as jest.Mock).mockReturnValue({
		RegistrationService: {
			register: jest.fn().mockReturnValue(Promise.resolve()),
			resendOtp: jest.fn().mockReturnValue(Promise.resolve()),
			validateOtp: jest.fn().mockReturnValue(
				Promise.resolve({
					deviceToken: "fake-resolved-device-token",
				})
			),
			registerPhone: jest.fn().mockReturnValue(Promise.resolve()),
		},
	});

	(useDevice as jest.Mock).mockReturnValue({
		getDeviceId: jest.fn().mockReturnValue("fake-line-id"),
	});

	(useConfiguration as jest.Mock).mockReturnValue({
		instance: ConfigService.Instance.TH,
		countryPhoneCode: "66",
		region: "THA",
	});
});

describe("useRegistration", () => {
	describe("register", () => {
		it("should call legacyRegister for TH instance with correct arguments", async () => {
			(useConfiguration as jest.Mock).mockReturnValue({
				instance: ConfigService.Instance.TH,
				countryPhoneCode: "66",
				region: "THA",
			});
			const { RegistrationService } = useService();

			const { result } = renderHook(() => useRegistration());

			await act(async () => {
				await result.current.register("123456789");
			});

			await waitFor(() => {
				expect(RegistrationService.register).toHaveBeenCalledWith(
					"123456789",
					"fake-line-id",
					"en"
				);
				expect(useNavigate()).toHaveBeenCalled();
			});
		});

		it("should call newRegister for AU instance with correct arguments", async () => {
			(useConfiguration as jest.Mock).mockReturnValue({
				instance: ConfigService.Instance.AU,
				countryPhoneCode: "61",
				region: "AUS",
			});
			const { RegistrationService } = useService();

			const { result } = renderHook(() => useRegistration());

			await act(async () => {
				await result.current.register("413456789");
			});

			await waitFor(() => {
				expect(RegistrationService.register).toHaveBeenCalledWith(
					"413456789",
					"fake-line-id",
					"en"
				);
				expect(useNavigate()).not.toHaveBeenCalled();
			});
		});
	});

	describe("resendOtp", () => {
		it("should call RegistrationService.resendOtp with correct arguments", async () => {
			const { RegistrationService } = useService();

			const { result } = renderHook(() => useRegistration());

			await act(async () => {
				await result.current.resendOtp("123456789");
			});

			await waitFor(() => {
				expect(RegistrationService.resendOtp).toHaveBeenCalledWith(
					"123456789",
					"fake-line-id",
					"en",
					"fake-session-token"
				);
			});
		});

		it("should show and hide loading", async () => {
			const { showLoading, hideLoading } = useLoading();
			const { result } = renderHook(() => useRegistration());

			await act(async () => {
				await result.current.resendOtp("123456789");
			});

			await waitFor(() => {
				expect(showLoading).toHaveBeenCalled();
				expect(showLoading).toHaveBeenCalledTimes(1);
				expect(hideLoading).toHaveBeenCalled();
				expect(hideLoading).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe("validateOtp", () => {
		it("should call RegistrationService.validateOtp with correct arguments", async () => {
			const { RegistrationService } = useService();

			const { result } = renderHook(() => useRegistration());

			await act(async () => {
				await result.current.validateOtp("123456789", "1234");
			});

			await waitFor(() => {
				expect(RegistrationService.validateOtp).toHaveBeenCalledWith(
					"123456789",
					"fake-line-id",
					"1234",
					"en",
					"fake-session-token"
				);
			});
		});

		it("should show and hide loading", async () => {
			const { showLoading, hideLoading } = useLoading();
			const { result } = renderHook(() => useRegistration());

			await act(async () => {
				await result.current.validateOtp("123456789", "1234");
			});

			await waitFor(() => {
				expect(showLoading).toHaveBeenCalled();
				expect(showLoading).toHaveBeenCalledTimes(1);
				expect(hideLoading).toHaveBeenCalled();
				expect(hideLoading).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe("registerPhone", () => {
		it("should call RegistrationService.registerPhone with correct arguments", async () => {
			const { RegistrationService } = useService();
			const { result } = renderHook(() => useRegistration());

			await act(async () => {
				await result.current.registerPhone("123456789");
			});

			await waitFor(() => {
				expect(RegistrationService.registerPhone).toHaveBeenCalledWith(
					"123456789",
					"fake-line-id",
					"en",
					"66",
					"THA",
					"fake-session-token"
				);
			});
		});

		it("should show and hide loading", async () => {
			const { showLoading, hideLoading } = useLoading();
			const { result } = renderHook(() => useRegistration());

			await act(async () => {
				await result.current.registerPhone("123456789");
			});

			await waitFor(() => {
				expect(showLoading).toHaveBeenCalled();
				expect(showLoading).toHaveBeenCalledTimes(1);
				expect(hideLoading).toHaveBeenCalled();
				expect(hideLoading).toHaveBeenCalledTimes(1);
			});
		});
	});
});
