import { FC } from "react";
import Checkbox from "../Checkbox";
import Text from "../Text";
import "./index.scss";

export interface IMarketingPreferenceFormData {
	isCallEnabled: boolean;
	isPushEnabled: boolean;
	isEmailEnabled: boolean;
	isSmsEnabled: boolean;
	isLineEnabled: boolean;
}

interface IProps {
	formData: Partial<IMarketingPreferenceFormData>;
	toggleCallEnabled: (value: boolean) => void;
	togglePushEnabled: (value: boolean) => void;
	toggleEmailEnabled: (value: boolean) => void;
	toggleSmsEnabled: (value: boolean) => void;
	toggleLineEnabled: (value: boolean) => void;
	isAllChecked: boolean;
	toggleAll: (value: boolean) => void;
	hasLineNotification: boolean;
}

const MarketingPreferencesComponent: FC<IProps> = ({
	formData,
	toggleCallEnabled,
	togglePushEnabled,
	toggleEmailEnabled,
	toggleSmsEnabled,
	toggleLineEnabled,
	isAllChecked,
	toggleAll,
	hasLineNotification,
}) => {
	return (
		<div className="checkboxes-wrapper">
			<div className="market-preference-checkboxes">
				<Checkbox
					className="checkbox"
					checked={isAllChecked}
					onChange={(e) => toggleAll(e.target.checked)}
				>
					<Text textKey="marketPreferencePage.marketPreferenceForm.all" />
				</Checkbox>

				<Checkbox
					className="checkbox"
					checked={formData.isEmailEnabled}
					onChange={(e) => toggleEmailEnabled(e.target.checked)}
				>
					<Text textKey="marketPreferencePage.marketPreferenceForm.email" />
				</Checkbox>

				<Checkbox
					className="checkbox"
					checked={formData.isCallEnabled}
					onChange={(e) => toggleCallEnabled(e.target.checked)}
				>
					<Text textKey="marketPreferencePage.marketPreferenceForm.phoneCall" />
				</Checkbox>

				<Checkbox
					className="checkbox"
					checked={formData.isSmsEnabled}
					onChange={(e) => toggleSmsEnabled(e.target.checked)}
				>
					<Text textKey="marketPreferencePage.marketPreferenceForm.sms" />
				</Checkbox>

				<Checkbox
					className="checkbox"
					checked={formData.isPushEnabled}
					onChange={(e) => togglePushEnabled(e.target.checked)}
				>
					<Text textKey="marketPreferencePage.marketPreferenceForm.appNotification" />
				</Checkbox>

				{hasLineNotification && (
					<Checkbox
						className="checkbox"
						checked={formData.isLineEnabled}
						onChange={(e) => toggleLineEnabled(e.target.checked)}
					>
						<Text textKey="marketPreferencePage.marketPreferenceForm.lineNotification" />
					</Checkbox>
				)}
			</div>
		</div>
	);
};

export default MarketingPreferencesComponent;
