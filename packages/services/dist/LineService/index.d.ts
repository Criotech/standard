import { ILineProfile } from "./ILineProfile";
export declare const getProfile: (liffId: string) => Promise<ILineProfile | undefined>;
export declare const createPermanentLink: (query?: string) => Promise<string>;
