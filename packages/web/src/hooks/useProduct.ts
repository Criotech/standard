import { ISampleProduct } from "@myacuvue_thailand_web/services";
import { useCallback } from "react";
import { useAuthentication } from "./useAuthentication";
import { useLoading } from "./useLoading";
import { useService } from "./useService";
import { useTranslation } from "./useTranslation";

interface IUseProduct {
	getProducts: () => Promise<ISampleProduct[]>;
}

export const useProduct = (): IUseProduct => {
	const { ProductService } = useService();
	const { language } = useTranslation();
	const { showLoading, hideLoading } = useLoading();
	const { sessionToken } = useAuthentication();

	const getProducts = useCallback(async () => {
		showLoading();
		const region = "THA";
		try {
			return await ProductService.getSampleProducts(
				language,
				region,
				sessionToken?.rawValue!
			);
		} finally {
			hideLoading();
		}
	}, [
		sessionToken?.rawValue,
		showLoading,
		hideLoading,
		language,
		ProductService,
	]);

	return { getProducts };
};
