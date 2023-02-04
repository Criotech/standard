import { IAddressState } from "./IAddressState";
import { IUserAddress } from "./IUserAddress";
import { Nullable } from "../UtilityTypes/Nullable";
export { IAddressState, IUserAddress };

export type UpdateUserAddressPayload = Partial<IUserAddress>;
export type GetUserAddressResponse = Nullable<IUserAddress>;
