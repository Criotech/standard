import {
	SortAlphabeticallyStoresZonesStatus,
	TranslationKey,
} from "@myacuvue_thailand_web/services";
import { Select as AntSelect } from "antd";
import { Dispatch, FC, SetStateAction, useMemo } from "react";
import Button, { ButtonType } from "../../../../../components/Button";
import Select from "../../../../../components/Select";
import Text from "../../../../../components/Text";
import TrackedStoreSearch from "../../../../../components/TrackedStoreSearch";
import FindInput from "../FindInput";
import "./index.scss";

const { Option } = AntSelect;

interface IProps {
	onStateChange: Dispatch<SetStateAction<string>>;
	stateValue: string;
	stateDefaultOptionKey: TranslationKey;
	stateOptions: string[];
	onZoneChange: Dispatch<SetStateAction<string>>;
	zoneValue: string;
	zoneDefaultOptionKey: TranslationKey;
	zoneOptions: string[];
	isFindEnabled: boolean;
	findPlaceholderKey: TranslationKey;
	findLabelKey: TranslationKey;
	findValue: string;
	onFindChange: (value: string) => void;
	onSubmit: () => void;
	sortAlphabeticallyStoresZonesStatus:
		| SortAlphabeticallyStoresZonesStatus
		| undefined;
}

const FilterStoreForm: FC<IProps> = ({
	stateDefaultOptionKey,
	stateOptions,
	stateValue,
	onStateChange,
	zoneDefaultOptionKey,
	zoneValue,
	zoneOptions,
	onZoneChange,
	findValue,
	findPlaceholderKey,
	findLabelKey,
	onFindChange,
	isFindEnabled,
	onSubmit,
	sortAlphabeticallyStoresZonesStatus,
}) => {
	const sortedStateOptions = useMemo(() => {
		if (
			sortAlphabeticallyStoresZonesStatus ===
			SortAlphabeticallyStoresZonesStatus.ENABLED
		) {
			return stateOptions.slice().sort((a, b) => a.localeCompare(b));
		} else {
			return stateOptions;
		}
	}, [sortAlphabeticallyStoresZonesStatus, stateOptions]);

	const sortedZoneOptions = useMemo(() => {
		if (
			sortAlphabeticallyStoresZonesStatus ===
			SortAlphabeticallyStoresZonesStatus.ENABLED
		) {
			return zoneOptions.slice().sort((a, b) => a.localeCompare(b));
		} else {
			return zoneOptions;
		}
	}, [sortAlphabeticallyStoresZonesStatus, zoneOptions]);

	return (
		<TrackedStoreSearch
			name="filter-store-form"
			layout="vertical"
			className="filter-store-form"
			onFinish={onSubmit}
			stateValue={stateValue}
			zoneValue={zoneValue}
			findValue={findValue}
		>
			<div className="state-input">
				<label className="label" htmlFor="state">
					<Text textKey="dashboardPage.opticalStore.stateLabelKey" />
				</label>
				<Select
					className="state-select-input"
					value={stateValue}
					onChange={(value) => {
						onStateChange(String(value));
					}}
				>
					<Option value="">
						<Text textKey={stateDefaultOptionKey} />
					</Option>
					{sortedStateOptions.map((state) => (
						<Option key={state} value={state}>
							{state}
						</Option>
					))}
				</Select>
			</div>

			<div className="zone-input">
				<label className="label" htmlFor="zone">
					<Text textKey="dashboardPage.opticalStore.zoneLabelKey" />
				</label>
				<Select
					className="zone-select-input"
					value={zoneValue}
					onChange={(value) => {
						onZoneChange(String(value));
					}}
				>
					<Option value="">
						<Text textKey={zoneDefaultOptionKey} />
					</Option>
					{sortedZoneOptions.map((zone) => (
						<Option key={zone} value={zone}>
							{zone}
						</Option>
					))}
				</Select>
			</div>

			<FindInput
				className="find-input"
				name="findInput"
				placeholder={findPlaceholderKey}
				label={findLabelKey}
				value={findValue}
				onChange={onFindChange}
			/>

			<Button
				type={ButtonType.OUTLINE}
				htmlType="submit"
				disabled={isFindEnabled}
				className="find-button"
			>
				<Text textKey="dashboardPage.opticalStore.filterForm.find" />
			</Button>
		</TrackedStoreSearch>
	);
};

export default FilterStoreForm;
