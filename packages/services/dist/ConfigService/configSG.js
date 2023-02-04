import { apiDomains, ENV, Instance, instanceRegionMap, OpticalStoreIconType, PrivilegeIconType, EditAddressPageType, Region, } from "./types";
import { defaultRegionConfig } from "./globalConfig";
import { headerSG } from "./header/headerSG";
import { footerSG } from "./footer/footerSG";
import { socialNetworksSG } from "./footer/socialNetworksSG";
export const domainMapSG = {
    [ENV.LOCAL]: ["localhost:3004"],
    [ENV.PREDEV]: ["predev.app.acuvue.com.sg", "localhost:4004"],
    [ENV.DEV]: ["dev.app.acuvue.com.sg", "localhost:5004"],
    [ENV.STAGING]: ["stage.app.acuvue.com.sg", "localhost:6004"],
    [ENV.PROD]: ["app.acuvue.com.sg"],
};
export const configSG = {
    region: {
        ...defaultRegionConfig,
        countryPhoneCode: "65",
        region: Region.SGP,
        phoneNumberLength: 8,
        phoneNumberStartsWith: /(^s*([8-9])[0-9]{7})$/,
        headerMenu: headerSG,
        footerMenu: footerSG,
        socialNetworks: socialNetworksSG,
        legalAge: { minorThreshold: 13, minorThresholdWithGuardian: 17 },
        topHeaderLinks: [
            {
                label: "myacuvueLiteHeader.topHeaderSection.frequentlyAskedQuestions",
                url: "https://www.acuvue.com.sg/frequently-asked-questions",
            },
            {
                label: "myacuvueLiteHeader.topHeaderSection.myAcuvueMemberProgram",
                url: "https://www.acuvue.com.sg/myacuvue",
            },
        ],
        opticalStoreAdviceCards: [
            {
                iconType: OpticalStoreIconType.LENSES_CASE_IN_CIRCLE,
                textKey: "dashboardPage.opticalStore.cleaningAndCare",
                link: "https://www.acuvue.com.sg/wear-and-care/contact-lens-cleaning-and-care",
            },
            {
                iconType: OpticalStoreIconType.CHECKLIST_IN_CIRCLE,
                textKey: "dashboardPage.opticalStore.getYourEyeCheckedRegularly",
                link: "https://www.acuvue.com.sg/wear-and-care/new-wearer-guide",
            },
        ],
        mapDefaultCenter: { latitude: 1.304833, longitude: 103.831833 },
        membershipBenefitKeysByLadder: {
            normal: [
                "dashboardPage.membershipDetails.benefitsList.pointsWithAcuvueContactLensPurchases",
                "dashboardPage.membershipDetails.benefitsList.redeemRewards",
                "dashboardPage.membershipDetails.benefitsList.exclusiveOffersDeliveredStraightToYou",
            ],
            platinum: [
                "dashboardPage.membershipDetails.benefitsList.pointsWithAcuvueContactLensPurchases",
                "dashboardPage.membershipDetails.benefitsList.redeemRewards",
                "dashboardPage.membershipDetails.benefitsList.exclusiveOffersDeliveredStraightToYou",
            ],
        },
        appPrivileges: [
            {
                iconType: PrivilegeIconType.TICKET_IN_CIRCLE,
                titleKey: "dashboardPage.invitation.appExclusiveOffersTitle",
                bodyKey: "dashboardPage.invitation.appExclusiveOffersBody",
            },
            {
                iconType: PrivilegeIconType.CALENDAR_IN_CIRCLE,
                titleKey: "dashboardPage.invitation.itsEasyTitle",
                bodyKey: "dashboardPage.invitation.itsEasyBody",
            },
            {
                iconType: PrivilegeIconType.ENVELOPE_IN_CIRCLE,
                titleKey: "dashboardPage.invitation.contactLensesTitle",
                bodyKey: "dashboardPage.invitation.contactLensesBody",
            },
            {
                iconType: PrivilegeIconType.TROPHY_IN_CIRCLE,
                titleKey: "dashboardPage.invitation.exclusiveGamesTitle",
                bodyKey: "dashboardPage.invitation.exclusiveGamesBody",
            },
        ],
        googlePlayStoreLink: "https://myacuvue.acuvue.com.sg/BaXx/ri6oxg9y",
        appleAppStoreLink: "https://myacuvue.acuvue.com.sg/BaXx/ri6oxg9y",
        hasConsentInCompleteYourProfile: true,
        isMembershipStatusVisible: true,
        supportEmailAddress: "myacuvue@acuvue.com.sg",
        supportTelephone: "6747 1131",
        editAddressPageType: EditAddressPageType.WITH_NO_CITY_NO_STATE,
        signOutRedirectUrl: "https://www.acuvue.com.sg",
        canvasHomePageUrl: "https://www.acuvue.com.sg",
        hasNonBinaryGenderOption: false,
        postalCodeLength: 6,
        termsAndConditionUrl: "https://www.acuvue.com.sg/legal-notice",
    },
    environments: {
        [ENV.LOCAL]: {
            baseUrl: `https://${apiDomains[ENV.LOCAL]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.SG]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.PREDEV]: {
            baseUrl: `https://${apiDomains[ENV.PREDEV]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.SG]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.DEV]: {
            baseUrl: `https://${apiDomains[ENV.DEV]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.SG]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.STAGING]: {
            baseUrl: `https://${apiDomains[ENV.STAGING]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.SG]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.PROD]: {
            baseUrl: `https://${apiDomains[ENV.PROD]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.SG]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: false,
        },
    },
};
