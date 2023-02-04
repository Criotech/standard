import { useTimer } from "./useTimer";

export const useCountdown = (
	id: string,
	initialTimeInSeconds: number = 5 * 60
) => {
	const { time: timeInMs, reset } = useTimer(`otp:${id}`);

	const timeInSeconds = Math.floor(timeInMs / 1000);

	const seconds = initialTimeInSeconds - timeInSeconds;

	return { seconds: Math.max(seconds, 0), reset };
};
