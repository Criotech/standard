import GeometryService from "./index";

const { computeDistanceInKmBeetween } = GeometryService;

describe("computeDistanceInKmBeetween", () => {
	it("should return correct distance in kilometers", () => {
		const distanceInKm = computeDistanceInKmBeetween(
			{
				latitude: 7.0136679,
				longitude: 39.7265625,
			},
			{
				latitude: 6.3152985,
				longitude: 38.671875,
			}
		);
		expect(distanceInKm).toStrictEqual(139.99);
	});
});
