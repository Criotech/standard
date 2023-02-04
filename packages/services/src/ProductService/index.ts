import { HTTPService } from "../index";
import { ISampleProduct } from "./ISampleProduct";

export const getSampleProducts = async (
	language: string,
	region: string,
	sessionToken: string
): Promise<ISampleProduct[]> => {
	const url = "sample-products?language=" + language + "&region=" + region;
	const { data } = await HTTPService.get<ISampleProduct[]>(url, sessionToken);
	return data;
};
