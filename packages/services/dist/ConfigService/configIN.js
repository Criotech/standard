import { apiDomains, ENV, FontFamilySet, Instance, instanceRegionMap, ProfileForm, AuthenticationType, RoutesType, Region, } from "./types";
import { headerIN } from "./header/headerIN";
import { footerIN } from "./footer/footerIN";
import { socialNetworksIN } from "./footer/socialNetworksIN";
import { defaultRegionConfig } from "./globalConfig";
export const domainMapIN = {
    [ENV.LOCAL]: ["localhost:3007"],
    [ENV.PREDEV]: ["predev.app.acuvue.co.in", "localhost:4007"],
    [ENV.DEV]: ["dev.app.acuvue.co.in", "localhost:5007"],
    [ENV.STAGING]: ["stage.app.acuvue.co.in", "localhost:6007"],
    [ENV.PROD]: ["app.acuvue.co.in"],
};
export const configIN = {
    region: {
        ...defaultRegionConfig,
        countryPhoneCode: "91",
        region: Region.IND,
        legalAge: { minorThreshold: 18, minorThresholdWithGuardian: 0 },
        phoneNumberLength: 10,
        phoneNumberStartsWith: /(^s*([6-9])[0-9]{9})$/,
        isChangeStoreAllowed: false,
        hasGoToHomeInRegisteredStore: true,
        canvasPageUrl: "https://www.acuvue.co.in/",
        profileFormType: ProfileForm.WITH_EMAIL,
        authenticationType: AuthenticationType.TOKEN_ONLY,
        routesType: RoutesType.TOKEN_ONLY_FLOW,
        headerMenu: headerIN,
        footerMenu: footerIN,
        hasSignIn: false,
        searchPrefixUrl: "https://www.acuvue.co.in/search/site/",
        topHeaderLinks: [
            {
                label: "myacuvueLiteHeader.topHeaderSection.importantSafetyInformation",
                url: "https://www.acuvue.co.in/important-safety-information",
            },
        ],
        fontFamilySet: FontFamilySet.English,
        socialNetworks: socialNetworksIN,
        canvasHomePageUrl: "https://www.acuvue.co.in",
        hasProfileDetailsMenu: false,
        mapDefaultCenter: { latitude: 19.076, longitude: 72.8777 },
        hasMembershipAndWalletBlock: false,
        hasPromocodeAndFeedbackBlock: true,
        termsAndConditionUrl: "https://acuvue.co.in/myacuvue-terms-conditions",
    },
    environments: {
        [ENV.LOCAL]: {
            baseUrl: `https://${apiDomains[ENV.LOCAL]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.IN]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.PREDEV]: {
            baseUrl: `https://${apiDomains[ENV.PREDEV]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.IN]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.DEV]: {
            baseUrl: `https://${apiDomains[ENV.DEV]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.IN]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.STAGING]: {
            baseUrl: `https://${apiDomains[ENV.STAGING]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.IN]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.PROD]: {
            baseUrl: `https://${apiDomains[ENV.PROD]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.IN]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: false,
        },
    },
};
