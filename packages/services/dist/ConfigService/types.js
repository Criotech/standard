export var ENV;
(function (ENV) {
    ENV["LOCAL"] = "LOCAL";
    ENV["PREDEV"] = "PREDEV";
    ENV["DEV"] = "DEV";
    ENV["STAGING"] = "STAGING";
    ENV["PROD"] = "PROD";
})(ENV || (ENV = {}));
export var Environment;
(function (Environment) {
    Environment["development"] = "development";
    Environment["staging"] = "staging";
    Environment["production"] = "production";
})(Environment || (Environment = {}));
export const environmentMap = {
    [ENV.LOCAL]: Environment.development,
    [ENV.PREDEV]: Environment.development,
    [ENV.DEV]: Environment.development,
    [ENV.STAGING]: Environment.staging,
    [ENV.PROD]: Environment.production,
};
export var Region;
(function (Region) {
    Region["AUS"] = "AUS";
    Region["TWN"] = "TWN";
    Region["NZL"] = "NZL";
    Region["HKG"] = "HKG";
    Region["THA"] = "THA";
    Region["MYS"] = "MYS";
    Region["IND"] = "IND";
    Region["SGP"] = "SGP";
})(Region || (Region = {}));
export var APIInstance;
(function (APIInstance) {
    APIInstance["mshp"] = "mshp";
    APIInstance["scdf"] = "scdf";
    APIInstance["ngyu"] = "ngyu";
    APIInstance["afmt"] = "afmt";
    APIInstance["zulw"] = "zulw";
    APIInstance["pvaq"] = "pvaq";
    APIInstance["bkpc"] = "bkpc";
    APIInstance["yzbn"] = "yzbn";
})(APIInstance || (APIInstance = {}));
export var Instance;
(function (Instance) {
    Instance["TH"] = "mshp";
    Instance["AU"] = "scdf";
    Instance["TW"] = "ngyu";
    Instance["HK"] = "afmt";
    Instance["SG"] = "zulw";
    Instance["MY"] = "pvaq";
    Instance["NZ"] = "bkpc";
    Instance["IN"] = "yzbn";
})(Instance || (Instance = {}));
export const instanceRegionMap = {
    [Instance.TH]: APIInstance.mshp,
    [Instance.AU]: APIInstance.scdf,
    [Instance.TW]: APIInstance.ngyu,
    [Instance.HK]: APIInstance.afmt,
    [Instance.SG]: APIInstance.zulw,
    [Instance.MY]: APIInstance.pvaq,
    [Instance.NZ]: APIInstance.bkpc,
    [Instance.IN]: APIInstance.yzbn,
};
export const apiDomains = {
    [ENV.LOCAL]: "jnj-global-test.apigee.net",
    [ENV.PREDEV]: "jnj-global-test.apigee.net",
    [ENV.DEV]: "jnj-global-test.apigee.net",
    [ENV.STAGING]: "jnj-global-staging.apigee.net",
    [ENV.PROD]: "jnj-global-prod.apigee.net",
};
export var ProfileForm;
(function (ProfileForm) {
    ProfileForm[ProfileForm["WITH_EMAIL"] = 0] = "WITH_EMAIL";
    ProfileForm[ProfileForm["WITH_NO_EMAIL"] = 1] = "WITH_NO_EMAIL";
})(ProfileForm || (ProfileForm = {}));
export var EditAddressPageType;
(function (EditAddressPageType) {
    EditAddressPageType[EditAddressPageType["WITH_NO_ADDRESS_LINE_3"] = 0] = "WITH_NO_ADDRESS_LINE_3";
    EditAddressPageType[EditAddressPageType["WITH_NO_CITY_NO_STATE"] = 1] = "WITH_NO_CITY_NO_STATE";
    EditAddressPageType[EditAddressPageType["COMPLETE_ADDRESS"] = 2] = "COMPLETE_ADDRESS";
})(EditAddressPageType || (EditAddressPageType = {}));
export var AuthenticationType;
(function (AuthenticationType) {
    AuthenticationType[AuthenticationType["LEGACY"] = 0] = "LEGACY";
    AuthenticationType[AuthenticationType["XIAM"] = 1] = "XIAM";
    AuthenticationType[AuthenticationType["TOKEN_ONLY"] = 2] = "TOKEN_ONLY";
})(AuthenticationType || (AuthenticationType = {}));
export var RoutesType;
(function (RoutesType) {
    RoutesType[RoutesType["LEGACY"] = 0] = "LEGACY";
    RoutesType[RoutesType["XIAM_FLOW"] = 1] = "XIAM_FLOW";
    RoutesType[RoutesType["TOKEN_ONLY_FLOW"] = 2] = "TOKEN_ONLY_FLOW";
})(RoutesType || (RoutesType = {}));
export var FontFamilySet;
(function (FontFamilySet) {
    FontFamilySet[FontFamilySet["English"] = 0] = "English";
    FontFamilySet[FontFamilySet["Chinese"] = 1] = "Chinese";
})(FontFamilySet || (FontFamilySet = {}));
export var SocialNetworkIcons;
(function (SocialNetworkIcons) {
    SocialNetworkIcons[SocialNetworkIcons["FACEBOOK"] = 0] = "FACEBOOK";
    SocialNetworkIcons[SocialNetworkIcons["YOUTUBE"] = 1] = "YOUTUBE";
    SocialNetworkIcons[SocialNetworkIcons["INSTAGRAM"] = 2] = "INSTAGRAM";
    SocialNetworkIcons[SocialNetworkIcons["LINE"] = 3] = "LINE";
})(SocialNetworkIcons || (SocialNetworkIcons = {}));
export var PrivilegeIconType;
(function (PrivilegeIconType) {
    PrivilegeIconType[PrivilegeIconType["TICKET_IN_CIRCLE"] = 0] = "TICKET_IN_CIRCLE";
    PrivilegeIconType[PrivilegeIconType["TRUCK_IN_CIRCLE"] = 1] = "TRUCK_IN_CIRCLE";
    PrivilegeIconType[PrivilegeIconType["LENSES_IN_CIRCLE"] = 2] = "LENSES_IN_CIRCLE";
    PrivilegeIconType[PrivilegeIconType["ENVELOPE_IN_CIRCLE"] = 3] = "ENVELOPE_IN_CIRCLE";
    PrivilegeIconType[PrivilegeIconType["CALENDAR_IN_CIRCLE"] = 4] = "CALENDAR_IN_CIRCLE";
    PrivilegeIconType[PrivilegeIconType["TROPHY_IN_CIRCLE"] = 5] = "TROPHY_IN_CIRCLE";
})(PrivilegeIconType || (PrivilegeIconType = {}));
export var OpticalStoreIconType;
(function (OpticalStoreIconType) {
    OpticalStoreIconType[OpticalStoreIconType["LENSES_CASE_IN_CIRCLE"] = 0] = "LENSES_CASE_IN_CIRCLE";
    OpticalStoreIconType[OpticalStoreIconType["CHECKLIST_IN_CIRCLE"] = 1] = "CHECKLIST_IN_CIRCLE";
})(OpticalStoreIconType || (OpticalStoreIconType = {}));
