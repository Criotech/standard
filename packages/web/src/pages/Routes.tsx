import "./App.scss";
import { FC } from "react";
import { Switch } from "react-router-dom";
import { Redirect, Route } from "react-router";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import { useConfiguration } from "../hooks/useConfiguration";
import Debug from "./Debug";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import MobileNumberRegistration from "./JoinNow/MobileNumberRegistration";
import MarketingPreference from "./MarketingPreferences";
import TermsAndConditions from "./JoinNow/TermsAndConditions";
import OtpVerification from "./JoinNow/OtpVerification";
import EmailRegistration from "./EmailRegistration";
import CompleteYourProfile from "./CompleteYourProfile";
import EmailConfirmation from "./EmailConfirmation";
import DebugXiam from "./DebugXiam";
import EmailVerification from "./EmailVerification";
import UpdateMobileNumber from "./Profile/UpdateMobileNumber";
import UpdateMobileNumberOtpVerification from "./Profile/UpdateMobileNumber/OtpVerification";
import ResetPasswordSuccess from "./ResetPasswordSuccess";
import NeoEditAddress from "./NeoEditAddress/index";
import { useAuthentication } from "../hooks/useAuthentication";
import { AuthStatus } from "../contexts/AuthContext";
import { useUserProfile } from "../contexts/UserProfileContext";
import { ProfileCompleteness } from "@myacuvue_thailand_web/services";

const AuthenticatedRoutes: FC<{}> = () => {
	const { profileCompleteness, isLoading } = useUserProfile();

	if (isLoading) {
		return null;
	}

	return (
		<>
			{profileCompleteness === ProfileCompleteness.COMPLETE && (
				<Switch>
					<Route exact path="/">
						<Dashboard />
					</Route>
					<Route exact path="/profile">
						<Profile />
					</Route>
					<Route exact path="/profile/edit">
						<EditProfile />
					</Route>
					<Route exact path="/profile/marketing">
						<MarketingPreference />
					</Route>
					<Route exact path="/profile/phone">
						<UpdateMobileNumber />
					</Route>
					<Route exact path="/profile/otp">
						<UpdateMobileNumberOtpVerification />
					</Route>
					<Route exact path="/profile/address">
						<NeoEditAddress />
					</Route>
					<Route exact path="/registration/profile">
						<CompleteYourProfile />
					</Route>
					<Redirect to="/" />
				</Switch>
			)}

			{profileCompleteness === ProfileCompleteness.INCOMPLETE && (
				<Switch>
					<Route exact path="/registration/profile">
						<CompleteYourProfile />
					</Route>
					<Redirect to="/registration/profile" />
				</Switch>
			)}
		</>
	);
};

const ConditionalRoutes = () => {
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

			{status === AuthStatus.PENDING_TC && (
				<Switch>
					<Route exact path="/registration/terms-and-conditions">
						<TermsAndConditions />
					</Route>
					<Redirect to="/registration/terms-and-conditions" />
				</Switch>
			)}

			{status === AuthStatus.PENDING_XIAM && (
				<Switch>
					<Route path="/email/registration">
						<EmailRegistration />
					</Route>
					<Redirect to="/email/registration" />
				</Switch>
			)}

			{[
				AuthStatus.PENDING_EMAIL_VALIDATION,
				AuthStatus.PENDING_ACCOUNT_LINKING,
			].includes(status) && (
				<Switch>
					<Route exact path="/email/verification">
						<EmailVerification />
					</Route>
					<Redirect to="/email/verification" />
				</Switch>
			)}

			{status === AuthStatus.AUTHENTICATED && (
				<Route path="/">
					<AuthenticatedRoutes />
				</Route>
			)}
		</>
	);
};

const Routes: FC<{}> = () => {
	const { allowDebugRoutes } = useConfiguration();
	const { status } = useAuthentication();

	return (
		<Switch>
			<Route exact path="/email/confirmation">
				<EmailConfirmation />
			</Route>
			<Route exact path="/registration/profile">
				<CompleteYourProfile />
			</Route>

			{status !== AuthStatus.AUTHENTICATED &&
				![
					AuthStatus.PENDING_EMAIL_VALIDATION,
					AuthStatus.PENDING_ACCOUNT_LINKING,
				].includes(status) && (
					<Route exact path="/sign-in">
						<SignIn />
					</Route>
				)}

			{status !== AuthStatus.AUTHENTICATED &&
				![
					AuthStatus.PENDING_EMAIL_VALIDATION,
					AuthStatus.PENDING_ACCOUNT_LINKING,
				].includes(status) && (
					<Route exact path="/reset-password-success">
						<ResetPasswordSuccess />
					</Route>
				)}

			{allowDebugRoutes && (
				<Route exact path="/debug">
					<Debug />
				</Route>
			)}
			{allowDebugRoutes && (
				<Route exact path="/debug-xiam">
					<DebugXiam />
				</Route>
			)}

			<Route path="/">
				<ConditionalRoutes />
			</Route>
		</Switch>
	);
};

export default Routes;
