import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Spin } from "antd";
import { CSSProperties, FC } from "react";
import LocationIcon from "../../../../../icons/LocationIcon";
import "./index.scss";
import { useConfiguration } from "../../../../../hooks/useConfiguration";
import { ConfigService } from "@myacuvue_thailand_web/services";

export interface IMarker {
	latitude: number;
	longitude: number;
	id: string;
}

interface IProps {
	zoom?: number;
	center: ConfigService.Coordinates;
	markers: IMarker[];
	onLocationClick: () => void;
	onMarkerClick: (id: string) => void;
}

const mapContainerStyle: CSSProperties = {
	width: "100%",
	height: "293px",
};

const Map: FC<IProps> = ({
	zoom = 8,
	markers,
	center,
	onLocationClick,
	onMarkerClick,
}) => {
	const { googleMapsApiKey } = useConfiguration();

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey,
	});

	const renderMap = () => (
		<GoogleMap
			id="google-map"
			mapContainerStyle={mapContainerStyle}
			zoom={zoom}
			center={{
				lat: center.latitude,
				lng: center.longitude,
			}}
			options={{
				disableDefaultUI: true,
			}}
		>
			{markers.map(({ latitude, longitude, id }, i) => (
				<Marker
					onClick={() => onMarkerClick(id)}
					key={id}
					position={{
						lat: latitude,
						lng: longitude,
					}}
				/>
			))}

			<LocationIcon onClick={onLocationClick} />
		</GoogleMap>
	);

	const renderMapLoading = () => (
		<Spin spinning={!isLoaded} style={mapContainerStyle} />
	);

	return isLoaded ? renderMap() : renderMapLoading();
};

export default Map;
