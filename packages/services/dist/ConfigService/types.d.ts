import { Language } from "../LanguageService/Language";
import { IHeaderMenuItem, ITopHeaderLinks } from "./header/types";
import { IFooterLinkItem, ISocialNetwork } from "./footer/types";
import { TranslationKey } from "../LanguageService/types";
import { Ladder } from "../PointsService/Ladder";
import { IProfile } from "../UserService/IProfile";
export interface IGlobalConfig {
    tracking: {
        dataLayerName: string;
        gtmId: string;
    };
    domainInstanceEnvMap: Record<Region, Record<ENV, string>>;
}
export interface IConfig {
    baseUrl: string;
    googleMapsApiKey: string;
    allowDebugRoutes: boolean;
    lineConfig?: {
        liffId: string;
        allowFakeLineProvider?: boolean;
    };
    promoEventsIFrameUrl?: string;
    eyeCareCenterIFrameUrl?: string;
}
export interface IRegionConfig {
    countryPhoneCode: string;
    supportedLanguages: Language[];
    region: Region;
    legalAge: ILegalAge;
    forcedDefaultLanguage?: Language;
    phoneNumberLength: number;
    phoneNumberStartsWith: RegExp;
    isChangeStoreAllowed: boolean;
    hasGoToHomeInRegisteredStore: boolean;
    canvasPageUrl: string;
    profileFormType: ProfileForm;
    editAddressPageType: EditAddressPageType;
    authenticationType: AuthenticationType;
    routesType: RoutesType;
    headerMenu: IHeaderMenuItem[];
    footerMenu: IFooterLinkItem[];
    hasSignIn: boolean;
    searchPrefixUrl: string;
    topHeaderLinks: ITopHeaderLinks[];
    fontFamilySet: FontFamilySet;
    socialNetworks: ISocialNetwork[];
    canvasHomePageUrl: string;
    hasProfileDetailsMenu: boolean;
    mapDefaultCenter: Coordinates;
    changeOpticalStoreDialogExtraLines: TranslationKey[];
    appPrivileges: IAppPrivilege[];
    googlePlayStoreLink: string;
    appleAppStoreLink: string;
    isMembershipStatusVisible: boolean;
    membershipBenefitKeysByLadder: Record<Ladder, TranslationKey[]>;
    supportEmailAddress: string;
    supportTelephone: string;
    opticalStoreAdviceCards: IOpticalStoreAdviceCard[];
    signOutRedirectUrl: string;
    hasDisclaimerText: boolean;
    hasMembershipAndWalletBlock: boolean;
    hasPromocodeAndFeedbackBlock: boolean;
    hasAddressFeature: boolean;
    hasConsentInCompleteYourProfile: boolean;
    profileMandatoryFields: (keyof IProfile)[];
    deviceTokenRefreshTimeLimitInPercent: number;
    hasLineNotification: boolean;
    hasAdditionalInformationInSocialMedia?: boolean;
    hasNonBinaryGenderOption: boolean;
    featureSwitchUrl: string;
    postalCodeLength: number;
    termsAndConditionUrl: string;
}
export interface Coordinates {
    latitude: number;
    longitude: number;
}
export interface IFullRegionConfig {
    region: IRegionConfig;
    environments: Record<ENV, IConfig>;
}
export interface ILegalAge {
    minorThreshold: number;
    minorThresholdWithGuardian: number;
}
export declare type DomainMap = Record<ENV, string[]>;
export declare enum ENV {
    LOCAL = "LOCAL",
    PREDEV = "PREDEV",
    DEV = "DEV",
    STAGING = "STAGING",
    PROD = "PROD"
}
export declare enum Environment {
    development = "development",
    staging = "staging",
    production = "production"
}
export declare const environmentMap: Record<ENV, Environment>;
export declare enum Region {
    AUS = "AUS",
    TWN = "TWN",
    NZL = "NZL",
    HKG = "HKG",
    THA = "THA",
    MYS = "MYS",
    IND = "IND",
    SGP = "SGP"
}
export declare enum APIInstance {
    mshp = "mshp",
    scdf = "scdf",
    ngyu = "ngyu",
    afmt = "afmt",
    zulw = "zulw",
    pvaq = "pvaq",
    bkpc = "bkpc",
    yzbn = "yzbn"
}
export declare enum Instance {
    TH = "mshp",
    AU = "scdf",
    TW = "ngyu",
    HK = "afmt",
    SG = "zulw",
    MY = "pvaq",
    NZ = "bkpc",
    IN = "yzbn"
}
export declare const instanceRegionMap: Record<Instance, APIInstance>;
export declare const apiDomains: Record<ENV, string>;
export declare enum ProfileForm {
    WITH_EMAIL = 0,
    WITH_NO_EMAIL = 1
}
export declare enum EditAddressPageType {
    WITH_NO_ADDRESS_LINE_3 = 0,
    WITH_NO_CITY_NO_STATE = 1,
    COMPLETE_ADDRESS = 2
}
export declare enum AuthenticationType {
    LEGACY = 0,
    XIAM = 1,
    TOKEN_ONLY = 2
}
export declare enum RoutesType {
    LEGACY = 0,
    XIAM_FLOW = 1,
    TOKEN_ONLY_FLOW = 2
}
export declare enum FontFamilySet {
    English = 0,
    Chinese = 1
}
export declare enum SocialNetworkIcons {
    FACEBOOK = 0,
    YOUTUBE = 1,
    INSTAGRAM = 2,
    LINE = 3
}
export declare enum PrivilegeIconType {
    TICKET_IN_CIRCLE = 0,
    TRUCK_IN_CIRCLE = 1,
    LENSES_IN_CIRCLE = 2,
    ENVELOPE_IN_CIRCLE = 3,
    CALENDAR_IN_CIRCLE = 4,
    TROPHY_IN_CIRCLE = 5
}
export declare enum OpticalStoreIconType {
    LENSES_CASE_IN_CIRCLE = 0,
    CHECKLIST_IN_CIRCLE = 1
}
interface IAppPrivilege {
    iconType: PrivilegeIconType;
    titleKey: TranslationKey;
    bodyKey: TranslationKey;
}
interface IOpticalStoreAdviceCard {
    iconType: OpticalStoreIconType;
    textKey: TranslationKey;
    link: string;
}
export declare type FrontendType = "WEB:LITE";
export {};
