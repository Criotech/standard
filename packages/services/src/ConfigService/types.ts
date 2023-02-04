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
	promoEventsIFrameUrl?: string; // used in thailand
	eyeCareCenterIFrameUrl?: string; // used in thailand
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

export type DomainMap = Record<ENV, string[]>;

export enum ENV {
	LOCAL = "LOCAL",
	PREDEV = "PREDEV",
	DEV = "DEV",
	STAGING = "STAGING",
	PROD = "PROD",
}

export enum Environment {
	development = "development",
	staging = "staging",
	production = "production",
}

export const environmentMap: Record<ENV, Environment> = {
	[ENV.LOCAL]: Environment.development,
	[ENV.PREDEV]: Environment.development,
	[ENV.DEV]: Environment.development,
	[ENV.STAGING]: Environment.staging,
	[ENV.PROD]: Environment.production,
};

export enum Region {
	AUS = "AUS",
	TWN = "TWN",
	NZL = "NZL",
	HKG = "HKG",
	THA = "THA",
	MYS = "MYS",
	IND = "IND",
	SGP = "SGP",
}

export enum APIInstance {
	mshp = "mshp",
	scdf = "scdf",
	ngyu = "ngyu",
	afmt = "afmt",
	zulw = "zulw",
	pvaq = "pvaq",
	bkpc = "bkpc",
	yzbn = "yzbn",
}

export enum Instance {
	TH = "mshp",
	AU = "scdf",
	TW = "ngyu",
	HK = "afmt",
	SG = "zulw",
	MY = "pvaq",
	NZ = "bkpc",
	IN = "yzbn",
}

export const instanceRegionMap: Record<Instance, APIInstance> = {
	[Instance.TH]: APIInstance.mshp,
	[Instance.AU]: APIInstance.scdf,
	[Instance.TW]: APIInstance.ngyu,
	[Instance.HK]: APIInstance.afmt,
	[Instance.SG]: APIInstance.zulw,
	[Instance.MY]: APIInstance.pvaq,
	[Instance.NZ]: APIInstance.bkpc,
	[Instance.IN]: APIInstance.yzbn,
};

export const apiDomains: Record<ENV, string> = {
	[ENV.LOCAL]: "jnj-global-test.apigee.net",
	[ENV.PREDEV]: "jnj-global-test.apigee.net",
	[ENV.DEV]: "jnj-global-test.apigee.net",
	[ENV.STAGING]: "jnj-global-staging.apigee.net",
	[ENV.PROD]: "jnj-global-prod.apigee.net",
};

export enum ProfileForm {
	WITH_EMAIL,
	WITH_NO_EMAIL,
}

export enum EditAddressPageType {
	WITH_NO_ADDRESS_LINE_3,
	WITH_NO_CITY_NO_STATE,
	COMPLETE_ADDRESS,
}

export enum AuthenticationType {
	LEGACY,
	XIAM,
	TOKEN_ONLY,
}

export enum RoutesType {
	LEGACY,
	XIAM_FLOW,
	TOKEN_ONLY_FLOW,
}

export enum FontFamilySet {
	English,
	Chinese,
}

export enum SocialNetworkIcons {
	FACEBOOK,
	YOUTUBE,
	INSTAGRAM,
	LINE,
}

export enum PrivilegeIconType {
	TICKET_IN_CIRCLE,
	TRUCK_IN_CIRCLE,
	LENSES_IN_CIRCLE,
	ENVELOPE_IN_CIRCLE,
	CALENDAR_IN_CIRCLE,
	TROPHY_IN_CIRCLE,
}

export enum OpticalStoreIconType {
	LENSES_CASE_IN_CIRCLE,
	CHECKLIST_IN_CIRCLE,
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

export type FrontendType = "WEB:LITE";
