import { FC, useEffect } from "react";
import "./index.scss";
import { useQuery } from "../../../hooks/useQuery";
import Text from "../../../components/Text";
import { useNavigate } from "react-router-dom-v5-compat";
import OtpVerificationForm from "./OtpVerificationForm";

const OtpVerificationPage: FC<{}> = () => {
	const navigate = useNavigate();
	const query = useQuery();
	const phone = query.get("phone");

	useEffect(() => {
		if (!phone) {
			navigate("/update-mobile");
		}
	}, [navigate, phone]);

	return (
		<div className="otp-verification">
			<main className="enter-otp-container">
				<p className="enter-otp">
					<Text textKey="updatePhoneNumberPage.otpVerification.enterOtp" />
				</p>
				<p className="otp-send-text">
					<Text textKey="updatePhoneNumberPage.otpVerification.otpSendTo" />{" "}
					<b>{phone}</b>
				</p>
				{phone && <OtpVerificationForm phone={phone} />}
			</main>
		</div>
	);
};

export default OtpVerificationPage;
