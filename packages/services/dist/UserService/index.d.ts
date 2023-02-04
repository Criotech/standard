import { ProfileCompleteness } from "../index";
import { UpdateProfilePayload } from "./UpdateProfilePayload";
import { IGetProfileResponse } from "./IGetProfileResponse";
import { IPromocode } from "./IPromocode";
export declare const updateAuthenticationDone: (sessionToken: string) => Promise<void>;
export declare const generatePromocode: (sessionToken: string) => Promise<IPromocode>;
declare const UserService: {
    getProfile: (sessionToken: string) => Promise<IGetProfileResponse>;
    saveProfile: (sessionToken: string, payload: UpdateProfilePayload) => Promise<void>;
    getProfileCompleteness: (profile: IGetProfileResponse) => ProfileCompleteness;
    updateAuthenticationDone: (sessionToken: string) => Promise<void>;
    getPromocode: (sessionToken: string) => Promise<IPromocode>;
    generatePromocode: (sessionToken: string) => Promise<IPromocode>;
};
export default UserService;
