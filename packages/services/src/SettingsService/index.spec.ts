import { HTTPService } from "../index";
import { ISettings } from "./ISettings";
import SettingsService from "./index";

const { getNotificationPreferences, saveNotificationPreferences } =
	SettingsService;

jest.mock("../index");

const fakeSessionToken = "session token";

describe("getNotificationPreferences", () => {
	it("should call get with appropriate parameters", async () => {
		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: {},
		});
		await getNotificationPreferences(fakeSessionToken);

		expect(HTTPService.get).toHaveBeenCalledWith(
			"/user/notification-preferences",
			fakeSessionToken
		);
	});

	it("should return notification preferences", async () => {
		(HTTPService.get as jest.Mock).mockResolvedValue({
			data: {
				marketing: {
					callEnabled: true,
					emailEnabled: true,
					smsEnabled: true,
					pushEnabled: true,
					lineEnabled: true,
				},
			},
		});
		const response = await getNotificationPreferences(fakeSessionToken);
		expect(response).toStrictEqual({
			marketing: {
				callEnabled: true,
				emailEnabled: true,
				smsEnabled: true,
				pushEnabled: true,
				lineEnabled: true,
			},
		});
	});
});

describe("saveNotificationPreferences", () => {
	it("should saveNotificationPreferences with the correct parameters", async () => {
		await saveNotificationPreferences(fakeSessionToken, {
			marketing: {
				callEnabled: true,
				emailEnabled: true,
				smsEnabled: true,
				pushEnabled: true,
				lineEnabled: true,
			},
		});
		expect(HTTPService.patch).toHaveBeenCalledWith(
			"/user/notification-preferences",
			{
				marketing: {
					callEnabled: true,
					emailEnabled: true,
					smsEnabled: true,
					pushEnabled: true,
					lineEnabled: true,
				},
			},
			fakeSessionToken
		);
	});
});
