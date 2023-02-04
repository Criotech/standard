import { HTTPService } from "../index";
const getUser = async (sessionToken) => {
    const { data } = await HTTPService.get("profile", sessionToken);
    return data;
};
const updateProfile = async (sessionToken, data) => {
    await HTTPService.patch("profile", data, sessionToken);
};
const getConsents = async (sessionToken) => {
    try {
        const { data } = await HTTPService.get("user/consents", sessionToken);
        return data;
    }
    catch (error) {
        throw error;
    }
};
const saveConsents = async (sessionToken, data) => {
    await HTTPService.post("user/consents", data, sessionToken);
};
const LegacyUserService = {
    getUser,
    updateProfile,
    getConsents,
    saveConsents,
};
export default LegacyUserService;
