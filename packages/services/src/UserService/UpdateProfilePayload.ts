import { IProfile } from "./IProfile";

export type UpdateProfilePayload = Omit<
	Partial<IProfile>,
	"myAcuvueId" | "phone"
>;
