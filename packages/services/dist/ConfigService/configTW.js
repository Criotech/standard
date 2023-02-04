import { apiDomains, ENV, FontFamilySet, Instance, instanceRegionMap, PrivilegeIconType, OpticalStoreIconType, Region, } from "./types";
import { defaultRegionConfig } from "./globalConfig";
import { headerTW } from "./header/headerTW";
import { Language } from "../LanguageService/Language";
import { footerTW } from "./footer/footerTW";
import { socialNetworksTW } from "./footer/socialNetworksTW";
export const domainMapTW = {
    [ENV.LOCAL]: ["localhost:3002"],
    [ENV.PREDEV]: ["predev.app.acuvue.com.tw", "localhost:4002"],
    [ENV.DEV]: ["dev.app.acuvue.com.tw", "localhost:5002"],
    [ENV.STAGING]: ["stage.app.acuvue.com.tw", "localhost:6002"],
    [ENV.PROD]: ["app.acuvue.com.tw"],
};
export const configTW = {
    region: {
        ...defaultRegionConfig,
        countryPhoneCode: "886",
        region: Region.TWN,
        fontFamilySet: FontFamilySet.Chinese,
        forcedDefaultLanguage: Language.ZH,
        supportedLanguages: [Language.ZH],
        headerMenu: headerTW,
        legalAge: { minorThreshold: 18, minorThresholdWithGuardian: 20 },
        phoneNumberLength: 9,
        phoneNumberStartsWith: /(^s*(9)[0-9]{8})$/,
        canvasHomePageUrl: "https://www.acuvue.com.tw/",
        signOutRedirectUrl: "https://www.acuvue.com.tw/",
        searchPrefixUrl: "https://www.acuvue.com.tw/search/site/",
        supportEmailAddress: "vision_care@vistw.jnj.com",
        supportTelephone: "0800-068-346",
        hasDisclaimerText: true,
        footerMenu: footerTW,
        socialNetworks: socialNetworksTW,
        appPrivileges: [
            {
                iconType: PrivilegeIconType.TICKET_IN_CIRCLE,
                titleKey: "dashboardPage.invitation.appExclusiveOffersTitle",
                bodyKey: "dashboardPage.invitation.appExclusiveOffersBody",
            },
            {
                iconType: PrivilegeIconType.TICKET_IN_CIRCLE,
                titleKey: "dashboardPage.invitation.itsEasyTitle",
                bodyKey: "dashboardPage.invitation.itsEasyBody",
            },
            {
                iconType: PrivilegeIconType.LENSES_IN_CIRCLE,
                titleKey: "dashboardPage.invitation.contactLensesTitle",
                bodyKey: "dashboardPage.invitation.contactLensesBody",
            },
            {
                iconType: PrivilegeIconType.ENVELOPE_IN_CIRCLE,
                titleKey: "dashboardPage.invitation.shoppingCashTitle",
                bodyKey: "dashboardPage.invitation.shoppingCashBody",
            },
        ],
        mapDefaultCenter: { latitude: 25.0854717, longitude: 121.2908768 },
        opticalStoreAdviceCards: [
            {
                iconType: OpticalStoreIconType.LENSES_CASE_IN_CIRCLE,
                textKey: "dashboardPage.opticalStore.cleaningAndCare",
                link: "https://www.acuvue.com.tw/contact-lens-care/new-wearer-guide",
            },
            {
                iconType: OpticalStoreIconType.CHECKLIST_IN_CIRCLE,
                textKey: "dashboardPage.opticalStore.getYourEyeCheckedRegularly",
                link: "https://www.acuvue.com.tw/get-contactsl/pre-order",
            },
        ],
        googlePlayStoreLink: "https://myacuvue.acuvue.com.tw/BaXx/jcimd316",
        appleAppStoreLink: "https://myacuvue.acuvue.com.tw/BaXx/jcimd316",
        membershipBenefitKeysByLadder: {
            normal: [
                "dashboardPage.membershipDetails.benefitsList.pointsWithAcuvueContactLensPurchases",
                "dashboardPage.membershipDetails.benefitsList.redeemRewards",
            ],
            platinum: [],
        },
        hasAddressFeature: false,
        hasLineNotification: true,
        postalCodeLength: 5,
        termsAndConditionUrl: "https://www.acuvue.com.tw/terms-conditions",
    },
    environments: {
        [ENV.LOCAL]: {
            baseUrl: `https://${apiDomains[ENV.LOCAL]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.TW]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.PREDEV]: {
            baseUrl: `https://${apiDomains[ENV.PREDEV]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.TW]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.DEV]: {
            baseUrl: `https://${apiDomains[ENV.DEV]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.TW]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.STAGING]: {
            baseUrl: `https://${apiDomains[ENV.STAGING]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.TW]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.PROD]: {
            baseUrl: `https://${apiDomains[ENV.PROD]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.TW]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: false,
        },
    },
};
