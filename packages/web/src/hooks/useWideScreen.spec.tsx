import { useWideScreen } from "./useWideScreen";
import { useMedia } from "react-use";

jest.mock("react-use", () => ({
	useMedia: jest.fn(),
}));

describe("useWideScreen", () => {
	it("should return true when screen width is equal to and above 1024px", () => {
		(useMedia as jest.Mock).mockReturnValue(true);
		const { isWideScreen } = useWideScreen();
		expect(isWideScreen).toEqual(true);
	});

	it("should return false when screen width is below 1024px", () => {
		(useMedia as jest.Mock).mockReturnValue(false);
		const { isWideScreen } = useWideScreen();
		expect(isWideScreen).toEqual(false);
	});
});
