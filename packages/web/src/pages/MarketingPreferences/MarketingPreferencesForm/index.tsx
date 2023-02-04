import { TranslationKey } from "@myacuvue_thailand_web/services";
import { Dispatch, FC, SetStateAction, useMemo, useCallback } from "react";
import Button, { ButtonType } from "../../../components/Button";
import MarketingPreferencesComponent from "../../../components/MarketingPreferencesComponent";
import Text from "../../../components/Text";
import TrackedForm from "../../../components/TrackedForm";
import { useToggleAll } from "../../../hooks/useToggleAll";
import BlockTitle from "../../Dashboard/BlockTitle";
import "./index.scss";

export interface IFormData {
	isCallEnabled: boolean;
	isPushEnabled: boolean;
	isEmailEnabled: boolean;
	isSmsEnabled: boolean;
	isLineEnabled: boolean;
}

interface IProps {
	formData: IFormData;
	setFormData: Dispatch<SetStateAction<IFormData>>;
	errorKeys: Partial<Record<keyof IFormData, TranslationKey>>;
	serverErrorKeys: Partial<Record<keyof IFormData, TranslationKey>>;
	onSubmit: () => void;
	onCancel: () => void;
	isSubmitEnabled: boolean;
	hasLineNotification: boolean;
}

const MarketingPreferencesForm: FC<IProps> = ({
	formData,
	setFormData,
	onSubmit,
	onCancel,
	errorKeys,
	hasLineNotification,
}) => {
	const toggleCallEnabled = useCallback(
		(value: boolean) => {
			setFormData((currentFormData) => {
				return { ...currentFormData, isCallEnabled: value };
			});
		},
		[setFormData]
	);

	const togglePushEnabled = useCallback(
		(value: boolean) => {
			setFormData((currentFormData) => {
				return { ...currentFormData, isPushEnabled: value };
			});
		},
		[setFormData]
	);

	const toggleEmailEnabled = useCallback(
		(value: boolean) => {
			setFormData((currentFormData) => {
				return { ...currentFormData, isEmailEnabled: value };
			});
		},
		[setFormData]
	);

	const toggleSmsEnabled = useCallback(
		(value: boolean) => {
			setFormData((currentFormData) => {
				return { ...currentFormData, isSmsEnabled: value };
			});
		},
		[setFormData]
	);

	const toggleLineEnabled = useCallback(
		(value: boolean) => {
			setFormData((currentFormData) => {
				return { ...currentFormData, isLineEnabled: value };
			});
		},
		[setFormData]
	);

	const completePreferences = useMemo(() => {
		const completePreferencesInternal = [
			{
				checked: formData.isCallEnabled,
				toggle: toggleCallEnabled,
			},
			{
				checked: formData.isPushEnabled,
				toggle: togglePushEnabled,
			},
			{
				checked: formData.isEmailEnabled,
				toggle: toggleEmailEnabled,
			},
			{
				checked: formData.isSmsEnabled,
				toggle: toggleSmsEnabled,
			},
		];

		if (hasLineNotification) {
			completePreferencesInternal.push({
				checked: formData.isLineEnabled,
				toggle: toggleLineEnabled,
			});
		}
		return completePreferencesInternal;
	}, [
		formData,
		hasLineNotification,
		toggleCallEnabled,
		toggleEmailEnabled,
		toggleLineEnabled,
		togglePushEnabled,
		toggleSmsEnabled,
	]);

	const [isAllChecked, toggleAll] = useToggleAll(completePreferences);

	return (
		<TrackedForm
			trackingFormName="update_marketing_preference"
			trackingErrorKeys={errorKeys}
			name="marketing-preferences-form"
			onFinish={onSubmit}
			className="marketing-preferences-form"
		>
			<div className="checkboxes-wrapper">
				<BlockTitle
					textKey="marketPreferencePage.marketPreferenceForm.updateHeader"
					className="title"
				/>

				<MarketingPreferencesComponent
					formData={formData}
					toggleCallEnabled={toggleCallEnabled}
					togglePushEnabled={togglePushEnabled}
					toggleEmailEnabled={toggleEmailEnabled}
					toggleSmsEnabled={toggleSmsEnabled}
					toggleLineEnabled={toggleLineEnabled}
					toggleAll={toggleAll}
					isAllChecked={isAllChecked}
					hasLineNotification={hasLineNotification}
				/>
			</div>

			<div className="action-buttons">
				<Button className="update-button" htmlType="submit">
					<Text textKey="marketPreferencePage.marketPreferenceForm.updateButton" />
				</Button>

				<Button
					htmlType="button"
					type={ButtonType.OUTLINE}
					className="cancel-button"
					onClick={onCancel}
				>
					<Text textKey="marketPreferencePage.marketPreferenceForm.cancelButton" />
				</Button>
			</div>
		</TrackedForm>
	);
};

export default MarketingPreferencesForm;
