import { FrontendType } from "../ConfigService";
export interface IFeatureVariation<T, J> {
    demographics: Array<J>;
    configuration: T;
}
export interface IFeatureConfig<T, J> {
    default: T;
    variations: Array<IFeatureVariation<T, J>>;
}
export declare type AddressFormType = "VARIATION1" | "VARIATION2" | "VARIATION3" | "VARIATION4" | "VARIATION5" | "VARIATION6";
export declare enum RenderGreetingBlockStatus {
    DISABLED = "DISABLED",
    ENABLED = "ENABLED"
}
export declare enum NavigateToCanvasOnSignOutStatus {
    DISABLED = "DISABLED",
    ENABLED = "ENABLED"
}
export declare enum NavigateToSignInOnResetPasswordStatus {
    DISABLED = "DISABLED",
    ENABLED = "ENABLED"
}
export declare enum SortAlphabeticallyStoresZonesStatus {
    DISABLED = "DISABLED",
    ENABLED = "ENABLED"
}
export declare enum DisplayMedicalPatientInstructionGuideFooterAUStatus {
    DISABLED = "DISABLED",
    ENABLED = "ENABLED"
}
export declare enum DisplayTermsAndConditionsFooterAUStatus {
    DISABLED = "DISABLED",
    ENABLED = "ENABLED"
}
export declare enum DisplayAboutSustainabilityFooterAUStatus {
    DISABLED = "DISABLED",
    ENABLED = "ENABLED"
}
export declare enum DisplayAllMapPinsInSameColorStatus {
    DISABLED = "DISABLED",
    ENABLED = "ENABLED"
}
export interface DisplayMaintenanceBannerStartAndEndDateTime {
    startDateTimeISO: string;
    endDateTimeISO: string;
}
export interface IFeatureSwitch {
    addressFormType: IFeatureConfig<AddressFormType, {
        environment: string;
        instance: string;
    }>;
    greetingsBlock: IFeatureConfig<RenderGreetingBlockStatus, {
        environment: string;
        instance: string;
    }>;
    navigateToCanvasOnSignOut: IFeatureConfig<NavigateToCanvasOnSignOutStatus, {
        environment: string;
        instance: string;
    }>;
    navigateToSignInOnResetPassword: IFeatureConfig<NavigateToSignInOnResetPasswordStatus, {
        environment: string;
        instance: string;
    }>;
    sortAlphabeticallyStoresZones: IFeatureConfig<SortAlphabeticallyStoresZonesStatus, {
        environment: string;
        instance: string;
    }>;
    displayMedicalPatientInstructionGuideFooterAU: IFeatureConfig<DisplayMedicalPatientInstructionGuideFooterAUStatus, {
        environment: string;
    }>;
    displayTermsAndConditionsFooterAU: IFeatureConfig<DisplayTermsAndConditionsFooterAUStatus, {
        environment: string;
    }>;
    displayAboutSustainabilityFooterAU: IFeatureConfig<DisplayAboutSustainabilityFooterAUStatus, {
        environment: string;
    }>;
    displayAllMapPinsInSameColor: IFeatureConfig<DisplayAllMapPinsInSameColorStatus, {
        environment: string;
        instance: string;
    }>;
    displayMaintenanceBanner: IFeatureConfig<DisplayMaintenanceBannerStartAndEndDateTime, {
        environment: string;
        instance: string;
        frontendType: FrontendType;
    }>;
}
export declare type configType<J extends keyof IFeatureSwitch> = IFeatureSwitch[J]["default"];
export declare type variationType<J extends keyof IFeatureSwitch> = IFeatureSwitch[J]["variations"][number];
export declare type demographicType<J extends keyof IFeatureSwitch> = variationType<J>["demographics"][number];
