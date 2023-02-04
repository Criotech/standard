import { useCountdown } from "./useCountdown";
import { useTimer } from "./useTimer";

jest.mock("./useTimer", () => ({
	useTimer: jest.fn(),
}));

describe("useCountdown", () => {
	it("should return 19 when initial time is 20s and elapsed time is 1s (1000ms)", () => {
		const fakeTimeInMs = 1000;
		(useTimer as jest.Mock).mockReturnValue({
			time: fakeTimeInMs,
			reset: jest.fn(),
		});

		const initialTimeInSeconds = 20;
		const { seconds } = useCountdown(
			"fakecountdownid",
			initialTimeInSeconds
		);

		expect(seconds).toEqual(19);
	});

	it("should return zero (0) when initial time is 1s and elapsed time is 3s (3000ms)", () => {
		const fakeTimeInMs = 3000;
		(useTimer as jest.Mock).mockReturnValue({
			time: fakeTimeInMs,
			reset: jest.fn(),
		});

		const initialTimeInSeconds = 1;
		const { seconds } = useCountdown(
			"fakecountdownid",
			initialTimeInSeconds
		);

		expect(seconds).toEqual(0);
	});

	it("should return reset function from useTimer", () => {
		const fakeTimeInMs = 0;
		const timerReset = jest.fn();
		(useTimer as jest.Mock).mockReturnValue({
			time: fakeTimeInMs,
			reset: timerReset,
		});
		const { reset } = useCountdown("fakecountdownid", 3);
		reset();

		expect(reset).toBe(timerReset);
		expect(timerReset).toHaveBeenCalled();
	});
});
