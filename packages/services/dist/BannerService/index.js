import { HTTPService } from "../index";
import { getConfig } from "../ConfigService";
export const getBanners = async (sessionToken) => {
    try {
        const config = getConfig();
        const { data } = await HTTPService.get(`banners?region=${config?.region}`, sessionToken);
        return data;
    }
    catch (error) {
        throw error;
    }
};
