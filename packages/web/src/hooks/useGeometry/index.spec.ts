import { GeometryService } from "@myacuvue_thailand_web/services";
import { computeDistanceInKmBeetween } from "./index";

jest.mock("@myacuvue_thailand_web/services", () => ({
	GeometryService: {
		computeDistanceInKmBeetween: jest.fn(),
	},
}));

describe("computeDistanceInKmBeetween", () => {
	it("should call GeometryService.computeDistanceInKmBeetween with two coordinate parameters", () => {
		computeDistanceInKmBeetween(
			{
				latitude: 7.0136679,
				longitude: 39.7265625,
			},
			{
				latitude: 6.3152985,
				longitude: 38.671875,
			}
		);
		expect(
			GeometryService.computeDistanceInKmBeetween
		).toHaveBeenCalledWith(
			{
				latitude: 7.0136679,
				longitude: 39.7265625,
			},
			{
				latitude: 6.3152985,
				longitude: 38.671875,
			}
		);
	});
});
