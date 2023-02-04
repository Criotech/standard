import { IProfileLegacy } from "./IProfileLegacy";

export type UpdateProfileRequest = Pick<
	IProfileLegacy,
	"firstName" | "lastName"
> &
	Partial<Pick<IProfileLegacy, "email">>;
