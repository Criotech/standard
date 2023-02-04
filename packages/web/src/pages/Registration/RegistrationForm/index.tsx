import {
	Gender,
	InvalidFormSubmissionError,
	TranslationKey,
	LegalAgeRange,
	UpdateProfilePayload,
	LensesUsage,
	WalletCoupon,
} from "@myacuvue_thailand_web/services";
import { Form } from "antd";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import Button, { ButtonType } from "../../../components/Button";
import GenericInput from "../../../components/GenericInput";
import GenericSelect from "../../../components/GenericSelect";
import MonthYearInput from "../../../components/MonthYearInput";
import RadioGroup from "../../../components/RadioGroup";
import Text from "../../../components/Text";
import { useRegisterValidations } from "../../../hooks/validations/useRegisterValidations";
import "./index.scss";
import Checkbox from "../../../components/Checkbox";
import { useLegalAge } from "../../../hooks/useLegalAge";
import { useNavigate } from "react-router-dom-v5-compat";
import {
	CompleteYourProfileErrorKeys,
	ICompleteProfileFormData,
} from "../../CompleteYourProfile/useCompleteYourProfile";
import { useUser } from "../../../hooks/useUser";
import { useCoupon } from "../../../hooks/useCoupon";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import { UtilityService } from "@myacuvue_thailand_web/services";

const { sleep } = UtilityService;

const RegistrationForm: FC<{}> = () => {
	const navigate = useNavigate();
	const { saveProfile } = useUser();
	const { getUserCoupons } = useCoupon();
	const { getUser } = useAuthentication();
	const { refreshUserProfile } = useUserProfile();

	const currentYear = new Date().getFullYear();
	const {
		validateEmail,
		validateFirstName,
		validateLastName,
		validateBirthday,
		validateLensesUsage,
	} = useRegisterValidations();
	const { getLegalAgeRange } = useLegalAge();

	const [formData, setFormData] = useState<Partial<ICompleteProfileFormData>>(
		{}
	);
	const [birthMonth, setBirthMonth] = useState<number>();
	const [birthYear, setBirthYear] = useState<number>();

	const errorKeys: Partial<
		Record<keyof ICompleteProfileFormData, TranslationKey>
	> = useMemo(
		() => ({
			firstName: validateFirstName(formData.firstName),
			lastName: validateLastName(formData.lastName),
			email: validateEmail(formData.email),
			birth: validateBirthday(birthMonth, birthYear),
			lensesUsage: validateLensesUsage(formData.lensesUsage),
		}),
		[
			validateFirstName,
			formData.firstName,
			formData.lastName,
			formData.email,
			formData.lensesUsage,
			validateLastName,
			validateEmail,
			validateBirthday,
			birthMonth,
			birthYear,
			validateLensesUsage,
		]
	);

	const [error, setError] = useState<InvalidFormSubmissionError>();

	const serverErrorKeys: Partial<
		Record<keyof CompleteYourProfileErrorKeys, TranslationKey>
	> = useMemo(() => {
		if (error) {
			return error.formFieldErrors.reduce(
				(final, item) => ({
					...final,
					[item.fieldName]: item.translationKey,
				}),
				{}
			);
		}
		return {};
	}, [error]);

	const legalAgeRange = useMemo(
		() => getLegalAgeRange(birthMonth, birthYear),
		[birthMonth, birthYear, getLegalAgeRange]
	);

	const isParentalConsentRequired =
		legalAgeRange === LegalAgeRange.MINOR_NEEDS_PARENTAL_CONSENT;

	const hasError = useMemo(() => {
		if (isParentalConsentRequired && !formData.hasParentalConsent) {
			return true;
		}
		if (Object.values(errorKeys).filter(Boolean).length > 0) {
			return true;
		}
	}, [errorKeys, isParentalConsentRequired, formData]);

	useEffect(() => {
		if (!isParentalConsentRequired) {
			delete formData.hasParentalConsent;
		}
	}, [isParentalConsentRequired, formData]);

	const calculateCashDiscountValue = (
		userCoupons: WalletCoupon[]
	): number => {
		return userCoupons
			.filter((coupon) => coupon.subType === "welcome")
			.reduce((coupon, nextCoupon) => {
				return coupon + nextCoupon.absoluteCashDiscount;
			}, 0);
	};

	const getCouponsByWaiting: () => Promise<number> = useCallback(async () => {
		let numberOfTries = 0;
		const maximumNumberOfTries = 3;
		let userCoupons: WalletCoupon[] = [];
		const sleepTimePerTrial = 2000;

		do {
			numberOfTries += 1;
			userCoupons = await getUserCoupons();
			if (userCoupons.length === 0) {
				await sleep(sleepTimePerTrial);
			}
		} while (
			userCoupons.length === 0 &&
			numberOfTries <= maximumNumberOfTries
		);

		const couponValue = calculateCashDiscountValue(userCoupons);
		return couponValue;
	}, [getUserCoupons]);

	const handleSubmit = useCallback(async () => {
		if (!hasError) {
			try {
				const profileFormData = {
					...formData,
					birthMonth: String(birthMonth),
					birthYear: String(birthYear),
				};
				await saveProfile(profileFormData as UpdateProfilePayload);
				await getUser();
				refreshUserProfile();

				const couponValue = await getCouponsByWaiting();
				sessionStorage.setItem(
					"myacuvue:coupon-value",
					String(couponValue)
				);

				navigate(`/?couponValue=${couponValue}`);
			} catch (_error) {
				if (_error instanceof InvalidFormSubmissionError) {
					setError(_error);
				}
			}
		}
	}, [
		hasError,
		formData,
		birthMonth,
		birthYear,
		saveProfile,
		getUser,
		refreshUserProfile,
		getCouponsByWaiting,
		navigate,
	]);

	return (
		<Form
			name="phone-form"
			onFinish={handleSubmit}
			layout="vertical"
			className="registration-form"
		>
			<GenericInput
				errorKey={errorKeys.firstName}
				alwaysVisibleErrorKey={serverErrorKeys.firstName}
				name="firstName"
				type="text"
				value={formData.firstName || ""}
				onChange={(newValue) => {
					setFormData({ ...formData, firstName: newValue });
				}}
				maxLength={35}
				placeholder="registrationPage.form.firstNamePlaceholder"
				label="registrationPage.form.firstNameLabel"
			/>

			<GenericInput
				errorKey={errorKeys.lastName}
				alwaysVisibleErrorKey={serverErrorKeys.lastName}
				name="lastName"
				type="text"
				value={formData.lastName || ""}
				onChange={(newValue) => {
					setFormData({ ...formData, lastName: newValue });
				}}
				maxLength={35}
				placeholder="registrationPage.form.lastNamePlaceholder"
				label="registrationPage.form.lastNameLabel"
			/>

			<GenericInput
				errorKey={errorKeys.email}
				alwaysVisibleErrorKey={serverErrorKeys.email}
				type="text"
				name="email"
				value={formData.email || ""}
				onChange={(newValue) => {
					setFormData({ ...formData, email: newValue });
				}}
				placeholder="registrationPage.form.emailPlaceholder"
				label="registrationPage.form.emailLabel"
			/>

			<MonthYearInput
				minYear={1900}
				maxYear={currentYear}
				month={birthMonth}
				setMonth={setBirthMonth}
				year={birthYear}
				setYear={setBirthYear}
				label="registrationPage.form.birthdayLabel"
				errorKey={validateBirthday(birthMonth, birthYear)}
				alwaysVisibleErrorKey={serverErrorKeys.birth}
			/>

			{isParentalConsentRequired && (
				<Checkbox
					checked={formData.hasParentalConsent}
					onChange={(e) =>
						setFormData({
							...formData,
							hasParentalConsent: e.target.checked,
						})
					}
				>
					<Text textKey="registrationPage.form.parentalConsent.text" />
				</Checkbox>
			)}

			<RadioGroup<Gender>
				label="registrationPage.form.genderLabel"
				errorKey={errorKeys.gender}
				alwaysVisibleErrorKey={serverErrorKeys.gender}
				value={formData.gender}
				onChange={(newValue) => {
					setFormData({ ...formData, gender: newValue });
				}}
				items={[
					{
						value: Gender.MALE,
						label: "registrationPage.form.genderMaleLabel",
					},
					{
						value: Gender.FEMALE,
						label: "registrationPage.form.genderFemaleLabel",
					},
					{
						value: Gender.NON_BINARY,
						label: "registrationPage.form.genderNonBinaryLabel",
					},
				]}
			/>

			<GenericSelect<string>
				errorKey={errorKeys.lensesUsage}
				alwaysVisibleErrorKey={serverErrorKeys.lensesUsage}
				value={formData.lensesUsage || ""}
				onChange={(newValue) => {
					setFormData({
						...formData,
						lensesUsage: newValue as LensesUsage,
					});
				}}
				label="registrationPage.form.myAcuvueBrandLenseLabel"
				placeholder="registrationPage.form.myAcuvueBrandLensePlaceholder"
				items={[
					{
						value: "ACUVUE_USER",
						label: "registrationPage.form.lenseBrandOptionOne",
					},
					{
						value: "OTHER_BRAND_USER",
						label: "registrationPage.form.lenseBrandOptionTwo",
					},
					{
						value: "NON_USER",
						label: "registrationPage.form.lenseBrandOptionThree",
					},
				]}
			/>

			<Button disabled={hasError}>
				<Text textKey="registrationPage.button.registerLabel" />
			</Button>

			<Button
				type={ButtonType.OUTLINE}
				className="skip-btn"
				onClick={() => navigate("/home")}
			>
				<Text textKey="registrationPage.button.skipLabel" />
			</Button>
		</Form>
	);
};

export default RegistrationForm;
