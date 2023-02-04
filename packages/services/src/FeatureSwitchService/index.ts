import { getConfig, FrontendType } from "../ConfigService";
import {
	configType,
	demographicType,
	IFeatureSwitch,
	variationType,
} from "./types";
import axios from "axios";
import WindowService from "../WindowService";
// @ts-ignore
import { shallowEqualObjects } from "shallow-equal";
import { PrivateConfig } from "../ConfigService/PrivateConfig";

async function getFeatureSwitchConfig() {
	const config = getConfig();
	if (config) {
		const { featureSwitchUrl } = config;
		const { data } = await axios.get<IFeatureSwitch>(featureSwitchUrl, {
			baseURL: undefined,
		});
		return data;
	}
}

let cachedConfig: IFeatureSwitch | undefined;
const localStorageKey = "featureSwitchConfig";
async function cacheFeatureSwitchConfig(): Promise<IFeatureSwitch | undefined> {
	try {
		const featureConfig = await getFeatureSwitchConfig();
		if (featureConfig) {
			WindowService.addItemToLocalStorage(localStorageKey, featureConfig);
			cachedConfig = featureConfig;
		}
		return cachedConfig;
	} catch (e) {
		return WindowService.getItemFromLocalStorage<IFeatureSwitch>(
			localStorageKey
		);
	}
}

let featureSwitchPromise: Promise<IFeatureSwitch | undefined> | undefined;

export function flushFeatureSwitchPromise() {
	featureSwitchPromise = undefined;
}

async function getFeatureSwitchValue<J extends keyof IFeatureSwitch>(
	featureName: J,
	demographic: demographicType<J>
): Promise<configType<J> | undefined> {
	featureSwitchPromise = featureSwitchPromise || cacheFeatureSwitchConfig();
	const featureSwitchConfig = await featureSwitchPromise;
	if (featureSwitchConfig) {
		const { variations, default: defaultValue } = featureSwitchConfig[
			featureName
		] as {
			default: configType<J>;
			variations: Array<variationType<J>>;
		};

		const foundVariation = variations.find(({ demographics }) => {
			return demographics.find((variationDemographic) =>
				shallowEqualObjects(demographic, variationDemographic)
			);
		});

		return foundVariation ? foundVariation.configuration : defaultValue;
	} else {
		flushFeatureSwitchPromise();
	}
}

function getConfigDemographics<J extends keyof IFeatureSwitch>(
	featureName: J,
	partialDemographics: Partial<demographicType<J>> = {}
): demographicType<J> | void {
	const config = getConfig();
	if (config) {
		const { instance, APIEnvironment } = config as PrivateConfig;
		const demographics: {
			[P in keyof IFeatureSwitch]: demographicType<P>;
		} = {
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

async function getFeatureSwitch<J extends keyof IFeatureSwitch>(
	featureName: J,
	partialDemographics: Partial<demographicType<J>> = {}
) {
	const demographics = getConfigDemographics(
		featureName,
		partialDemographics
	);
	if (demographics) {
		return getFeatureSwitchValue(featureName, demographics);
	}
}

const FeatureSwitchService = {
	getFeatureSwitch,
};

export default FeatureSwitchService;
