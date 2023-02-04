import { FC, useEffect } from "react";
import "./index.scss";
import OtpVerificationForm from "./OtpVerificationForm";
import { useQuery } from "../../hooks/usev6Query";
import Text from "../../components/Text";
import { useNavigate } from "react-router-dom-v5-compat";

const OtpVerificationPage: FC<{}> = () => {
	const navigate = useNavigate();
	const query = useQuery();
	const phone = query.get("phone");

	useEffect(() => {
		if (!phone) {
			navigate("/phone-registration");
		}
	}, [navigate, phone]);

	return (
		<div className="otp-verification">
			<main className="enter-otp-container">
				<p className="enter-otp">
					<Text textKey="otpVerificationPage.enterOtp" />
				</p>
				<p className="otp-send-text">
					<Text textKey="otpVerificationPage.otpSendTo" />{" "}
					<b>{phone}</b>
				</p>
				{phone && <OtpVerificationForm phone={phone} />}
			</main>
		</div>
	);
};

export default OtpVerificationPage;
