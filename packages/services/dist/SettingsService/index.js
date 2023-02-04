import { HTTPService } from "../index";
const getNotificationPreferences = async (sessionToken) => {
    const { data: notificationPreferences } = await HTTPService.get("/user/notification-preferences", sessionToken);
    return notificationPreferences;
};
const saveNotificationPreferences = async (sessionToken, data) => {
    await HTTPService.patch("/user/notification-preferences", data, sessionToken);
};
const SettingsService = {
    getNotificationPreferences,
    saveNotificationPreferences,
};
export default SettingsService;
