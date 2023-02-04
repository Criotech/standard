import { useCallback, useEffect, useState } from "react";
import { WindowService, ConfigService } from "@myacuvue_thailand_web/services";

const positionOptions: PositionOptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

interface IUseGeolocation {
	userCoordinates: ConfigService.Coordinates | undefined;
}

export const useGeolocation = (): IUseGeolocation => {
	const [userCoordinates, setUserCoordinates] = useState<
		ConfigService.Coordinates | undefined
	>();

	const successCallback: PositionCallback = (position) => {
		setUserCoordinates({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		});
	};

	const handleGpsLocation = useCallback(() => {
		WindowService.getCurrentPosition(
			successCallback,
			undefined,
			positionOptions
		);
	}, []);

	useEffect(() => {
		handleGpsLocation();
	}, [handleGpsLocation]);

	return {
		userCoordinates,
	};
};
