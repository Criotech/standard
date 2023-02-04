import {
	InvalidFormSubmissionError,
	IUserAddress,
	TranslationKey,
} from "@myacuvue_thailand_web/services";
import { Form } from "antd";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAsync } from "react-use";
import Footer from "../../components/Footer";
import GenericInput from "../../components/GenericInput";
import MyAcuvueLiteHeader from "../../components/Layout/MyAcuvueLiteHeader";
import LoadingBlock from "../../components/LoadingBlock";
import Text from "../../components/Text";
import { useAddress } from "../../hooks/useAddress";
import { Status, useSnackbar } from "../../hooks/useSnackbar";
import { useString } from "../../hooks/useString";
import useAddressValidation from "../../hooks/validations/useAddressValidation";
import { useConfiguration } from "../../hooks/useConfiguration";
import EditAddressActionButtons from "../NeoEditAddress/EditAddressActionButtons";
import EditAddressCountry from "../NeoEditAddress/EditAddressCountry";
import EditAddressLine1AndLine2 from "../NeoEditAddress/EditAddressLine1AndLine2";
import EditAddressTitleAndBlockTitle from "../NeoEditAddress/EditAddressTitleAndBlockTitle";
import "./index.scss";

type UserMailingAddressWithNoCityNoState = Omit<
	IUserAddress,
	"line3" | "countryCode" | "city" | "state"
>;

const snackbarDurationInSeconds = 3;

const EditAddressWithNoCityNoState: FC<{}> = () => {
	const history = useHistory();
	const { deleteNonDigits } = useString();
	const { showSnackbar } = useSnackbar();
	const { getMailingAddress, saveMailingAddress } = useAddress();
	const { postalCodeLength } = useConfiguration();

	const { value: userMailingAddress, loading } = useAsync(
		() => getMailingAddress(),
		[getMailingAddress]
	);

	const [formData, setFormData] =
		useState<UserMailingAddressWithNoCityNoState>({
			line1: "",
			line2: "",
			postCode: "",
		});

	useEffect(() => {
		if (userMailingAddress) {
			setFormData(
				userMailingAddress as UserMailingAddressWithNoCityNoState
			);
		}
	}, [userMailingAddress]);

	const { validateAddressLine1, validateAddressLine2, validatePostCode } =
		useAddressValidation();

	const [error, setError] = useState<InvalidFormSubmissionError>();

	const serverErrorKeys: Partial<
		Record<keyof UserMailingAddressWithNoCityNoState, TranslationKey>
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
		Record<keyof UserMailingAddressWithNoCityNoState, TranslationKey>
	> = useMemo(
		() => ({
			line1: validateAddressLine1(formData.line1),
			line2: validateAddressLine2(formData.line2),
			postCode: validatePostCode(formData.postCode),
		}),
		[formData, validateAddressLine1, validateAddressLine2, validatePostCode]
	);

	const hasError = Object.values(errorKeys).filter(Boolean).length > 0;

	const handleSubmit = useCallback(async () => {
		try {
			if (!hasError) {
				await saveMailingAddress({
					line1: formData.line1,
					line2: formData.line2,
					postCode: formData.postCode,
				});
				history.push("/profile");

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

	const onCancel = () => {
		history.push("/profile");
	};

	return (
		<div className="acuvue-edit-address-with-no-city-no-state">
			<MyAcuvueLiteHeader />
			{loading ? (
				<LoadingBlock />
			) : (
				<div className="content-wrapper">
					<EditAddressTitleAndBlockTitle />
					<div className="address-text-label">
						<Text textKey="profilePage.addressSection.label" />
					</div>
					<Form
						layout="vertical"
						name="acuvue-edit-address-form"
						onFinish={handleSubmit}
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
								alwaysVisibleErrorKey={serverErrorKeys.postCode}
								errorKey={errorKeys.postCode}
								type="text"
								name="postCode"
								value={formData.postCode}
								onChange={(value) => {
									const postCode = deleteNonDigits(value);

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

export default EditAddressWithNoCityNoState;
