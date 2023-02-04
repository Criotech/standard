import { FC, PropsWithChildren } from "react";
import { InfoWindow } from "@react-google-maps/api";
import "./index.scss";

interface IProps {
	latitude: number;
	longitude: number;
	onCloseClick: () => void;
}

const MapTooltip: FC<PropsWithChildren<IProps>> = ({
	children,
	latitude,
	longitude,
	onCloseClick,
}) => {
	return (
		<InfoWindow
			position={{
				lat: latitude,
				lng: longitude,
			}}
			onCloseClick={onCloseClick}
		>
			{children}
		</InfoWindow>
	);
};

export default MapTooltip;
