import { FC, useEffect } from "react";
import Title from "../../../components/Title";
import MyAcuvueLiteHeader from "../../../components/Layout/MyAcuvueLiteHeader";
import Footer from "../../../components/Footer";
import JoinNowStepBar from "../JoinNowStepBar";
import { useOtpVerification } from "./useOtpVerification";
import "./index.scss";
import OtpVerificationForm from "./OtpVerificationForm";
import { useHistory } from "react-router-dom";
import JoinNowBodyParagraph from "../JoinNowBodyParagraph";

const OtpVerification: FC<{}> = () => {
	const history = useHistory();
	const {
		formData,
		setFormData,
		currentIndex,
		onSubmit,
		onGoBack,
		isSubmitDisabled,
		phone,
		serverErrorKey,
		seconds,
		reset,
		setServerErrorKey,
	} = useOtpVerification();

	useEffect(() => {
		if (!phone) {
			history.push("/phone-registration");
		}
	}, [history, phone]);

	return (
		<div className="acuvue-otp-verification-page">
			<MyAcuvueLiteHeader />

			<div className="content-wrapper">
				<div className="otp-verification-title">
					<Title
						textKey="joinNowPage.title"
						subKey="joinNowPage.subTitle"
					/>
				</div>

				<JoinNowBodyParagraph />

				<JoinNowStepBar currentIndex={currentIndex} />

				{phone && (
					<OtpVerificationForm
						formData={formData}
						onCancel={onGoBack}
						onSubmit={onSubmit}
						phone={phone}
						serverErrorKey={serverErrorKey}
						setServerErrorKey={setServerErrorKey}
						setFormData={setFormData}
						isVerifyDisabled={isSubmitDisabled}
						seconds={seconds}
						reset={reset}
					/>
				)}
			</div>

			<Footer />
		</div>
	);
};

export default OtpVerification;
