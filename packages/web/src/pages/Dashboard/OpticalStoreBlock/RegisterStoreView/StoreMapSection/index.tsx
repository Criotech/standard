import { FC, useState, useMemo } from "react";
import { MarkerClusterer } from "@react-google-maps/api";
import { useService } from "../../../../../hooks/useService";
import Map from "../../../../../components/Map";
import MapBluePin from "../../../../../components/Map/MapBluePin";
import MapTooltip from "../../../../../components/Map/MapTooltip";
import AddressSection from "../../AddressSection";
import { useWideScreen } from "../../../../../hooks/useWideScreen";
import { IStoreCard } from "../StoreListSection";
import "./index.scss";
import { useOpticalStoreContext } from "../../OpticalStoreProvider";
import { DisplayAllMapPinsInSameColorStatus } from "@myacuvue_thailand_web/services";

interface IProps {
	className?: string;
}

const DEFAULT_CLUSTER_STYLE = {
	url: "/images/map-cluster.svg",
	height: 53,
	width: 53,
	textColor: "#fff",
};

const clusterDensity1 = DEFAULT_CLUSTER_STYLE;
const clusterDensity2 = DEFAULT_CLUSTER_STYLE;
const clusterDensity3 = DEFAULT_CLUSTER_STYLE;
const clusterDensity4 = DEFAULT_CLUSTER_STYLE;
const clusterDensity5 = DEFAULT_CLUSTER_STYLE;

const CLUSTER_STYLES = [
	clusterDensity1,
	clusterDensity2,
	clusterDensity3,
	clusterDensity4,
	clusterDensity5,
];

const StoreMapSection: FC<IProps> = ({ className }: IProps) => {
	const {
		mapCenterCoordinates,
		storeCards,
		setHighlightedStoreId,
		displayAllMapPinsInSameColorStatus,
	} = useOpticalStoreContext();

	const [selectedStore, setSelectedStore] = useState<IStoreCard | undefined>(
		storeCards[0] || undefined
	);

	const { isWideScreen } = useWideScreen();

	const { ClassService } = useService();
	const classNames = ClassService.createClassName(
		"store-map-section",
		className
	);

	const paddingOBlockNotAvailableForMap = 64;
	const mapWideProps = { width: "603px", height: "603px" };
	const mapSmallProps = {
		width: `${window.innerWidth - paddingOBlockNotAvailableForMap}px`,
		height: "312px",
	};

	const mapProps = isWideScreen ? mapWideProps : mapSmallProps;

	const pins = useMemo(() => {
		return (
			storeCards?.filter((store) => store.longitude && store.latitude) ||
			[]
		);
	}, [storeCards]);

	const Tooltip = useMemo(() => {
		return selectedStore &&
			selectedStore.longitude &&
			selectedStore.latitude ? (
			<MapTooltip
				longitude={selectedStore.longitude}
				latitude={selectedStore.latitude}
				onCloseClick={() => {
					setSelectedStore(undefined);
					setHighlightedStoreId(undefined);
				}}
			>
				<>
					<div className="store-name-in-tooltip">
						{selectedStore.storeName}
					</div>
					<AddressSection address={selectedStore.storeAddress} />
				</>
			</MapTooltip>
		) : (
			<></>
		);
	}, [selectedStore, setHighlightedStoreId]);

	const mapClusterStyles =
		displayAllMapPinsInSameColorStatus ===
		DisplayAllMapPinsInSameColorStatus.ENABLED
			? CLUSTER_STYLES
			: undefined;

	return (
		<div className={classNames}>
			<Map center={mapCenterCoordinates} {...mapProps}>
				<MarkerClusterer styles={mapClusterStyles}>
					{(clusterer) => (
						<>
							{pins.map((store) => (
								<MapBluePin
									key={store.storeId}
									labelText={store.number.toString()}
									latitude={store.latitude}
									longitude={store.longitude}
									clusterer={clusterer}
									onClick={() => {
										setHighlightedStoreId(store.storeId);
										setSelectedStore(store);
									}}
								/>
							))}
						</>
					)}
				</MarkerClusterer>
				{Tooltip}
			</Map>
		</div>
	);
};

export default StoreMapSection;
