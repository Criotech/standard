import { useCallback } from "react";
import { useAuthentication } from "./useAuthentication";
import { useLoading } from "./useLoading";
import { IPoints } from "@myacuvue_thailand_web/services";
import { useService } from "./useService";

interface IUsePoints {
	getUserPoints: () => Promise<IPoints>;
}

export const usePoints = (): IUsePoints => {
	const { PointsService } = useService();
	const { showLoading, hideLoading } = useLoading();
	const { sessionToken } = useAuthentication();

	const getUserPoints = useCallback(async () => {
		showLoading();
		try {
			return await PointsService.getPoints(sessionToken?.rawValue!);
		} finally {
			hideLoading();
		}
	}, [showLoading, PointsService, sessionToken?.rawValue, hideLoading]);

	return {
		getUserPoints,
	};
};
