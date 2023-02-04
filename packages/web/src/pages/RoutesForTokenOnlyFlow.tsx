import "./App.scss";
import React, { FC } from "react";
import { Route, Redirect } from "react-router";
import { Switch } from "react-router-dom";
import DashboardWithOnlyOpticalStore from "./DashboardWithOnlyOpticalStore";
import OtpVerification from "./JoinNow/OtpVerification";
import MobileNumberRegistration from "./JoinNow/MobileNumberRegistration";
import CompleteYourProfile from "./CompleteYourProfile";
import TermsAndConditions from "./JoinNow/TermsAndConditions";
import { useAuthentication } from "../hooks/useAuthentication";
import { AuthStatus } from "../contexts/AuthContext";
import LoadingBlock from "../components/LoadingBlock";
import { useUserProfile } from "../contexts/UserProfileContext";
import { ProfileCompleteness } from "@myacuvue_thailand_web/services";
import UrlReaderProxy from "../pages/UrlReaderProxy";

export const AuthenticatedRoutes = () => {
	const {
		profileCompleteness,
		isLoading,
		wasEmptyBefore: wasProfileEmptyBefore,
	} = useUserProfile();

	return (
		<>
			{isLoading ? (
				<LoadingBlock />
			) : (
				<Switch>
					<Route exact path="/registration/profile">
						<CompleteYourProfile />
					</Route>
					<Route exact path="/">
						{profileCompleteness ===
							ProfileCompleteness.INCOMPLETE && (
							<Redirect to="/registration/profile" />
						)}
						<DashboardWithOnlyOpticalStore />
					</Route>

					{profileCompleteness === ProfileCompleteness.COMPLETE &&
						wasProfileEmptyBefore && <Redirect to="/" />}

					{profileCompleteness === ProfileCompleteness.COMPLETE &&
						!wasProfileEmptyBefore && (
							<Redirect to="/registration/profile" />
						)}

					{profileCompleteness === ProfileCompleteness.INCOMPLETE && (
						<Redirect to="/registration/profile" />
					)}
					<Redirect to="/" />
				</Switch>
			)}
		</>
	);
};

const RoutesForTokenOnlyFlow: FC<{}> = () => {
	const { status } = useAuthentication();

	return (
		<>
			{status === AuthStatus.PENDING_OTP && (
				<Switch>
					<Route exact path="/phone-registration">
						<MobileNumberRegistration />
					</Route>
					<Route exact path="/registration/otp">
						<OtpVerification />
					</Route>
					<Redirect to="/phone-registration" />
				</Switch>
			)}

			{status === AuthStatus.AUTHENTICATED && (
				<Route path="/">
					<AuthenticatedRoutes />
				</Route>
			)}

			{status === AuthStatus.PENDING_TC && (
				<Switch>
					<Route exact path="/registration/terms-and-conditions">
						<TermsAndConditions />
					</Route>
					<Redirect to="/registration/terms-and-conditions" />
				</Switch>
			)}

			<Route exact path="/code">
				<UrlReaderProxy />
			</Route>
		</>
	);
};

export default RoutesForTokenOnlyFlow;
