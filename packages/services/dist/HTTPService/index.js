import axios from "axios";
import { ulid } from "ulid";
import { getConfig } from "../ConfigService";
const configuration = getConfig();
if (configuration) {
    axios.defaults.baseURL = configuration.baseUrl;
}
const frontendType = "WEB:LITE";
export const post = async (url, payload, token) => {
    const authorizationHeader = token
        ? { Authorization: `Bearer ${token}` }
        : {};
    const config = {
        headers: {
            ...authorizationHeader,
            "X-Correlation-Id": ulid(),
            "Frontend-Type": frontendType,
        },
    };
    const { data, headers, status } = await axios.post(url, payload, config);
    return {
        data,
        headers,
        status,
    };
};
export const get = async (url, token) => {
    const authorizationHeader = token
        ? { Authorization: `Bearer ${token}` }
        : {};
    const config = {
        headers: {
            ...authorizationHeader,
            "X-Correlation-Id": ulid(),
            "Frontend-Type": frontendType,
        },
    };
    const { data, headers, status } = await axios.get(url, config);
    return {
        data,
        headers,
        status,
    };
};
export const patch = async (url, payload, token) => {
    const authorizationHeader = token
        ? { Authorization: `Bearer ${token}` }
        : {};
    const config = {
        headers: {
            ...authorizationHeader,
            "X-Correlation-Id": ulid(),
            "Frontend-Type": frontendType,
        },
    };
    const { data, headers, status } = await axios.patch(url, payload, config);
    return {
        data,
        headers,
        status,
    };
};
