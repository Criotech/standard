import { IDeviceToken, ISessionToken } from "../index";
export declare const getSessionToken: (deviceToken: string) => Promise<ISessionToken>;
export declare const refreshSessionToken: (sessionToken: string) => Promise<ISessionToken>;
export declare const refreshDeviceToken: (deviceToken: string) => Promise<IDeviceToken>;
