import { FC, ReactNode } from "react";
import "./index.scss";
import { ConfigService, TranslationKey } from "@myacuvue_thailand_web/services";
import Text from "../../../../components/Text";
import TicketInCircleIcon from "../../../../icons/TicketInCircleIcon";
import TruckInCircleIcon, {
	IconSize,
} from "../../../../icons/TruckInCircleIcon";
import LensesInCircleIcon from "../../../../icons/LensesInCircleIcon";
import EnvelopeInCircleIcon from "../../../../icons/EnvelopeInCircleIcon";
import CalendarInCircleIcon from "../../../../icons/CalendarInCircleIcon";
import TrophyInCircleIcon from "../../../../icons/TrophyInCircleIcon";

interface IProps {
	iconType: ConfigService.PrivilegeIconType;
	titleKey: TranslationKey;
	descriptionKey: TranslationKey;
}

const privilegeIconByType: Record<ConfigService.PrivilegeIconType, ReactNode> =
	{
		[ConfigService.PrivilegeIconType.TICKET_IN_CIRCLE]: (
			<TicketInCircleIcon size={IconSize.LARGE} />
		),
		[ConfigService.PrivilegeIconType.TRUCK_IN_CIRCLE]: (
			<TruckInCircleIcon color="#003087" size={IconSize.LARGE} />
		),
		[ConfigService.PrivilegeIconType.LENSES_IN_CIRCLE]: (
			<LensesInCircleIcon size={IconSize.LARGE} color="#f1744b" />
		),
		[ConfigService.PrivilegeIconType.ENVELOPE_IN_CIRCLE]: (
			<EnvelopeInCircleIcon size={IconSize.LARGE} color="#9D2C8D" />
		),
		[ConfigService.PrivilegeIconType.CALENDAR_IN_CIRCLE]: (
			<CalendarInCircleIcon size={IconSize.LARGE} color="#00A9B6" />
		),
		[ConfigService.PrivilegeIconType.TROPHY_IN_CIRCLE]: (
			<TrophyInCircleIcon size={IconSize.LARGE} color="#00ABE4" />
		),
	};

const AppPrivilegesCard: FC<IProps> = ({
	iconType,
	titleKey,
	descriptionKey,
}) => {
	const icon = privilegeIconByType[iconType];

	return (
		<div className="app-privilege-card">
			<span>{icon}</span>
			<h3 className="app-privilege-title typography-heading-3">
				<Text textKey={titleKey} />
			</h3>
			<span className="app-privilege-description">
				<Text textKey={descriptionKey} />
			</span>
		</div>
	);
};

export default AppPrivilegesCard;
