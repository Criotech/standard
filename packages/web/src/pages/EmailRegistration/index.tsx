import { FC, useCallback, useEffect, useState } from "react";
import { useXiam } from "../../contexts/XiamContext";
import { useAuthentication } from "../../hooks/useAuthentication";
import { BrowserAuthError } from "@azure/msal-browser";
import Button from "../../components/Button";
import "./index.scss";

const EmailRegistration: FC<{}> = () => {
	const { registrationPopup } = useXiam();
	const { processSessionToken } = useAuthentication();

	const [shouldShowButton, setShouldShowButton] = useState(false);

	const handleAction = useCallback(async () => {
		try {
			await registrationPopup();
			processSessionToken();
		} catch (e) {
			if (e instanceof BrowserAuthError) {
				setShouldShowButton(true);
			}
		}
	}, [processSessionToken, registrationPopup]);

	useEffect(() => {
		handleAction();
	}, [handleAction]);

	return (
		<div className="email-registration">
			{shouldShowButton && (
				<Button className="try-again-button" onClick={handleAction}>
					TRY AGAIN
				</Button>
			)}
		</div>
	);
};

export default EmailRegistration;
