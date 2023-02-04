import { apiDomains, ENV, Instance, instanceRegionMap, FontFamilySet, OpticalStoreIconType, PrivilegeIconType, Region, } from "./types";
import { defaultRegionConfig } from "./globalConfig";
import { Language } from "../LanguageService/Language";
import { headerHK } from "./header/headerHK";
import { footerHK } from "./footer/footerHK";
import { socialNetworksHK } from "./footer/socialNetworksHK";
export const domainMapHK = {
    [ENV.LOCAL]: ["localhost:3003"],
    [ENV.PREDEV]: ["predev.app.acuvue.com.hk", "localhost:4003"],
    [ENV.DEV]: ["dev.app.acuvue.com.hk", "localhost:5003"],
    [ENV.STAGING]: ["stage.app.acuvue.com.hk", "localhost:6003"],
    [ENV.PROD]: ["app.acuvue.com.hk"],
};
export const configHK = {
    region: {
        ...defaultRegionConfig,
        countryPhoneCode: "852",
        region: Region.HKG,
        fontFamilySet: FontFamilySet.Chinese,
        forcedDefaultLanguage: Language.ZH,
        supportedLanguages: [Language.ZH],
        legalAge: { minorThreshold: 16, minorThresholdWithGuardian: 18 },
        phoneNumberLength: 8,
        phoneNumberStartsWith: /(^s*([4-9])[0-9]{7})$/,
        canvasHomePageUrl: "https://www.acuvue.com.hk",
        signOutRedirectUrl: "https://www.acuvue.com.hk",
        supportEmailAddress: "enquiry@acuvue.com.hk",
        searchPrefixUrl: "https://www.acuvue.com.hk/search/site/",
        supportTelephone: "25881100",
        topHeaderLinks: [
            {
                label: "myacuvueLiteHeader.topHeaderSection.productPackagingUpdateTips",
                url: "https://www.acuvue.com.hk/product-packaging-update-reminder",
            },
            {
                label: "myacuvueLiteHeader.topHeaderSection.importantSafetyTips",
                url: "https://www.acuvue.com.hk/important-safety-information",
            },
            {
                label: "myacuvueLiteHeader.topHeaderSection.myAcuvue",
                url: "https://www.acuvue.com.hk/get-contacts/MyACUVUE",
            },
        ],
        headerMenu: headerHK,
        footerMenu: footerHK,
        socialNetworks: socialNetworksHK,
        mapDefaultCenter: { latitude: 22.3193628, longitude: 114.1589007 },
        googlePlayStoreLink: "https://myacuvue.acuvue.com.hk/BaXx/jcimd316",
        appleAppStoreLink: "https://myacuvue.acuvue.com.hk/BaXx/jcimd316",
        opticalStoreAdviceCards: [
            {
                iconType: OpticalStoreIconType.LENSES_CASE_IN_CIRCLE,
                textKey: "dashboardPage.opticalStore.cleaningAndCare",
                link: "https://www.acuvue.com.hk/contact-lens-care/new-wearer-guide",
            },
            {
                iconType: OpticalStoreIconType.CHECKLIST_IN_CIRCLE,
                textKey: "dashboardPage.opticalStore.getYourEyeCheckedRegularly",
                link: "https://www.acuvue.com.hk/get-contacts/MyACUVUE",
            },
        ],
        appPrivileges: [
            {
                iconType: PrivilegeIconType.TRUCK_IN_CIRCLE,
                titleKey: "dashboardPage.invitation.oneStopOrderingServiceTitle",
                bodyKey: "dashboardPage.invitation.oneStopOrderingServiceBody",
            },
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
                iconType: PrivilegeIconType.ENVELOPE_IN_CIRCLE,
                titleKey: "dashboardPage.invitation.shoppingCashTitle",
                bodyKey: "dashboardPage.invitation.shoppingCashBody",
            },
        ],
        membershipBenefitKeysByLadder: {
            normal: [
                "dashboardPage.membershipDetails.benefitsList.pointsWithAcuvueContactLensPurchases",
                "dashboardPage.membershipDetails.benefitsList.redeemRewards",
            ],
            platinum: [],
        },
        hasAddressFeature: false,
        postalCodeLength: 5,
        termsAndConditionUrl: "https://www.acuvue.com.hk/terms-of-use",
    },
    environments: {
        [ENV.LOCAL]: {
            baseUrl: `https://${apiDomains[ENV.LOCAL]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.HK]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.PREDEV]: {
            baseUrl: `https://${apiDomains[ENV.PREDEV]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.HK]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.DEV]: {
            baseUrl: `https://${apiDomains[ENV.DEV]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.HK]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.STAGING]: {
            baseUrl: `https://${apiDomains[ENV.STAGING]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.HK]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.PROD]: {
            baseUrl: `https://${apiDomains[ENV.PROD]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.HK]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: false,
        },
    },
};
