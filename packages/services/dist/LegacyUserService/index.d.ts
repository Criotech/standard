import { UpdateProfileRequest } from "./UpdateProfileRequest";
import { IUser } from "./types";
import { ListConsentsResponseBody, SaveConsentsRequestBody } from "../PhoneService/types";
declare const LegacyUserService: {
    getUser: (sessionToken: string) => Promise<IUser>;
    updateProfile: (sessionToken: string, data: UpdateProfileRequest) => Promise<void>;
    getConsents: (sessionToken: string) => Promise<ListConsentsResponseBody>;
    saveConsents: (sessionToken: string, data: SaveConsentsRequestBody) => Promise<void>;
};
export default LegacyUserService;
