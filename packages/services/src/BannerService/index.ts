import { HTTPService } from "../index";
import { GetBannersResponse } from "./GetBannersResponse";
import { getConfig } from "../ConfigService";

export const getBanners = async (
	sessionToken: string
): Promise<GetBannersResponse> => {
	try {
		const config = getConfig();
		const { data } = await HTTPService.get<GetBannersResponse>(
			`banners?region=${config?.region}`,
			sessionToken
		);
		return data;
	} catch (error) {
		throw error;
	}
};
