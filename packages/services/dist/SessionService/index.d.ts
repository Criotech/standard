import { ISessionToken } from "../index";
declare const SessionService: {
    startSession: (xiamToken: string) => Promise<ISessionToken>;
};
export default SessionService;
