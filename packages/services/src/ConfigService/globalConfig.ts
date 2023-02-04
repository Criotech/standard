import { Language } from "../LanguageService/Language";
import {
	IRegionConfig,
	AuthenticationType,
	FontFamilySet,
	ProfileForm,
	RoutesType,
	IGlobalConfig,
	EditAddressPageType,
	ENV,
	Region,
	apiDomains,
} from "./types";

const domainInstanceEnvMap: Record<Region, Record<ENV, string>> = {
	[Region.AUS]: {
		[ENV.LOCAL]: "https://localhost:3001",
		[ENV.DEV]: "https://dev.app.acuvue.com.au",
		[ENV.PREDEV]: "https://predev.app.acuvue.com.au",
		[ENV.STAGING]: "https://stage.app.acuvue.com.au",
		[ENV.PROD]: "https://app.acuvue.com.au",
	},
	[Region.HKG]: {
		[ENV.LOCAL]: "https://localhost:3003",
		[ENV.DEV]: "https://dev.app.acuvue.com.hk",
		[ENV.PREDEV]: "https://predev.app.acuvue.com.hk",
		[ENV.STAGING]: "https://stage.app.acuvue.com.hk",
		[ENV.PROD]: "https://app.acuvue.com.hk",
	},
	[Region.IND]: {
		[ENV.LOCAL]: "https://localhost:3007",
		[ENV.DEV]: "https://dev.app.acuvue.co.in",
		[ENV.PREDEV]: "https://predev.app.acuvue.co.in",
		[ENV.STAGING]: "https://stage.app.acuvue.co.in",
		[ENV.PROD]: "https://app.acuvue.co.in",
	},
	[Region.MYS]: {
		[ENV.LOCAL]: "https://localhost:3005",
		[ENV.DEV]: "https://dev.app.acuvue.com.my",
		[ENV.PREDEV]: "https://predev.app.acuvue.com.my",
		[ENV.STAGING]: "https://stage.app.acuvue.com.my",
		[ENV.PROD]: "https://app.acuvue.com.my",
	},
	[Region.NZL]: {
		[ENV.LOCAL]: "https://localhost:3006",
		[ENV.DEV]: "https://dev.app.acuvue.co.nz",
		[ENV.PREDEV]: "https://predev.app.acuvue.co.nz",
		[ENV.STAGING]: "https://stage.app.acuvue.co.nz",
		[ENV.PROD]: "https://app.acuvue.co.nz",
	},
	[Region.SGP]: {
		[ENV.LOCAL]: "https://localhost:3004",
		[ENV.DEV]: "https://dev.app.acuvue.com.sg",
		[ENV.PREDEV]: "https://predev.app.acuvue.com.sg",
		[ENV.STAGING]: "https://stage.app.acuvue.com.s",
		[ENV.PROD]: "https://app.acuvue.com.sg",
	},
	[Region.TWN]: {
		[ENV.LOCAL]: "https://localhost:3002",
		[ENV.DEV]: "https://dev.app.acuvue.com.tw",
		[ENV.PREDEV]: "https://predev.app.acuvue.com.tw",
		[ENV.STAGING]: "https://stage.app.acuvue.com.tw",
		[ENV.PROD]: "https://app.acuvue.com.tw",
	},
	[Region.THA]: {
		[ENV.LOCAL]: "https://localhost:3000",
		[ENV.DEV]: "https://dev.app.acuvue.co.th",
		[ENV.PREDEV]: "https://predev.app.acuvue.co.th",
		[ENV.STAGING]: "https://stage.app.acuvue.co.th",
		[ENV.PROD]: "https://app.acuvue.co.th",
	},
};

export const globalConfig: IGlobalConfig = {
	tracking: {
		dataLayerName: "dataLayer",
		gtmId: "GTM-KBJZV5C",
	},
	domainInstanceEnvMap,
};

type RegionIntrinsicConfigKeys = "countryPhoneCode" | "region";

export const defaultRegionConfig: Omit<
	IRegionConfig,
	RegionIntrinsicConfigKeys
> = {
	supportedLanguages: [Language.EN],
	legalAge: { minorThreshold: 0, minorThresholdWithGuardian: 0 },
	phoneNumberLength: 0,
	phoneNumberStartsWith: /^([0-9])/,
	isChangeStoreAllowed: true,
	hasGoToHomeInRegisteredStore: false,
	canvasPageUrl: "",
	profileFormType: ProfileForm.WITH_NO_EMAIL,
	editAddressPageType: EditAddressPageType.WITH_NO_ADDRESS_LINE_3,
	authenticationType: AuthenticationType.XIAM,
	routesType: RoutesType.XIAM_FLOW,
	headerMenu: [],
	footerMenu: [],
	hasSignIn: true,
	searchPrefixUrl: "",
	topHeaderLinks: [],
	fontFamilySet: FontFamilySet.English,
	socialNetworks: [],
	canvasHomePageUrl: "",
	signOutRedirectUrl: "/",
	hasProfileDetailsMenu: true,
	mapDefaultCenter: { latitude: 0, longitude: 0 },
	changeOpticalStoreDialogExtraLines: [],
	appPrivileges: [],
	googlePlayStoreLink: "",
	appleAppStoreLink: "",
	isMembershipStatusVisible: false,
	membershipBenefitKeysByLadder: {
		normal: [],
		platinum: [],
	},
	supportEmailAddress: "",
	supportTelephone: "",
	opticalStoreAdviceCards: [],
	hasDisclaimerText: false,
	hasMembershipAndWalletBlock: true,
	hasPromocodeAndFeedbackBlock: false,
	hasAddressFeature: true,
	hasConsentInCompleteYourProfile: false,
	profileMandatoryFields: [
		"firstName",
		"lastName",
		"birthMonth",
		"birthYear",
		"gender",
		"isSpectaclesWearer",
		"lensesUsage",
	],
	deviceTokenRefreshTimeLimitInPercent: 0.8,
	hasLineNotification: false,
	hasNonBinaryGenderOption: true,
	featureSwitchUrl: `https://${
		apiDomains[ENV.PROD]
	}/v1/myacuvue/feature-switch`,
	postalCodeLength: 0,
	termsAndConditionUrl: "",
};
