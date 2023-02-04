import { renderHook } from "@testing-library/react-hooks";
import { useFeatureSwitch } from "./useFeatureSwitch";
import { useService } from "./useService";

jest.mock("./useService", () => ({
	useService: jest.fn(),
}));

describe("getFeatureSwitch", () => {
	it("should give status(ENABLED) when feature is enabled", async () => {
		(useService as jest.Mock).mockReturnValue({
			FeatureSwitchService: {
				getFeatureSwitch: jest.fn().mockResolvedValue("ENABLED"),
			},
		});

		const { FeatureSwitchService } = useService();
		const { result, waitForNextUpdate } = renderHook(() =>
			useFeatureSwitch("addressFormType")
		);

		expect(result.current).toStrictEqual([undefined, false]);

		await waitForNextUpdate();

		expect(FeatureSwitchService.getFeatureSwitch).toHaveBeenCalled();
		expect(result.current).toStrictEqual(["ENABLED", true]);
	});

	it("should give status(DISABLED) when feature is disabled", async () => {
		(useService as jest.Mock).mockReturnValue({
			FeatureSwitchService: {
				getFeatureSwitch: jest.fn().mockResolvedValue("DISABLED"),
			},
		});

		const { FeatureSwitchService } = useService();
		const { result, waitForNextUpdate } = renderHook(() =>
			useFeatureSwitch("addressFormType")
		);

		expect(result.current).toStrictEqual([undefined, false]);

		await waitForNextUpdate();

		expect(FeatureSwitchService.getFeatureSwitch).toHaveBeenCalled();
		expect(result.current).toStrictEqual(["DISABLED", true]);
	});
});
