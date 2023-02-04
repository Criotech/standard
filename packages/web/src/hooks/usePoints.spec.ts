import { renderHook } from "@testing-library/react-hooks";
import { mocked } from "ts-jest/utils";
import { usePoints } from "./usePoints";
import { useAuthentication } from "./useAuthentication";
import { useLoading } from "./useLoading";
import { PointsService, IPoints } from "@myacuvue_thailand_web/services";
import { useTranslation } from "./useTranslation";

jest.mock("./useTranslation", () => ({
	useTranslation: jest.fn(),
}));
jest.mock("./useAuthentication", () => ({
	useAuthentication: jest.fn(),
}));
jest.mock("./useLoading", () => ({
	useLoading: jest.fn(),
}));

jest.mock("@myacuvue_thailand_web/services", () => ({
	PointsService: {
		getPoints: jest.fn(),
	},
}));

beforeEach(() => {
	(useAuthentication as jest.Mock).mockReturnValue({
		sessionToken: { rawValue: "fake-session-token" },
	});
	(useTranslation as jest.Mock).mockReturnValue({
		language: "en",
	});
	mocked(useLoading).mockReturnValue({
		isLoading: false,
		showLoading: jest.fn(),
		hideLoading: jest.fn(),
	});
});

describe("getUserPoints", () => {
	it("should call PointsService.getPoints with correct arguments and return it", async () => {
		const expectedResponse: IPoints = {
			ladder: "normal",
			earnedPoints: 87,
			remainingPointsToPlatinum: 40,
			dateLimitToPlatinum: "2021-08-06",
			availablePoints: 30,
			expiringPoints: 10,
			expiringAt: "2021-08-06",
		};
		mocked(PointsService.getPoints).mockResolvedValue(expectedResponse);

		const { result } = renderHook(() => usePoints());
		const response = await result.current.getUserPoints();

		expect(PointsService.getPoints).toHaveBeenCalledWith(
			"fake-session-token"
		);
		expect(response).toEqual(expectedResponse);
	});

	it("should show and hide loading", async () => {
		const { showLoading, hideLoading } = useLoading();

		const { result } = renderHook(() => usePoints());
		await result.current.getUserPoints();

		expect(showLoading).toHaveBeenCalled();
		expect(showLoading).toHaveBeenCalledTimes(1);
		expect(hideLoading).toHaveBeenCalled();
		expect(hideLoading).toHaveBeenCalledTimes(1);
	});
});
