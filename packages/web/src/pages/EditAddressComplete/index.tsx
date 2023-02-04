import { Form, Select as AntSelect } from "antd";
import {
	IAddressState,
	InvalidFormSubmissionError,
	IUserAddress,
	Nullable,
	TranslationKey,
} from "@myacuvue_thailand_web/services";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import Footer from "../../components/Footer";
import { useHistory } from "react-router-dom";
import { useAsync } from "react-use";
import MyAcuvueLiteHeader from "../../components/Layout/MyAcuvueLiteHeader";
import LoadingBlock from "../../components/LoadingBlock";
import GenericInput from "../../components/GenericInput";
import Text from "../../components/Text";
import Select from "../../components/Select";
import { Status, useSnackbar } from "../../hooks/useSnackbar";
import { useAddress } from "../../hooks/useAddress";
import useAddressValidation from "../../hooks/validations/useAddressValidation";
import { useString } from "../../hooks/useString";
import EditAddressActionButtons from "../NeoEditAddress/EditAddressActionButtons";
import EditAddressCountry from "../NeoEditAddress/EditAddressCountry";
import { useTranslation } from "../../hooks/useTranslation";
import { useConfiguration } from "../../hooks/useConfiguration";
import EditAddressTitleAndBlockTitle from "../NeoEditAddress/EditAddressTitleAndBlockTitle";
import "./index.scss";
import EditAddressLine1AndLine2 from "../NeoEditAddress/EditAddressLine1AndLine2";

const { Option } = AntSelect;

type UserMailingAddressComplete = IUserAddress;

const EditAddressComplete: FC<{}> = () => {
	const { getMailingAddress, saveMailingAddress, getStates } = useAddress();
	const { language } = useTranslation();
	const { showSnackbar } = useSnackbar();
	const { deleteNonDigits } = useString();
	const history = useHistory();
	const { postalCodeLength, region } = useConfiguration();

	const { value, loading } = useAsync(
		() => Promise.all([getStates(), getMailingAddress()]),
		[getStates, getMailingAddress]
	);

	const [states, userMailingAddress] =
		(value as [IAddressState[], Nullable<IUserAddress> | undefined]) || [];

	const [formData, setFormData] = useState<UserMailingAddressComplete>({
		line1: "",
		line2: "",
		line3: "",
		city: "",
		state: "",
		postCode: "",
		countryCode: region,
	});

	useEffect(() => {
		if (userMailingAddress) {
			setFormData(userMailingAddress as UserMailingAddressComplete);
		}
	}, [userMailingAddress]);

	const {
		validateAddressLine1,
		validateAddressLine2,
		validateCity,
		validateState,
		validatePostCode,
	} = useAddressValidation();

	const [error, setError] = useState<InvalidFormSubmissionError>();

	const serverErrorKeys: Partial<
		Record<keyof UserMailingAddressComplete, TranslationKey>
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

	const errorKeys: Partial<
		Record<keyof UserMailingAddressComplete, TranslationKey>
	> = useMemo(
		() => ({
			line1: validateAddressLine1(formData.line1),
			line2: validateAddressLine2(formData.line2),
			city: validateCity(formData.city),
			state: validateState(formData.state),
			postCode: validatePostCode(formData.postCode),
		}),
		[
			formData,
			validateAddressLine1,
			validateAddressLine2,
			validateCity,
			validatePostCode,
			validateState,
		]
	);

	const hasError = Object.values(errorKeys).filter(Boolean).length > 0;

	const options = useMemo(() => {
		return states
			? states.map((state) => (
					<Option key={state.id} value={state.id}>
						{state.names[language] || state.names.en}
					</Option>
			  ))
			: null;
	}, [language, states]);

	const handleSubmit = useCallback(async () => {
		try {
			if (!hasError) {
				await saveMailingAddress({
					line1: formData.line1,
					line2: formData.line2,
					line3: formData.line3,
					city: formData.city,
					state: formData.state,
					postCode: formData.postCode,
					countryCode: formData.countryCode,
				});
				history.push("/profile");
				const snackbarDurationInSeconds = 3;
				showSnackbar(
					Status.SUCCESS,
					"editAddressPage.successMessage",
					{},
					snackbarDurationInSeconds
				);
			}
		} catch (error) {
			if (error instanceof InvalidFormSubmissionError) {
				setError(error);
			}
		}
	}, [hasError, formData, saveMailingAddress, showSnackbar, history]);

	const onCancel = () => {
		history.push("/profile");
	};

	return (
		<div className="acuvue-edit-address">
			<>
				<MyAcuvueLiteHeader />
			</>
			{loading ? (
				<LoadingBlock />
			) : (
				<div className="content-wrapper">
					<EditAddressTitleAndBlockTitle />

					<Form
						className="edit-address-form"
						onFinish={handleSubmit}
						name="edit-address-form"
						layout="vertical"
					>
						<EditAddressLine1AndLine2
							errorKeys={errorKeys}
							formData={formData}
							onChange={(name: string, value: string) => {
								setFormData({
									...formData,
									[name]: value,
								});
							}}
							serverErrorKeys={serverErrorKeys}
						/>

						<div className="input-wrapper">
							<GenericInput
								alwaysVisibleErrorKey={serverErrorKeys.line2}
								name="line3"
								value={formData.line3}
								type="text"
								maxLength={35}
								label="editAddressPage.addressLine3Label"
								onChange={(newValue) => {
									setFormData({
										...formData,
										line3: newValue,
									});
								}}
								placeholder="editAddressPage.addressLine3"
							/>
						</div>

						<div className="input-wrapper">
							<GenericInput
								name="city"
								errorKey={errorKeys.city}
								type="text"
								alwaysVisibleErrorKey={serverErrorKeys.city}
								onChange={(newValue) => {
									setFormData({
										...formData,
										city: newValue,
									});
								}}
								placeholder="editAddressPage.city"
								value={formData.city}
								label="editAddressPage.cityLabel"
								maxLength={35}
							/>
						</div>

						<div className="input-items-wrapper">
							<div className="input-wrapper">
								<div className="edit-address-state-select">
									<label htmlFor="editAddressPage.stateLabel">
										<Text textKey="editAddressPage.stateLabel" />
									</label>
									<Select
										placeholder={
											<Text textKey="editAddressPage.state" />
										}
										id="stateId"
										value={formData.state || undefined}
										onChange={(newValue) => {
											setFormData({
												...formData,
												state: newValue as string,
											});
										}}
									>
										{options}
									</Select>
								</div>
							</div>

							<div className="input-wrapper">
								<GenericInput
									alwaysVisibleErrorKey={
										serverErrorKeys.postCode
									}
									name="postCode"
									errorKey={errorKeys.postCode}
									onChange={(newValue) => {
										const postCode =
											deleteNonDigits(newValue);

										setFormData({
											...formData,
											postCode,
										});
									}}
									type="text"
									label="editAddressPage.postcodeLabel"
									maxLength={postalCodeLength}
									value={formData.postCode}
									placeholder="editAddressPage.postcode"
								/>
							</div>
						</div>

						<EditAddressCountry />

						<EditAddressActionButtons
							hasError={hasError}
							onCancel={onCancel}
						/>
					</Form>
				</div>
			)}
			<Footer />
		</div>
	);
};

export default EditAddressComplete;
