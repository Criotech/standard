import { HTTPService } from "../index";
export const getPoints = async (sessionToken) => {
    const { data } = await HTTPService.get("points", sessionToken);
    return data;
};
