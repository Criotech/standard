import { useCallback } from "react";
import { useService } from "./useService";
import { LegalAgeRange } from "@myacuvue_thailand_web/services";

interface IUseLegalAge {
	getLegalAgeRange: (
		birthMonth?: number,
		birthYear?: number
	) => LegalAgeRange;
}

export const useLegalAge = (): IUseLegalAge => {
	const { LegalAgeService } = useService();

	const getLegalAgeRange = useCallback(
		(birthMonth?: number, birthYear?: number) =>
			LegalAgeService.getLegalAgeRange(birthMonth, birthYear),
		[LegalAgeService]
	);

	return {
		getLegalAgeRange,
	};
};
