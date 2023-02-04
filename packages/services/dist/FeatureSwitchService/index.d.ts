import { configType, demographicType, IFeatureSwitch } from "./types";
export declare function flushFeatureSwitchPromise(): void;
declare function getFeatureSwitch<J extends keyof IFeatureSwitch>(featureName: J, partialDemographics?: Partial<demographicType<J>>): Promise<configType<J> | undefined>;
declare const FeatureSwitchService: {
    getFeatureSwitch: typeof getFeatureSwitch;
};
export default FeatureSwitchService;
