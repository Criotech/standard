import {
	IAddressState,
	InvalidFormSubmissionError,
	IUserAddress,
	Nullable,
	TranslationKey,
} from "@myacuvue_thailand_web/services";
import { Form, Select as AntSelect } from "antd";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAsync } from "react-use";
import Footer from "../../components/Footer";
import GenericInput from "../../components/GenericInput";
import MyAcuvueLiteHeader from "../../components/Layout/MyAcuvueLiteHeader";
import LoadingBlock from "../../components/LoadingBlock";
import Select from "../../components/Select";
import Text from "../../components/Text";
import { useAddress } from "../../hooks/useAddress";
import { Status, useSnackbar } from "../../hooks/useSnackbar";
import { useString } from "../../hooks/useString";
import { useTranslation } from "../../hooks/useTranslation";
import { useConfiguration } from "../../hooks/useConfiguration";
import useAddressValidation from "../../hooks/validations/useAddressValidation";
import EditAddressActionButtons from "../NeoEditAddress/EditAddressActionButtons";
import EditAddressCountry from "../NeoEditAddress/EditAddressCountry";
import EditAddressLine1AndLine2 from "../NeoEditAddress/EditAddressLine1AndLine2";
import EditAddressTitleAndBlockTitle from "../NeoEditAddress/EditAddressTitleAndBlockTitle";
import "./index.scss";

const { Option } = AntSelect;

type UserMailingAddressWithNoLine3 = Omit<
	IUserAddress,
	"line3" | "countryCode"
>;

const EditAddressWithNoAddressLine3: FC<{}> = () => {
	const history = useHistory();
	const { deleteNonDigits } = useString();
	const { showSnackbar } = useSnackbar();
	const { getMailingAddress, saveMailingAddress, getStates } = useAddress();
	const { language } = useTranslation();
	const { postalCodeLength } = useConfiguration();

	const { value, loading } = useAsync(
		() => Promise.all([getStates(), getMailingAddress()]),
		[getStates, getMailingAddress]
	);

	const [states, userMailingAddress] =
		(value as [IAddressState[], Nullable<IUserAddress> | undefined]) || [];

	const [formData, setFormData] = useState<UserMailingAddressWithNoLine3>({
		line1: "",
		line2: "",
		city: "",
		state: "",
		postCode: "",
	});

	useEffect(() => {
		if (userMailingAddress) {
			setFormData(userMailingAddress as UserMailingAddressWithNoLine3);
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
		Record<keyof UserMailingAddressWithNoLine3, TranslationKey>
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

	const options = useMemo(() => {
		return states
			? states.map((state) => (
					<Option key={state.id} value={state.id}>
						{state.names[language] || state.names.en}
					</Option>
			  ))
			: null;
	}, [language, states]);

	const errorKeys: Partial<
		Record<keyof UserMailingAddressWithNoLine3, TranslationKey>
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

	const onCancel = () => {
		history.push("/profile");
	};

	const handleSubmit = useCallback(async () => {
		try {
			if (!hasError) {
				await saveMailingAddress({
					line1: formData.line1,
					line2: formData.line2,
					city: formData.city,
					state: formData.state,
					postCode: formData.postCode,
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
	}, [history, formData, hasError, saveMailingAddress, showSnackbar]);

	return (
		<div className="acuvue-edit-address">
			<MyAcuvueLiteHeader />
			{loading ? (
				<LoadingBlock />
			) : (
				<div className="content-wrapper">
					<EditAddressTitleAndBlockTitle />

					<Form
						name="edit-address-form"
						onFinish={handleSubmit}
						className="edit-address-form"
						layout="vertical"
					>
						<EditAddressLine1AndLine2
							formData={formData}
							serverErrorKeys={serverErrorKeys}
							errorKeys={errorKeys}
							onChange={(name: string, value: string) => {
								setFormData({
									...formData,
									[name]: value,
								});
							}}
						/>

						<div className="input-wrapper">
							<GenericInput
								alwaysVisibleErrorKey={serverErrorKeys.city}
								errorKey={errorKeys.city}
								type="text"
								name="city"
								value={formData.city}
								onChange={(newValue) => {
									setFormData({
										...formData,
										city: newValue,
									});
								}}
								maxLength={35}
								placeholder="editAddressPage.city"
								label="editAddressPage.cityLabel"
							/>
						</div>

						<div className="input-items-wrapper">
							<div className="input-wrapper">
								<div className="edit-address-state-select">
									<label htmlFor="editAddressPage.stateLabel">
										<Text textKey="editAddressPage.stateLabel" />
									</label>
									<Select
										id="stateId"
										value={formData.state || undefined}
										onChange={(newValue) => {
											setFormData({
												...formData,
												state: newValue as string,
											});
										}}
										placeholder={
											<Text textKey="editAddressPage.state" />
										}
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
									errorKey={errorKeys.postCode}
									type="text"
									name="postCode"
									value={formData.postCode}
									onChange={(newValue) => {
										const postCode =
											deleteNonDigits(newValue);

										setFormData({
											...formData,
											postCode,
										});
									}}
									maxLength={postalCodeLength}
									placeholder="editAddressPage.postcode"
									label="editAddressPage.postcodeLabel"
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

export default EditAddressWithNoAddressLine3;
