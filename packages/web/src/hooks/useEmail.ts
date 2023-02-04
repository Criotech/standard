import { IEmailVerifyPayload } from "@myacuvue_thailand_web/services";
import { useCallback } from "react";
import { useLoading } from "./useLoading";
import { useService } from "./useService";
import { useXiam } from "../contexts/XiamContext";
import { useDeviceToken } from "../contexts/DeviceTokenContext";

interface IUseEmail {
	verify: (data: IEmailVerifyPayload) => Promise<void>;
	linkAccount: () => Promise<void>;
	sendVerificationLink: () => Promise<void>;
}

export const useEmail = (): IUseEmail => {
	const { EmailService } = useService();
	const { showLoading, hideLoading } = useLoading();
	const { getXiamToken } = useXiam();
	const { deviceToken } = useDeviceToken();

	const verify = useCallback(
		async (data: IEmailVerifyPayload) => {
			showLoading();
			try {
				await EmailService.verify(data.data);
			} finally {
				hideLoading();
			}
		},
		[showLoading, hideLoading, EmailService]
	);

	const linkAccount = useCallback(async () => {
		showLoading();
		try {
			const xiamToken = await getXiamToken();
			await EmailService.linkAccount(
				deviceToken?.rawValue!,
				xiamToken?.rawValue!
			);
		} finally {
			hideLoading();
		}
	}, [
		showLoading,
		getXiamToken,
		EmailService,
		deviceToken?.rawValue,
		hideLoading,
	]);

	const sendVerificationLink = useCallback(async () => {
		showLoading();
		try {
			const xiamToken = await getXiamToken();
			await EmailService.sendVerificationLink(xiamToken?.rawValue!);
		} finally {
			hideLoading();
		}
	}, [showLoading, getXiamToken, EmailService, hideLoading]);

	return {
		verify,
		linkAccount,
		sendVerificationLink,
	};
};
