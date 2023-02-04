import { useMedia } from "react-use";

export const useWideScreen = () => {
	const isWideScreen = useMedia("(min-width: 1024px)");
	return {
		isWideScreen,
	};
};
