import { INotificationPreferences } from "./INotificationPreferences";
declare const SettingsService: {
    getNotificationPreferences: (sessionToken: string) => Promise<INotificationPreferences>;
    saveNotificationPreferences: (sessionToken: string, data: INotificationPreferences) => Promise<void>;
};
export default SettingsService;
