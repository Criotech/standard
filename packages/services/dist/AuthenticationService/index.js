import { post } from "../HTTPService";
import JsonWebTokenService from "../JsonWebTokenService";
export const getSessionToken = async (deviceToken) => {
    const { data: { sessionToken: sessionTokenString }, } = await post("session-token", {}, deviceToken);
    return JsonWebTokenService.parse(sessionTokenString);
};
export const refreshSessionToken = async (sessionToken) => {
    const { data: { sessionToken: newSessionTokenString }, } = await post("refresh-session-token", {}, sessionToken);
    return JsonWebTokenService.parse(newSessionTokenString);
};
export const refreshDeviceToken = async (deviceToken) => {
    const { data: { deviceToken: newDeviceTokenString }, } = await post("refresh-device-token", {}, deviceToken);
    return JsonWebTokenService.parse(newDeviceTokenString);
};
