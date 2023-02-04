import { IProfileLegacy } from "./IProfileLegacy";

export interface IUser {
	id: string;
	phone: string;
	profile: IProfileLegacy | null;
}
