function numbersFromRange(min: number, max: number): number[] {
	const array = [];
	for (let i = min; i <= max; i++) {
		array.push(i);
	}
	return array;
}

function sleep(waitTimeInMilliseconds: number): Promise<void> {
	return new Promise<void>((resolve) =>
		setTimeout(() => {
			resolve();
		}, waitTimeInMilliseconds)
	);
}

const UtilityService = {
	numbersFromRange,
	sleep,
};

export default UtilityService;
