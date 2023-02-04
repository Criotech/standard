import { useSettings } from "./useSettings";
import { useAuthentication } from "./useAuthentication";
import { useLoading } from "./useLoading";
import { INotificationPreferences } from "@myacuvue_thailand_web/services";
import { renderHook, act } from "@testing-library/react-hooks";
import { useService } from "./useService";

jest.mock("./useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));

jest.mock("./useLoading", () => ({
	useLoading: jest.fn(),
}));

jest.mock("./useService", () => ({
	useService: jest.fn(),
}));

const expectedNotificationResponse: INotificationPreferences = {
	marketing: {
		callEnabled: false,
		emailEnabled: false,
		smsEnabled: false,
		pushEnabled: false,
	},
};

const fakeSessionToken = "session token";

beforeEach(() => {
	(useAuthentication as jest.Mock).mockReturnValue({
		sessionToken: { rawValue: fakeSessionToken },
	});
	(useLoading as jest.Mock).mockReturnValue({
		showLoading: jest.fn(),
		hideLoading: jest.fn(),
	});

	(useService as jest.Mock).mockReturnValue({
		SettingsService: {
			getNotificationPreferences: jest.fn(),
			saveNotificationPreferences: jest.fn(),
		},
	});
});

describe("getNotificationPreferences", () => {
	beforeEach(() => {
		(
			useService().SettingsService.getNotificationPreferences as jest.Mock
		).mockReturnValue(expectedNotificationResponse);
	});

	it("should return expected notification preferences", async () => {
		const { result } = renderHook(() => useSettings());

		const response = await result.current.getNotificationPreferences();

		expect(response).toEqual(expectedNotificationResponse);
	});

	it("should call notification preferences with correct parameters", async () => {
		const { result } = renderHook(() => useSettings());
		await result.current.getNotificationPreferences();

		expect(
			useService().SettingsService.getNotificationPreferences
		).toHaveBeenCalledWith(fakeSessionToken);
	});

	it("should show and hide loading", async () => {
		const { result } = renderHook(() => useSettings());

		const { showLoading, hideLoading } = useLoading();

		await result.current.getNotificationPreferences();

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});

describe("saveNotificationPreferences", () => {
	beforeEach(() => {
		(
			useService().SettingsService
				.saveNotificationPreferences as jest.Mock
		).mockReturnValue({
			marketing: {},
		});
	});

	it("should call service's saveNotificationPreferences with correct parameters", async () => {
		const { result } = renderHook(() => useSettings());

		act(() => {
			result.current.saveNotificationPreferences({
				marketing: {
					callEnabled: false,
					emailEnabled: true,
					smsEnabled: false,
					pushEnabled: true,
				},
			});
		});

		expect(
			useService().SettingsService.saveNotificationPreferences
		).toHaveBeenCalledWith(fakeSessionToken, {
			marketing: {
				callEnabled: false,
				emailEnabled: true,
				smsEnabled: false,
				pushEnabled: true,
			},
		});
	});

	it("should show and hide loading", async () => {
		const { result } = renderHook(() => useSettings());
		const { showLoading, hideLoading } = useLoading();

		await result.current.saveNotificationPreferences({});

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});
