import { FC } from "react";
import { ConfigService, TranslationKey } from "@myacuvue_thailand_web/services";
import { useWideScreen } from "../../../hooks/useWideScreen";
import WideView from "./WideView";
import SmallView from "./SmallView";
import { useConfiguration } from "../../../hooks/useConfiguration";
import downloadAppQrCodeAU from "../../../images/download-app-qr-code-AU.png";
import downloadAppQrCodeHK from "../../../images/download-app-qr-code-HK.png";
import downloadAppQrCodeTW from "../../../images/download-app-qr-code-TW.png";
import downloadAppQrCodeSG from "../../../images/download-app-qr-code-SG.png";
import downloadAppQrCodeMY from "../../../images/download-app-qr-code-MY.png";
import downloadAppQrCodeNZ from "../../../images/download-app-qr-code-NZ.png";

const qrCodeByInstance: Record<ConfigService.Instance, string> = {
	[ConfigService.Instance.TH]: "",
	[ConfigService.Instance.AU]: downloadAppQrCodeAU,
	[ConfigService.Instance.NZ]: downloadAppQrCodeNZ,
	[ConfigService.Instance.SG]: downloadAppQrCodeSG,
	[ConfigService.Instance.MY]: downloadAppQrCodeMY,
	[ConfigService.Instance.TW]: downloadAppQrCodeTW,
	[ConfigService.Instance.HK]: downloadAppQrCodeHK,
	[ConfigService.Instance.IN]: "",
};

const InvitationBlock: FC<{}> = () => {
	const { isWideScreen } = useWideScreen();
	const { googlePlayStoreLink, appleAppStoreLink, instance } =
		useConfiguration();

	const qrCodeImagePath = qrCodeByInstance[instance];

	const invitationTitleKey: TranslationKey = "dashboardPage.invitation.title";
	const invitationBody: TranslationKey = "dashboardPage.invitation.body";
	const qrCodeSubtitleKey: TranslationKey =
		"dashboardPage.invitation.qrCodeSubtitle";

	return isWideScreen ? (
		<WideView
			invitationTitleKey={invitationTitleKey}
			invitationBody={invitationBody}
			qrCodeImagePath={qrCodeImagePath}
			qrCodeSubtitleKey={qrCodeSubtitleKey}
		/>
	) : (
		<SmallView
			invitationTitleKey={invitationTitleKey}
			invitationBody={invitationBody}
			appleAppStoreLink={appleAppStoreLink}
			googlePlayStoreLink={googlePlayStoreLink}
		/>
	);
};

export default InvitationBlock;
