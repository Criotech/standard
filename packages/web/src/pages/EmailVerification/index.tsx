import { FC, useCallback, useEffect, useState } from "react";
import { useBoolean, useEffectOnce } from "react-use";
import Title from "../../components/Title";
import "./index.scss";
import MyAcuvueLiteHeader from "../../components/Layout/MyAcuvueLiteHeader";
import Footer from "../../components/Footer";
import { useEmail } from "../../hooks/useEmail";
import { useSession } from "../../hooks/useSession";
import Text from "../../components/Text";
import Button from "../../components/Button";
import { useHistory } from "react-router-dom";
import { useXiam } from "../../contexts/XiamContext";
import { useEmailVerification } from "./useEmailVerification";
import CooldownDialog from "./CooldownDialog";

const LINK_ACCOUNT_RETRY_INTERVAL_IN_MS = 10_000;

const EmailVerification: FC<{}> = () => {
	const history = useHistory();
	const { canIssueVerificationEmail, sendEmail } = useEmailVerification();
	const { linkAccount } = useEmail();
	const { startSession } = useSession();
	const { getXiamToken } = useXiam();

	const [email, setEmail] = useState<string>();

	const [isCooldownDialogOpen, setCooldownDialogOpen] = useBoolean(false);

	useEffectOnce(() => {
		(async () => {
			const token = await getXiamToken();
			const _email = token?.payload.email as string | undefined;
			setEmail(_email);
		})();
	});

	useEffectOnce(() => {
		(async () => {
			if (canIssueVerificationEmail()) {
				await sendEmail();
			}
		})();
	});

	const handleResendEmailClick = useCallback(async () => {
		if (canIssueVerificationEmail()) {
			await sendEmail();
		} else {
			setCooldownDialogOpen(true);
		}
	}, [canIssueVerificationEmail, sendEmail, setCooldownDialogOpen]);

	useEffect(() => {
		const interval = setInterval(async () => {
			try {
				await linkAccount();
				await startSession();
				history.push("/registration/profile");
			} catch (e) {}
		}, LINK_ACCOUNT_RETRY_INTERVAL_IN_MS);
		return () => {
			clearInterval(interval);
		};
	}, [history, linkAccount, startSession]);

	return (
		<>
			<MyAcuvueLiteHeader />
			<div className="email-verification-page">
				<div className="content-wrapper">
					<div className="email-verification-title">
						<Title
							textKey="emailVerification.title"
							subKey="emailVerification.subTitle"
						/>
					</div>

					<h1 className="email-verification-caption">
						<Text textKey="emailVerification.body.caption" />
					</h1>

					<div className="body-texts">
						<p key="paragraph1">
							<Text
								textKey="emailVerification.body.paragraph1"
								data={{
									email: email ?? "",
								}}
							/>
						</p>
						<p key="paragraph2">
							<Text textKey="emailVerification.body.paragraph2" />
						</p>
						<p key="paragraph3">
							<Text textKey="emailVerification.body.paragraph3" />
						</p>
					</div>

					<Button
						onClick={handleResendEmailClick}
						className="submit-btn"
					>
						<Text textKey="emailVerification.resend.button.label" />
					</Button>
				</div>

				<Footer />
			</div>
			<CooldownDialog
				isOpen={isCooldownDialogOpen}
				onClose={() => setCooldownDialogOpen(false)}
				onClickOk={() => setCooldownDialogOpen(false)}
			/>
		</>
	);
};

export default EmailVerification;
