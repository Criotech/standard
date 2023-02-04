import liff from "@line/liff";
import { ILineProfile } from "./ILineProfile";
import WindowService from "../WindowService";

export const getProfile = async (
	liffId: string
): Promise<ILineProfile | undefined> => {
	try {
		await liff.init({ liffId });
		if (!liff.isLoggedIn()) {
			const host = WindowService.getHost();
			const pathname = WindowService.getPathname();

			const redirectUri = {
				redirectUri: "https://" + host + pathname,
			};

			liff.login(redirectUri);

			return undefined;
		} else {
			const [friendship, profile] = await Promise.all([
				liff.getFriendship(),
				liff.getProfile(),
			]);

			return {
				lineId: profile.userId,
				displayName: profile.displayName,
				pictureUrl: profile.pictureUrl,
				statusMessage: profile.statusMessage,
				isFriend: friendship.friendFlag,
			};
		}
	} catch (err) {
		console.log("LINE login error");
		console.log(err);
	}
};

export const createPermanentLink = async (query?: string): Promise<string> => {
	if (query) {
		liff.permanentLink.setExtraQueryParam(query);
	}
	return liff.permanentLink.createUrl();
};
