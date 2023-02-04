import { renderHook } from "@testing-library/react-hooks";
import { DeviceTokenProvider, useDeviceToken } from "./DeviceTokenContext";
import { useStorage } from "../hooks/useStorage";
import {
	AuthenticationService,
	IDeviceToken,
	JsonWebTokenService,
} from "@myacuvue_thailand_web/services";
import { ComponentProps } from "react";
import { useConfiguration } from "../hooks/useConfiguration";

jest.mock("../hooks/useStorage", () => ({
	useStorage: jest.fn(),
}));

jest.mock("@myacuvue_thailand_web/services", () => {
	return {
		AuthenticationService: {
			refreshDeviceToken: jest.fn(),
		},
		JsonWebTokenService: {
			getElapsedTimeInPercent: jest.fn(),
		},
	};
});

const DEFAULT_FAKE_DEVICE_TOKEN: IDeviceToken = {
	header: {
		typ: "JWT",
		alg: "HS256",
	},
	payload: {
		region: "",
		exp: 1,
		iat: 1,
		jti: "3d7d9e16-8a3d-4d61-8fc9-86b8aab9cce6",
		phone: "66111111111",
		userType: "consumer",
	},
	rawValue: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9",
};

jest.mock("../hooks/useConfiguration", () => ({
	useConfiguration: jest.fn(),
}));

const { refreshDeviceToken } = AuthenticationService;
const { getElapsedTimeInPercent } = JsonWebTokenService;

beforeEach(async () => {
	(useStorage as jest.Mock).mockReturnValue([
		undefined,
		jest.fn(),
		jest.fn(),
	]);
	(useConfiguration as jest.Mock).mockReturnValue({
		deviceTokenRefreshTimeLimitInPercent: 0.8,
	});
});

describe("useDeviceToken", () => {
	it("should have correct default values when there is no provider", async () => {
		const { result } = renderHook(() => useDeviceToken());
		expect(result.current).toStrictEqual(undefined);
	});

	it("should have deviceToken as the default one from storage by the end of its initialization", async () => {
		const { result } = renderHook(() => useDeviceToken(), {
			wrapper: ({
				children,
			}: ComponentProps<typeof DeviceTokenProvider>) => (
				<DeviceTokenProvider>{children}</DeviceTokenProvider>
			),
		});

		expect(result.current.deviceToken).toStrictEqual(undefined);
	});

	it("should refresh the device token if it exists and is about to expire", async () => {
		const mockSetStorage = jest.fn();
		(useStorage as jest.Mock).mockReturnValue([
			DEFAULT_FAKE_DEVICE_TOKEN,
			mockSetStorage,
			jest.fn(),
		]);
		(getElapsedTimeInPercent as jest.Mock).mockReturnValue(0.81);
		(refreshDeviceToken as jest.Mock).mockReturnValue(
			DEFAULT_FAKE_DEVICE_TOKEN
		);

		const { waitFor } = renderHook(() => useDeviceToken(), {
			wrapper: ({
				children,
			}: ComponentProps<typeof DeviceTokenProvider>) => (
				<DeviceTokenProvider>{children}</DeviceTokenProvider>
			),
		});

		await waitFor(() => {
			expect(refreshDeviceToken).toHaveBeenCalled();
			expect(mockSetStorage).toHaveBeenCalled();
		});
	});

	it("should not refresh the device token if deviceTokenRefreshTimeLimitInPercent is -1", async () => {
		const mockSetStorage = jest.fn();
		(useStorage as jest.Mock).mockReturnValue([
			DEFAULT_FAKE_DEVICE_TOKEN,
			mockSetStorage,
			jest.fn(),
		]);

		(useConfiguration as jest.Mock).mockReturnValue({
			deviceTokenRefreshTimeLimitInPercent: -1,
		});

		(getElapsedTimeInPercent as jest.Mock).mockReturnValue(0.81);
		(refreshDeviceToken as jest.Mock).mockReturnValue(
			DEFAULT_FAKE_DEVICE_TOKEN
		);

		const { waitFor } = renderHook(() => useDeviceToken(), {
			wrapper: ({
				children,
			}: ComponentProps<typeof DeviceTokenProvider>) => (
				<DeviceTokenProvider>{children}</DeviceTokenProvider>
			),
		});

		await waitFor(() => {
			expect(refreshDeviceToken).not.toHaveBeenCalled();
		});
	});

	it("should call storage delete when deleteDeviceToken is called", async () => {
		const mockDeleteStorage = jest.fn();
		(useStorage as jest.Mock).mockReturnValue([
			DEFAULT_FAKE_DEVICE_TOKEN,
			jest.fn(),
			mockDeleteStorage,
		]);

		const { waitFor, result } = renderHook(() => useDeviceToken(), {
			wrapper: ({
				children,
			}: ComponentProps<typeof DeviceTokenProvider>) => (
				<DeviceTokenProvider>{children}</DeviceTokenProvider>
			),
		});

		result.current.deleteDeviceToken();

		await waitFor(() => {
			expect(mockDeleteStorage).toHaveBeenCalled();
		});
	});
});
