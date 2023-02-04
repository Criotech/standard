import {
	ConfigService,
	IStoreWithCoordinates,
} from "@myacuvue_thailand_web/services";
import { Select as AntSelect } from "antd";
import { FC, useMemo, useState, useEffect, useCallback } from "react";
import Select from "../../../../components/Select";
import Text from "../../../../components/Text";
import { useService } from "../../../../hooks/useService";
import StoreList from "../StoreList";
import "./index.scss";
import Map from "./Map";
import { useGeolocation } from "../../../../hooks/useGeolocation";

const { Option } = AntSelect;

export const defaultCenter: ConfigService.Coordinates = {
	latitude: 15.565793693051953,
	longitude: 101.27812822841425,
};

interface IProps {
	stores: IStoreWithCoordinates[];
}

const SelectYourStoreView: FC<IProps> = ({ stores = [] }) => {
	const { WindowService } = useService();
	const [zone, setZone] = useState("");
	const [district, setDistrict] = useState("");
	const [selectedStoreId, setSelectedStoreId] = useState<string | undefined>(
		undefined
	);
	const { userCoordinates } = useGeolocation();
	const [mapCenter, setMapCenter] = useState(defaultCenter);
	const [mapZoom, setMapZoom] = useState(6);

	const centerMapOnUser = useCallback(() => {
		if (userCoordinates) {
			setMapZoom(14);
			setMapCenter({
				latitude: userCoordinates.latitude,
				longitude: userCoordinates.longitude,
			});
		}
	}, [userCoordinates]);

	useEffect(() => {
		centerMapOnUser();
	}, [centerMapOnUser]);

	const isDistrictAndZoneSelected = district && zone;

	const filteredStores = useMemo(() => {
		if (isDistrictAndZoneSelected) {
			return stores.filter(
				(store) => store.district === district && store.zone === zone
			);
		}
		if (district) {
			return stores.filter((store) => store.district === district);
		}
		return zone ? stores.filter((store) => store.zone === zone) : stores;
	}, [stores, district, zone, isDistrictAndZoneSelected]);

	const districts = useMemo(
		() =>
			stores.reduce(
				(
					districtAccumulator: string[],
					store: IStoreWithCoordinates
				) => {
					if (
						!districtAccumulator.find(
							(_district) => _district === store.district
						)
					) {
						districtAccumulator = [
							store.district,
							...districtAccumulator,
						];
					}
					return districtAccumulator;
				},
				[]
			),
		[stores]
	);

	const zones = useMemo(
		() =>
			stores.reduce(
				(zoneAccumulator: string[], store: IStoreWithCoordinates) => {
					if (
						store.district === district &&
						!zoneAccumulator.find((_zone) => _zone === store.zone)
					) {
						zoneAccumulator = [store.zone, ...zoneAccumulator];
					}
					return zoneAccumulator;
				},
				[]
			),
		[stores, district]
	);

	const scrollToView = useCallback(
		(id: string) => {
			const navigationHeaderHeight = 150;
			const section = WindowService.getElementById(id);

			if (section) {
				const top = section.offsetTop - navigationHeaderHeight;
				WindowService.scrollTo(top, 0, "smooth");
				setSelectedStoreId(id);
			}
		},
		[WindowService]
	);

	return (
		<div className="select-your-store">
			<h1>
				<Text textKey="storePage.yourOpticalStore.header" />
			</h1>

			<p>
				<Text textKey="storePage.yourOpticalStore.selectStoreParagraph" />
			</p>

			<div className="select-item">
				<label htmlFor="district">
					<Text textKey="storePage.yourOpticalStore.selectDistrictLabel" />
				</label>
				<Select
					id="district"
					value={district}
					onChange={(_district) => {
						setDistrict(_district as string);
						setZone("");
					}}
					placeholder={
						<Text textKey="storePage.yourOpticalStore.selectDistrictPlaceholder" />
					}
					defaultValue=""
				>
					<Option value="">
						<Text textKey="storePage.yourOpticalStore.selectDistrictPlaceholder" />
					</Option>
					{districts.map((district) => (
						<Option key={district} value={district}>
							{district}
						</Option>
					))}
				</Select>
			</div>

			<div className="select-item">
				<label htmlFor="zone">
					<Text textKey="storePage.yourOpticalStore.selectZoneLabel" />
				</label>
				<Select
					id="zone"
					value={district ? zone : ""}
					onChange={(value) => {
						setZone(value as string);
					}}
					placeholder={
						<Text textKey="storePage.yourOpticalStore.selectZonePlaceholder" />
					}
					defaultValue=""
					disabled={!district}
				>
					<Option value="">
						<Text textKey="storePage.yourOpticalStore.selectZonePlaceholder" />
					</Option>
					{district &&
						zones.map((zone) => (
							<Option key={zone} value={zone}>
								{zone}
							</Option>
						))}
				</Select>
			</div>

			<Map
				zoom={mapZoom}
				center={mapCenter}
				markers={
					filteredStores?.length
						? filteredStores.map(({ longitude, latitude, id }) => ({
								latitude,
								longitude,
								id,
						  }))
						: []
				}
				onLocationClick={centerMapOnUser}
				onMarkerClick={scrollToView}
			/>

			<StoreList
				stores={filteredStores}
				activeStoreId={selectedStoreId}
			/>
		</div>
	);
};

export default SelectYourStoreView;
