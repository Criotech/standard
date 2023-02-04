import { HTTPService } from "../index";
export const getSampleProducts = async (language, region, sessionToken) => {
    const url = "sample-products?language=" + language + "&region=" + region;
    const { data } = await HTTPService.get(url, sessionToken);
    return data;
};
