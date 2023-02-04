import {
	IUserAddress,
	IAddressState,
	InvalidFormSubmissionError,
	TranslationKey,
} from "@myacuvue_thailand_web/services";
import { Form, Select as AntSelect } from "antd";
import {
	FC,
	useMemo,
	useState,
	Dispatch,
	SetStateAction,
	useCallback,
} from "react";
import { useAsync } from "react-use";
import Button, { ButtonType } from "../../../components/Button";
import GenericInput from "../../../components/GenericInput";
import LoadingBlock from "../../../components/LoadingBlock";
import Select from "../../../components/Select";
import Text from "../../../components/Text";
import { useAddress } from "../../../hooks/useAddress";
import { Status, useSnackbar } from "../../../hooks/useSnackbar";
import { useTranslation } from "../../../hooks/useTranslation";
import { useConfiguration } from "../../../hooks/useConfiguration";
import useLegacyAddressValidation from "../../../hooks/validations/useLegacyAddressValidation";
import { useNavigate } from "react-router-dom-v5-compat";
import "./index.scss";

const { Option } = AntSelect;

interface IProps {
	defaultAddressValue?: IUserAddress;
}

const AddressForm: FC<IProps> = ({ defaultAddressValue }) => {
	const navigate = useNavigate();
	const { language } = useTranslation();
	const { postalCodeLength, region } = useConfiguration();
	const [address, setAddress] = useState<IUserAddress>({
		line1: defaultAddressValue?.line1 || "",
		line2: defaultAddressValue?.line2 || "",
		line3: defaultAddressValue?.line3 || "",
		city: defaultAddressValue?.city || "",
		state: defaultAddressValue?.state || "",
		postCode: defaultAddressValue?.postCode || "",
		countryCode: defaultAddressValue?.countryCode || region,
	});
	const {
		validateUnitNo,
		validateBuildingOrStreet,
		validateSubDistrict,
		validateDistrict,
		validateZipCode,
		validateProvince,
	} = useLegacyAddressValidation();
	const { getStates, saveShippingAddress } = useAddress();
	const { showSnackbar } = useSnackbar();
	const errorKeys: Partial<Record<keyof IUserAddress, TranslationKey>> =
		useMemo(
			() => ({
				line3: validateBuildingOrStreet(address.line3),
				line2: validateUnitNo(address.line2),
				line1: validateSubDistrict(address.line1),
				city: validateDistrict(address.city),
				postCode: validateZipCode(address.postCode),
				province: validateProvince(address.state),
			}),
			[
				address,
				validateUnitNo,
				validateBuildingOrStreet,
				validateSubDistrict,
				validateDistrict,
				validateZipCode,
				validateProvince,
			]
		);

	const handleAddressSubmit = useCallback(
		async (
			address: IUserAddress,
			setError: Dispatch<
				SetStateAction<InvalidFormSubmissionError | undefined>
			>
		) => {
			try {
				await saveShippingAddress(address);
				showSnackbar(Status.SUCCESS, "addressPage.changesSaved");
				navigate("/profile/details");
			} catch (e) {
				if (e instanceof InvalidFormSubmissionError) {
					setError(e);
				}
			}
		},
		[navigate, saveShippingAddress, showSnackbar]
	);

	const [error, setError] = useState<InvalidFormSubmissionError>();

	const hasError = Object.values(errorKeys).filter(Boolean).length > 0;

	const serverErrorKeys: Partial<Record<keyof IUserAddress, TranslationKey>> =
		useMemo(() => {
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

	const { value, loading: addressStatesLoading } = useAsync(
		() => getStates(),
		[getStates]
	);
	const addressStates = value as IAddressState[];

	const handleSubmit = () => {
		if (!hasError) {
			handleAddressSubmit(address, setError);
		}
	};

	return (
		<Form className="address-form" onFinish={handleSubmit}>
			<GenericInput
				errorKey={errorKeys.line1}
				alwaysVisibleErrorKey={serverErrorKeys.line1}
				type="text"
				name="line1"
				value={address.line1}
				onChange={(newValue) => {
					setAddress({ ...address, line1: newValue });
				}}
				maxLength={35}
				placeholder="addressPage.form.addressLine1Placeholder"
				label="addressPage.form.addressLine1Label"
			/>

			<GenericInput
				errorKey={errorKeys.line2}
				alwaysVisibleErrorKey={serverErrorKeys.line2}
				type="text"
				name="line2"
				value={address.line2}
				onChange={(newValue) => {
					setAddress({
						...address,
						line2: newValue,
					});
				}}
				maxLength={10}
				placeholder="addressPage.form.addressLine2Placeholder"
				label="addressPage.form.addressLine2Label"
			/>

			<GenericInput
				errorKey={errorKeys.line3}
				alwaysVisibleErrorKey={serverErrorKeys.line3}
				type="text"
				name="line3"
				value={address.line3}
				onChange={(newValue) => {
					setAddress({
						...address,
						line3: newValue,
					});
				}}
				maxLength={35}
				placeholder="addressPage.form.addressLine3Placeholder"
				label="addressPage.form.addressLine3Label"
			/>

			<GenericInput
				errorKey={errorKeys.city}
				alwaysVisibleErrorKey={serverErrorKeys.city}
				type="text"
				name="city"
				value={address.city}
				onChange={(newValue) => {
					setAddress({ ...address, city: newValue });
				}}
				maxLength={35}
				placeholder="addressPage.form.districtPlaceholder"
				label="addressPage.form.districtLabel"
			/>
			<GenericInput
				errorKey={errorKeys.postCode}
				alwaysVisibleErrorKey={serverErrorKeys.postCode}
				type="text"
				name="postCode"
				value={address.postCode}
				onChange={(newValue) => {
					setAddress({ ...address, postCode: newValue });
				}}
				maxLength={postalCodeLength}
				placeholder="addressPage.form.postalCodePlaceholder"
				label="addressPage.form.postalCodeLabel"
			/>

			<div>
				<label htmlFor="addressPage.form.provinceLabel">
					<Text textKey="addressPage.form.provinceLabel" />
				</label>
				<Select
					id="state"
					value={address.state}
					onChange={(value) => {
						setAddress({
							...address,
							state: value as string,
						});
					}}
					placeholder={
						<Text textKey="addressPage.form.provincePlaceholder" />
					}
					defaultValue=""
				>
					{addressStatesLoading ? (
						<LoadingBlock />
					) : (
						addressStates.map((state) => (
							<Option key={state.id} value={state.id}>
								{state.names[language] || state.names.en}
							</Option>
						))
					)}
				</Select>
			</div>

			<Button
				className="submit-btn"
				htmlType="submit"
				disabled={hasError}
			>
				<Text textKey="addressPage.button.submitLabel" />
			</Button>
			<Button
				type={ButtonType.OUTLINE}
				htmlType="button"
				className="cancel-btn"
				onClick={() => navigate("/profile/details")}
			>
				<Text textKey="addressPage.button.cancelLabel" />
			</Button>
		</Form>
	);
};

export default AddressForm;
