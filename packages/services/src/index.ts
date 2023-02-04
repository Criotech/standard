import LegacyUserService from "./LegacyUserService";
import WindowService from "./WindowService";
import * as ConfigService from "./ConfigService";
import ClassService from "./ClassService";
import * as HTTPService from "./HTTPService";
import * as AuthenticationService from "./AuthenticationService";
import StoreService from "./StoreService";
import LegalPoliciesService from "./LegalPoliciesService";
import * as TransactionService from "./TransactionService";
import * as LanguageService from "./LanguageService";
import * as ProductService from "./ProductService";
import SanitizeHtmlService from "./SanitizeHtmlService";
import * as PointsService from "./PointsService";
import * as RegistrationService from "./RegistrationService";
import * as BannerService from "./BannerService";
import * as CouponService from "./CouponService";
import * as LineService from "./LineService";
import SettingsService from "./SettingsService";
import * as AddressService from "./AddressService";
import DateService from "./DateService";
import UtilityService from "./UtilityService";
import LegalAgeService from "./LegalAgeService";
import EmailValidationService from "./EmailValidationService";
import PhoneValidationService from "./PhoneValidationService";
import GeometryService from "./GeometryService";
import JsonWebTokenService from "./JsonWebTokenService";
import PhoneService from "./PhoneService";
import SessionService from "./SessionService";
import AzureConfigurationService from "./AzureConfigurationService";
import EmailService from "./EmailService";
import UserService from "./UserService";
import SWService from "./SWService";
import FeatureSwitchService from "./FeatureSwitchService";
import TrackingService from "./TrackingService";
import FeedbackService from "./FeedbackService";
import StringService from "./StringService";

import { GlobalError } from "./errors/GlobalError";
import { InvalidFormSubmissionError } from "./errors/InvalidFormSubmissionError";

export * from "./LegacyUserService/types";
export type {
	IsEligibleToChangeStoreResponse,
	IStore,
	IStoreWithCoordinates,
	IRegisterStore,
} from "./StoreService/types";
export type {
	IGetTransactionsResponse,
	ITransaction,
} from "./TransactionService/types";
export * from "./LanguageService/types";
export type { ISampleProduct } from "./ProductService/types";
export type { Ladder, IPoints } from "./PointsService/types";
export type {
	ResendOtpPayload,
	OtpVerificationPayload,
	LegalTermsPayload,
	IProfileRegistrationPayload,
	RegisterPayload,
	ValidateOtpResponse,
} from "./RegistrationService/types";
export type {
	CarouselBanner,
	GetBannersResponse,
	CampaignBanner,
} from "./BannerService/types";
export type {
	IActiveWalletCoupon,
	IExpiredWalletCoupon,
	IRedeemedWalletCoupon,
	RedeemCouponPayload,
	IBaseCoupon,
	IAcuvueCouponCheckout,
	ILifestyleCouponCheckout,
	ILifestyleCoupon,
	WalletCoupon,
	IAcuvueCoupon,
} from "./CouponService/types";
export type { ErrorTranslations } from "./errors/types";
export type { ILineProfile } from "./LineService/types";
export type {
	INotificationPreferences,
	ISettings,
} from "./SettingsService/types";
export type {
	GetUserAddressResponse,
	IUserAddress,
	IAddressState,
	UpdateUserAddressPayload,
} from "./AddressService/types";
export * from "./LegalAgeService/types";
export * from "./HTTPService/HttpStatus";
export type {
	JsonWebToken,
	IDeviceToken,
	ISessionToken,
} from "./JsonWebTokenService/types";
export type {
	DeviceType,
	IPhoneRegisterRequest,
	IPhoneValidationRequest,
	IPhoneValidationResponse,
	ListConsentsResponseBody,
	SaveConsentsRequestBody,
} from "./PhoneService/types";
export type { IEmailVerifyPayload } from "./EmailService/types";
export type { Nullable } from "./UtilityTypes/types";
export * from "./UserService/types";
export * from "./FeatureSwitchService/types";
export * from "./TrackingService/types";
export type { IFeedback, IPurchase } from "./FeedbackService/types";
export { Region } from "./ConfigService/types";

export {
	LegacyUserService,
	WindowService,
	ConfigService,
	ClassService,
	SWService,
	HTTPService,
	AuthenticationService,
	StoreService,
	LegalPoliciesService,
	TransactionService,
	FeatureSwitchService,
	LanguageService,
	ProductService,
	SanitizeHtmlService,
	PointsService,
	RegistrationService,
	GlobalError,
	InvalidFormSubmissionError,
	CouponService,
	BannerService,
	LineService,
	SettingsService,
	AddressService,
	DateService,
	UtilityService,
	LegalAgeService,
	EmailValidationService,
	PhoneValidationService,
	GeometryService,
	TrackingService,
	JsonWebTokenService,
	PhoneService,
	AzureConfigurationService,
	EmailService,
	SessionService,
	UserService,
	FeedbackService,
	StringService,
};
