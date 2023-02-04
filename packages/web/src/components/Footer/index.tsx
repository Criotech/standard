import { FC, useMemo } from "react";
import { useWideScreen } from "../../hooks/useWideScreen";
import "./index.scss";
import LegalFootnote from "./LegalFootnote";
import LinksAccordion from "./LinksAccordion";
import LinksSection from "./LinksSection";
import SocialMedia from "./SocialMedia";
import { useConfiguration } from "../../hooks/useConfiguration";
import { useText } from "../../hooks/useText";
import {
	ConfigService,
	DisplayAboutSustainabilityFooterAUStatus,
	DisplayMedicalPatientInstructionGuideFooterAUStatus,
	DisplayTermsAndConditionsFooterAUStatus,
	TranslationType,
} from "@myacuvue_thailand_web/services";
import DisclaimerSection from "./DisclaimerSection";
import { useFeatureSwitch } from "../../hooks/useFeatureSwitch";
import CodeOfEthics from "./CodeOfEthics";

const Footer: FC<{}> = () => {
	const { isWideScreen } = useWideScreen();
	const {
		footerMenu,
		socialNetworks,
		hasDisclaimerText,
		instance,
		hasAdditionalInformationInSocialMedia,
	} = useConfiguration();

	const additionalInfoMap: Record<ConfigService.Instance, FC<{}>> = {
		[ConfigService.Instance.TH]: () => <></>,
		[ConfigService.Instance.AU]: () => <></>,
		[ConfigService.Instance.TW]: () => <></>,
		[ConfigService.Instance.HK]: () => <></>,
		[ConfigService.Instance.SG]: () => <></>,
		[ConfigService.Instance.MY]: CodeOfEthics,
		[ConfigService.Instance.NZ]: () => <></>,
		[ConfigService.Instance.IN]: () => <></>,
	};
	const AdditionalInfo = additionalInfoMap[instance];

	const [displayTermsAndConditionsFooterAUStatus, isFSTermsReady] =
		useFeatureSwitch("displayTermsAndConditionsFooterAU");
	const [
		displayMedicalPatientInstructionGuideFooterAUStatus,
		isFSMedicalReady,
	] = useFeatureSwitch("displayMedicalPatientInstructionGuideFooterAU");
	const [displayAboutSustainabilityFooterAUStatus, isFSAboutReady] =
		useFeatureSwitch("displayAboutSustainabilityFooterAU");

	const isFeatureSwitchReady =
		isFSTermsReady && isFSMedicalReady && isFSAboutReady;

	const disclaimerTextToRender = useText(
		"footer.disclaimerText",
		TranslationType.liteTheme
	);

	const footerMenus = useMemo(() => {
		const clonedFooterMenu = [...footerMenu];
		if (isFeatureSwitchReady && instance === ConfigService.Instance.AU) {
			if (
				displayTermsAndConditionsFooterAUStatus ===
				DisplayTermsAndConditionsFooterAUStatus.DISABLED
			) {
				clonedFooterMenu[0].items.splice(2, 1);
			}

			if (
				displayMedicalPatientInstructionGuideFooterAUStatus ===
					DisplayMedicalPatientInstructionGuideFooterAUStatus.ENABLED &&
				!clonedFooterMenu[4].items[0]
			) {
				clonedFooterMenu[4].items.push({
					name: "footer.links.patientInstructionGuides",
					url: "https://www.acuvue.com.au/sites/acuvue_au/files/9996-pig-july-2019.pdf",
				});
			}

			if (
				displayAboutSustainabilityFooterAUStatus ===
				DisplayAboutSustainabilityFooterAUStatus.DISABLED
			) {
				clonedFooterMenu[2].items.splice(2, 1);
			}
		}
		return clonedFooterMenu;
	}, [
		displayAboutSustainabilityFooterAUStatus,
		displayMedicalPatientInstructionGuideFooterAUStatus,
		displayTermsAndConditionsFooterAUStatus,
		footerMenu,
		instance,
		isFeatureSwitchReady,
	]);

	return (
		<div className="acuvue-footer">
			{isWideScreen ? (
				<LinksSection data={footerMenus} />
			) : (
				<LinksAccordion data={footerMenus} />
			)}

			{hasDisclaimerText && (
				<DisclaimerSection htmlContent={disclaimerTextToRender} />
			)}

			{socialNetworks.length > 0 && (
				<SocialMedia
					className={
						hasAdditionalInformationInSocialMedia ? "no-border" : ""
					}
					socialNetworks={socialNetworks}
				/>
			)}

			{hasAdditionalInformationInSocialMedia && <AdditionalInfo />}

			<LegalFootnote
				htmlContent={useText(
					"footer.legalFootNotes",
					TranslationType.liteTheme
				)}
			/>
		</div>
	);
};

export default Footer;
