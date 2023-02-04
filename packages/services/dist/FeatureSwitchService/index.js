import { getConfig } from "../ConfigService";
import axios from "axios";
import WindowService from "../WindowService";
import { shallowEqualObjects } from "shallow-equal";
async function getFeatureSwitchConfig() {
    const config = getConfig();
    if (config) {
        const { featureSwitchUrl } = config;
        const { data } = await axios.get(featureSwitchUrl, {
            baseURL: undefined,
        });
        return data;
    }
}
let cachedConfig;
const localStorageKey = "featureSwitchConfig";
async function cacheFeatureSwitchConfig() {
    try {
        const featureConfig = await getFeatureSwitchConfig();
        if (featureConfig) {
            WindowService.addItemToLocalStorage(localStorageKey, featureConfig);
            cachedConfig = featureConfig;
        }
        return cachedConfig;
    }
    catch (e) {
        return WindowService.getItemFromLocalStorage(localStorageKey);
    }
}
let featureSwitchPromise;
export function flushFeatureSwitchPromise() {
    featureSwitchPromise = undefined;
}
async function getFeatureSwitchValue(featureName, demographic) {
    featureSwitchPromise = featureSwitchPromise || cacheFeatureSwitchConfig();
    const featureSwitchConfig = await featureSwitchPromise;
    if (featureSwitchConfig) {
        const { variations, default: defaultValue } = featureSwitchConfig[featureName];
        const foundVariation = variations.find(({ demographics }) => {
            return demographics.find((variationDemographic) => shallowEqualObjects(demographic, variationDemographic));
        });
        return foundVariation ? foundVariation.configuration : defaultValue;
    }
    else {
        flushFeatureSwitchPromise();
    }
}
function getConfigDemographics(featureName, partialDemographics = {}) {
    const config = getConfig();
    if (config) {
        const { instance, APIEnvironment } = config;
        const demographics = {
            addressFormType: {
                environment: APIEnvironment,
                instance,
            },
            navigateToCanvasOnSignOut: {
                environment: APIEnvironment,
                instance,
            },
            navigateToSignInOnResetPassword: {
                environment: APIEnvironment,
                instance,
            },
            sortAlphabeticallyStoresZones: {
                environment: APIEnvironment,
                instance,
            },
            displayMedicalPatientInstructionGuideFooterAU: {
                environment: APIEnvironment,
            },
            displayTermsAndConditionsFooterAU: {
                environment: APIEnvironment,
            },
            displayAboutSustainabilityFooterAU: {
                environment: APIEnvironment,
            },
            displayAllMapPinsInSameColor: {
                environment: APIEnvironment,
                instance,
            },
            greetingsBlock: {
                environment: APIEnvironment,
                instance,
            },
            displayMaintenanceBanner: {
                environment: APIEnvironment,
                instance,
                frontendType: "WEB:LITE",
            },
        };
        return { ...partialDemographics, ...demographics[featureName] };
    }
}
async function getFeatureSwitch(featureName, partialDemographics = {}) {
    const demographics = getConfigDemographics(featureName, partialDemographics);
    if (demographics) {
        return getFeatureSwitchValue(featureName, demographics);
    }
}
const FeatureSwitchService = {
    getFeatureSwitch,
};
export default FeatureSwitchService;
