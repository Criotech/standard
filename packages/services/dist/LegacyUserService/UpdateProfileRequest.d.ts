import { IProfileLegacy } from "./IProfileLegacy";
export declare type UpdateProfileRequest = Pick<IProfileLegacy, "firstName" | "lastName"> & Partial<Pick<IProfileLegacy, "email">>;
