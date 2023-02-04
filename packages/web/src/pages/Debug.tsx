import { FC, useCallback, useMemo, useState } from "react";
import { AuthStatus } from "../contexts/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";
import { useRegistration } from "../hooks/useRegistration";

const Debug: FC<{}> = () => {
	const { status, resetAuth, deviceToken, sessionToken } =
		useAuthentication();
	const { validateOtp, register } = useRegistration();

	const [telephoneNumber, setTelephoneNumber] = useState("111111111");
	const [otp, setOtp] = useState("1234");

	const callRegister = useCallback(
		(phone: string) => {
			(async () => {
				await register(phone);
			})();
		},
		[register]
	);

	const callValidateOtp = useCallback(
		(phone: string, otp: string) => {
			(async () => {
				await validateOtp(phone, otp);
			})();
		},
		[validateOtp]
	);

	const authenticationStatus = useMemo(() => {
		return `AuthStatus.${AuthStatus[status]}`;
	}, [status]);

	return (
		<div
			style={{
				maxWidth: 280,
				width: "100%",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<b>Authentication status:</b> {authenticationStatus} <br />
			<b>Device Token:</b> {JSON.stringify(deviceToken)} <br />
			<b>Session Token:</b> {JSON.stringify(sessionToken)} <br />
			<br />
			{status === AuthStatus.AUTHENTICATED ? (
				<button
					onClick={() => {
						resetAuth();
					}}
				>
					Signout
				</button>
			) : (
				<>
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
					<button
						onClick={() => {
							callRegister(telephoneNumber);
						}}
					>
						Call Register
					</button>
					<button
						onClick={() => {
							callValidateOtp(telephoneNumber, otp);
						}}
					>
						Call Validate OTP
					</button>
				</>
			)}
		</div>
	);
};

export default Debug;
