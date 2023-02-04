import { useSessionStorage } from "./useSessionStorage";
import { useCallback, useEffect, useState } from "react";

export const useTimer = (id: string, interval: number = 1000) => {
	const [timestamp, setTimestamp] = useSessionStorage(
		`timer-${id}`,
		Date.now()
	);
	const [counter, setCounter] = useState(0);
	const forceRender = useCallback(
		() => setCounter(counter + 1),
		[setCounter, counter]
	);

	useEffect(() => {
		const intervalId = setInterval(forceRender, interval);
		return () => {
			clearInterval(intervalId);
		};
	});

	const reset = useCallback(() => {
		setTimestamp(Date.now());
	}, [setTimestamp]);

	return { time: Date.now() - timestamp, reset };
};
