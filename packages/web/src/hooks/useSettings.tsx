import { useAuthentication } from "./useAuthentication";
import { INotificationPreferences } from "@myacuvue_thailand_web/services";
import { useService } from "./useService";
import { useCallbackWithLoading } from "./useCallbackWithLoading";

interface IUseSettings {
	getNotificationPreferences: () => Promise<INotificationPreferences>;
	saveNotificationPreferences: (
		payload: INotificationPreferences
	) => Promise<void>;
}

export const useSettings = (): IUseSettings => {
	const { SettingsService } = useService();
	const { sessionToken } = useAuthentication();

	const getNotificationPreferences = useCallbackWithLoading(async () => {
		return await SettingsService.getNotificationPreferences(
			sessionToken?.rawValue!
		);
	}, [sessionToken?.rawValue, SettingsService]);

	const saveNotificationPreferences = useCallbackWithLoading(
		async (payload: INotificationPreferences) => {
			return await SettingsService.saveNotificationPreferences(
				sessionToken?.rawValue!,
				payload
			);
		},
		[sessionToken?.rawValue, SettingsService]
	);

	return {
		getNotificationPreferences,
		saveNotificationPreferences,
	};
};
