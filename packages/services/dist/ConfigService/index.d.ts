import { ENV, IConfig, Instance, IRegionConfig, IGlobalConfig } from "./types";
export declare const getCurrentInstanceEnv: () => {
    env: ENV;
    instance: Instance;
} | undefined;
export declare type Config = IConfig & IGlobalConfig & IRegionConfig & {
    instance: Instance;
};
export declare const getConfig: () => Config | undefined;
export * from "./types";
export * from "./header/types";
export * from "./footer/types";
