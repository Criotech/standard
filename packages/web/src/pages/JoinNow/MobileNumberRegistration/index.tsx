import { FC } from "react";
import Title from "../../../components/Title";
import MyAcuvueLiteHeader from "../../../components/Layout/MyAcuvueLiteHeader";
import Text from "../../../components/Text";
import "./index.scss";
import Footer from "../../../components/Footer";
import MobileNumberRegistrationForm from "./MobileNumberRegistrationForm";
import JoinNowStepBar from "../JoinNowStepBar";
import BlockTitle from "../../Dashboard/BlockTitle";
import { useMobileNumberRegistration } from "./useMobileNumberRegistration";
import { useConfiguration } from "../../../hooks/useConfiguration";
import JoinNowBodyParagraph from "../JoinNowBodyParagraph";
import SignInButton from "../../../components/SignInButton";

const MobileNumberRegistration: FC<{}> = () => {
	const { countryPhoneCode, phoneNumberLength, hasSignIn } =
		useConfiguration();

	const {
		formData,
		setFormData,
		errorKeys,
		currentIndex,
		hasError,
		serverErrorKeys,
		onSubmit,
		setIsPhoneAlreadyExists,
	} = useMobileNumberRegistration();

	const CountryCode: FC<{}> = () => (
		<div className="country-code">+{countryPhoneCode}</div>
	);

	return (
		<>
			<MyAcuvueLiteHeader />

			<div className="mobile-registration-page">
				<div className="content-wrapper">
					<div className="mobile-number-registration">
						<Title
							textKey="joinNowPage.title"
							subKey="joinNowPage.subTitle"
						/>
					</div>

					<JoinNowBodyParagraph />

					<JoinNowStepBar currentIndex={currentIndex} />

					<BlockTitle
						className="content-title"
						textKey="joinNowPage.mobileNumberRegistration.enterYourMobileNumber"
					/>

					{currentIndex === 0 && (
						<MobileNumberRegistrationForm
							mobileNumberPrefix={<CountryCode />}
							formData={formData}
							setFormData={setFormData}
							errorKeys={errorKeys}
							serverErrorKeys={serverErrorKeys}
							onSubmit={onSubmit}
							isSubmitDisabled={hasError}
							phoneLength={phoneNumberLength}
							setIsPhoneAlreadyExists={setIsPhoneAlreadyExists}
						/>
					)}

					{hasSignIn && (
						<div className="already-a-member">
							<Text textKey="joinNowPage.mobileNumberRegistration.alreadyMemberText" />
							<SignInButton
								className="sign-in-text"
								buttonLabel="joinNowPage.mobileNumberRegistration.signInText"
							/>
						</div>
					)}
				</div>
			</div>

			<Footer />
		</>
	);
};

export default MobileNumberRegistration;
