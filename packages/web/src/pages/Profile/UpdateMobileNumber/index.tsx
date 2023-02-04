import { FC } from "react";
import { useAsync } from "react-use";
import Title from "../../../components/Title";
import MyAcuvueLiteHeader from "../../../components/Layout/MyAcuvueLiteHeader";
import Text from "../../../components/Text";
import "./index.scss";
import Footer from "../../../components/Footer";
import BlockTitle from "../../Dashboard/BlockTitle";
import UpdateMobileNumberForm from "./UpdateMobileNumberForm";
import { useConfiguration } from "../../../hooks/useConfiguration";
import { useMobileNumberRegistration } from "../../JoinNow/MobileNumberRegistration/useMobileNumberRegistration";
import { useUser } from "../../../hooks/useUser";
import { IGetProfileResponse } from "@myacuvue_thailand_web/services";
import LoadingBlock from "../../../components/LoadingBlock";
import { useHistory } from "react-router-dom";

const UpdateMobileNumber: FC<{}> = () => {
	const history = useHistory();

	const { countryPhoneCode, phoneNumberLength } = useConfiguration();

	const {
		formData,
		setFormData,
		errorKeys,
		hasError,
		serverErrorKeys,
		onUpdatePhone,
	} = useMobileNumberRegistration();

	const { getProfile } = useUser();

	const { value, loading } = useAsync(() => getProfile(), [getProfile]);
	const userProfile = value as IGetProfileResponse;

	const CountryCode: FC<{}> = () => (
		<div className="country-code">+{countryPhoneCode}</div>
	);

	const formatPhoneNumber = () => {
		const phoneWithoutCountryCode =
			userProfile &&
			userProfile.phone?.substring(
				countryPhoneCode.length,
				userProfile.phone.length
			);

		return `+${countryPhoneCode} ${phoneWithoutCountryCode}`;
	};

	return (
		<>
			<MyAcuvueLiteHeader />

			{}
			<div className="update-mobile-number">
				<div className="content-wrapper">
					<div className="update-mobile-number-title">
						<Title
							textKey="UpdateMobileNumberPage.title"
							subKey="UpdateMobileNumberPage.subTitle"
						/>
					</div>

					<BlockTitle
						className="content-title"
						textKey="UpdateMobileNumber.caption"
					/>

					{loading ? (
						<LoadingBlock />
					) : (
						<div data-testid="body-texts" className="body-texts">
							<Text textKey="registrationPage.form.yourRegisteredMobileTextKey" />{" "}
							<b>{formatPhoneNumber()}</b>
						</div>
					)}

					<UpdateMobileNumberForm
						phoneNumberPrefix={<CountryCode />}
						formData={formData}
						setFormData={setFormData}
						errorKeys={errorKeys}
						serverErrorKeys={serverErrorKeys}
						onSubmit={onUpdatePhone}
						isSubmitDisabled={hasError}
						phoneLength={phoneNumberLength}
						onCancel={() => history.push("/profile")}
					/>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default UpdateMobileNumber;
