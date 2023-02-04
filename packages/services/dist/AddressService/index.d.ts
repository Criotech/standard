import { GetUserAddressResponse, UpdateUserAddressPayload } from "../index";
import { IUserAddress } from "./IUserAddress";
import { IAddressState } from "./IAddressState";
export declare const getStates: (sessionToken: string) => Promise<IAddressState[]>;
export declare const saveMailingAddress: (payload: UpdateUserAddressPayload, sessionToken: string) => Promise<void>;
export declare const getMailingAddress: (sessionToken: string) => Promise<GetUserAddressResponse | undefined>;
export declare const getShippingAddress: (sessionToken: string) => Promise<IUserAddress | null>;
export declare const saveShippingAddress: (payload: IUserAddress, sessionToken: string) => Promise<IUserAddress | null>;
