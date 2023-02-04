import "./App.scss";
import { FC } from "react";
import PhoneRegistration from "./PhoneRegistration";
import OtpVerification from "./OtpVerification";
import Private from "./Private";
import { AuthStatus } from "../contexts/AuthContext";
import TermsConditionsPrivacyPolicy from "./TermsConditionsPrivacyPolicy";
import { useAuthentication } from "../hooks/useAuthentication";
import { Route, Routes, Navigate } from "react-router-dom-v5-compat";

const LegacyRoutes: FC<{}> = () => {
	const { status } = useAuthentication();
	return (
		<>
			{status === AuthStatus.PENDING_OTP && (
				<Routes>
					<Route
						path="phone-registration"
						element={<PhoneRegistration />}
					/>
					<Route
						path="otp-verification"
						element={<OtpVerification />}
					/>
					<Route
						path="*"
						element={<Navigate to="/phone-registration" />}
					/>
				</Routes>
			)}
			{status === AuthStatus.PENDING_TC && (
				<Routes>
					<Route
						path="terms-conditions-privacy-policy"
						element={<TermsConditionsPrivacyPolicy />}
					/>
					<Route
						path="*"
						element={
							<Navigate to="/terms-conditions-privacy-policy" />
						}
					/>
				</Routes>
			)}
			{status === AuthStatus.AUTHENTICATED && <Private />}
		</>
	);
};

export default LegacyRoutes;
