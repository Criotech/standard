import {
	ConfigService,
	GeometryService,
} from "@myacuvue_thailand_web/services";

export const computeDistanceInKmBeetween = (
	point1: ConfigService.Coordinates,
	point2: ConfigService.Coordinates
): number => {
	return GeometryService.computeDistanceInKmBeetween(point1, point2);
};
