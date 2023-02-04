import { useCallback } from "react";
import { useLine } from "../contexts/LineContext";
import { ulid } from "ulid";

interface IUseDevice {
	getDeviceId: () => string | undefined;
}

export const useDevice = (): IUseDevice => {
	const lineContext = useLine();

	const getDeviceId = useCallback(() => {
		if (lineContext?.lineProfile?.lineId) {
			const lineId = lineContext?.lineProfile?.lineId;
			return `LINE:${lineId}`;
		}
		return ulid();
	}, [lineContext]);

	return {
		getDeviceId,
	};
};
