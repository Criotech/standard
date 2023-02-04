import { GetBannersResponse } from "@myacuvue_thailand_web/services";
import { useService } from "./useService";
import { useCallback } from "react";
import { useLoading } from "./useLoading";
import { useAuthentication } from "./useAuthentication";

interface IUseBanners {
	getBanners: () => Promise<GetBannersResponse>;
}

export const useBanners = (): IUseBanners => {
	const { BannerService } = useService();
	const { showLoading, hideLoading } = useLoading();
	const { sessionToken } = useAuthentication();

	const getBanners = useCallback(async () => {
		showLoading();
		try {
			return await BannerService.getBanners(sessionToken?.rawValue!);
		} finally {
			hideLoading();
		}
	}, [BannerService, hideLoading, sessionToken?.rawValue, showLoading]);

	return {
		getBanners,
	};
};
