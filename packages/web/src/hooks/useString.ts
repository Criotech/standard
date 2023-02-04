import { useService } from "./useService";
import { useCallback } from "react";

interface IUseString {
	isOnlyDigits: (text: string) => boolean;
	deleteNonDigits: (text: string) => string;
}

export const useString = (): IUseString => {
	const { StringService } = useService();

	const isOnlyDigits = useCallback(
		(text: string) => {
			return StringService.isOnlyDigits(text);
		},
		[StringService]
	);

	const deleteNonDigits = useCallback(
		(text: string) => {
			return StringService.deleteNonDigits(text);
		},
		[StringService]
	);
	return {
		isOnlyDigits,
		deleteNonDigits,
	};
};
