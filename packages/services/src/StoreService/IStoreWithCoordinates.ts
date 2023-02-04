import { IStore } from "./IStore";

export interface IStoreWithCoordinates extends IStore {
	district: string;
	zone: string;
	latitude: number;
	longitude: number;
}
