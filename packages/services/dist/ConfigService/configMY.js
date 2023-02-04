import { apiDomains, ENV, Instance, instanceRegionMap, PrivilegeIconType, OpticalStoreIconType, EditAddressPageType, Region, } from "./types";
import { defaultRegionConfig } from "./globalConfig";
import { headerMY } from "./header/headerMY";
import { footerMY } from "./footer/footerMY";
import { socialNetworksMY } from "./footer/socialNetworksMY";
export const domainMapMY = {
    [ENV.LOCAL]: ["localhost:3005"],
    [ENV.PREDEV]: ["predev.app.acuvue.com.my", "localhost:4005"],
    [ENV.DEV]: ["dev.app.acuvue.com.my", "localhost:5005"],
    [ENV.STAGING]: ["stage.app.acuvue.com.my", "localhost:6005"],
    [ENV.PROD]: ["app.acuvue.com.my"],
};
export const configMY = {
    region: {
        ...defaultRegionConfig,
        countryPhoneCode: "60",
        region: Region.MYS,
        legalAge: { minorThreshold: 13, minorThresholdWithGuardian: 17 },
        isMembershipStatusVisible: true,
        headerMenu: headerMY,
        footerMenu: footerMY,
        socialNetworks: socialNetworksMY,
        searchPrefixUrl: "https://www.acuvue.com.my/search/site/",
        membershipBenefitKeysByLadder: {
            normal: [
                "dashboardPage.membershipDetails.benefitsList.pointsEarning",
                "dashboardPage.membershipDetails.benefitsList.exchangePointsWithAcuvueVouchers",
                "dashboardPage.membershipDetails.benefitsList.enjoyOnBirthDayMonth",
                "dashboardPage.membershipDetails.benefitsList.exclusiveOffers",
            ],
            platinum: [],
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
                titleKey: "dashboardPage.invitation.contactLensTipsTitle",
                bodyKey: "dashboardPage.invitation.contactLensTipsBody",
            },
        ],
        phoneNumberLength: 11,
        phoneNumberStartsWith: /(^s*(011)[0-9]{8})$|(^s*(01)[0-9]{8})$|(^s*(11)[0-9]{8})$|(^s*(1)[0-9]{8})$/,
        hasConsentInCompleteYourProfile: true,
        mapDefaultCenter: { latitude: 3.0701, longitude: 101.6102 },
        googlePlayStoreLink: "https://myacuvue.acuvue.com.my/BaXx/frakq3zh",
        appleAppStoreLink: "https://myacuvue.acuvue.com.my/BaXx/frakq3zh",
        opticalStoreAdviceCards: [
            {
                iconType: OpticalStoreIconType.LENSES_CASE_IN_CIRCLE,
                textKey: "dashboardPage.opticalStore.cleaningAndCare",
                link: "https://www.acuvue.com.my/wear-and-care/contact-lens-cleaning-and-care ",
            },
            {
                iconType: OpticalStoreIconType.CHECKLIST_IN_CIRCLE,
                textKey: "dashboardPage.opticalStore.getYourEyeCheckedRegularly",
                link: "https://www.acuvue.com.my/wear-and-care/new-wearer-guide",
            },
        ],
        editAddressPageType: EditAddressPageType.COMPLETE_ADDRESS,
        topHeaderLinks: [
            {
                label: "myacuvueLiteHeader.topHeaderSection.frequentlyAskedQuestions",
                url: "https://www.acuvue.com.my/frequently-asked-questions",
            },
            {
                label: "myacuvueLiteHeader.topHeaderSection.myAcuvue",
                url: "https://www.acuvue.com.my/myacuvue",
            },
        ],
        supportEmailAddress: "my.myacuvue@its.jnj.com",
        supportTelephone: "1 800 812 482",
        hasAdditionalInformationInSocialMedia: true,
        canvasHomePageUrl: "https://www.acuvue.com.my",
        signOutRedirectUrl: "https://www.acuvue.com.my",
        hasNonBinaryGenderOption: false,
        postalCodeLength: 5,
        termsAndConditionUrl: "https://www.acuvue.com.my/legal-notice",
    },
    environments: {
        [ENV.LOCAL]: {
            baseUrl: `https://${apiDomains[ENV.LOCAL]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.MY]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.PREDEV]: {
            baseUrl: `https://${apiDomains[ENV.PREDEV]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.MY]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.DEV]: {
            baseUrl: `https://${apiDomains[ENV.DEV]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.MY]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.STAGING]: {
            baseUrl: `https://${apiDomains[ENV.STAGING]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.MY]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: true,
        },
        [ENV.PROD]: {
            baseUrl: `https://${apiDomains[ENV.PROD]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.MY]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            allowDebugRoutes: false,
        },
    },
};
