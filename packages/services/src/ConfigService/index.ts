import WindowService from "../WindowService";
import {
	DomainMap,
	ENV,
	IConfig,
	Instance,
	IFullRegionConfig,
	IRegionConfig,
	IGlobalConfig,
	environmentMap,
} from "./types";
import { configTH, domainMapTH } from "./configTH";
import { configAU, domainMapAU } from "./configAU";
import { configTW, domainMapTW } from "./configTW";
import { configHK, domainMapHK } from "./configHK";
import { configSG, domainMapSG } from "./configSG";
import { configMY, domainMapMY } from "./configMY";
import { configNZ, domainMapNZ } from "./configNZ";
import { configIN, domainMapIN } from "./configIN";
import { PrivateConfig } from "./PrivateConfig";
import { globalConfig } from "./globalConfig";

const { getHost } = WindowService;

const environments = Object.values(ENV);
const instances = Object.values(Instance);

const instanceMap: Record<Instance, DomainMap> = {
	[Instance.TH]: domainMapTH,
	[Instance.AU]: domainMapAU,
	[Instance.TW]: domainMapTW,
	[Instance.HK]: domainMapHK,
	[Instance.SG]: domainMapSG,
	[Instance.MY]: domainMapMY,
	[Instance.NZ]: domainMapNZ,
	[Instance.IN]: domainMapIN,
};

const config: Record<Instance, IFullRegionConfig> = {
	[Instance.TH]: configTH,
	[Instance.AU]: configAU,
	[Instance.TW]: configTW,
	[Instance.HK]: configHK,
	[Instance.SG]: configSG,
	[Instance.MY]: configMY,
	[Instance.NZ]: configNZ,
	[Instance.IN]: configIN,
};

const urlIndex: Record<string, { env: ENV; instance: Instance }> = (() => {
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

export const getCurrentInstanceEnv = ():
	| { env: ENV; instance: Instance }
	| undefined => {
	const host = getHost();
	return urlIndex[host];
};

export type Config = IConfig &
	IGlobalConfig &
	IRegionConfig & {
		instance: Instance;
	};

export const getConfig = (): Config | undefined => {
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
		} as PrivateConfig;
	}
};

export * from "./types";
export * from "./header/types";
export * from "./footer/types";
