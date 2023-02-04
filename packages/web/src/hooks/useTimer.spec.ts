import { act, renderHook } from "@testing-library/react-hooks";
import { useTimer } from "./useTimer";

beforeEach(() => {
	jest.resetAllMocks();
	jest.clearAllTimers();
});

it("should return correct time", async () => {
	jest.useFakeTimers("modern");

	const { result } = renderHook(() => useTimer("fake timer id", 1000));

	const timeToWait = 1000;
	await act(async () => {
		await jest.advanceTimersByTime(timeToWait);
		expect(result.current.time).toBe(timeToWait);
	});
});

it("should reset timer to zero if reset is called", async () => {
	jest.useFakeTimers("modern");
	const { result } = renderHook(() => useTimer("fake timer id", 1000));

	await act(async () => {
		const timeToWait = 1000;
		await jest.advanceTimersByTime(timeToWait);
		expect(result.current.time).toBe(timeToWait);
		await result.current.reset();
		expect(result.current.time).toBe(0);
	});
});
