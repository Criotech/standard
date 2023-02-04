import { IRegisterStore } from "./IRegisterStore";
import { IsEligibleToChangeStoreResponse } from "./IsEligibleToChangeStoreResponse";
import { IStore } from "./IStore";
import { IStoreWithCoordinates } from "./IStoreWithCoordinates";
declare const StoreService: {
    getMyStore: (sessionToken: string) => Promise<IStore | null>;
    getStores: (sessionToken: string) => Promise<IStoreWithCoordinates[]>;
    registerStore: (sessionToken: string, data: IRegisterStore) => Promise<void>;
    isEligibleToChangeStore: (sessionToken: string) => Promise<IsEligibleToChangeStoreResponse>;
};
export default StoreService;
