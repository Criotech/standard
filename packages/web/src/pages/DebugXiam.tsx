import { useXiam } from "../contexts/XiamContext";
import { FC, useCallback, useEffect, useState } from "react";
import { usePhone } from "../hooks/usePhone";
import { useDeviceToken } from "../contexts/DeviceTokenContext";
import { useDevice } from "../hooks/useDevice";
import { useAuthentication } from "../hooks/useAuthentication";
import { useEmail } from "../hooks/useEmail";
import { useSession } from "../hooks/useSession";
import { AuthStatus } from "../contexts/AuthContext";
import "./DebugXiam.scss";
import { JsonWebToken } from "@myacuvue_thailand_web/services";
import { useIsAuthenticated } from "@azure/msal-react";

const DebugXiam: FC<{}> = () => {
	const {
		getXiamToken,
		registrationPopup,
		loginPopup,
		updatePassword,
		logout,
	} = useXiam();
	const { getDeviceId } = useDevice();
	const { register, validateWithOtp, saveConsents } = usePhone();
	const { sendVerificationLink, linkAccount } = useEmail();
	const { startSession } = useSession();
	const { setDeviceToken } = useDeviceToken();
	const { resetAuth, processSessionToken, status } = useAuthentication();
	const [telephoneNumber, setTelephoneNumber] = useState("411111111");
	const [otp, setOtp] = useState("1234");

	const isAuthenticated = useIsAuthenticated();

	const [xiamToken, setXiamToken] = useState<JsonWebToken>();

	const updateXiamToken = useCallback(async () => {
		setXiamToken(undefined);
		const _xiamToken = await getXiamToken();
		setXiamToken(_xiamToken);
	}, [getXiamToken]);

	const callRegister = useCallback(() => {
		(async () => {
			const deviceId = getDeviceId()!;
			await register({
				phone: telephoneNumber,
				deviceId: deviceId,
				deviceType: "web",
			});
		})();
	}, [getDeviceId, register, telephoneNumber]);

	const callValidateOtp = useCallback(() => {
		(async () => {
			const deviceToken = await validateWithOtp({
				otp,
				phone: telephoneNumber,
			});
			if (deviceToken) {
				setDeviceToken(deviceToken);
			}
		})();
	}, [otp, setDeviceToken, telephoneNumber, validateWithOtp]);

	const callSaveConsents = useCallback(() => {
		(async () => {
			await saveConsents([
				"WEB:LITE:TERMS_AND_CONDITIONS",
				"WEB:LITE:PRIVACY_POLICY",
			]);
			processSessionToken();
		})();
	}, [processSessionToken, saveConsents]);

	const callSendVerificationLink = useCallback(() => {
		(async () => {
			await sendVerificationLink();
		})();
	}, [sendVerificationLink]);

	const callLinkAccount = useCallback(() => {
		(async () => {
			try {
				await linkAccount();
				processSessionToken();
			} catch {
				console.log("linkAccount failed");
			}
		})();
	}, [linkAccount, processSessionToken]);

	const callStartSession = useCallback(() => {
		(async () => {
			await startSession();
		})();
	}, [startSession]);

	const callResetAll = useCallback(() => {
		resetAuth();
	}, [resetAuth]);

	useEffect(() => {
		console.log(`*** [status change]: ${AuthStatus[status]}`);
	}, [status]);

	return (
		<div className="debug-xiam">
			{isAuthenticated ? "   isAuthenticated" : "   is NOT Authenticated"}
			<h2>Xiam Controls</h2>
			<button onClick={() => registrationPopup()}>
				Open RegistrationPopup Popup
			</button>
			<br />
			<br />
			<button onClick={() => updateXiamToken()}>Get xiam token</button>
			<br />
			<br />
			<button onClick={() => loginPopup()}>Open Login Popup</button>
			<br />
			<br />
			<button onClick={() => updatePassword()}>Update Password</button>
			<br />
			<br />
			<button onClick={() => logout()}>Logout</button>
			<br />
			<br />
			<span className="token">
				XiamToken: {JSON.stringify(xiamToken, null, 2)}
			</span>
			<hr />
			<div className="auth-context-operations">
				<h2>Auth Controls</h2>
				AuthStatus: <strong>{AuthStatus[status]}</strong>
				<br />
				Telephone number:{" "}
				<input
					type="text"
					value={telephoneNumber}
					onChange={(e) => {
						setTelephoneNumber(e.target.value);
					}}
				/>
				<br />
				OTP:{" "}
				<input
					type="text"
					value={otp}
					onChange={(e) => {
						setOtp(e.target.value);
					}}
				/>
				<br />
				<button onClick={() => callRegister()}>Call Register</button>
				<br />
				<button onClick={() => callValidateOtp()}>
					Call Validate OTP
				</button>
				<br />
				<button onClick={() => callSaveConsents()}>
					Call Save Consents
				</button>
				<br />
				<button onClick={() => registrationPopup()}>
					Open RegistrationPopup Popup
				</button>
				<br />
				<button onClick={() => callSendVerificationLink()}>
					Call Send Verification Link
				</button>
				<br />
				<button onClick={() => callLinkAccount()}>
					Call Link Account
				</button>
				<br />
				<button onClick={() => callStartSession()}>
					Call Start Session
				</button>
			</div>
			<hr />
			<div className="reset-section">
				<button onClick={() => callResetAll()}>Reset EVERYTHING</button>
			</div>
		</div>
	);
};

export default DebugXiam;
