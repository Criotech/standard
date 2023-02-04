import { IAddressState } from "./IAddressState";
import { IUserAddress } from "./IUserAddress";
import { Nullable } from "../UtilityTypes/Nullable";
export { IAddressState, IUserAddress };
export declare type UpdateUserAddressPayload = Partial<IUserAddress>;
export declare type GetUserAddressResponse = Nullable<IUserAddress>;
