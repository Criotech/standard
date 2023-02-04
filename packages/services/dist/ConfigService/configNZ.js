import { apiDomains, ENV, Instance, instanceRegionMap, PrivilegeIconType, OpticalStoreIconType, Region, } from "./types";
import { defaultRegionConfig } from "./globalConfig";
import { headerNZ } from "./header/headerNZ";
import { footerNZ } from "./footer/footerNZ";
export const domainMapNZ = {
    [ENV.LOCAL]: ["localhost:3006"],
    [ENV.PREDEV]: ["predev.app.acuvue.co.nz", "localhost:4006"],
    [ENV.DEV]: ["dev.app.acuvue.co.nz", "localhost:5006"],
    [ENV.STAGING]: ["stage.app.acuvue.co.nz", "localhost:6006"],
    [ENV.PROD]: ["app.acuvue.co.nz"],
};
export const configNZ = {
    region: {
        ...defaultRegionConfig,
        countryPhoneCode: "64",
        region: Region.NZL,
        supportTelephone: "0800 450 383",
        supportEmailAddress: "myacuvue@acuvue.co.nz",
        headerMenu: headerNZ,
        footerMenu: footerNZ,
        searchPrefixUrl: "https://acuvue.co.nz/search/site/",
        phoneNumberLength: 10,
        phoneNumberStartsWith: /(^s*(02)[0-9]{8})$|(^s*(2)[0-9]{8})$/,
        legalAge: { minorThreshold: 18, minorThresholdWithGuardian: 18 },
        hasAddressFeature: false,
        googlePlayStoreLink: "https://myacuvue.acuvue.co.nz/BaXx/yklruej9",
        appleAppStoreLink: "https://myacuvue.acuvue.co.nz/BaXx/yklruej9",
        topHeaderLinks: [],
        signOutRedirectUrl: "https://www.acuvue.co.nz",
        canvasHomePageUrl: "https://www.acuvue.co.nz",
        mapDefaultCenter: { latitude: -36.504976, longitude: 174.455378 },
        appPrivileges: [
            {
                iconType: PrivilegeIconType.TICKET_IN_CIRCLE,
                titleKey: "dashboardPage.invitation.appExclusiveOffersTitle",
                bodyKey: "dashboardPage.invitation.appExclusiveOffersBody",
            },
            {
                iconType: PrivilegeIconType.LENSES_IN_CIRCLE,
                titleKey: "dashboardPage.invitation.contactLensesTitle",
                bodyKey: "dashboardPage.invitation.contactLensesBody",
            },
        ],
        opticalStoreAdviceCards: [
            {
                iconType: OpticalStoreIconType.LENSES_CASE_IN_CIRCLE,
                textKey: "dashboardPage.opticalStore.cleaningAndCare",
                link: "https://www.acuvue.co.nz/wear-and-care/contact-lens-cleaning-and-care",
            },
            {
                iconType: OpticalStoreIconType.CHECKLIST_IN_CIRCLE,
                textKey: "dashboardPage.opticalStore.getYourEyeCheckedRegularly",
                link: "https://www.acuvue.co.nz/get-contacts/how-to-get-contacts",
            },
        ],
        membershipBenefitKeysByLadder: {
            normal: [
                "dashboardPage.membershipDetails.benefitsList.pointsWithAcuvueContactLensPurchases",
                "dashboardPage.membershipDetails.benefitsList.redeemRewards",
                "dashboardPage.membershipDetails.benefitsList.exclusiveOffersDeliveredStraightToYou",
            ],
            platinum: [],
        },
        postalCodeLength: 5,
        termsAndConditionUrl: "https://www.acuvue.co.nz/terms-of-use",
    },
    environments: {
        [ENV.LOCAL]: {
            baseUrl: `https://${apiDomains[ENV.LOCAL]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.NZ]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.PREDEV]: {
            baseUrl: `https://${apiDomains[ENV.PREDEV]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.NZ]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.DEV]: {
            baseUrl: `https://${apiDomains[ENV.DEV]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.NZ]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.STAGING]: {
            baseUrl: `https://${apiDomains[ENV.STAGING]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.NZ]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.PROD]: {
            baseUrl: `https://${apiDomains[ENV.PROD]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.NZ]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: false,
        },
    },
};
