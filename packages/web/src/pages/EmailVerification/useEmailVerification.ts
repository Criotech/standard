import { useCallback } from "react";
import { useStorage } from "../../hooks/useStorage";
import { useEmail } from "../../hooks/useEmail";

interface IUseEmailVerification {
	canIssueVerificationEmail: () => boolean;
	sendEmail: () => Promise<void>;
	deleteVerificationEmailIssuedAt: () => void;
}

const SECONDS_IN_A_MINUTE = 60;
const MILISECONDS_IN_A_SECOND = 1000;
const COOLDOWN_IN_MINUTES = 5;

const COOLDOWN_IN_MS =
	COOLDOWN_IN_MINUTES * SECONDS_IN_A_MINUTE * MILISECONDS_IN_A_SECOND;

export const useEmailVerification = (): IUseEmailVerification => {
	const { sendVerificationLink } = useEmail();
	const [lastEmailIssuedAt, setLastEmailIssuedAt, deleteLastEmailIssuedAt] =
		useStorage<number>("email-verification-issued-at");

	const canIssueVerificationEmail = (): boolean => {
		if (lastEmailIssuedAt === undefined) return true;

		const now = Date.now();
		const elapsed = now - lastEmailIssuedAt;
		return elapsed > COOLDOWN_IN_MS;
	};

	const sendEmail = useCallback(async () => {
		setLastEmailIssuedAt(Date.now());
		await sendVerificationLink();
	}, [sendVerificationLink, setLastEmailIssuedAt]);

	const deleteVerificationEmailIssuedAt = () => {
		deleteLastEmailIssuedAt();
	};

	return {
		canIssueVerificationEmail,
		sendEmail,
		deleteVerificationEmailIssuedAt,
	};
};
