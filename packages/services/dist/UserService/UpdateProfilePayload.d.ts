import { IProfile } from "./IProfile";
export declare type UpdateProfilePayload = Omit<Partial<IProfile>, "myAcuvueId" | "phone">;
