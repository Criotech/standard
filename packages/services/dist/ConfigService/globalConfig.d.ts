import { IRegionConfig, IGlobalConfig } from "./types";
export declare const globalConfig: IGlobalConfig;
declare type RegionIntrinsicConfigKeys = "countryPhoneCode" | "region";
export declare const defaultRegionConfig: Omit<IRegionConfig, RegionIntrinsicConfigKeys>;
export {};
