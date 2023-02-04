import { Marker, MarkerProps } from "@react-google-maps/api";
import { FC } from "react";

interface IProps {
	latitude: number;
	longitude: number;
	onClick?: MarkerProps["onClick"];
	clusterer?: MarkerProps["clusterer"];
	labelText?: string;
}

const MapBluePin: FC<IProps> = ({
	latitude,
	longitude,
	onClick,
	labelText,
	clusterer,
}) => {
	return (
		<Marker
			clusterer={clusterer}
			position={{
				lat: parseFloat(latitude?.toString()),
				lng: parseFloat(longitude?.toString()),
			}}
			icon={{
				url: "/images/blue-pin.svg",
				size: {
					width: 48,
					height: 48,
					equals: () => true,
				},
				scaledSize: {
					width: 48,
					height: 48,
					equals: () => true,
				},
			}}
			onClick={onClick}
			label={
				labelText && {
					text: labelText,
					color: "#ffffff",
					fontSize: "13px",
				}
			}
		/>
	);
};

export default MapBluePin;
