import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { CSSProperties, FC, PropsWithChildren } from "react";
import { useConfiguration } from "../../hooks/useConfiguration";
import LoadingBlock from "../LoadingBlock";
import { ConfigService } from "@myacuvue_thailand_web/services";

const options: google.maps.MapOptions = {
	disableDefaultUI: true,
	zoomControl: true,
	zoomControlOptions: {
		position: 0,
	},
};

interface IProps {
	zoom?: number;
	center?: ConfigService.Coordinates;
	width?: CSSProperties["width"];
	height?: CSSProperties["height"];
}

const Map: FC<PropsWithChildren<IProps>> = ({
	zoom = 10,
	center,
	children,
	width = "500px",
	height = "500px",
}) => {
	const { googleMapsApiKey } = useConfiguration();
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey,
	});

	return isLoaded ? (
		<GoogleMap
			id="google-map"
			mapContainerStyle={{ width, height }}
			zoom={zoom}
			center={
				center && {
					lat: parseFloat(center.latitude.toString()),
					lng: parseFloat(center.longitude.toString()),
				}
			}
			options={options}
		>
			{children}
		</GoogleMap>
	) : (
		<LoadingBlock />
	);
};

export default Map;
