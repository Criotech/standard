import { HTTPService } from "../index";
import { INotificationPreferences } from "./INotificationPreferences";

const getNotificationPreferences = async (
	sessionToken: string
): Promise<INotificationPreferences> => {
	const { data: notificationPreferences } =
		await HTTPService.get<INotificationPreferences>(
			"/user/notification-preferences",
			sessionToken
		);

	return notificationPreferences;
};

const saveNotificationPreferences = async (
	sessionToken: string,
	data: INotificationPreferences
): Promise<void> => {
	await HTTPService.patch(
		"/user/notification-preferences",
		data,
		sessionToken
	);
};

const SettingsService = {
	getNotificationPreferences,
	saveNotificationPreferences,
};

export default SettingsService;
