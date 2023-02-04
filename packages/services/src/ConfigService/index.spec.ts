import {
	Instance,
	ENV,
	RoutesType,
	AuthenticationType,
	EditAddressPageType,
	PrivilegeIconType,
	FontFamilySet,
	getConfig,
	getCurrentInstanceEnv,
} from "./index";
import WindowService from "../WindowService";
import { Language } from "../LanguageService/Language";
import {
	IConfig,
	IRegionConfig,
	IGlobalConfig,
	ProfileForm,
	OpticalStoreIconType,
	Environment,
	Region,
} from "./types";
import { mocked } from "ts-jest/utils";
import { PrivateConfig } from "./PrivateConfig";
import { headerAU } from "./header/headerAU";
import { headerIN } from "./header/headerIN";
import { headerHK } from "./header/headerHK";
import { headerTW } from "./header/headerTW";
import { headerSG } from "./header/headerSG";
import { headerMY } from "./header/headerMY";
import { headerNZ } from "./header/headerNZ";
import { footerAU } from "./footer/footerAU";
import { footerIN } from "./footer/footerIN";
import { footerHK } from "./footer/footerHK";
import { footerTW } from "./footer/footerTW";
import { footerSG } from "./footer/footerSG";
import { footerMY } from "./footer/footerMY";
import { footerNZ } from "./footer/footerNZ";
import { socialNetworksAU } from "./footer/socialNetworksAU";
import { socialNetworksIN } from "./footer/socialNetworksIN";
import { socialNetworksHK } from "./footer/socialNetworksHK";
import { socialNetworksTW } from "./footer/socialNetworksTW";
import { socialNetworksSG } from "./footer/socialNetworksSG";
import { socialNetworksMY } from "./footer/socialNetworksMY";

const { getHost, getLanguage } = WindowService;

jest.mock("../WindowService", () => {
	return {
		getHost: jest.fn(),
		getLanguage: jest.fn(),
	};
});

describe("getConfig", () => {
	const globalConfig: IGlobalConfig = {
		tracking: {
			gtmId: expect.any(String),
			dataLayerName: expect.any(String),
		},
		domainInstanceEnvMap: {
			AUS: {
				LOCAL: "https://localhost:3001",
				DEV: "https://dev.app.acuvue.com.au",
				PREDEV: "https://predev.app.acuvue.com.au",
				STAGING: "https://stage.app.acuvue.com.au",
				PROD: "https://app.acuvue.com.au",
			},
			HKG: {
				LOCAL: "https://localhost:3003",
				DEV: "https://dev.app.acuvue.com.hk",
				PREDEV: "https://predev.app.acuvue.com.hk",
				STAGING: "https://stage.app.acuvue.com.hk",
				PROD: "https://app.acuvue.com.hk",
			},
			IND: {
				LOCAL: "https://localhost:3007",
				DEV: "https://dev.app.acuvue.co.in",
				PREDEV: "https://predev.app.acuvue.co.in",
				STAGING: "https://stage.app.acuvue.co.in",
				PROD: "https://app.acuvue.co.in",
			},
			MYS: {
				LOCAL: "https://localhost:3005",
				DEV: "https://dev.app.acuvue.com.my",
				PREDEV: "https://predev.app.acuvue.com.my",
				STAGING: "https://stage.app.acuvue.com.my",
				PROD: "https://app.acuvue.com.my",
			},
			NZL: {
				LOCAL: "https://localhost:3006",
				DEV: "https://dev.app.acuvue.co.nz",
				PREDEV: "https://predev.app.acuvue.co.nz",
				STAGING: "https://stage.app.acuvue.co.nz",
				PROD: "https://app.acuvue.co.nz",
			},
			SGP: {
				LOCAL: "https://localhost:3004",
				DEV: "https://dev.app.acuvue.com.sg",
				PREDEV: "https://predev.app.acuvue.com.sg",
				STAGING: "https://stage.app.acuvue.com.s",
				PROD: "https://app.acuvue.com.sg",
			},
			TWN: {
				LOCAL: "https://localhost:3002",
				DEV: "https://dev.app.acuvue.com.tw",
				PREDEV: "https://predev.app.acuvue.com.tw",
				STAGING: "https://stage.app.acuvue.com.tw",
				PROD: "https://app.acuvue.com.tw",
			},
			THA: {
				LOCAL: "https://localhost:3000",
				DEV: "https://dev.app.acuvue.co.th",
				PREDEV: "https://predev.app.acuvue.co.th",
				STAGING: "https://stage.app.acuvue.co.th",
				PROD: "https://app.acuvue.co.th",
			},
		},
	};
	const regionConfigTH: IRegionConfig = {
		region: Region.THA,
		fontFamilySet: FontFamilySet.English,
		forcedDefaultLanguage: Language.TH,
		supportedLanguages: [Language.TH, Language.EN],
		countryPhoneCode: "66",
		phoneNumberLength: 9,
		phoneNumberStartsWith: /(^s*([0-9])[0-9]{8})$/,
		legalAge: { minorThreshold: 10, minorThresholdWithGuardian: 20 },
		routesType: RoutesType.LEGACY,
		authenticationType: AuthenticationType.LEGACY,
		profileFormType: ProfileForm.WITH_NO_EMAIL,
		editAddressPageType: EditAddressPageType.WITH_NO_ADDRESS_LINE_3,
		topHeaderLinks: [],
		headerMenu: [],
		canvasPageUrl: "",
		canvasHomePageUrl: "",
		signOutRedirectUrl: "/",
		searchPrefixUrl: "",
		hasSignIn: true,
		hasGoToHomeInRegisteredStore: false,
		mapDefaultCenter: { latitude: 0, longitude: 0 },
		isChangeStoreAllowed: true,
		hasProfileDetailsMenu: true,
		changeOpticalStoreDialogExtraLines: [],
		appPrivileges: [],
		googlePlayStoreLink: "",
		appleAppStoreLink: "",
		isMembershipStatusVisible: false,
		membershipBenefitKeysByLadder: {
			normal: [],
			platinum: [],
		},
		opticalStoreAdviceCards: [],
		supportEmailAddress: "",
		supportTelephone: "",
		footerMenu: [],
		socialNetworks: [],
		hasDisclaimerText: false,
		hasMembershipAndWalletBlock: false,
		hasPromocodeAndFeedbackBlock: false,
		hasAddressFeature: true,
		hasConsentInCompleteYourProfile: false,
		profileMandatoryFields: [
			"firstName",
			"lastName",
			"birthMonth",
			"birthYear",
			"gender",
			"lensesUsage",
		],
		deviceTokenRefreshTimeLimitInPercent: -1,
		hasLineNotification: false,
		hasNonBinaryGenderOption: true,
		featureSwitchUrl:
			"https://jnj-global-prod.apigee.net/v1/myacuvue/feature-switch",
		postalCodeLength: 5,
		termsAndConditionUrl: "",
	};

	const regionConfigAU: IRegionConfig = {
		region: Region.AUS,
		fontFamilySet: FontFamilySet.English,
		supportedLanguages: [Language.EN],
		countryPhoneCode: "61",
		phoneNumberLength: 10,
		phoneNumberStartsWith: /(^s*(04)[0-9]{8})$|(^s*(4)[0-9]{8})$/,
		legalAge: { minorThreshold: 16, minorThresholdWithGuardian: 18 },
		routesType: RoutesType.XIAM_FLOW,
		authenticationType: AuthenticationType.XIAM,
		profileFormType: ProfileForm.WITH_NO_EMAIL,
		editAddressPageType: EditAddressPageType.WITH_NO_ADDRESS_LINE_3,
		topHeaderLinks: [
			{
				label: "myacuvueLiteHeader.topHeaderSection.frequentlyAskedQuestions",
				url: "https://www.acuvue.com.au/questions",
			},
			{
				label: "myacuvueLiteHeader.topHeaderSection.myAcuvueMemberProgram",
				url: "https://www.acuvue.com.au/myacuvue",
			},
		],
		headerMenu: headerAU,
		canvasPageUrl: "",
		canvasHomePageUrl: "https://www.acuvue.com.au",
		searchPrefixUrl: "https://www.acuvue.com.au/search/site/",
		hasSignIn: true,
		hasGoToHomeInRegisteredStore: false,
		mapDefaultCenter: { latitude: -33.52426, longitude: 151.122635 },
		isChangeStoreAllowed: true,
		hasProfileDetailsMenu: true,
		changeOpticalStoreDialogExtraLines: [
			"dashboardPage.opticalStore.changeOpticalStoreDialogPhone",
			"dashboardPage.opticalStore.changeOpticalStoreDialogEmail",
		],
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
		],
		googlePlayStoreLink: "https://myacuvue.acuvue.com.au/BaXx/5284f606",
		appleAppStoreLink: "https://myacuvue.acuvue.com.au/BaXx/5284f606",
		isMembershipStatusVisible: false,
		membershipBenefitKeysByLadder: {
			normal: [
				"dashboardPage.membershipDetails.benefitsList.pointsWithAcuvueContactLensPurchases",
				"dashboardPage.membershipDetails.benefitsList.redeemRewards",
				"dashboardPage.membershipDetails.benefitsList.exclusiveOffersDeliveredStraightToYou",
			],
			platinum: [],
		},
		opticalStoreAdviceCards: [
			{
				iconType: 0,
				link: "https://www.acuvue.com.au/wear-and-care/contact-lens-cleaning-and-care",
				textKey: "dashboardPage.opticalStore.cleaningAndCare",
			},
			{
				iconType: 1,
				link: "https://www.acuvue.com.au/get-contacts/how-to-get-contacts",
				textKey:
					"dashboardPage.opticalStore.getYourEyeCheckedRegularly",
			},
		],
		supportEmailAddress: "myacuvue@acuvue.com.au",
		supportTelephone: "1800 943 463",
		footerMenu: footerAU,
		socialNetworks: socialNetworksAU,
		signOutRedirectUrl: "https://www.acuvue.com.au",
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
		featureSwitchUrl:
			"https://jnj-global-prod.apigee.net/v1/myacuvue/feature-switch",
		postalCodeLength: 5,
		termsAndConditionUrl: "https://www.acuvue.com.au/myacuvueterms",
	};

	const regionConfigIN: IRegionConfig = {
		region: Region.IND,
		fontFamilySet: FontFamilySet.English,
		supportedLanguages: [Language.EN],
		countryPhoneCode: "91",
		phoneNumberLength: 10,
		phoneNumberStartsWith: /(^s*([6-9])[0-9]{9})$/,
		legalAge: { minorThreshold: 18, minorThresholdWithGuardian: 0 },
		routesType: RoutesType.TOKEN_ONLY_FLOW,
		authenticationType: AuthenticationType.TOKEN_ONLY,
		profileFormType: ProfileForm.WITH_EMAIL,
		editAddressPageType: EditAddressPageType.WITH_NO_ADDRESS_LINE_3,
		topHeaderLinks: [
			{
				label: "myacuvueLiteHeader.topHeaderSection.importantSafetyInformation",
				url: "https://www.acuvue.co.in/important-safety-information",
			},
		],
		headerMenu: headerIN,
		canvasPageUrl: "https://www.acuvue.co.in/",
		canvasHomePageUrl: "https://www.acuvue.co.in",
		signOutRedirectUrl: "/",
		searchPrefixUrl: "https://www.acuvue.co.in/search/site/",
		hasSignIn: false,
		hasGoToHomeInRegisteredStore: true,
		mapDefaultCenter: { latitude: 19.076, longitude: 72.8777 },
		isChangeStoreAllowed: false,
		hasProfileDetailsMenu: false,
		changeOpticalStoreDialogExtraLines: [],
		appPrivileges: [],
		googlePlayStoreLink: "",
		appleAppStoreLink: "",
		isMembershipStatusVisible: false,
		membershipBenefitKeysByLadder: {
			normal: [],
			platinum: [],
		},
		opticalStoreAdviceCards: [],
		supportEmailAddress: "",
		supportTelephone: "",
		footerMenu: footerIN,
		socialNetworks: socialNetworksIN,
		hasDisclaimerText: false,
		hasMembershipAndWalletBlock: false,
		hasPromocodeAndFeedbackBlock: true,
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
		featureSwitchUrl:
			"https://jnj-global-prod.apigee.net/v1/myacuvue/feature-switch",
		postalCodeLength: 0,
		termsAndConditionUrl: "https://acuvue.co.in/myacuvue-terms-conditions",
	};

	const regionConfigHK: IRegionConfig = {
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
		supportTelephone: "25881100",
		searchPrefixUrl: "https://www.acuvue.com.hk/search/site/",
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
		routesType: RoutesType.XIAM_FLOW,
		authenticationType: AuthenticationType.XIAM,
		profileFormType: ProfileForm.WITH_NO_EMAIL,
		editAddressPageType: EditAddressPageType.WITH_NO_ADDRESS_LINE_3,
		canvasPageUrl: "",
		hasSignIn: true,
		hasGoToHomeInRegisteredStore: false,
		mapDefaultCenter: { latitude: 22.3193628, longitude: 114.1589007 },
		isChangeStoreAllowed: true,
		hasProfileDetailsMenu: true,
		changeOpticalStoreDialogExtraLines: [],
		appPrivileges: [
			{
				iconType: PrivilegeIconType.TRUCK_IN_CIRCLE,
				titleKey:
					"dashboardPage.invitation.oneStopOrderingServiceTitle",
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
		googlePlayStoreLink: "https://myacuvue.acuvue.com.hk/BaXx/jcimd316",
		appleAppStoreLink: "https://myacuvue.acuvue.com.hk/BaXx/jcimd316",
		isMembershipStatusVisible: false,
		membershipBenefitKeysByLadder: {
			normal: [
				"dashboardPage.membershipDetails.benefitsList.pointsWithAcuvueContactLensPurchases",
				"dashboardPage.membershipDetails.benefitsList.redeemRewards",
			],
			platinum: [],
		},
		opticalStoreAdviceCards: [
			{
				iconType: OpticalStoreIconType.LENSES_CASE_IN_CIRCLE,
				textKey: "dashboardPage.opticalStore.cleaningAndCare",
				link: "https://www.acuvue.com.hk/contact-lens-care/new-wearer-guide",
			},
			{
				iconType: OpticalStoreIconType.CHECKLIST_IN_CIRCLE,
				textKey:
					"dashboardPage.opticalStore.getYourEyeCheckedRegularly",
				link: "https://www.acuvue.com.hk/get-contacts/MyACUVUE",
			},
		],
		hasDisclaimerText: false,
		hasMembershipAndWalletBlock: true,
		hasPromocodeAndFeedbackBlock: false,
		hasAddressFeature: false,
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
		featureSwitchUrl:
			"https://jnj-global-prod.apigee.net/v1/myacuvue/feature-switch",
		postalCodeLength: 5,
		termsAndConditionUrl: "https://www.acuvue.com.hk/terms-of-use",
	};

	const regionConfigTW: IRegionConfig = {
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
				textKey:
					"dashboardPage.opticalStore.getYourEyeCheckedRegularly",
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
		topHeaderLinks: [],
		routesType: RoutesType.XIAM_FLOW,
		authenticationType: AuthenticationType.XIAM,
		profileFormType: ProfileForm.WITH_NO_EMAIL,
		editAddressPageType: EditAddressPageType.WITH_NO_ADDRESS_LINE_3,
		canvasPageUrl: "",
		searchPrefixUrl: "https://www.acuvue.com.tw/search/site/",
		hasSignIn: true,
		hasGoToHomeInRegisteredStore: false,
		isChangeStoreAllowed: true,
		hasProfileDetailsMenu: true,
		changeOpticalStoreDialogExtraLines: [],
		isMembershipStatusVisible: false,
		hasMembershipAndWalletBlock: true,
		hasPromocodeAndFeedbackBlock: false,
		hasAddressFeature: false,
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
		hasLineNotification: true,
		hasNonBinaryGenderOption: true,
		featureSwitchUrl:
			"https://jnj-global-prod.apigee.net/v1/myacuvue/feature-switch",
		postalCodeLength: 5,
		termsAndConditionUrl: "https://www.acuvue.com.tw/terms-conditions",
	};

	const regionConfigSG: IRegionConfig = {
		countryPhoneCode: "65",
		region: Region.SGP,
		headerMenu: headerSG,
		footerMenu: footerSG,
		fontFamilySet: FontFamilySet.English,
		supportedLanguages: [Language.EN],
		phoneNumberLength: 8,
		phoneNumberStartsWith: /(^s*([8-9])[0-9]{7})$/,
		legalAge: { minorThreshold: 13, minorThresholdWithGuardian: 17 },
		routesType: RoutesType.XIAM_FLOW,
		authenticationType: AuthenticationType.XIAM,
		profileFormType: ProfileForm.WITH_NO_EMAIL,
		editAddressPageType: EditAddressPageType.WITH_NO_CITY_NO_STATE,
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
		socialNetworks: socialNetworksSG,
		canvasPageUrl: "",
		canvasHomePageUrl: "https://www.acuvue.com.sg",
		signOutRedirectUrl: "https://www.acuvue.com.sg",
		searchPrefixUrl: "",
		hasSignIn: true,
		hasGoToHomeInRegisteredStore: false,
		mapDefaultCenter: { latitude: 1.304833, longitude: 103.831833 },
		isChangeStoreAllowed: true,
		hasProfileDetailsMenu: true,
		changeOpticalStoreDialogExtraLines: [],
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
		isMembershipStatusVisible: true,
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
		opticalStoreAdviceCards: [
			{
				iconType: OpticalStoreIconType.LENSES_CASE_IN_CIRCLE,
				textKey: "dashboardPage.opticalStore.cleaningAndCare",
				link: "https://www.acuvue.com.sg/wear-and-care/contact-lens-cleaning-and-care",
			},
			{
				iconType: OpticalStoreIconType.CHECKLIST_IN_CIRCLE,
				textKey:
					"dashboardPage.opticalStore.getYourEyeCheckedRegularly",
				link: "https://www.acuvue.com.sg/wear-and-care/new-wearer-guide",
			},
		],
		supportEmailAddress: "myacuvue@acuvue.com.sg",
		supportTelephone: "6747 1131",
		hasDisclaimerText: false,
		hasMembershipAndWalletBlock: true,
		hasPromocodeAndFeedbackBlock: false,
		hasAddressFeature: true,
		hasConsentInCompleteYourProfile: true,
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
		hasNonBinaryGenderOption: false,
		featureSwitchUrl:
			"https://jnj-global-prod.apigee.net/v1/myacuvue/feature-switch",
		postalCodeLength: 6,
		termsAndConditionUrl: "https://www.acuvue.com.sg/legal-notice",
	};

	const regionConfigMY: IRegionConfig = {
		region: Region.MYS,
		fontFamilySet: FontFamilySet.English,
		supportedLanguages: [Language.EN],
		countryPhoneCode: "60",
		phoneNumberLength: 11,
		phoneNumberStartsWith:
			/(^s*(011)[0-9]{8})$|(^s*(01)[0-9]{8})$|(^s*(11)[0-9]{8})$|(^s*(1)[0-9]{8})$/,
		legalAge: { minorThreshold: 13, minorThresholdWithGuardian: 17 },
		routesType: RoutesType.XIAM_FLOW,
		authenticationType: AuthenticationType.XIAM,
		profileFormType: ProfileForm.WITH_NO_EMAIL,
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
		headerMenu: headerMY,
		canvasPageUrl: "",
		canvasHomePageUrl: "https://www.acuvue.com.my",
		signOutRedirectUrl: "https://www.acuvue.com.my",
		searchPrefixUrl: "https://www.acuvue.com.my/search/site/",
		hasSignIn: true,
		hasGoToHomeInRegisteredStore: false,
		mapDefaultCenter: { latitude: 3.0701, longitude: 101.6102 },
		isChangeStoreAllowed: true,
		hasProfileDetailsMenu: true,
		changeOpticalStoreDialogExtraLines: [],
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
		googlePlayStoreLink: "https://myacuvue.acuvue.com.my/BaXx/frakq3zh",
		appleAppStoreLink: "https://myacuvue.acuvue.com.my/BaXx/frakq3zh",
		isMembershipStatusVisible: true,
		membershipBenefitKeysByLadder: {
			normal: [
				"dashboardPage.membershipDetails.benefitsList.pointsEarning",
				"dashboardPage.membershipDetails.benefitsList.exchangePointsWithAcuvueVouchers",
				"dashboardPage.membershipDetails.benefitsList.enjoyOnBirthDayMonth",
				"dashboardPage.membershipDetails.benefitsList.exclusiveOffers",
			],
			platinum: [],
		},
		opticalStoreAdviceCards: [
			{
				iconType: OpticalStoreIconType.LENSES_CASE_IN_CIRCLE,
				textKey: "dashboardPage.opticalStore.cleaningAndCare",
				link: "https://www.acuvue.com.my/wear-and-care/contact-lens-cleaning-and-care ",
			},
			{
				iconType: OpticalStoreIconType.CHECKLIST_IN_CIRCLE,
				textKey:
					"dashboardPage.opticalStore.getYourEyeCheckedRegularly",
				link: "https://www.acuvue.com.my/wear-and-care/new-wearer-guide",
			},
		],
		supportEmailAddress: "my.myacuvue@its.jnj.com",
		supportTelephone: "1 800 812 482",
		footerMenu: footerMY,
		socialNetworks: socialNetworksMY,
		hasDisclaimerText: false,
		hasMembershipAndWalletBlock: true,
		hasPromocodeAndFeedbackBlock: false,
		hasAddressFeature: true,
		hasConsentInCompleteYourProfile: true,
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
		hasAdditionalInformationInSocialMedia: true,
		hasNonBinaryGenderOption: false,
		featureSwitchUrl:
			"https://jnj-global-prod.apigee.net/v1/myacuvue/feature-switch",
		postalCodeLength: 5,
		termsAndConditionUrl: "https://www.acuvue.com.my/legal-notice",
	};

	const regionConfigNZ: IRegionConfig = {
		region: Region.NZL,
		fontFamilySet: FontFamilySet.English,
		supportedLanguages: [Language.EN],
		countryPhoneCode: "64",
		phoneNumberLength: 10,
		phoneNumberStartsWith: /(^s*(02)[0-9]{8})$|(^s*(2)[0-9]{8})$/,
		legalAge: { minorThreshold: 18, minorThresholdWithGuardian: 18 },
		routesType: RoutesType.XIAM_FLOW,
		authenticationType: AuthenticationType.XIAM,
		profileFormType: ProfileForm.WITH_NO_EMAIL,
		editAddressPageType: EditAddressPageType.WITH_NO_ADDRESS_LINE_3,
		topHeaderLinks: [],
		headerMenu: headerNZ,
		footerMenu: footerNZ,
		canvasPageUrl: "",
		canvasHomePageUrl: "https://www.acuvue.co.nz",
		searchPrefixUrl: "https://acuvue.co.nz/search/site/",
		hasSignIn: true,
		hasGoToHomeInRegisteredStore: false,
		mapDefaultCenter: { latitude: -36.504976, longitude: 174.455378 },
		isChangeStoreAllowed: true,
		hasProfileDetailsMenu: true,
		changeOpticalStoreDialogExtraLines: [],
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
		googlePlayStoreLink: "https://myacuvue.acuvue.co.nz/BaXx/yklruej9",
		appleAppStoreLink: "https://myacuvue.acuvue.co.nz/BaXx/yklruej9",
		isMembershipStatusVisible: false,
		membershipBenefitKeysByLadder: {
			normal: [
				"dashboardPage.membershipDetails.benefitsList.pointsWithAcuvueContactLensPurchases",
				"dashboardPage.membershipDetails.benefitsList.redeemRewards",
				"dashboardPage.membershipDetails.benefitsList.exclusiveOffersDeliveredStraightToYou",
			],
			platinum: [],
		},
		opticalStoreAdviceCards: [
			{
				iconType: OpticalStoreIconType.LENSES_CASE_IN_CIRCLE,
				textKey: "dashboardPage.opticalStore.cleaningAndCare",
				link: "https://www.acuvue.co.nz/wear-and-care/contact-lens-cleaning-and-care",
			},
			{
				iconType: OpticalStoreIconType.CHECKLIST_IN_CIRCLE,
				textKey:
					"dashboardPage.opticalStore.getYourEyeCheckedRegularly",
				link: "https://www.acuvue.co.nz/get-contacts/how-to-get-contacts",
			},
		],
		supportEmailAddress: "myacuvue@acuvue.co.nz",
		supportTelephone: "0800 450 383",
		socialNetworks: [],
		signOutRedirectUrl: "https://www.acuvue.co.nz",
		hasDisclaimerText: false,
		hasMembershipAndWalletBlock: true,
		hasPromocodeAndFeedbackBlock: false,
		hasAddressFeature: false,
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
		featureSwitchUrl:
			"https://jnj-global-prod.apigee.net/v1/myacuvue/feature-switch",
		postalCodeLength: 5,
		termsAndConditionUrl: "https://www.acuvue.co.nz/terms-of-use",
	};

	it("should return UNDEFINED config when the host does not match any instance", () => {
		mocked(getHost).mockReturnValue("localhost:1234");

		const config = getConfig();

		expect(config).not.toBeDefined();
	});

	it("should return the TH/LOCAL config when the host is localhost:3000", () => {
		mocked(getHost).mockReturnValue("localhost:3000");
		const config = getConfig();

		const localEnvConfigTH: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/mshp/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
			lineConfig: {
				liffId: "1656372663-Qqlo3dZB",
				allowFakeLineProvider: true,
			},
			promoEventsIFrameUrl: expect.any(String),
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.TH,
			environment: ENV.LOCAL,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigTH,
			...localEnvConfigTH,
		};
		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the TH/PREDEV config when the host is predev.app.acuvue.co.th", () => {
		mocked(getHost).mockReturnValue("predev.app.acuvue.co.th");
		const config = getConfig();

		const predevEnvConfigTH: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/mshp/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
			lineConfig: {
				liffId: "1656372663-pxor4gna",
				allowFakeLineProvider: true,
			},
			promoEventsIFrameUrl: expect.any(String),
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.TH,
			environment: ENV.PREDEV,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigTH,
			...predevEnvConfigTH,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the TH/DEV config when the host is dev.app.acuvue.co.th", () => {
		mocked(getHost).mockReturnValue("dev.app.acuvue.co.th");
		const config = getConfig();

		const devEnvConfigTH: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/mshp/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
			lineConfig: {
				liffId: "1656372663-pxor4gna",
				allowFakeLineProvider: true,
			},
			promoEventsIFrameUrl: expect.any(String),
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.TH,
			environment: ENV.DEV,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigTH,
			...devEnvConfigTH,
		};
		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the TH/STAGING config when the host is stage.app.acuvue.co.th", () => {
		mocked(getHost).mockReturnValue("stage.app.acuvue.co.th");
		const config = getConfig();

		const stageEnvConfigTH: IConfig = {
			baseUrl:
				"https://jnj-global-staging.apigee.net/v2/myacuvue/experience/consumer/mshp/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
			lineConfig: {
				liffId: "1656372679-yEZoKJMg",
				allowFakeLineProvider: true,
			},
			promoEventsIFrameUrl: expect.any(String),
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.TH,
			environment: ENV.STAGING,
			APIEnvironment: Environment.staging,
			...globalConfig,
			...regionConfigTH,
			...stageEnvConfigTH,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the TH/PROD config when the host is app.acuvue.co.th", () => {
		mocked(getHost).mockReturnValue("app.acuvue.co.th");
		const config = getConfig();

		const prodEnvConfigTH: IConfig = {
			baseUrl:
				"https://jnj-global-prod.apigee.net/v2/myacuvue/experience/consumer/mshp/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: false,
			lineConfig: {
				liffId: "1623656955-P55Xd2M1",
			},
			promoEventsIFrameUrl: expect.any(String),
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.TH,
			environment: ENV.PROD,
			APIEnvironment: Environment.production,
			...globalConfig,
			...regionConfigTH,
			...prodEnvConfigTH,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the AU/LOCAL config when the host is localhost:3001", () => {
		mocked(getHost).mockReturnValue("localhost:3001");
		const config = getConfig();

		const localEnvConfigAU: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/scdf/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.AU,
			environment: ENV.LOCAL,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigAU,
			...localEnvConfigAU,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the AU/PREDEV config when the host is predev.app.acuvue.com.au", () => {
		mocked(getHost).mockReturnValue("predev.app.acuvue.com.au");
		const config = getConfig();

		const predevEnvConfigAU: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/scdf/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.AU,
			environment: ENV.PREDEV,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigAU,
			...predevEnvConfigAU,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the AU/DEV config when the host is dev.app.acuvue.com.au", () => {
		mocked(getHost).mockReturnValue("dev.app.acuvue.com.au");
		const config = getConfig();

		const devEnvConfigAU: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/scdf/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.AU,
			environment: ENV.DEV,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigAU,
			...devEnvConfigAU,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the AU/STAGING config when the host is stage.app.acuvue.com.au", () => {
		mocked(getHost).mockReturnValue("stage.app.acuvue.com.au");
		const config = getConfig();

		const stageEnvConfigAU: IConfig = {
			baseUrl:
				"https://jnj-global-staging.apigee.net/v2/myacuvue/experience/consumer/scdf/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.AU,
			environment: ENV.STAGING,
			APIEnvironment: Environment.staging,
			...globalConfig,
			...regionConfigAU,
			...stageEnvConfigAU,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the AU/PROD config when the host is app.acuvue.com.au", () => {
		mocked(getHost).mockReturnValue("app.acuvue.com.au");
		const config = getConfig();

		const prodEnvConfigAU: IConfig = {
			baseUrl:
				"https://jnj-global-prod.apigee.net/v2/myacuvue/experience/consumer/scdf/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: false,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.AU,
			environment: ENV.PROD,
			APIEnvironment: Environment.production,
			...globalConfig,
			...regionConfigAU,
			...prodEnvConfigAU,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the IN/LOCAL config when the host is localhost:3007", () => {
		mocked(getHost).mockReturnValue("localhost:3007");
		const config = getConfig();

		const localEnvConfigIN: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/yzbn/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.IN,
			environment: ENV.LOCAL,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigIN,
			...localEnvConfigIN,
		};
		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the IN/PREDEV config when the host is predev.app.acuvue.co.in", () => {
		mocked(getHost).mockReturnValue("predev.app.acuvue.co.in");
		const config = getConfig();

		const predevEnvConfigIN: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/yzbn/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.IN,
			environment: ENV.PREDEV,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigIN,
			...predevEnvConfigIN,
		};
		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the IN/DEV config when the host is dev.app.acuvue.co.in ", () => {
		mocked(getHost).mockReturnValue("dev.app.acuvue.co.in");
		const config = getConfig();

		const devEnvConfigIN: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/yzbn/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.IN,
			environment: ENV.DEV,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigIN,
			...devEnvConfigIN,
		};
		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the IN/STAGING config when the host is stage.app.acuvue.co.in ", () => {
		mocked(getHost).mockReturnValue("stage.app.acuvue.co.in");
		const config = getConfig();

		const stageEnvConfigIN: IConfig = {
			baseUrl:
				"https://jnj-global-staging.apigee.net/v2/myacuvue/experience/consumer/yzbn/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.IN,
			environment: ENV.STAGING,
			APIEnvironment: Environment.staging,
			...globalConfig,
			...regionConfigIN,
			...stageEnvConfigIN,
		};
		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the IN/PROD config when the host is app.acuvue.co.in ", () => {
		mocked(getHost).mockReturnValue("app.acuvue.co.in");
		const config = getConfig();

		const prodEnvConfigIN: IConfig = {
			baseUrl:
				"https://jnj-global-prod.apigee.net/v2/myacuvue/experience/consumer/yzbn/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: false,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.IN,
			environment: ENV.PROD,
			APIEnvironment: Environment.production,
			...globalConfig,
			...regionConfigIN,
			...prodEnvConfigIN,
		};
		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the HK/LOCAL config when the host is localhost:3003", () => {
		mocked(getHost).mockReturnValue("localhost:3003");
		const config = getConfig();

		const localEnvConfigHK: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/afmt/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.HK,
			environment: ENV.LOCAL,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigHK,
			...localEnvConfigHK,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the HK/PREDEV config when the host is predev.app.acuvue.com.hk", () => {
		mocked(getHost).mockReturnValue("predev.app.acuvue.com.hk");
		const config = getConfig();

		const predevEnvConfigHK: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/afmt/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.HK,
			environment: ENV.PREDEV,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigHK,
			...predevEnvConfigHK,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the HK/DEV config when the host is dev.app.acuvue.com.hk", () => {
		mocked(getHost).mockReturnValue("dev.app.acuvue.com.hk");
		const config = getConfig();

		const devEnvConfigHK: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/afmt/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.HK,
			environment: ENV.DEV,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigHK,
			...devEnvConfigHK,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the HK/STAGING config when the host is stage.app.acuvue.com.hk", () => {
		mocked(getHost).mockReturnValue("stage.app.acuvue.com.hk");
		const config = getConfig();

		const stageEnvConfigHK: IConfig = {
			baseUrl:
				"https://jnj-global-staging.apigee.net/v2/myacuvue/experience/consumer/afmt/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.HK,
			environment: ENV.STAGING,
			APIEnvironment: Environment.staging,
			...globalConfig,
			...regionConfigHK,
			...stageEnvConfigHK,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the HK/PROD config when the host is app.acuvue.com.hk", () => {
		mocked(getHost).mockReturnValue("app.acuvue.com.hk");
		const config = getConfig();

		const prodEnvConfigHK: IConfig = {
			baseUrl:
				"https://jnj-global-prod.apigee.net/v2/myacuvue/experience/consumer/afmt/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: false,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.HK,
			environment: ENV.PROD,
			APIEnvironment: Environment.production,
			...globalConfig,
			...regionConfigHK,
			...prodEnvConfigHK,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the TW/LOCAL config when the host is localhost:3002", () => {
		mocked(getHost).mockReturnValue("localhost:3002");
		const config = getConfig();

		const localEnvConfigTW: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/ngyu/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.TW,
			environment: ENV.LOCAL,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigTW,
			...localEnvConfigTW,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the TW/PREDEV config when the host is predev.app.acuvue.com.tw", () => {
		mocked(getHost).mockReturnValue("predev.app.acuvue.com.tw");
		const config = getConfig();

		const localEnvConfigTW: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/ngyu/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.TW,
			environment: ENV.PREDEV,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigTW,
			...localEnvConfigTW,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the TW/DEV config when the host is dev.app.acuvue.com.tw", () => {
		mocked(getHost).mockReturnValue("dev.app.acuvue.com.tw");
		const config = getConfig();

		const localEnvConfigTW: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/ngyu/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.TW,
			environment: ENV.DEV,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigTW,
			...localEnvConfigTW,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the TW/STAGING config when the host is stage.app.acuvue.com.tw", () => {
		mocked(getHost).mockReturnValue("stage.app.acuvue.com.tw");
		const config = getConfig();

		const localEnvConfigTW: IConfig = {
			baseUrl:
				"https://jnj-global-staging.apigee.net/v2/myacuvue/experience/consumer/ngyu/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.TW,
			environment: ENV.STAGING,
			APIEnvironment: Environment.staging,
			...globalConfig,
			...regionConfigTW,
			...localEnvConfigTW,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the TW/PROD config when the host is app.acuvue.com.tw", () => {
		mocked(getHost).mockReturnValue("app.acuvue.com.tw");
		const config = getConfig();

		const localEnvConfigTW: IConfig = {
			baseUrl:
				"https://jnj-global-prod.apigee.net/v2/myacuvue/experience/consumer/ngyu/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: false,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.TW,
			environment: ENV.PROD,
			APIEnvironment: Environment.production,
			...globalConfig,
			...regionConfigTW,
			...localEnvConfigTW,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the SG/LOCAL config when the host is localhost:3004", () => {
		mocked(getHost).mockReturnValue("localhost:3004");
		const config = getConfig();

		const localEnvConfigSG: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/zulw/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.SG,
			environment: ENV.LOCAL,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigSG,
			...localEnvConfigSG,
		};
		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the SG/PREDEV config when the host is predev.app.acuvue.com.sg", () => {
		mocked(getHost).mockReturnValue("predev.app.acuvue.com.sg");
		const config = getConfig();

		const localEnvConfigSG: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/zulw/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.SG,
			environment: ENV.PREDEV,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigSG,
			...localEnvConfigSG,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the SG/DEV config when the host is dev.app.acuvue.com.sg", () => {
		mocked(getHost).mockReturnValue("dev.app.acuvue.com.sg");
		const config = getConfig();

		const localEnvConfigSG: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/zulw/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.SG,
			environment: ENV.DEV,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigSG,
			...localEnvConfigSG,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the SG/STAGING config when the host is stage.app.acuvue.com.sg", () => {
		mocked(getHost).mockReturnValue("stage.app.acuvue.com.sg");
		const config = getConfig();

		const localEnvConfigSG: IConfig = {
			baseUrl:
				"https://jnj-global-staging.apigee.net/v2/myacuvue/experience/consumer/zulw/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.SG,
			environment: ENV.STAGING,
			APIEnvironment: Environment.staging,
			...globalConfig,
			...regionConfigSG,
			...localEnvConfigSG,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the SG/PROD config when the host is app.acuvue.com.sg", () => {
		mocked(getHost).mockReturnValue("app.acuvue.com.sg");
		const config = getConfig();

		const localEnvConfigSG: IConfig = {
			baseUrl:
				"https://jnj-global-prod.apigee.net/v2/myacuvue/experience/consumer/zulw/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: false,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.SG,
			environment: ENV.PROD,
			APIEnvironment: Environment.production,
			...globalConfig,
			...regionConfigSG,
			...localEnvConfigSG,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the MY/LOCAL config when the host is localhost:3005", () => {
		mocked(getHost).mockReturnValue("localhost:3005");
		const config = getConfig();

		const localEnvConfigMY: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/pvaq/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.MY,
			environment: ENV.LOCAL,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigMY,
			...localEnvConfigMY,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the MY/PREDEV config when the host is predev.app.acuvue.com.my", () => {
		mocked(getHost).mockReturnValue("predev.app.acuvue.com.my");
		const config = getConfig();

		const predevEnvConfigMY: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/pvaq/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.MY,
			environment: ENV.PREDEV,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigMY,
			...predevEnvConfigMY,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the MY/DEV config when the host is dev.app.acuvue.com.my", () => {
		mocked(getHost).mockReturnValue("dev.app.acuvue.com.my");
		const config = getConfig();

		const devEnvConfigMY: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/pvaq/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.MY,
			environment: ENV.DEV,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigMY,
			...devEnvConfigMY,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the MY/STAGING config when the host is stage.app.acuvue.com.my", () => {
		mocked(getHost).mockReturnValue("stage.app.acuvue.com.my");
		const config = getConfig();

		const stageEnvConfigMY: IConfig = {
			baseUrl:
				"https://jnj-global-staging.apigee.net/v2/myacuvue/experience/consumer/pvaq/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.MY,
			environment: ENV.STAGING,
			APIEnvironment: Environment.staging,
			...globalConfig,
			...regionConfigMY,
			...stageEnvConfigMY,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the MY/PROD config when the host is app.acuvue.com.my", () => {
		mocked(getHost).mockReturnValue("app.acuvue.com.my");
		const config = getConfig();

		const prodEnvConfigMY: IConfig = {
			baseUrl:
				"https://jnj-global-prod.apigee.net/v2/myacuvue/experience/consumer/pvaq/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: false,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.MY,
			environment: ENV.PROD,
			APIEnvironment: Environment.production,
			...globalConfig,
			...regionConfigMY,
			...prodEnvConfigMY,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the NZ/LOCAL config when the host is localhost:3006", () => {
		mocked(getHost).mockReturnValue("localhost:3006");
		const config = getConfig();

		const localEnvConfigNZ: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/bkpc/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.NZ,
			environment: ENV.LOCAL,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigNZ,
			...localEnvConfigNZ,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the NZ/PREDEV config when the host is predev.app.acuvue.co.nz", () => {
		mocked(getHost).mockReturnValue("predev.app.acuvue.co.nz");
		const config = getConfig();

		const predevEnvConfigNZ: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/bkpc/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.NZ,
			environment: ENV.PREDEV,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigNZ,
			...predevEnvConfigNZ,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the NZ/DEV config when the host is dev.app.acuvue.co.nz", () => {
		mocked(getHost).mockReturnValue("dev.app.acuvue.co.nz");
		const config = getConfig();

		const devEnvConfigNZ: IConfig = {
			baseUrl:
				"https://jnj-global-test.apigee.net/v2/myacuvue/experience/consumer/bkpc/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.NZ,
			environment: ENV.DEV,
			APIEnvironment: Environment.development,
			...globalConfig,
			...regionConfigNZ,
			...devEnvConfigNZ,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the NZ/STAGING config when the host is stage.app.acuvue.co.nz", () => {
		mocked(getHost).mockReturnValue("stage.app.acuvue.co.nz");
		const config = getConfig();

		const stageEnvConfigNZ: IConfig = {
			baseUrl:
				"https://jnj-global-staging.apigee.net/v2/myacuvue/experience/consumer/bkpc/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.NZ,
			environment: ENV.STAGING,
			APIEnvironment: Environment.staging,
			...globalConfig,
			...regionConfigNZ,
			...stageEnvConfigNZ,
		};

		expect(config).toStrictEqual(expectedConfig);
	});

	it("should return the NZ/PROD config when the host is app.acuvue.co.nz", () => {
		mocked(getHost).mockReturnValue("app.acuvue.co.nz");
		const config = getConfig();

		const prodEnvConfigNZ: IConfig = {
			baseUrl:
				"https://jnj-global-prod.apigee.net/v2/myacuvue/experience/consumer/bkpc/",
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: false,
		};
		const expectedConfig: PrivateConfig = {
			instance: Instance.NZ,
			environment: ENV.PROD,
			APIEnvironment: Environment.production,
			...globalConfig,
			...regionConfigNZ,
			...prodEnvConfigNZ,
		};

		expect(config).toStrictEqual(expectedConfig);
	});
});

describe("getCurrentInstanceEnv", () => {
	it("should return LOCAL and TH, when the host is localhost:3000", () => {
		mocked(getHost).mockReturnValue("localhost:3000");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.LOCAL,
			instance: Instance.TH,
		});
	});

	it("should return PREDEV and TH, when the host is predev.app.acuvue.co.th", () => {
		mocked(getHost).mockReturnValue("predev.app.acuvue.co.th");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.PREDEV,
			instance: Instance.TH,
		});
	});

	it("should return DEV and TH, when the host is dev.app.acuvue.co.th", () => {
		mocked(getHost).mockReturnValue("dev.app.acuvue.co.th");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.DEV,
			instance: Instance.TH,
		});
	});

	it("should return STAGING and TH, when the host is stage.app.acuvue.co.th", () => {
		mocked(getHost).mockReturnValue("stage.app.acuvue.co.th");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.STAGING,
			instance: Instance.TH,
		});
	});

	it("should return PROD and TH, when the host is app.acuvue.co.th", () => {
		mocked(getHost).mockReturnValue("app.acuvue.co.th");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.PROD,
			instance: Instance.TH,
		});
	});

	it("should return LOCAL and AU, when the host is localhost:3001", () => {
		mocked(getHost).mockReturnValue("localhost:3001");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.LOCAL,
			instance: Instance.AU,
		});
	});

	it("should return PREDEV and AU, when the host is predev.app.acuvue.com.au", () => {
		mocked(getHost).mockReturnValue("predev.app.acuvue.com.au");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.PREDEV,
			instance: Instance.AU,
		});
	});

	it("should return DEV and AU, when the host is dev.app.acuvue.com.au", () => {
		mocked(getHost).mockReturnValue("dev.app.acuvue.com.au");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.DEV,
			instance: Instance.AU,
		});
	});

	it("should return STAGING and AU, when the host is stage.app.acuvue.com.au", () => {
		mocked(getHost).mockReturnValue("stage.app.acuvue.com.au");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.STAGING,
			instance: Instance.AU,
		});
	});

	it("should return PROD and AU, when the host is app.acuvue.com.au", () => {
		mocked(getHost).mockReturnValue("app.acuvue.com.au");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.PROD,
			instance: Instance.AU,
		});
	});

	it("should return LOCAL and IN, when the host is localhost:3007", () => {
		mocked(getHost).mockReturnValue("localhost:3007");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.LOCAL,
			instance: Instance.IN,
		});
	});

	it("should return PREDEV and IN, when the host is predev.app.acuvue.co.in", () => {
		mocked(getHost).mockReturnValue("predev.app.acuvue.co.in");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.PREDEV,
			instance: Instance.IN,
		});
	});

	it("should return DEV and IN, when the host is dev.app.acuvue.co.in", () => {
		mocked(getHost).mockReturnValue("dev.app.acuvue.co.in");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.DEV,
			instance: Instance.IN,
		});
	});

	it("should return STAGING and IN, when the host is stage.app.acuvue.co.in", () => {
		mocked(getHost).mockReturnValue("stage.app.acuvue.co.in");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.STAGING,
			instance: Instance.IN,
		});
	});

	it("should return PROD and IN, when the host is app.acuvue.co.in", () => {
		mocked(getHost).mockReturnValue("app.acuvue.co.in");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.PROD,
			instance: Instance.IN,
		});
	});

	it("should return LOCAL and HK, when the host is localhost:3003", () => {
		mocked(getHost).mockReturnValue("localhost:3003");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.LOCAL,
			instance: Instance.HK,
		});
	});

	it("should return PREDEV and HK, when the host is predev.app.acuvue.com.hk", () => {
		mocked(getHost).mockReturnValue("predev.app.acuvue.com.hk");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.PREDEV,
			instance: Instance.HK,
		});
	});

	it("should return DEV and HK, when the host is dev.app.acuvue.com.hk", () => {
		mocked(getHost).mockReturnValue("dev.app.acuvue.com.hk");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.DEV,
			instance: Instance.HK,
		});
	});

	it("should return STAGING and HK, when the host is stage.app.acuvue.com.hk", () => {
		mocked(getHost).mockReturnValue("stage.app.acuvue.com.hk");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.STAGING,
			instance: Instance.HK,
		});
	});

	it("should return PROD and HK, when the host is app.acuvue.com.hk", () => {
		mocked(getHost).mockReturnValue("app.acuvue.com.hk");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.PROD,
			instance: Instance.HK,
		});
	});

	it("should return LOCAL and TW, when the host is localhost:3002", () => {
		mocked(getHost).mockReturnValue("localhost:3002");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.LOCAL,
			instance: Instance.TW,
		});
	});

	it("should return PREDEV and TW, when the host is predev.app.acuvue.com.tw", () => {
		mocked(getHost).mockReturnValue("predev.app.acuvue.com.tw");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.PREDEV,
			instance: Instance.TW,
		});
	});

	it("should return DEV and TW, when the host is dev.app.acuvue.com.tw", () => {
		mocked(getHost).mockReturnValue("dev.app.acuvue.com.tw");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.DEV,
			instance: Instance.TW,
		});
	});

	it("should return STAGING and TW, when the host is stage.app.acuvue.com.tw", () => {
		mocked(getHost).mockReturnValue("stage.app.acuvue.com.tw");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.STAGING,
			instance: Instance.TW,
		});
	});

	it("should return PROD and TW, when the host is app.acuvue.com.tw", () => {
		mocked(getHost).mockReturnValue("app.acuvue.com.tw");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.PROD,
			instance: Instance.TW,
		});
	});

	it("should return LOCAL and SG, when the host is localhost:3004", () => {
		mocked(getHost).mockReturnValue("localhost:3004");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.LOCAL,
			instance: Instance.SG,
		});
	});

	it("should return PREDEV and SG, when the host is predev.app.acuvue.com.sg", () => {
		mocked(getHost).mockReturnValue("predev.app.acuvue.com.sg");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.PREDEV,
			instance: Instance.SG,
		});
	});

	it("should return DEV and SG, when the host is dev.app.acuvue.com.sg", () => {
		mocked(getHost).mockReturnValue("dev.app.acuvue.com.sg");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.DEV,
			instance: Instance.SG,
		});
	});

	it("should return STAGING and SG, when the host is stage.app.acuvue.com.sg", () => {
		mocked(getHost).mockReturnValue("stage.app.acuvue.com.sg");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.STAGING,
			instance: Instance.SG,
		});
	});

	it("should return PROD and SG, when the host is app.acuvue.com.sg", () => {
		mocked(getHost).mockReturnValue("app.acuvue.com.sg");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.PROD,
			instance: Instance.SG,
		});
	});

	it("should return LOCAL and MY, when the host is localhost:3005", () => {
		mocked(getHost).mockReturnValue("localhost:3005");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.LOCAL,
			instance: Instance.MY,
		});
	});

	it("should return PREDEV and MY, when the host is predev.app.acuvue.com.my", () => {
		mocked(getHost).mockReturnValue("predev.app.acuvue.com.my");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.PREDEV,
			instance: Instance.MY,
		});
	});

	it("should return DEV and MY, when the host is dev.app.acuvue.com.my", () => {
		mocked(getHost).mockReturnValue("dev.app.acuvue.com.my");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.DEV,
			instance: Instance.MY,
		});
	});

	it("should return STAGING and MY, when the host is stage.app.acuvue.com.my", () => {
		mocked(getHost).mockReturnValue("stage.app.acuvue.com.my");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.STAGING,
			instance: Instance.MY,
		});
	});

	it("should return PROD and MY, when the host is app.acuvue.com.my", () => {
		mocked(getHost).mockReturnValue("app.acuvue.com.my");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.PROD,
			instance: Instance.MY,
		});
	});

	it("should return LOCAL and NZ, when the host is localhost:3006", () => {
		mocked(getHost).mockReturnValue("localhost:3006");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.LOCAL,
			instance: Instance.NZ,
		});
	});

	it("should return PREDEV and NZ, when the host is predev.app.acuvue.co.nz", () => {
		mocked(getHost).mockReturnValue("predev.app.acuvue.co.nz");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.PREDEV,
			instance: Instance.NZ,
		});
	});

	it("should return DEV and NZ, when the host is dev.app.acuvue.co.nz", () => {
		mocked(getHost).mockReturnValue("dev.app.acuvue.co.nz");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.DEV,
			instance: Instance.NZ,
		});
	});

	it("should return STAGING and NZ, when the host is stage.app.acuvue.co.nz", () => {
		mocked(getHost).mockReturnValue("stage.app.acuvue.co.nz");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.STAGING,
			instance: Instance.NZ,
		});
	});

	it("should return PROD and NZ, when the host is app.acuvue.co.nz", () => {
		mocked(getHost).mockReturnValue("app.acuvue.co.nz");
		const instanceEnv = getCurrentInstanceEnv();
		expect(instanceEnv).toStrictEqual({
			env: ENV.PROD,
			instance: Instance.NZ,
		});
	});
});
