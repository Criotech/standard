const convertMetersIntoKilometers = (meters) => {
    const METER_KILOMETER_RATIO = 1000;
    return meters / METER_KILOMETER_RATIO;
};
const computeDistanceInKmBeetween = (point1, point2) => {
    const lat1 = point1.latitude;
    const lon1 = point1.longitude;
    const lat2 = point2.latitude;
    const lon2 = point2.longitude;
    if (!point1 || !point2) {
        return 0;
    }
    try {
        if (lat1 === lat2 && lon1 === lon2) {
            return 0;
        }
        else {
            const earthRadiusInMeters = 6371e3;
            const phi1 = lat1 * (Math.PI / 180);
            const phi2 = lat2 * (Math.PI / 180);
            const deltaPhi = (lat2 - lat1) * (Math.PI / 180);
            const deltaLambda = (lon2 - lon1) * (Math.PI / 180);
            const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
                Math.cos(phi1) *
                    Math.cos(phi2) *
                    (Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2));
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distanceInMeters = earthRadiusInMeters * c;
            const distanceInKilometers = convertMetersIntoKilometers(distanceInMeters);
            const FIXED_DECIMAL_PLACES = 2;
            return parseFloat(distanceInKilometers.toFixed(FIXED_DECIMAL_PLACES));
        }
    }
    catch (ex) {
        return 0;
    }
};
const GeometryService = {
    computeDistanceInKmBeetween,
};
export default GeometryService;
