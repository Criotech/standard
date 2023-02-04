import { apiDomains, ENV, Instance, instanceRegionMap, AuthenticationType, RoutesType, Region, } from "./types";
import { Language } from "../LanguageService/Language";
import { defaultRegionConfig } from "./globalConfig";
export const domainMapTH = {
    [ENV.LOCAL]: ["localhost:3000"],
    [ENV.PREDEV]: ["predev.app.acuvue.co.th", "localhost:4000"],
    [ENV.DEV]: ["dev.app.acuvue.co.th", "localhost:5000"],
    [ENV.STAGING]: ["stage.app.acuvue.co.th", "localhost:6000"],
    [ENV.PROD]: ["app.acuvue.co.th"],
};
export const configTH = {
    region: {
        ...defaultRegionConfig,
        countryPhoneCode: "66",
        region: Region.THA,
        supportedLanguages: [Language.TH, Language.EN],
        legalAge: { minorThreshold: 10, minorThresholdWithGuardian: 20 },
        forcedDefaultLanguage: Language.TH,
        phoneNumberLength: 9,
        phoneNumberStartsWith: /(^s*([0-9])[0-9]{8})$/,
        authenticationType: AuthenticationType.LEGACY,
        routesType: RoutesType.LEGACY,
        hasMembershipAndWalletBlock: false,
        profileMandatoryFields: [
            "firstName",
            "lastName",
            "birthMonth",
            "birthYear",
            "gender",
            "lensesUsage",
        ],
        deviceTokenRefreshTimeLimitInPercent: -1,
        postalCodeLength: 5,
    },
    environments: {
        [ENV.LOCAL]: {
            baseUrl: `https://${apiDomains[ENV.LOCAL]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.TH]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            lineConfig: {
                liffId: "1656372663-Qqlo3dZB",
                allowFakeLineProvider: true,
            },
            allowDebugRoutes: true,
            promoEventsIFrameUrl: "https://con-apac-acuvue-th-th.jnjapacb15d3-test.jjc-devops.com/app/myacuvue/promo-event",
        },
        [ENV.PREDEV]: {
            baseUrl: `https://${apiDomains[ENV.PREDEV]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.TH]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            lineConfig: {
                liffId: "1656372663-pxor4gna",
                allowFakeLineProvider: true,
            },
            allowDebugRoutes: true,
            promoEventsIFrameUrl: "https://con-apac-acuvue-th-th.jnjapacb15d3-test.jjc-devops.com/app/myacuvue/promo-event",
        },
        [ENV.DEV]: {
            baseUrl: `https://${apiDomains[ENV.DEV]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.TH]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            lineConfig: {
                liffId: "1656372663-pxor4gna",
                allowFakeLineProvider: true,
            },
            allowDebugRoutes: true,
            promoEventsIFrameUrl: "https://con-apac-acuvue-th-th.jnjapacb15d3-test.jjc-devops.com/app/myacuvue/promo-event",
        },
        [ENV.STAGING]: {
            baseUrl: `https://${apiDomains[ENV.STAGING]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.TH]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            lineConfig: {
                liffId: "1656372679-yEZoKJMg",
                allowFakeLineProvider: true,
            },
            allowDebugRoutes: true,
            promoEventsIFrameUrl: "https://con-apac-acuvue-th-th.jnjapacb15d3-test.jjc-devops.com/app/myacuvue/promo-event",
        },
        [ENV.PROD]: {
            baseUrl: `https://${apiDomains[ENV.PROD]}/v2/myacuvue/experience/consumer/${instanceRegionMap[Instance.TH]}/`,
            googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
            lineConfig: {
                liffId: "1623656955-P55Xd2M1",
            },
            allowDebugRoutes: false,
            promoEventsIFrameUrl: "https://acuvue.co.th/app/myacuvue/promo-event",
        },
    },
};
