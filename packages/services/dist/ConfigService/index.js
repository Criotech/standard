import WindowService from "../WindowService";
import { ENV, Instance, environmentMap, } from "./types";
import { configTH, domainMapTH } from "./configTH";
import { configAU, domainMapAU } from "./configAU";
import { configTW, domainMapTW } from "./configTW";
import { configHK, domainMapHK } from "./configHK";
import { configSG, domainMapSG } from "./configSG";
import { configMY, domainMapMY } from "./configMY";
import { configNZ, domainMapNZ } from "./configNZ";
import { configIN, domainMapIN } from "./configIN";
import { globalConfig } from "./globalConfig";
const { getHost } = WindowService;
const environments = Object.values(ENV);
const instances = Object.values(Instance);
const instanceMap = {
    [Instance.TH]: domainMapTH,
    [Instance.AU]: domainMapAU,
    [Instance.TW]: domainMapTW,
    [Instance.HK]: domainMapHK,
    [Instance.SG]: domainMapSG,
    [Instance.MY]: domainMapMY,
    [Instance.NZ]: domainMapNZ,
    [Instance.IN]: domainMapIN,
};
const config = {
    [Instance.TH]: configTH,
    [Instance.AU]: configAU,
    [Instance.TW]: configTW,
    [Instance.HK]: configHK,
    [Instance.SG]: configSG,
    [Instance.MY]: configMY,
    [Instance.NZ]: configNZ,
    [Instance.IN]: configIN,
};
const urlIndex = (() => {
    const result = {};
    for (let instance of instances) {
        for (let env of environments) {
            const domains = instanceMap[instance][env];
            const envInstance = {
                env,
                instance,
            };
            const entries = domains.map((domain) => {
                return [domain, envInstance];
            });
            const fragment = Object.fromEntries(entries);
            Object.assign(result, fragment);
        }
    }
    return result;
})();
export const getCurrentInstanceEnv = () => {
    const host = getHost();
    return urlIndex[host];
};
export const getConfig = () => {
    const instanceEnv = getCurrentInstanceEnv();
    if (instanceEnv) {
        const { env, instance } = instanceEnv;
        return {
            instance,
            environment: env,
            APIEnvironment: environmentMap[env],
            ...globalConfig,
            ...config[instance].environments[env],
            ...config[instance].region,
        };
    }
};
export * from "./types";
export * from "./header/types";
export * from "./footer/types";
