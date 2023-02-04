import { FC } from "react";
import FilterStoreForm from "../FilterStoreForm";
import { useOpticalStoreContext } from "../../OpticalStoreProvider";

const StoreSearchSection: FC<{}> = () => {
	const {
		zone,
		state,
		setState,
		setZone,
		stateOptions,
		zoneOptions,
		setFindValue,
		findValue,
		isFindEnabled,
		onFilterSubmit,
		sortAlphabeticallyStoresZonesStatus,
	} = useOpticalStoreContext();

	return (
		<div className="store-search-section">
			<FilterStoreForm
				stateDefaultOptionKey="dashboardPage.opticalStore.filterForm.stateDefaultOptionKey"
				zoneDefaultOptionKey="dashboardPage.opticalStore.filterForm.zoneDefaultOptionKey"
				zoneValue={zone}
				stateValue={state}
				onStateChange={(value) => {
					setState(value);
					setZone("");
				}}
				stateOptions={stateOptions}
				onZoneChange={(value) => setZone(value)}
				zoneOptions={zoneOptions}
				onFindChange={(value) => setFindValue(value)}
				findValue={findValue}
				isFindEnabled={isFindEnabled}
				findLabelKey="dashboardPage.opticalStore.filterForm.findLabelKey"
				findPlaceholderKey="dashboardPage.opticalStore.filterForm.findPlaceholderKey"
				onSubmit={onFilterSubmit}
				sortAlphabeticallyStoresZonesStatus={
					sortAlphabeticallyStoresZonesStatus
				}
			/>
		</div>
	);
};

export default StoreSearchSection;
