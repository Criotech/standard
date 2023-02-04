import UtilityService from "./index";

const { numbersFromRange, sleep } = UtilityService;

const flushPromiseJobsQueue = async (): Promise<void> => {
	return await Promise.resolve();
};

describe("numbersFromRange", () => {
	it("should return an array of numbers with range as per parameters ", () => {
		const expectedNumbersRange = [1, 2, 3, 4, 5, 6];
		const numbersRange = numbersFromRange(1, 6);
		expect(numbersRange).toEqual(expectedNumbersRange);
	});
});

describe("sleep", () => {
	it("should stop the code execution, and only execute the callback after the amount of specified milliseconds has elapsed", async () => {
		jest.useFakeTimers("modern").setSystemTime(0);

		const mockCallback = jest.fn();

		const delay = 1_000;
		sleep(delay).then(() => {
			mockCallback();
		});

		await flushPromiseJobsQueue();
		expect(mockCallback).not.toHaveBeenCalled();

		jest.runAllTimers();
		await flushPromiseJobsQueue();

		const elapsedMilliseconds = Date.now();
		expect(elapsedMilliseconds).toStrictEqual(1_000);

		expect(mockCallback).toHaveBeenCalled();
	});
});
