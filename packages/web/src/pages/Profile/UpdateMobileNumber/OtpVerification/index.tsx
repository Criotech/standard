import { FC, useEffect } from "react";
import Title from "../../../../components/Title";
import MyAcuvueLiteHeader from "../../../../components/Layout/MyAcuvueLiteHeader";
import Footer from "../../../../components/Footer";
import { useOtpVerification } from "./useOtpVerification";
import "./index.scss";
import OtpVerificationForm from "./OtpVerificationForm";
import { useHistory } from "react-router-dom";

const OtpVerification: FC<{}> = () => {
	const history = useHistory();

	const {
		formData,
		setFormData,
		onSubmit,
		onGoBack,
		isSubmitDisabled,
		phone,
		serverErrorKey,
		setServerErrorKey,
	} = useOtpVerification();

	useEffect(() => {
		if (!phone) {
			history.push("/phone-registration");
		}
	}, [history, phone]);

	return (
		<>
			<MyAcuvueLiteHeader />
			<div className="acuvue-update-phone-otp-verification-page">
				<div className="content-wrapper">
					<div className="update-mobile-number-title">
						<Title
							textKey="UpdateMobileNumberPage.title"
							subKey="UpdateMobileNumberPage.subTitle"
						/>
					</div>

					{phone && (
						<OtpVerificationForm
							formData={formData}
							onCancel={onGoBack}
							onSubmit={onSubmit}
							phone={phone}
							serverErrorKey={serverErrorKey}
							setFormData={setFormData}
							isVerifyDisabled={isSubmitDisabled}
							setServerErrorKey={setServerErrorKey}
						/>
					)}
				</div>
			</div>

			<Footer />
		</>
	);
};

export default OtpVerification;
