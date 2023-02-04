import {
	apiDomains,
	DomainMap,
	ENV,
	IFullRegionConfig,
	Instance,
	instanceRegionMap,
	OpticalStoreIconType,
	PrivilegeIconType,
	Region,
} from "./types";
import { defaultRegionConfig } from "./globalConfig";
import { headerAU } from "./header/headerAU";
import { footerAU } from "./footer/footerAU";
import { socialNetworksAU } from "./footer/socialNetworksAU";

export const domainMapAU: DomainMap = {
	[ENV.LOCAL]: ["localhost:3001"],
	[ENV.PREDEV]: ["predev.app.acuvue.com.au", "localhost:4001"],
	[ENV.DEV]: ["dev.app.acuvue.com.au", "localhost:5001"],
	[ENV.STAGING]: ["stage.app.acuvue.com.au", "localhost:6001"],
	[ENV.PROD]: ["app.acuvue.com.au"],
};

export const configAU: IFullRegionConfig = {
	region: {
		...defaultRegionConfig,
		countryPhoneCode: "61",
		region: Region.AUS,
		legalAge: { minorThreshold: 16, minorThresholdWithGuardian: 18 },
		phoneNumberLength: 10,
		phoneNumberStartsWith: /(^s*(04)[0-9]{8})$|(^s*(4)[0-9]{8})$/,
		headerMenu: headerAU,
		footerMenu: footerAU,
		searchPrefixUrl: "https://www.acuvue.com.au/search/site/",
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
		socialNetworks: socialNetworksAU,
		canvasHomePageUrl: "https://www.acuvue.com.au",
		signOutRedirectUrl: "https://www.acuvue.com.au",
		mapDefaultCenter: { latitude: -33.52426, longitude: 151.122635 },
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
		membershipBenefitKeysByLadder: {
			normal: [
				"dashboardPage.membershipDetails.benefitsList.pointsWithAcuvueContactLensPurchases",
				"dashboardPage.membershipDetails.benefitsList.redeemRewards",
				"dashboardPage.membershipDetails.benefitsList.exclusiveOffersDeliveredStraightToYou",
			],
			platinum: [],
		},
		supportEmailAddress: "myacuvue@acuvue.com.au",
		supportTelephone: "1800 943 463",
		opticalStoreAdviceCards: [
			{
				iconType: OpticalStoreIconType.LENSES_CASE_IN_CIRCLE,
				textKey: "dashboardPage.opticalStore.cleaningAndCare",
				link: "https://www.acuvue.com.au/wear-and-care/contact-lens-cleaning-and-care",
			},
			{
				iconType: OpticalStoreIconType.CHECKLIST_IN_CIRCLE,
				textKey:
					"dashboardPage.opticalStore.getYourEyeCheckedRegularly",
				link: "https://www.acuvue.com.au/get-contacts/how-to-get-contacts",
			},
		],
		postalCodeLength: 5,
		termsAndConditionUrl: "https://www.acuvue.com.au/myacuvueterms",
	},
	environments: {
		[ENV.LOCAL]: {
			baseUrl: `https://${
				apiDomains[ENV.LOCAL]
			}/v2/myacuvue/experience/consumer/${
				instanceRegionMap[Instance.AU]
			}/`,
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		},
		[ENV.PREDEV]: {
			baseUrl: `https://${
				apiDomains[ENV.PREDEV]
			}/v2/myacuvue/experience/consumer/${
				instanceRegionMap[Instance.AU]
			}/`,
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		},
		[ENV.DEV]: {
			baseUrl: `https://${
				apiDomains[ENV.DEV]
			}/v2/myacuvue/experience/consumer/${
				instanceRegionMap[Instance.AU]
			}/`,
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		},
		[ENV.STAGING]: {
			baseUrl: `https://${
				apiDomains[ENV.STAGING]
			}/v2/myacuvue/experience/consumer/${
				instanceRegionMap[Instance.AU]
			}/`,
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: true,
		},
		[ENV.PROD]: {
			baseUrl: `https://${
				apiDomains[ENV.PROD]
			}/v2/myacuvue/experience/consumer/${
				instanceRegionMap[Instance.AU]
			}/`,
			googleMapsApiKey: "AIzaSyCa4u_3_LYnEMK-FFTN18kTtDrAixTzmRw",
			allowDebugRoutes: false,
		},
	},
};
