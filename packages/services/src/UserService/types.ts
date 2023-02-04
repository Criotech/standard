import { IProfile, LensesUsage } from "./IProfile";
import { UpdateProfilePayload } from "./UpdateProfilePayload";
import { IGetProfileResponse } from "./IGetProfileResponse";
import { IPromocode } from "./IPromocode";

enum ProfileCompleteness {
	INCOMPLETE = "INCOMPLETE",
	COMPLETE = "COMPLETE",
}

export {
	IProfile,
	UpdateProfilePayload,
	IGetProfileResponse,
	LensesUsage,
	ProfileCompleteness,
	IPromocode,
};
