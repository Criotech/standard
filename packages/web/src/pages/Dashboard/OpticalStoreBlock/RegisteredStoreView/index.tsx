import { FC, ReactNode } from "react";
import { useWideScreen } from "../../../../hooks/useWideScreen";
import RegisteredStoreSmallView from "./RegisteredStoreSmallView";
import RegisteredStoreWideView from "./RegisteredStoreWideView";
import { useConfiguration } from "../../../../hooks/useConfiguration";
import LensesCaseInCircleIcon, {
	IconSize,
} from "../../../../icons/LensesCaseInCircleIcon";
import ChecklistInCircleIcon from "../../../../icons/ChecklistInCircleIcon";
import { ConfigService, TranslationKey } from "@myacuvue_thailand_web/services";

interface IProps {
	storeName: string;
	storeAddress: string;
	telephone: string;
	onChangeStoreClick: () => void;
	onGoToHome: () => void;
}

export interface IIconWithLink {
	icon: ReactNode;
	textKey: TranslationKey;
	link: string;
}

const iconByType: Record<ConfigService.OpticalStoreIconType, ReactNode> = {
	[ConfigService.OpticalStoreIconType.LENSES_CASE_IN_CIRCLE]: (
		<LensesCaseInCircleIcon size={IconSize.LARGE} color="#9d2c8d" />
	),
	[ConfigService.OpticalStoreIconType.CHECKLIST_IN_CIRCLE]: (
		<ChecklistInCircleIcon size={IconSize.LARGE} color="#00a9b6" />
	),
};

const RegisteredStoreView: FC<IProps> = ({
	storeName,
	storeAddress,
	telephone,
	onChangeStoreClick,
	onGoToHome,
}) => {
	const { isWideScreen } = useWideScreen();
	const { opticalStoreAdviceCards } = useConfiguration();

	const iconsWithLinks: IIconWithLink[] = opticalStoreAdviceCards.map(
		(adviceCard) => ({
			icon: iconByType[adviceCard.iconType],
			link: adviceCard.link,
			textKey: adviceCard.textKey,
		})
	);

	return isWideScreen ? (
		<RegisteredStoreWideView
			storeAddress={storeAddress}
			storeName={storeName}
			telephone={telephone}
			iconsWithLinks={iconsWithLinks}
			onChangeStoreClick={onChangeStoreClick}
			onGoToHome={onGoToHome}
		/>
	) : (
		<RegisteredStoreSmallView
			storeAddress={storeAddress}
			storeName={storeName}
			telephone={telephone}
			iconsWithLinks={iconsWithLinks}
			onChangeStoreClick={onChangeStoreClick}
			onGoToHome={onGoToHome}
		/>
	);
};

export default RegisteredStoreView;
