import { renderHook, act } from "@testing-library/react-hooks";
import { usePhone } from "./usePhone";
import {
	IPhoneRegisterRequest,
	IPhoneValidationRequest,
} from "@myacuvue_thailand_web/services";
import { useAuthentication } from "./useAuthentication";
import { useService } from "./useService";
import { useLoading } from "./useLoading";
import { useConfiguration } from "./useConfiguration";
import { useDeviceToken } from "../contexts/DeviceTokenContext";

jest.mock("./useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("./useLoading", () => ({
	useLoading: jest.fn(),
}));

jest.mock("./useService", () => ({
	useService: jest.fn(),
}));

jest.mock("./useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

jest.mock("../contexts/DeviceTokenContext", () => ({
	useDeviceToken: jest.fn(),
}));

const fakePhoneData: IPhoneRegisterRequest = {
	phone: "fakePhoneNumber",
	deviceType: "fakeDeviceType",
	deviceId: "fakeDeviceId",
};

const fakeValidationData: IPhoneValidationRequest = {
	phone: "fakePhoneNumber",
	otp: "fakeOtp",
};

describe("usePhone", () => {
	beforeEach(() => {
		(useAuthentication as jest.Mock).mockReturnValue({
			sessionToken: { rawValue: "fake-session-token" },
		});

		(useLoading as jest.Mock).mockReturnValue({
			showLoading: jest.fn(),
			hideLoading: jest.fn(),
		});

		(useConfiguration as jest.Mock).mockReturnValue({
			countryPhoneCode: "61",
		});

		(useService as jest.Mock).mockReturnValue({
			PhoneService: {
				register: jest.fn().mockReturnValue(fakePhoneData),
				validateWithOtp: jest
					.fn()
					.mockResolvedValue({ deviceToken: "fakeDeviceToken" }),
				getConsents: jest.fn().mockReturnValue([]),
				saveConsents: jest.fn().mockReturnValue(null),
				formatPhoneNumber: jest.fn().mockReturnValue("+61 484949482"),
			},
		});

		(useDeviceToken as jest.Mock).mockReturnValue({
			deviceToken: {
				rawValue: "fake-raw-device-token",
			},
		});
	});

	describe("register", () => {
		it("should call PhoneService.register with session token and phone data", async () => {
			const { PhoneService } = useService();
			const { result } = renderHook(() => usePhone());

			await act(async () => {
				await result.current.register(fakePhoneData);
			});

			expect(PhoneService.register).toHaveBeenCalledWith(
				fakePhoneData,
				"fake-session-token"
			);
		});

		it("should show and hide loading", async () => {
			const { showLoading, hideLoading } = useLoading();
			const { result } = renderHook(() => usePhone());

			await act(async () => {
				await result.current.register(fakePhoneData);
			});

			expect(showLoading).toHaveBeenCalled();
			expect(showLoading).toHaveBeenCalledTimes(1);
			expect(hideLoading).toHaveBeenCalled();
			expect(hideLoading).toHaveBeenCalledTimes(1);
		});
	});

	describe("validateWithOtp", () => {
		it("should call PhoneService.validateWithOtp with phone data", async () => {
			const { PhoneService } = useService();
			const { result } = renderHook(() => usePhone());

			const response = await result.current.validateWithOtp(
				fakeValidationData
			);

			expect(PhoneService.validateWithOtp).toHaveBeenCalledWith(
				fakeValidationData
			);
			expect(response).toEqual({ deviceToken: "fakeDeviceToken" });
		});
		it("should show and hide loading", async () => {
			const { showLoading, hideLoading } = useLoading();

			const { result } = renderHook(() => usePhone());

			await act(async () => {
				await result.current.saveConsents([]);
			});

			expect(showLoading).toHaveBeenCalled();
			expect(showLoading).toHaveBeenCalledTimes(1);
			expect(hideLoading).toHaveBeenCalled();
			expect(hideLoading).toHaveBeenCalledTimes(1);
		});
	});

	describe("getConsents", () => {
		it("should call PhoneService.getConsents with device token", async () => {
			const { PhoneService } = useService();
			const { result } = renderHook(() => usePhone());

			await act(async () => {
				await result.current.getConsents();
			});

			expect(PhoneService.getConsents).toHaveBeenCalledWith(
				"fake-raw-device-token"
			);
		});

		it("should show and hide loading", async () => {
			const { showLoading, hideLoading } = useLoading();

			const { result } = renderHook(() => usePhone());

			await act(async () => {
				await result.current.getConsents();
			});

			expect(showLoading).toHaveBeenCalled();
			expect(showLoading).toHaveBeenCalledTimes(1);
			expect(hideLoading).toHaveBeenCalled();
			expect(hideLoading).toHaveBeenCalledTimes(1);
		});
	});

	describe("saveConsents", () => {
		it("should call PhoneService.saveConsents with device token", async () => {
			const { PhoneService } = useService();
			const { result } = renderHook(() => usePhone());

			await act(async () => {
				await result.current.saveConsents([]);
			});

			expect(PhoneService.saveConsents).toHaveBeenCalledWith(
				"fake-raw-device-token",
				[]
			);
		});

		it("should show and hide loading", async () => {
			const { showLoading, hideLoading } = useLoading();

			const { result } = renderHook(() => usePhone());

			await act(async () => {
				await result.current.saveConsents([]);
			});

			expect(showLoading).toHaveBeenCalled();
			expect(showLoading).toHaveBeenCalledTimes(1);
			expect(hideLoading).toHaveBeenCalled();
			expect(hideLoading).toHaveBeenCalledTimes(1);
		});
	});

	describe("formatPhoneNumber", () => {
		it("should return the formated date", () => {
			const { result } = renderHook(() => usePhone());
			const formattedPhoneNumber =
				result.current.formatPhoneNumber("61484949482");

			expect(formattedPhoneNumber).toStrictEqual("+61 484949482");
		});
	});
});
