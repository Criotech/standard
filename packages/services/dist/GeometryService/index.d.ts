interface ICoordinates {
    latitude: number;
    longitude: number;
}
declare const GeometryService: {
    computeDistanceInKmBeetween: (point1: ICoordinates, point2: ICoordinates) => number;
};
export default GeometryService;
